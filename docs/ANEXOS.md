# Anexos - ActivSena

## 📋 Tabla de Contenidos

- [Diagramas de Flujo](#diagramas-de-flujo)
- [Diagramas de Casos de Uso](#diagramas-de-casos-de-uso)
- [Diagramas de Secuencia](#diagramas-de-secuencia)
- [Modelo de Base de Datos](#modelo-de-base-de-datos)
- [Roadmap y Mejoras Futuras](#roadmap-y-mejoras-futuras)
- [Glosario de Términos](#glosario-de-términos)
- [Créditos y Equipo](#créditos-y-equipo)

---

## 📊 Diagramas de Flujo

### 1. Flujo de Registro de Usuario

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO: Usuario nuevo                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Accede a la página de  │
            │      registro          │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Completa formulario:   │
            │ - Identificación       │
            │ - Nombre, Apellido     │
            │ - Correo, Teléfono     │
            │ - Contraseña           │
            │ - Ficha, Programa      │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ ¿Datos válidos?        │
            └────┬──────────────┬────┘
                 │ NO           │ SÍ
                 ▼              ▼
        ┌─────────────┐  ┌──────────────────┐
        │ Mostrar     │  │ Crear usuario    │
        │ errores     │  │ en BD            │
        └─────┬───────┘  └────────┬─────────┘
              │                   │
              │                   ▼
              │          ┌──────────────────┐
              │          │ Generar token    │
              │          │ de 6 dígitos     │
              │          └────────┬─────────┘
              │                   │
              │                   ▼
              │          ┌──────────────────┐
              │          │ Enviar email con │
              │          │ token            │
              │          └────────┬─────────┘
              │                   │
              │                   ▼
              │          ┌──────────────────┐
              │          │ Redirigir a      │
              │          │ verificación     │
              │          └────────┬─────────┘
              │                   │
              └───────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Usuario ingresa token  │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ ¿Token correcto?       │
            └────┬──────────────┬────┘
                 │ NO           │ SÍ
                 ▼              ▼
        ┌─────────────┐  ┌──────────────────┐
        │ Error:      │  │ Marcar cuenta    │
        │ Token       │  │ como confirmada  │
        │ inválido    │  └────────┬─────────┘
        └─────────────┘           │
                                  ▼
                         ┌──────────────────┐
                         │ Redirigir a      │
                         │ login            │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ FIN: Cuenta      │
                         │ activada         │
                         └──────────────────┘
```

---

### 2. Flujo de Inicio de Sesión

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIO: Login                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Usuario ingresa:       │
            │ - Correo               │
            │ - Contraseña           │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Buscar usuario por     │
            │ correo en BD           │
            └────┬──────────────┬────┘
                 │              │
            NO   │              │ SÍ
                 ▼              ▼
        ┌─────────────┐  ┌──────────────────┐
        │ Error:      │  │ ¿Cuenta          │
        │ Usuario no  │  │ confirmada?      │
        │ existe      │  └────┬────────┬────┘
        └─────────────┘       │ NO     │ SÍ
                              ▼        ▼
                     ┌─────────────┐  ┌──────────────┐
                     │ Error:      │  │ Verificar    │
                     │ Confirma tu │  │ contraseña   │
                     │ cuenta      │  │ con bcrypt   │
                     └─────────────┘  └────┬────┬────┘
                                           │ NO │ SÍ
                                           ▼    ▼
                                  ┌─────────────┐  ┌──────────────┐
                                  │ Error:      │  │ Generar JWT  │
                                  │ Contraseña  │  │ token        │
                                  │ incorrecta  │  └────┬─────────┘
                                  └─────────────┘       │
                                                        ▼
                                               ┌──────────────────┐
                                               │ Enviar token +   │
                                               │ datos usuario    │
                                               └────────┬─────────┘
                                                        │
                                                        ▼
                                               ┌──────────────────┐
                                               │ Guardar token en │
                                               │ localStorage     │
                                               └────────┬─────────┘
                                                        │
                                                        ▼
                                               ┌──────────────────┐
                                               │ ¿Rol usuario?    │
                                               └────┬────┬────┬───┘
                                                    │    │    │
                                          Admin     │    │    │ Aprendiz
                                                    ▼    ▼    ▼
                                            ┌────────┐ ┌────────┐ ┌────────┐
                                            │ Redir. │ │ Redir. │ │ Redir. │
                                            │ /dash  │ │/dashin │ │/dashap │
                                            └────────┘ └────────┘ └────────┘
                                                    │    │    │
                                                    └────┴────┘
                                                         │
                                                         ▼
                                                ┌──────────────────┐
                                                │ FIN: Sesión      │
                                                │ iniciada         │
                                                └──────────────────┘
```

---

### 3. Flujo de Registro de Asistencia con QR

```
┌─────────────────────────────────────────────────────────────┐
│         INICIO: Registrar asistencia                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Aprendiz abre la app   │
            │ en su celular          │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Va a "Asistencia" >    │
            │ "Escanear QR"          │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Permite acceso a       │
            │ cámara                 │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Instructor muestra QR  │
            │ en pantalla            │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Aprendiz escanea QR    │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Decodificar QR:        │
            │ {                      │
            │   IdActividad: 5,      │
            │   tipo: "entrada"      │
            │ }                      │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Enviar petición POST:  │
            │ /api/asistencia/       │
            │ registrar              │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Backend valida:        │
            │ - Usuario autenticado  │
            │ - Actividad existe     │
            │ - Horario correcto     │
            └────┬──────────────┬────┘
                 │ NO           │ SÍ
                 ▼              ▼
        ┌─────────────┐  ┌──────────────────┐
        │ Error:      │  │ ¿Ya registró     │
        │ No válido   │  │ entrada?         │
        └─────────────┘  └────┬────────┬────┘
                              │ SÍ     │ NO
                              ▼        ▼
                     ┌─────────────┐  ┌──────────────┐
                     │ ¿Es salida? │  │ Crear registro│
                     └────┬────┬───┘  │ asistencia   │
                          │ NO │ SÍ   │ con entrada  │
                          ▼    ▼      └────┬─────────┘
                 ┌─────────┐ ┌──────────┐  │
                 │ Error:  │ │Actualizar│  │
                 │ Ya      │ │hora      │  │
                 │registró │ │salida    │  │
                 └─────────┘ └────┬─────┘  │
                                  │        │
                                  └────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Enviar notif.    │
                              │ Socket.IO        │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Mostrar mensaje: │
                              │ "Asistencia      │
                              │ registrada ✅"   │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ FIN: Asistencia  │
                              │ guardada en BD   │
                              └──────────────────┘
```

---

### 4. Flujo de Solicitud de Apoyo de Sostenimiento

```
┌─────────────────────────────────────────────────────────────┐
│         INICIO: Solicitar apoyo                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Aprendiz va a          │
            │ "Apoyo Sostenimiento"  │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Clic en "Nueva         │
            │ Solicitud"             │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ Completa formulario:   │
            │ - Tipo (Transporte,    │
            │   Alimentación, etc.)  │
            │ - Descripción          │
            │ - Monto                │
            │ - Comprobante (PDF)    │
            └────────────┬───────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │ ¿Datos válidos?        │
            └────┬──────────────┬────┘
                 │ NO           │ SÍ
                 ▼              ▼
        ┌─────────────┐  ┌──────────────────┐
        │ Mostrar     │  │ Subir comprobante│
        │ errores     │  │ a Cloudinary     │
        └─────────────┘  └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Crear solicitud  │
                         │ en BD con estado │
                         │ "Pendiente"      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Enviar notif. a  │
                         │ administradores  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Enviar email de  │
                         │ confirmación     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Mostrar mensaje: │
                         │ "Solicitud       │
                         │ enviada ✅"      │
                         └────────┬─────────┘
                                  │
                                  ▼
                ┌─────────────────────────────────┐
                │ ESPERA: Admin revisa solicitud  │
                └────────┬───────────────────┬────┘
                         │                   │
                    Aprueba              Rechaza
                         │                   │
                         ▼                   ▼
              ┌──────────────────┐  ┌──────────────────┐
              │ Actualizar estado│  │ Actualizar estado│
              │ a "Aprobada"     │  │ a "Rechazada"    │
              └────────┬─────────┘  └────────┬─────────┘
                       │                     │
                       └─────────┬───────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ Enviar notif. +  │
                        │ email a aprendiz │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ Aprendiz ve      │
                        │ resultado en     │
                        │ "Mis Solicitudes"│
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ FIN: Proceso     │
                        │ completado       │
                        └──────────────────┘
```

---

## 🎭 Diagramas de Casos de Uso

### 1. Casos de Uso - Aprendiz

```
                    ┌─────────────────────────────────┐
                    │         APRENDIZ                │
                    └────────────┬────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
    ┌───────────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Registrarse en    │ │ Iniciar      │ │ Ver perfil   │
    │ el sistema        │ │ sesión       │ │              │
    └───────────────────┘ └──────────────┘ └──────────────┘
                │
                ▼
    ┌───────────────────────────────────────────────────────┐
    │                FUNCIONALIDADES                        │
    └───────────────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────┬───────────┐
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Ver     │ │Registrar│ │Solicitar│ │Solicitar│ │ Dar     │
│activi-  │ │asisten- │ │apoyo    │ │préstamo │ │feedback │
│dades    │ │cia QR   │ │sosteni- │ │elementos│ │         │
│         │ │         │ │miento   │ │         │ │         │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Inscri-  │ │Ver his- │ │Ver mis  │ │Ver mis  │ │Generar  │
│birse    │ │torial   │ │solici-  │ │présta-  │ │constan- │
│         │ │asisten. │ │tudes    │ │mos      │ │cias     │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│           «include» Autenticación JWT                   │
└─────────────────────────────────────────────────────────┘
```

---

### 2. Casos de Uso - Instructor

```
                    ┌─────────────────────────────────┐
                    │         INSTRUCTOR              │
                    └────────────┬────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
    ┌───────────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Hereda funciones  │ │ Iniciar      │ │ Gestionar    │
    │ de Aprendiz       │ │ sesión       │ │ perfil       │
    └───────────────────┘ └──────────────┘ └──────────────┘
                │
                ▼
    ┌───────────────────────────────────────────────────────┐
    │         FUNCIONALIDADES ADICIONALES                   │
    └───────────────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────┬───────────┐
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Crear   │ │ Editar  │ │Gestionar│ │ Crear   │ │ Ver     │
│activi-  │ │activi-  │ │asisten- │ │feedback │ │reportes │
│dades    │ │dades    │ │cia      │ │         │ │         │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Generar  │ │Eliminar │ │Registrar│ │Ver      │ │Aprobar  │
│QR       │ │activi-  │ │manual   │ │resulta- │ │présta-  │
│entrada/ │ │dades    │ │         │ │dos      │ │mos      │
│salida   │ │         │ │         │ │feedback │ │         │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│           «include» Validación de rol                   │
└─────────────────────────────────────────────────────────┘
```

---

### 3. Casos de Uso - Administrador

```
                    ┌─────────────────────────────────┐
                    │       ADMINISTRADOR             │
                    └────────────┬────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
    ┌───────────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Hereda funciones  │ │ Iniciar      │ │ Acceso total │
    │ de Instructor     │ │ sesión       │ │ al sistema   │
    └───────────────────┘ └──────────────┘ └──────────────┘
                │
                ▼
    ┌───────────────────────────────────────────────────────┐
    │         FUNCIONALIDADES ADMINISTRATIVAS               │
    └───────────────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬───────────┬───────────┐
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Gestionar│ │Gestionar│ │ Aprobar │ │Gestionar│ │ Ver     │
│usuarios │ │eventos  │ │solici-  │ │catálogo │ │estadís- │
│         │ │         │ │tudes    │ │elementos│ │ticas    │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Crear    │ │Crear    │ │Rechazar │ │Agregar  │ │Análisis │
│usuarios │ │eventos  │ │solici-  │ │elementos│ │con IA   │
│         │ │         │ │tudes    │ │         │ │         │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Editar   │ │Editar   │ │Enviar   │ │Editar   │ │Exportar │
│usuarios │ │eventos  │ │notifica-│ │elementos│ │reportes │
│         │ │         │ │ciones   │ │         │ │         │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Eliminar │ │Eliminar │ │Ver his- │ │Eliminar │ │Config.  │
│usuarios │ │eventos  │ │torial   │ │elementos│ │sistema  │
│         │ │         │ │completo │ │         │ │         │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Cambiar  │ │Asignar  │ │         │ │         │ │         │
│roles    │ │activi-  │ │         │ │         │ │         │
│         │ │dades    │ │         │ │         │ │         │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│      «include» Autorización nivel administrador        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Diagramas de Secuencia

### 1. Secuencia: Registro de Asistencia con QR

```
Aprendiz    Frontend    Backend    Base de Datos    Socket.IO
   │           │           │              │             │
   │ Escanea QR│           │              │             │
   ├──────────>│           │              │             │
   │           │           │              │             │
   │           │ POST /api/asistencia/registrar        │
   │           ├──────────>│              │             │
   │           │           │              │             │
   │           │           │ Validar JWT  │             │
   │           │           ├──────────────┤             │
   │           │           │<─────────────┤             │
   │           │           │              │             │
   │           │           │ Buscar actividad           │
   │           │           ├─────────────>│             │
   │           │           │<─────────────┤             │
   │           │           │              │             │
   │           │           │ Verificar horario          │
   │           │           ├──────────────┤             │
   │           │           │              │             │
   │           │           │ Crear/actualizar asistencia│
   │           │           ├─────────────>│             │
   │           │           │<─────────────┤             │
   │           │           │              │             │
   │           │           │ Emitir notificación        │
   │           │           ├────────────────────────────>│
   │           │           │              │             │
   │           │<──────────┤              │             │
   │           │ 200 OK    │              │             │
   │<──────────┤           │              │             │
   │ "Asistencia registrada"              │             │
   │           │           │              │             │
   │           │<─────────────────────────────────────────┤
   │           │ Notificación en tiempo real              │
   │<──────────┤           │              │             │
   │ Toast: ✅ │           │              │             │
```

---

### 2. Secuencia: Creación de Actividad

```
Instructor  Frontend    Backend    Cloudinary    Base de Datos    QRCode
   │           │           │            │              │             │
   │ Completa  │           │            │              │             │
   │ formulario│           │            │              │             │
   ├──────────>│           │            │              │             │
   │           │           │            │              │             │
   │           │ POST /api/actividad (FormData)        │             │
   │           ├──────────>│            │              │             │
   │           │           │            │              │             │
   │           │           │ Validar JWT│              │             │
   │           │           ├────────────┤              │             │
   │           │           │            │              │             │
   │           │           │ Subir imagen              │             │
   │           │           ├───────────>│              │             │
   │           │           │<───────────┤              │             │
   │           │           │ URL imagen │              │             │
   │           │           │            │              │             │
   │           │           │ Crear actividad en BD     │             │
   │           │           ├──────────────────────────>│             │
   │           │           │<──────────────────────────┤             │
   │           │           │ Actividad creada          │             │
   │           │           │            │              │             │
   │           │           │ Generar QR entrada        │             │
   │           │           ├────────────────────────────────────────>│
   │           │           │<────────────────────────────────────────┤
   │           │           │ QR entrada │              │             │
   │           │           │            │              │             │
   │           │           │ Generar QR salida         │             │
   │           │           ├────────────────────────────────────────>│
   │           │           │<────────────────────────────────────────┤
   │           │           │ QR salida  │              │             │
   │           │           │            │              │             │
   │           │           │ Actualizar actividad con QRs            │
   │           │           ├──────────────────────────>│             │
   │           │           │<──────────────────────────┤             │
   │           │           │            │              │             │
   │           │<──────────┤            │              │             │
   │           │ 201 Created            │              │             │
   │<──────────┤           │            │              │             │
   │ "Actividad creada exitosamente"    │              │             │
```

---

## 🗄️ Modelo de Base de Datos

### Diagrama Entidad-Relación Completo

```
┌─────────────────┐
│   RolUsuario    │
│─────────────────│
│ IdRol (PK)      │
│ NombreRol       │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────▼────────────────────────────────────────────┐
│                    Usuario                          │
│─────────────────────────────────────────────────────│
│ IdUsuario (PK)                                      │
│ IdRol (FK) ───────────────────────────────────────┐ │
│ IdentificacionUsuario                             │ │
│ Nombre                                            │ │
│ Apellido                                          │ │
│ Correo (UNIQUE)                                   │ │
│ Telefono                                          │ │
│ Contrasena (HASHED)                               │ │
│ FechaRegistro                                     │ │
│ token                                             │ │
│ confirmed (BOOLEAN)                               │ │
│ FotoPerfil                                        │ │
└────┬────────────┬────────────┬─────────────────────┘ │
     │ 1          │ 1          │ 1                     │
     │            │            │                       │
     │ 1          │ N          │ N                     │
┌────▼─────┐ ┌───▼──────┐ ┌───▼──────────┐            │
│ Aprendiz │ │Actividad │ │SolicitudApoyo│            │
│──────────│ │──────────│ │──────────────│            │
│IdAprendiz│ │IdActivi- │ │IdSolicitud   │            │
│  (PK)    │ │  dad(PK) │ │   (PK)       │            │
│IdUsuario │ │NombreActi│ │IdUsuario(FK) │            │
│  (FK)    │ │FechaIni  │ │TipoSolicitud │            │
│Ficha     │ │FechaFin  │ │Descripcion   │            │
│Programa  │ │HoraIni   │ │Estado        │            │
│Formacion │ │HoraFin   │ │FechaSolicitud│            │
│Jornada   │ │TipoLudica│ │Monto         │            │
└──────────┘ │Descripcion│ │Comprobante  │            │
             │Imagen    │ └──────────────┘            │
             │Ubicacion │                             │
             │CodigoQR  │                             │
             │CodigoQR  │                             │
             │  Salida  │                             │
             │IdEvento  │                             │
             │  (FK)    │                             │
             │IdUsuario │                             │
             │  (FK)    │                             │
             └────┬─────┘                             │
                  │ N                                 │
                  │                                   │
                  │ 1                                 │
             ┌────▼─────────────┐                     │
             │      Evento      │                     │
             │──────────────────│                     │
             │ IdEvento (PK)    │                     │
             │ NombreEvento     │                     │
             │ FechaInicio      │                     │
             │ FechaFin         │                     │
             │ HoraInicio       │                     │
             │ HoraFin          │                     │
             │ UbicacionEvento  │                     │
             │ DescripcionEvento│                     │
             │ IdPlanificarE(FK)│                     │
             │ IdUsuario (FK) ──┼─────────────────────┘
             │ QREntrada        │
             │ QRSalida         │
             └──────────────────┘

┌────────────────────────────────────────────────────────┐
│                    Asistencia                          │
│────────────────────────────────────────────────────────│
│ IdAsistencia (PK)                                      │
│ IdUsuario (FK) ──────────> Usuario                     │
│ IdActividad (FK) ────────> Actividad                   │
│ FechaAsistencia                                        │
│ HoraEntrada                                            │
│ HoraSalida                                             │
│ Estado (Presente/Ausente/Tardanza)                     │
│ TipoQR (entrada/salida)                                │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                    Feedback                            │
│────────────────────────────────────────────────────────│
│ IdFeedback (PK)                                        │
│ IdActividad (FK) ────────> Actividad                   │
│ Pregunta                                               │
│ TipoRespuesta (texto/calificacion/multiple)            │
└────────┬───────────────────────────────────────────────┘
         │ 1
         │
         │ N
┌────────▼───────────────────────────────────────────────┐
│              RelUsuarioFeedback                        │
│────────────────────────────────────────────────────────│
│ IdRelacion (PK)                                        │
│ IdUsuario (FK) ──────────> Usuario                     │
│ IdFeedback (FK) ─────────> Feedback                    │
│ Respuesta                                              │
│ FechaRespuesta                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                    Elemento                            │
│────────────────────────────────────────────────────────│
│ IdElemento (PK)                                        │
│ NombreElemento                                         │
│ Descripcion                                            │
│ CantidadDisponible                                     │
│ Imagen                                                 │
│ Estado (Disponible/Prestado/Mantenimiento)             │
└────────┬───────────────────────────────────────────────┘
         │ 1
         │
         │ N
┌────────▼───────────────────────────────────────────────┐
│              PrestamoElementos                         │
│────────────────────────────────────────────────────────│
│ IdAlquiler (PK)                                        │
│ IdUsuario (FK) ──────────> Usuario                     │
│ IdElemento (FK) ─────────> Elemento                    │
│ NombreElemento                                         │
│ CantidadDisponible                                     │
│ FechaSolicitud                                         │
│ FechaDevolucion                                        │
│ RegistradoPor                                          │
│ Observaciones                                          │
│ CumplioConEntrega (BOOLEAN)                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                 Notificaciones                         │
│────────────────────────────────────────────────────────│
│ IdNotificacion (PK)                                    │
│ IdUsuario (FK) ──────────> Usuario                     │
│ Mensaje                                                │
│ Tipo (info/warning/success/error)                      │
│ Leida (BOOLEAN)                                        │
│ FechaCreacion                                          │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   Constancia                           │
│────────────────────────────────────────────────────────│
│ IdConstancia (PK)                                      │
│ IdUsuario (FK) ──────────> Usuario                     │
│ IdActividad (FK) ────────> Actividad                   │
│ FechaEmision                                           │
│ TipoConstancia                                         │
│ ArchivoURL                                             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                  ConsultaIA                            │
│────────────────────────────────────────────────────────│
│ IdConsulta (PK)                                        │
│ IdUsuario (FK) ──────────> Usuario                     │
│ Pregunta                                               │
│ Respuesta                                              │
│ FechaConsulta                                          │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│              PerfilInstructor                          │
│────────────────────────────────────────────────────────│
│ id (PK)                                                │
│ UsuarioId (FK) ──────────> Usuario                     │
│ profesion                                              │
│ ubicacion                                              │
│ imagen                                                 │
│ imagenUbicacion                                        │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Roadmap y Mejoras Futuras

### Versión 1.1 (Corto Plazo - 3 meses)

- [ ] **App móvil nativa** (React Native)
  - Notificaciones push nativas
  - Mejor rendimiento en dispositivos móviles
  - Modo offline

- [ ] **Mejoras en IA**
  - Predicción de asistencia
  - Recomendación personalizada de actividades
  - Detección automática de tendencias

- [ ] **Gamificación**
  - Sistema de puntos por participación
  - Insignias y logros
  - Ranking de aprendices más activos
  - Recompensas virtuales

- [ ] **Integración con calendario**
  - Sincronización con Google Calendar
  - Sincronización con Outlook
  - Recordatorios automáticos

### Versión 1.2 (Mediano Plazo - 6 meses)

- [ ] **Módulo de encuestas**
  - Encuestas de satisfacción
  - Encuestas de clima organizacional
  - Análisis automático de resultados

- [ ] **Sistema de mensajería**
  - Chat entre usuarios
  - Grupos de actividades
  - Mensajes directos instructor-aprendiz

- [ ] **Reportes avanzados**
  - Dashboard personalizable
  - Exportación a múltiples formatos
  - Gráficos interactivos avanzados

- [ ] **Integración con redes sociales**
  - Compartir actividades en redes
  - Login con Google/Facebook
  - Galería de fotos de eventos

### Versión 2.0 (Largo Plazo - 12 meses)

- [ ] **Módulo de evaluación**
  - Evaluaciones de desempeño
  - Autoevaluaciones
  - Evaluación 360°

- [ ] **Inteligencia Artificial avanzada**
  - Chatbot con procesamiento de lenguaje natural mejorado
  - Análisis predictivo de deserción
  - Recomendaciones automáticas de mejora

- [ ] **Realidad Aumentada**
  - Escaneo de QR con AR
  - Tours virtuales de instalaciones
  - Juegos educativos con AR

- [ ] **Blockchain**
  - Certificados verificables en blockchain
  - Historial inmutable de asistencias
  - Tokens de recompensa

### Mejoras Técnicas Continuas

- [ ] Optimización de rendimiento
- [ ] Mejora de accesibilidad (WCAG 2.1)
- [ ] Soporte multiidioma (inglés, francés)
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados (unit, integration, e2e)
- [ ] CI/CD pipeline
- [ ] Monitoreo y logging avanzado
- [ ] Backup automático diario

---

## 📖 Glosario de Términos

### Términos Técnicos

| Término | Definición |
|---------|------------|
| **API** | Application Programming Interface - Interfaz de comunicación entre frontend y backend |
| **JWT** | JSON Web Token - Token de autenticación encriptado |
| **QR** | Quick Response - Código de barras bidimensional |
| **ORM** | Object-Relational Mapping - Sequelize en este caso |
| **CRUD** | Create, Read, Update, Delete - Operaciones básicas de base de datos |
| **REST** | Representational State Transfer - Arquitectura de API |
| **WebSocket** | Protocolo de comunicación bidireccional en tiempo real |
| **Hash** | Función criptográfica unidireccional (bcrypt) |
| **Middleware** | Función que se ejecuta entre la petición y la respuesta |
| **Context API** | Sistema de gestión de estado global en React |
| **TypeScript** | Superset de JavaScript con tipado estático |
| **Vite** | Build tool moderno para desarrollo frontend |

### Términos del Dominio

| Término | Definición |
|---------|------------|
| **Actividad Lúdica** | Actividad recreativa, deportiva o cultural para aprendices |
| **Apoyo de Sostenimiento** | Ayuda económica para transporte, alimentación, etc. |
| **Ficha** | Número de identificación del grupo de formación |
| **Programa de Formación** | Carrera técnica o tecnológica (ej: ADSI, Enfermería) |
| **Jornada** | Horario de clases (Mañana, Tarde, Noche) |
| **Constancia** | Certificado de participación en actividades |
| **Feedback** | Retroalimentación sobre una actividad |
| **Préstamo de Elementos** | Solicitud de material deportivo o cultural |
| **Instructor** | Docente del SENA |
| **Aprendiz** | Estudiante del SENA |
| **Bienestar al Aprendiz** | Área encargada de actividades lúdicas |

---

## 👥 Créditos y Equipo

### Equipo de Desarrollo

**Desarrollador Principal**
- **Alex** - Full Stack Developer
  - Arquitectura del sistema
  - Desarrollo backend (Node.js + TypeScript)
  - Desarrollo frontend (React + TypeScript)
  - Integración de servicios
  - Documentación técnica

### Tecnologías y Librerías

Agradecimientos especiales a los creadores y mantenedores de:

**Backend:**
- Node.js Team
- Express.js Team
- Sequelize Team
- Socket.IO Team
- Google Dialogflow Team
- Cloudinary Team

**Frontend:**
- React Team
- Vite Team
- TailwindCSS Team
- Framer Motion Team
- Recharts Team

### Institución

**SENA - Servicio Nacional de Aprendizaje**
- Colombia

**Área de Bienestar al Aprendiz**
- Coordinación de actividades lúdicas
- Apoyo institucional

### Agradecimientos

- Instructores que participaron en las pruebas
- Aprendices que brindaron feedback
- Coordinación académica por el apoyo
- Comunidad open source por las herramientas

### Licencia

Este proyecto está bajo la licencia **ISC**.

```
Copyright (c) 2024 ActivSena Team

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

### Contacto

**Repositorio GitHub:**  
https://github.com/ALexjh117/Activsenafinalstack

**Email de soporte:**  
activsena@sena.edu.co

**Documentación:**  
https://github.com/ALexjh117/Activsenafinalstack/tree/main/docs

---

## 📊 Estadísticas del Proyecto

### Líneas de Código

| Componente | Archivos | Líneas de Código |
|------------|----------|------------------|
| Backend | ~80 archivos | ~15,000 líneas |
| Frontend | ~150 archivos | ~20,000 líneas |
| Base de Datos | 24 tablas | ~500 líneas SQL |
| Documentación | 6 archivos | ~5,000 líneas |
| **Total** | **~260 archivos** | **~40,500 líneas** |

### Funcionalidades

- ✅ 30+ endpoints de API REST
- ✅ 24 modelos de base de datos
- ✅ 40+ páginas frontend
- ✅ 3 roles de usuario
- ✅ Autenticación JWT
- ✅ WebSockets en tiempo real
- ✅ Integración con IA (Dialogflow + Python)
- ✅ Generación de QR
- ✅ Generación de PDFs
- ✅ Almacenamiento en la nube (Cloudinary)
- ✅ Envío de emails
- ✅ Tareas programadas (cron jobs)
- ✅ Análisis de sentimientos
- ✅ Sistema de notificaciones
- ✅ Responsive design

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0
