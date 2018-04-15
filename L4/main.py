#!/usr/bin/python


import struct
import click
from settings import *


class Node:
    def __init__(self, id=0, code_symbol=0, current_level_id=0, next_level_id=0, leaf=0):
        self.code_symbol = code_symbol
        self.current_level_id = current_level_id
        self.next_level_id = next_level_id
        self.leaf = leaf
        self.id = id  # for debug purpose only


# offset 00001D08
def decrypt_key(payload_key, payload_decryption_key):    
    decryption_length = min(len(payload_decryption_key), payload_decryption_key[0] ^ payload_key[0] ^ payload_decryption_key[2] | ((payload_decryption_key[1] ^ payload_decryption_key[3] ^ payload_key[1]) << 8))

    result = []
    payload_key_length = len(payload_key)
    iterator_1 = 0
    iterator_2 = 2
    for byte_id in range(decryption_length):
        result.append(payload_decryption_key[iterator_1] ^ payload_key[iterator_2] ^ payload_decryption_key[byte_id + 4])
        iterator_1 = (iterator_1 + 1) % payload_key_length
        iterator_2 = (iterator_2 + 1) % 2

    return result


#offset 000025C6
def extract_text_from_html(payload, saved_dot_count):
    result = []
    payload_length = len(payload)
    
    char_id = 0
    while char_id < payload_length:
        current_char = payload[char_id]

        if current_char == ord('<'):
            char_id += 1
            if char_id >= payload_length:
                print("mailformed payload")
                break

            while True:
                if payload[char_id] == ord('>'):
                    char_id += 1
                    break
                char_id += 1
                if char_id >= payload_length:
                    print("mailformed payload")
                    break
        else:
            if current_char < ord('A') or current_char > ord('Z'):
                if current_char < ord('a') or current_char > ord('z'):
                    if saved_dot_count <= 0 or current_char < ord(' '):
                        char_id += 1
                        continue
                    elif current_char == ord('.'):
                        result.append(current_char)
                        char_id += 1
                        saved_dot_count -= 1

                        while payload[char_id] == ord(' '):
                            char_id += 1
                        continue

            else:
                # transform to low case
                current_char += 0x20

            result.append(current_char)
            char_id += 1

    return result


# offset 00001DC3
def create_one_key(key_buffer):
    v2 = 0
    v3 = 1
    for char_id in range(len(key_buffer)):
        v3 = (v3 + key_buffer[char_id]) % 0xFFF1
        v2 = (v2 + v3) % 0xFFF1

    return v3 | (v2 << 16)


# offset 00002667
def create_key_context(payload, payload_key):
    key_context = []

    payload_char_id = 0
    for key_id in range(4):
        key_buffer = []

        payload_key_char_id = 0
        while True:
            decrypted_char = payload[payload_char_id] ^ payload_key[payload_key_char_id]
            key_buffer.append(decrypted_char)
            if payload[payload_char_id+1] == ord('.'):
                payload_char_id += 2
                break

            payload_key_char_id = (payload_key_char_id + 1) % len(payload_key)
            payload_char_id+=1

        key_context.append(create_one_key(key_buffer))

    return key_context, payload_char_id


#offset 000028F9
def get_next_tree_level(key_context):
    tmp1 = 0x36A6E006 * key_context[0]
    key_context[0] = key_context[1]
    tmp2 = (tmp1 & 0xFFFFFFFF) + key_context[3]
    result = tmp2 & 0xFFFFFFFF
    key_context[1] = key_context[2]
    key_context[2] = result
    key_context[3] = ((tmp1 >> 32) + 1) if tmp2 > 0xFFFFFFFF else (tmp1 >> 32)

    return result


# offset 000026E4
def build_compression_tree(payload, payload_decrypt_param):
    compression_tree_view = [0] * 0x1A
    compression_tree = [Node(i) for i in range(0x300)]

    for i in range(0x3C):
        compression_tree_view_id = get_next_tree_level(payload_decrypt_param) % 0x1A
        if not compression_tree_view[compression_tree_view_id]:
            compression_tree_view[compression_tree_view_id] = i % 3 + 1

    current_char_id = 0
    current_free_node_id = 26
    for leaf_id in range(256):
        compression_level_id = (payload[current_char_id] - ord('a')) & 0xFF
        tree_level_count = compression_tree_view[compression_level_id]
        if not tree_level_count:
            break

        current_char_id += 2
        if current_char_id >= len(payload):
            break

        current_node = compression_tree[((payload[current_char_id] - ord('a')) & 0xFF)]
        current_char_id += 1
        for level_id in range(tree_level_count-1):
            current_payload_char = payload[current_char_id]
            current_char_id += 1
            if not current_payload_char:
                break

            saved_current_node = current_node
            current_node = compression_tree[current_node.next_level_id]
            if saved_current_node.next_level_id:
                while current_node.code_symbol != current_payload_char:
                    if not current_node.current_level_id:
                        current_node.current_level_id = current_free_node_id
                        current_node = compression_tree[current_free_node_id]
                        current_node.code_symbol = current_payload_char
                        current_free_node_id += 1
                        break
                    current_node = compression_tree[current_node.current_level_id]

            else:
                saved_current_node.next_level_id = current_free_node_id
                current_node = compression_tree[current_free_node_id]
                current_node.code_symbol = current_payload_char
                current_free_node_id += 1

        current_node.leaf = leaf_id
   
    return compression_tree, current_char_id


# offset 00002560
def uncompress_payload(payload, compression_tree):
    result = []
    payload_len = len(payload)
    result_char_id = 0
    char_id = 0
    
    while char_id < payload_len:
        current_node = compression_tree[payload[char_id] - ord('a')]
        
        while True:
            next_level_id = current_node.next_level_id
            char_id += 1
            if not next_level_id:
                break
                
            current_node = compression_tree[next_level_id]
            if char_id >= payload_len:
                break
            while current_node.current_level_id:
                if current_node.code_symbol == payload[char_id]:
                    break
                current_node = compression_tree[current_node.current_level_id]
            
        found_leaf = current_node.leaf
        cutted_result_char_id = result_char_id & 0xFF
        result_char = (found_leaf - cutted_result_char_id) \
            if found_leaf >= cutted_result_char_id else (0x100 + found_leaf - cutted_result_char_id)
        result_char_id += 1
        result.append(result_char)
    
    return result


# offset 00002485
def extract_payload(payload, decrypt_key):
    payload = extract_text_from_html(payload, 4)
    key_context, next_char_id_1 = create_key_context(payload, decrypt_key)
    compression_tree, next_char_id_2 = build_compression_tree(payload[next_char_id_1:], key_context)
    return uncompress_payload(payload[next_char_id_1 + next_char_id_2:], compression_tree)


@click.command()
@click.option("--in_file", help="path to input file")
@click.option("--out_file", help="path to output file")
def main(in_file, out_file):
    with open(in_file, 'rb') as input_file:
        payload = list(input_file.read())
        result = extract_payload(payload, payload_decryption_key)[13:]

        with open(out_file, "wb") as output_file:
            for byte in result:
                output_file.write(struct.pack("B", byte))


if __name__ == "__main__":
    main()
