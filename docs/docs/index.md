# Proyecto Comercializadora AIS

&ensp; Este proyecto consiste en el desarrollo de un mini ERP utilizando Django para el backend y React para el frontend. El sistema está diseñado para gestionar varios módulos que complementan al ERP principal, brindando soluciones específicas para áreas clave de la empresa, como compras, inventarios y pedidos. Cada módulo interactúa con el resto del sistema de manera eficiente, proporcionando una experiencia de usuario fluida. Django se encarga de la lógica de negocio, gestión de bases de datos y autenticación, mientras que React se utiliza para crear interfaces dinámicas y reactivas que permiten a los usuarios interactuar fácilmente con el sistema. El objetivo es ofrecer una solución integral y escalable que mejore la gestión de los procesos internos de la organización.

- Se utilizó solo el localStorage como almacenaje de tokens y datos del usuario, ya que es un proyecto privado, por lo que utilizar cookies como http-only no resulta necesario. Además, se ocupa JWT con su libreria Simple-JWT.
- La Api se creó con Dango Rest Framework
- Como base de datos se utilizó MySQL en vez de SQLite, para hacer un proyecto un poco más robusto.
- El manejo de los datos de usuario se hace mediante redux en React, con la librería Redux Tool Kit.