# Ejercicio CiberKillChain - Defensa

## Alumno

Juan Carlos Bampini Basualdo

## Enunciado

Se enumeran las etapas del ataque de forma inversa y con una propuesta de defensa.

## Resolución

### Actions on Objectives
Tendría que evitar la exfiltración de información de un usuario u otros usuarios.

### Command & Control
- Realizar la instalación o ejecución de servicios (bases de datos, contenedores, servidores) con usuarios especificos no root ni admin.
- No operar con usuarios administradores.
- Solo exponer servicios que requieran ser accedidos desde la red a usar
- Efectuar uso de software dentro de los tiempos de soporte vigentes (LTS). [Update Software - M1051](https://attack.mitre.org/mitigations/M1051/) - [Compromise Software Dependencies and Dev Tools - T1195.002](https://attack.mitre.org/techniques/T1195/002)
- Restringir accesos a directorios en modo solo lectura a los sistemas que se tenga acceso [Restrict File and Directory Perimssions - M1022 ](https://attack.mitre.org/mitigations/M1022/)- [T1222](https://attack.mitre.org/techniques/T1222)
- Impleentar uso de certificados no autofirmados.
- Contar con auditoria de cambios. [Audit - M1047](https://attack.mitre.org/mitigations/M1047/)

### Installation  
- Implementar un WAF que cubra reglas de OWASP
- Evitar inyección o acción desde dentro del sistema.[Escape to Host - M1048](https://attack.mitre.org/mitigations/M1048/) - [Exploitation for Privilege Escalation - T1068](https://attack.mitre.org/techniques/T1068)

### Exploit
- Se empleará un sistema de autenticacion delegado en proveedor. [MFA - M1032](https://attack.mitre.org/mitigations/M1032/)
- Emplear mecanismmos de bloqueo temporal tras reintentos fallidos [Brute Force: Password Guessing - T1110.001](https://attack.mitre.org/techniques/T1110/001/)

### Delivery
- Efectuar campañas sobre no pedido de ingresos al sistema o datos de usuarios y contraseñas.
- Obfuscar informaccion del sitio , errores o codigos propios de los sistemas internos (bases de datos, rutas del servidor)

### Weaponization
- Efectuar campañas de concientizacion y de mejoras o para informar cuando el sistema este fuera de servicio.[Techniques Addressed by Mitigation - M1017](https://attack.mitre.org/mitigations/M1017/) [Phishing - T1566](https://attack.mitre.org/techniques/T1566)
- El sistema debe obligar al cambio de contraseñas
- Desactivar usuarios que dejan de ingresar tras un cierto tiempo al sistema.








