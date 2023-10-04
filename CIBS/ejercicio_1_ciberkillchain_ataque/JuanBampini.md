# Ejercicio CiberKillChain - Ataque

 * Juan Carlos Bampini Basualdo
 * Diseñar arquitectura, e implementar solución para edificios (smart building), que permita interactuar con
 equipos domóticos como ser luminarias, riego y temeperatura. Además poder interactuar desde una app para reservar
 amenities

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

## Objetivos

#### Objetivo del ataque
- Personas acomodadas con una vida constituida pero corrompibles.
- Poseen competidores o adversarios que buscan tomar ventaja de la perdida de su credibilidad y reputación.
- El ataque dará acceso a información de la victima, pero puede ser llevado a cabo con la "colaboración" de otros, por ejemplo parte de su familia podría contar acceso al sistema de camaras.
- Se deberá contar con acceso al sistema de video vigilancia para llevar a cabo todo esto de forma coordinada.
- El acceso será para conocer sus horarios, habitos, ingresos y egresos. 
- Contar paralelamente con información sensible y/o confidencial con fines de extorsionar a la victima para su desvinculación, cese de actividades o pago por silenciar el caso. Se requerirá de un detective u armado de un engaño hacia hacia la victima para corromperlo y comprometerlo.

### Reconnaissance
- Identificar información de la/s victima/s [Gather Victim Identity Information - T1589](https://attack.mitre.org/techniques/T1589/)
- Recopilar datos en redes sociales [Social Media - T1593.001](https://attack.mitre.org/techniques/T1593/001/)
- Identificar los sistemas empleados, ofreciendo un sistema mejor al consorcio u otros usuarios, no necesariamente las victimas.
- Una vez identificado, puedo buscar vulnerabilidades conocidas [Vulnerability Scanning - T1595](https://attack.mitre.org/techniques/T1595/002/).
- Contactar a la vicitima (o su circulo familiar) informando sobre las fallas (introducidas) y buscando su colaboración como parte del proceso del ataque.

### Weaponization
- Denegación de servicios con finalidad de evitar que el sistema opere y dar inicio al ataque [Network Denial of service - T1498](https://attack.mitre.org/techniques/T1498/).
- Al ser un sistema con acceso web, se debe buscar suplantar a un usuario legitimo.
- DEBO Obtener sus credenciales. 
- PODRIA Intentar usar credenciales por defecto [Default Accounts - T1078.001](https://attack.mitre.org/techniques/T1078/001/)
- DEBO Contactar a la victima simulando ser personal de soporte o ventas, para obtener datos personales [Password Guessing T1110.001](https://attack.mitre.org/techniques/T1110/001/).
- DEBO Armar un correo para calificar la atención y enviarlo a un sitio replica con login.
- DEBO Enviar la encuesta falsa sobre la satisfacción del soporte, la encuesta debe obligar al usuario a acceder a un sistema copia del legitimo. [Acquire Ingraestructure: Server - T1583/004](https://attack.mitre.org/techniques/T1583/004/)
- PUEDO Conseguir acceso físico autorizado por la victima para instalar microfonos o camara propia , de forma oculta, o reemplazando un equipo por otro adulterado( o que operen por fuera del sistema vulnerado) [Hardware Additions - T1200](https://attack.mitre.org/techniques/T1200/). 

### Delivery
- [Phishing - T1556](https://attack.mitre.org/techniques/T1566/) Envio de correo falso para calificar el servicio, el cual contendra un link malicioso. 
- [Spearphishing Link - T1566.002](https://attack.mitre.org/techniques/T1566/002/) El enlace o link al sistema simulado, luego de loguearse, dicho sistema estará fuera de servicio y redirigirá al sitio real. 

### Exploit
- PUEDO usar ingenieria social, ganar acceso con consentimiento simulando ser parte de la empresa que brinda soporte del sistema domótico, mediante fallas introducidas al sistema por las Denegaciones de servicio (DoS) efectuadas.
- DECIDO aguardar a que el usuario ingresé al sitio falso y se retengan sus credenciales. [User Execution]() [Malicious Link - T1204.001](https://attack.mitre.org/techniques/T1204/001/)

### Installation  
- Obtengo las credeciales. [Valid Accounts - T1078](https://attack.mitre.org/techniques/T1078/) 
- Si no puedo agregar o configurar camaras, puedo intentar escalar privilegios.[Abuse Elevation Control Mechanism - T1548](https://attack.mitre.org/techniques/T1548/)
- Si ganará permisos en el sistema podria introducir algún ejecutable mediante inyección  [Compromise Software Supply Chain - T1195](https://attack.mitre.org/techniques/T1195/002/)

### Command & Control
- Tener el acceso a camaras.
- Si hubiera podido introducir un ejecutable, intentaría efectuar una comunicación reversa desde el sistema para acceder al mismo [Bidirectional Communication - T1102.003](https://attack.mitre.org/techniques/T1102/003/), [One-Way Communication - T1481](https://attack.mitre.org/techniques/T1481/003/).

### Actions on Objectives
- Extraer la información audiovisual, para luego poder unirla al resto del plan dejando en evidencia que la victima era realmente y lograr el no repudio [Video Capture - T1125](https://attack.mitre.org/techniques/T1125/).