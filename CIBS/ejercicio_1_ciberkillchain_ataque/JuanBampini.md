# Ejercicio CiberKillChain - Ataque

 * Juan Carlos Bampini Basualdo
 * Diseñar arquitectura, e implementar solucion para edificios (smart building), que permita interactuar con
 equipos domoticos como luminaria, riego y temeperatura, como tambien poder interactuar desde una app para reservar
 amenities
 * Resolucion

## Enunciado

Armar una cyberkillchain usando técnicas de la matriz de Att&ck para un escenario relacionado al trabajo práctico de la carrera.

### Objetivos

Objetivo del ataque

Perfil de la victima:
- Personas adineradas con una vida constituida pero corrompibles.
- Poseen competidores o adversarios que buscan tomar ventaja de la perdida de credibilidad y reputacion.
- El ataque dara acceso a informacion de la victima, pero puede ser llevado a cabo con la "colaboracion" de otros, ejemplo parte de su familia podria contar acceso al sistema de camaras.

Algunas consideraciones: 
* Denegacion de servicios con finalidad de evitar que el sistema opere y dar inicio
* Ingenieria social, ganar acceso con consentimiento simulando ser parte de la empresa que brinda soporte al sistema domotico, mediante fallas introducidas al sistema por las Denegaciones de servicio (DoS). 
* Acceder a los sistemas de video vigilancia con potencialidad de ser victimas potenciales de extorsion, para conocer sus movimientos, ingresos y egresos. 
* Contar paralelamente con informacion sensible y/o confidencial con fines de extorsionar a la victima para su desvinculacion, cese de actividades o pago por silenciar el caso, un detective u armado de un engaño hacia la victima, en especial.
* Contactar a los objetivos informando sobre las fallas (introducidas) y buscando su colaboracion como parte del proceso.
* Enviar encuestas falsas sobre la satisfaccion del soporte, la encuensta podria ser parte de un sistema copia del legitimo.
* Contar con acceso al sistema de video vigilancia para llevar a cabo todo de forma coordinada

Reconnaissance
- Identificar informacion de la/s victima/s (Gather Victim Identity Information)
- Redes sociales (Social Media)
- Identificar sistemas empleados.
- PUEDO buscar vulnerabilidades conocidas (Vulnerability Scanning)
- En muchas ocasiones una misma persona reutiliza usuarios, claves o datos similares en distintos sistemas.

* Weaponization
- Puedo indagar sobre el sistema empleado ofreciendo un sistema mejor.
- Como es un sistema con acceso web, se debe buscar suplantar a un usuario legitimo.
- DEBO Obtener sus credenciales. 
- PUEDO Intentar usar credenciales por defecto (Default Accounts)
- PUEDO Contactar simulando ser personal de soporte o ventas, para obtener datos personales.
- PUEDO Conseguir acceso fisico autorizado por la victima para instalar microfonos o camara propia. 

* Delivery
- (Phishing) envio de correo falso 
- (Spearphishing Link) acceso a link simulando ser el sistema real y dar un mensaje que el sistema estara fuera de servicio y redirigirlo al sitio real 


* Exploit
- (User Execution/Malicious Link) aguardar aviso de que el usuario ingreso al sitio falso.
- vulnerabilidades mediante adjunto.


* Installation  
- si tengo credeciales puedo desactivar equipos o desconfigurarlos, ver que capacidades posee asignadas el usuario.
- Si no puedo agregar o configurar camaras, puedo intentar escalar privilegios.(Abuse Elevation Control Mechanism)


* Command & Control
- Acceso a camaras
- Bidirectional Communication/One-Way Communication: efectuar una comunicacion reversa desde el sistema para acceder al mismo.

* Actions on Objectives
- Extraer informacion audiovisual comprometedora o que valide que la victima era realmente y tener el no repudio.
