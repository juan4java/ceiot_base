# Ejercicio CiberKillChain - Ataque

 * Juan Carlos Bampini Basualdo
 * Diseñar arquitectura, e implementar solución para edificios (smart building), que permita interactuar con
 equipos domóticos como ser luminarias, riego y temeperatura. Además poder interactuar desde una app para reservar
 amenities

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

## Objetivos

#### Objetivo del ataque

Perfil de la victima:
- Personas acomodadas con una vida constituida pero corrompibles.
- Poseen competidores o adversarios que buscan tomar ventaja de la perdida de su credibilidad y reputación.
- El ataque dará acceso a información de la victima, pero puede ser llevado a cabo con la "colaboración" de otros, por ejemplo parte de su familia podría contar acceso al sistema de camaras.

#### Algunas consideraciones: 
- Denegación de servicios con finalidad de evitar que el sistema opere y dar inicio al ataque.
- Ingenieria social, ganar acceso con consentimiento simulando ser parte de la empresa que brinda soporte del sistema domótico, mediante fallas introducidas al sistema por las Denegaciones de servicio (DoS) efectuadas. 
- Se requiere acceder a los sistemas de video vigilancia de las victimas potenciales de extorsion, para conocer sus horarios, habitos, ingresos y egresos. 
- Contar paralelamente con información sensible y/o confidencial con fines de extorsionar a la victima para su desvinculación, cese de actividades o pago por silenciar el caso. Se requerirá de un detective u armado de un engaño hacia hacia la victima para corromperlo y comprometerlo.
- Contactar a la vicitima (o su circulo familiar) informando sobre las fallas (introducidas) y buscando su colaboración como parte del proceso del ataque.
- Enviar encuestas falsas sobre la satisfacción del soporte, la encuesta debe obligar al usuario a acceder a un sistema copia del legitimo.
- Se debé contar con acceso al sistema de video vigilancia para llevar a cabo todo esto de forma coordinada.

### Reconnaissance
- Identificar información de la/s victima/s (Gather Victim Identity Information)
- Recopilar datos en redes sociales (Social Media)
- Identificar los sistemas empleados, y accederlos para lograr esto puedo:
1. Buscar vulnerabilidades conocidas (Vulnerability Scanning)
2. En muchas ocasiones una misma persona reutiliza usuarios, claves o datos similares en distintos sistemas.

### Weaponization
- Puedo indagar sobre el sistema empleado, ofreciendo un sistema mejor al consorcio u otros usuarios, no necesariamente las victimas.
- Al ser un sistema con acceso web, se debe buscar suplantar a un usuario legitimo.
- DEBO Obtener sus credenciales. 
- PUEDO Intentar usar credenciales por defecto (Default Accounts)
- PUEDO Armar un correo para calificar la atención y enviarlo a un sitio replica con login.
- PUEDO Contactar a la victima simulando ser personal de soporte o ventas, para obtener datos personales (Password Guessing).
- PUEDO Conseguir acceso físico autorizado por la victima para instalar microfonos o camara propia , de forma oculta, o reemplazando un equipo por otro adulterado( o que operen por fuera del sistema vulnerado) (Hardware Additions). 

### Delivery
- (Phishing) Envio de correo falso para calificar el servicio. 
- (Spearphishing Link) Contendra un enlace o link al sistema simulado, luego de loguearse, el sistema estará fuera de servicio y redirigirá al sitio real. 

### Exploit
- (User Execution/Malicious Link) aguardar aviso de que el usuario ingresó al sitio falso y se obtuvieron sus credenciales.
- vulnerabilidades mediante adjunto.

### Installation  
- Teniendo las credeciales puedo ver que capacidades posee.
- Si no puedo agregar o configurar camaras, puedo intentar escalar privilegios.(Abuse Elevation Control Mechanism)
- Si ganara persmisos podria introducir algún ejecutable mediante inyección  (Compromise Software Supply Chain)

### Command & Control
- Tener el acceso a camaras.
- (Bidirectional Communication/One-Way Communication) Efectuar una comunicación reversa desde el sistema para acceder al mismo.

### Actions on Objectives
- (Video Capture) Extraer la información audiovisual, para luego poder unirla al resto del plan dejando en evidencia que la victima era realmente y lograr el no repudio.