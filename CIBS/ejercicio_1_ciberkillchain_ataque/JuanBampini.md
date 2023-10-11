# Ejercicio CiberKillChain - Ataque

 * Juan Carlos Bampini Basualdo
 * Diseñar arquitectura e implementar solución para edificios (smart building), que permita interactuar con
 equipos domóticos como ser: luminarias, riego, temperatura y acceder al circuito cerrado de cámaras. Además, permitir efectuar reserva de amenities
 * [Presentación Plan de Trabajo Final](https://docs.google.com/presentation/d/1v--9qce7ohsCsk942q17VCp8rBDDsQYDnKfVEQ_leAk/edit?usp=drive_link)

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

## Objetivos
#### Objetivo del ataque
- Personas acomodadas con una vida constituida pero corrompibles.
- Poseen competidores o adversarios que buscan tomar ventaja de la pérdida de su credibilidad y reputación.
- El ataque dará acceso a información de la víctima, pero puede ser llevado a cabo con la "colaboración" de otros, por ejemplo parte de su familia podría contar acceso al sistema de cámaras.
- Se deberá contar con acceso al sistema de video vigilancia para llevar a cabo todo esto de forma coordinada.
- El acceso permitirá conocer sus horarios, hábitos, ingresos y egresos.
- Contar paralelamente con información sensible y/o confidencial con fines de extorsionar a la víctima para su desvinculación, cese de actividades o pago por silenciar el caso.
- Se requerirá de un detective u armado de un engaño hacia la víctima para corromperlo y/o comprometerlo.

### Reconnaissance
- Identificar información de la víctima [Gather Victim Identity Information - T1589](https://attack.mitre.org/techniques/T1589/)
- Recopilar datos de sus redes sociales [Social Media - T1593.001](https://attack.mitre.org/techniques/T1593/001/)
- Recopilar información sobre su operatoria habitual, agenda y movimientos [Identify Business Tempo - T1591.003](https://attack.mitre.org/techniques/T1591/003)
- Identificar los sistemas empleados, ofreciendo un sistema mejor al consorcio u otros usuarios, no necesariamente las víctimas.
- Una vez identificado, puedo buscar vulnerabilidades conocidas. [Vulnerability Scanning - T1595.002](https://attack.mitre.org/techniques/T1595/002/)
- Contactar a la vicitima (o su círculo familiar), informando sobre las fallas (prdrían no ser reales) y buscar su colaboración para validar que el sistema opera normalmente como parte del proceso del ataque.

### Weaponization
- Denegación de servicios con finalidad de evitar que el sistema opere y dar inicio al ataque. [Network Denial of service - T1498](https://attack.mitre.org/techniques/T1498/)
- Al ser un sistema con acceso web, se debe buscar suplantar a un usuario legitimo.
- DEBO Obtener sus credenciales. 
- PUEDO Intentar usar credenciales por defecto. [Default Accounts - T1078.001](https://attack.mitre.org/techniques/T1078/001/)
- DEBO Contactar a la víctima simulando ser personal de soporte o ventas, para obtener datos personales. [Password Guessing T1110.001](https://attack.mitre.org/techniques/T1110/001/)
- PUEDO Conseguir acceso físico autorizado por la víctima para instalar micrófonos o cámara propia, de forma oculta, o reemplazar un equipo por otro adulterado(o que operen por fuera del sistema a vulnerar) [Hardware Additions - T1200](https://attack.mitre.org/techniques/T1200/). 
- DECIDO Armar un correo para calificar la atención y enviarlo a un sitio réplica del sistema legitimo con login.
- DECIDO Enviar la encuesta falsa sobre la satisfacción del soporte, la encuesta debe obligar al usuario a acceder a un sistema copia del legitimo. [Acquire Ingraestructure: Server - T1583.004](https://attack.mitre.org/techniques/T1583/004/)

### Delivery
- Envió de correo falso para calificar el servicio, el cual contendrá un link malicioso. [Phishing - T1556](https://attack.mitre.org/techniques/T1566/)  
- Se espera que el usuario acceda al link del sistema simulado, luego de loguearse, dicho sistema presentará la encuesta, al enviarla se redirigirá al sitio real. [Spearphishing Link - T1566.002](https://attack.mitre.org/techniques/T1566/002/) 

### Exploit
- PUEDO usar ingeniería social, ganar acceso con consentimiento simulando ser parte de la empresa que brinda soporte del sistema domótico, mediante fallas introducidas al sistema por las Denegaciones de servicio (DoS) efectuadas.
- DECIDO aguardar a que el usuario ingresé al sitio falso y se retengan sus credenciales. [User Execution]() [Malicious Link - T1204.001](https://attack.mitre.org/techniques/T1204/001/)

### Installation
- Obtengo las credenciales. [Valid Accounts - T1078](https://attack.mitre.org/techniques/T1078/) 
- Si no puedo agregar o configurar cámaras, puedo intentar escalar privilegios.[Abuse Elevation Control Mechanism - T1548](https://attack.mitre.org/techniques/T1548/)
- Si ganará permisos en el sistema prdría introducir algún ejecutable mediante inyección. [Compromise Software Supply Chain - T1195.002](https://attack.mitre.org/techniques/T1195/002/)

### Command & Control
- Tener el acceso a cámaras.
- Si hubiera podido introducir un ejecutable, intentaría efectuar una comunicación reversa desde el sistema para acceder al mismo. [Bidirectional Communication - T1102.003](https://attack.mitre.org/techniques/T1102/003/) -  [One-Way Communication - T1481.003](https://attack.mitre.org/techniques/T1481/003/)

### Actions on Objectives
- Extraer la información audiovisual, recopilarla y prepararla según el plan, dejando en evidencia que la víctima era realmente y lograr el no repudio. [Video Capture - T1125](https://attack.mitre.org/techniques/T1125/)