# Ejercicio CiberKillChain - Defensa

## Alumno
Juan Carlos Bampini Basualdo

## Enunciado

Se enumeran las etapas del ataque de forma inversa y con una propuesta de defensa.

## Resolución
### Actions on Objectives
Tendría que evitar la exfiltración de información de un usuario u otros usuarios.

### Command & Control
- Realizar la instalación o ejecución de servicios (bases de datos, contenedores, servidores) con usuarios específicos, según principio de menor privilegio.
- No acceder u operar con usuarios administradores a los sistemas requeridos.
- Solo exponer servicios, puertos o herramientas a los lugares o redes que las requieran.[Network Segmentation - M1030](https://attack.mitre.org/mitigations/M1030/) - [Trusted Relationship - T1199](https://attack.mitre.org/techniques/T1199)
- Usar software que se encuentre dentro de los tiempos de soporte vigentes (LTS). [Update Software - M1051](https://attack.mitre.org/mitigations/M1051/) - [Compromise Software Dependencies and Dev Tools - T1195.002](https://attack.mitre.org/techniques/T1195/002)
- Restringir accesos a directorios en modo solo lectura a los sistemas que se tenga acceso. [Restrict File and Directory Perimssions - M1022 ](https://attack.mitre.org/mitigations/M1022/) - [T1222](https://attack.mitre.org/techniques/T1222)
- Implementar uso de certificados, no autofirmados. [Encrypt Sensitive Information](https://attack.mitre.org/mitigations/M1041/) - [Adversary in the middle - T1557](https://attack.mitre.org/techniques/T1557)
- Contar con auditoria de cambios. [Audit - M1047](https://attack.mitre.org/mitigations/M1047/)

### Installation
- Implementar un WAF que cubra reglas de OWASP. [Exploit Protection](https://attack.mitre.org/mitigations/M1050/) - [Exploit Public-Facing Application - T1190](https://attack.mitre.org/techniques/T1190)
- Evitar inyección o acción desde dentro del sistema. [Escape to Host - M1048](https://attack.mitre.org/mitigations/M1048/) - [Exploitation for Privilege Escalation - T1068](https://attack.mitre.org/techniques/T1068)

### Exploit
- Se empleará un sistema de autenticación delegado en proveedor. [MFA - M1032](https://attack.mitre.org/mitigations/M1032/)
- Emplear mecanismos de bloqueo temporal tras reintentos fallidos. [Brute Force: Password Guessing - T1110.001](https://attack.mitre.org/techniques/T1110/001/)

### Delivery
- Efectuar campañas sobre no pedido de ingresos al sistema o brindar datos de usuarios y contraseñas. [User Training - M1017](https://attack.mitre.org/mitigations/M1017/)
- Ofuscar información del sitio, no retornar al usuario errores o códigos propios de los sistemas internos (bases de datos, rutas del servidor). [Encrypt Sensitive Information - M1041](https://attack.mitre.org/mitigations/M1041/) - [Indicator Removal - T1070](https://attack.mitre.org/techniques/T1070)

### Weaponization
- Efectuar campañas de concientización y de mejoras o para informar cuando el sistema este fuera de servicio. [Techniques Addressed by Mitigation - M1017](https://attack.mitre.org/mitigations/M1017/) - [Phishing - T1566](https://attack.mitre.org/techniques/T1566)
- El sistema debe obligar al cambio de contraseñas. [Password Policies - M1027](https://attack.mitre.org/mitigations/M1027/)
- Desactivar usuarios que dejan de ingresar tras un cierto tiempo al sistema. [User Account Management - M1018](https://attack.mitre.org/mitigations/M1018/) - [Valid Accounts - T1078](https://attack.mitre.org/techniques/T1078/)