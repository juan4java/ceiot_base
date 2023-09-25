# Ejercicio CiberKillChain - Defensa

## Alumno

Juan Carlos Bampini Basualdo

## Enunciado

Se enumeran las etapas del ataque de forma inversa y con una propuesta de defensa.

## Resolución

### Actions on Objectives
tendria que evitar la exfiltracion de información de un usuario u otros usuarios.

### Command & Control
- Realizar la instalación o ejecución de servicios (bases de datos, contenedores, servidores) con usuarios especificos no root ni admin.

### Installation  
- Implementar un WAF que implemente reglas de OWASP, quiero evitar cualqueir inyección o acción desde el sistema.

### Exploit
- Se empleará un sistema de autenticacion delegado en algun proveedor.

### Delivery
- Efectuar campañas sobre no pedido de ingresos al sistema o datos de usuarios y contraseñas.
- Obfuscar informaccion del sitio , errores o codigos propios de los sistemas internos (bases de datos, rutas del servidor)

### Weaponization
- Efectuar campañas de concientizacion y de mejoras o para informar cuando el sistema este fuera de servicio.
- El sistema debe obligar al cambio de contraseñas, y desactivar usuarios que dejan de ingresar tras un cierto tiempo.








