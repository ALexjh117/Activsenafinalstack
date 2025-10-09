# Documentación Técnica - ActivSena

## Tabla de Contenidos

- [Arquitectura General del Sistema](#arquitectura-general-del-sistema)
- [Estructura del Backend](#estructura-del-backend)
- [Modelos y Entidades](#modelos-y-entidades)
- [Diagrama Entidad-Relación](#diagrama-entidad-relación)
- [Endpoints de la API](#endpoints-de-la-api)
- [Variables de Entorno](#variables-de-entorno)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [WebSockets y Tiempo Real](#websockets-y-tiempo-real)
- [Integración con IA](#integración-con-ia)

---

## Arquitectura General del Sistema

ActivSena sigue una arquitectura **cliente-servidor** con separación clara entre frontend y backend:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │ Services │  │ Context  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS + WebSocket
┌─────────────────────────────────────────────────────────────┐
│                   SERVIDOR (Node.js + Express)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Routes  │→ │Controller│→ │  Models  │→ │   DB     │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │Middleware│  │ Services │  │   Cron   │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    BASE DE DATOS (MySQL)                     │
│              24 Tablas + Relaciones + Índices                │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    SERVICIOS EXTERNOS                        │
│  Cloudinary | Nodemailer | Dialogflow | Python IA          │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Cliente** realiza petición HTTP/HTTPS
2. **Express** recibe la petición y aplica middlewares
3. **Router** dirige a la ruta correspondiente
4. **Middleware** valida autenticación y datos
5. **Controller** ejecuta lógica de negocio
6. **Model** interactúa con la base de datos vía Sequelize
7. **Response** se envía al cliente en formato JSON

---

## Estructura del Backend

### Directorio `/src`

```
src/
├── config/
│   ├── db.ts                    # Configuración Sequelize + MySQL
│   └── limiter.ts               # Rate limiting
│
├── controllers/                 # Lógica de negocio (28 archivos)
│   ├── ActividadController.ts
│   ├── AprendizController.ts
│   ├── AsistenciaController.ts
│   ├── ConstanciaController.ts
│   ├── ConsultaIAController.ts
│   ├── ElementoController.ts
│   ├── EventoController.ts
│   ├── FeedbackController.ts
│   ├── GestionEventoController.ts
│   ├── IAcomentarioController.ts
│   ├── NotificacionesController.ts
│   ├── PerfilInstructorController.ts
│   ├── PrestamoElementosControllers.ts
│   ├── SolicitudApoyoController.ts
│   ├── UsuarioController.ts
│   └── ...
│
├── cron/                        # Tareas programadas
│   ├── LudicaJob.ts            # Actividades lúdicas diarias
│   └── RevisarAsistenciasIncompletas.ts
│
├── emails/                      # Templates de correo
│   └── AuthEmail.ts
│
├── middleware/                  # Middlewares (22 archivos)
│   ├── auth.ts                 # Autenticación JWT
│   ├── authorizeAdmin.ts       # Autorización por rol
│   ├── validation.ts           # Validación de datos
│   ├── uploadConfig.ts         # Configuración Multer
│   └── ...
│
├── models/                      # Modelos Sequelize (24 archivos)
│   ├── Usuario.ts
│   ├── RolUsuario.ts
│   ├── Aprendiz.ts
│   ├── PerfilInstructor.ts
│   ├── Evento.ts
│   ├── Actividad.ts
│   ├── Asistencia.ts
│   ├── Feedback.ts
│   ├── SolicitudApoyo.ts
│   ├── Elemento.ts
│   ├── PrestamoElementos.ts
│   ├── Notificaciones.ts
│   ├── Constancia.ts
│   ├── ConsultaIA.ts
│   └── ...
│
├── routes/                      # Rutas de la API (30 archivos)
│   ├── Usuario.Routes.ts
│   ├── Evento.Routes.ts
│   ├── Actividad.Routes.ts
│   ├── Asistencia.Routes.ts
│   ├── Feedback.Routes.ts
│   └── ...
│
├── services/                    # Servicios auxiliares
│   └── (Lógica de IA, notificaciones)
│
├── utils/                       # Utilidades
│   ├── auth.ts                 # Hash de contraseñas
│   ├── token.ts                # Generación de tokens
│   └── jwt.ts                  # JWT utilities
│
├── types/                       # Tipos TypeScript
│
├── index.ts                     # Punto de entrada + Socket.IO
└── server.ts                    # Configuración Express
```

---

## Modelos y Entidades

### 1. Usuario

**Tabla**: `Usuario`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdUsuario` | INT (PK) | ID único del usuario |
| `IdRol` | INT (FK) | Rol del usuario (1=Admin, 2=Aprendiz, 3=Instructor) |
| `IdentificacionUsuario` | VARCHAR(50) | Documento de identidad |
| `Nombre` | VARCHAR(100) | Nombre del usuario |
| `Apellido` | VARCHAR(100) | Apellido del usuario |
| `Correo` | VARCHAR(255) | Email único |
| `Telefono` | VARCHAR(20) | Número de teléfono |
| `Contrasena` | VARCHAR(255) | Contraseña hasheada (bcrypt) |
| `FechaRegistro` | DATE | Fecha de registro |
| `token` | VARCHAR(6) | Token de verificación |
| `confirmed` | BOOLEAN | Cuenta confirmada |
| `FotoPerfil` | VARCHAR(255) | URL de foto de perfil |

**Relaciones**:
- `BelongsTo` RolUsuario
- `HasOne` Aprendiz
- `HasOne` PerfilInstructor
- `HasMany` Actividad, Asistencia, Constancia, SolicitudApoyo

---

### 2. RolUsuario

**Tabla**: `RolUsuario`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdRol` | INT (PK) | ID del rol |
| `NombreRol` | VARCHAR(50) | Nombre del rol |

**Valores**:
- 1: Administrador
- 2: Aprendiz
- 3: Instructor

---

### 3. Aprendiz

**Tabla**: `Aprendiz`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdAprendiz` | INT (PK) | ID del aprendiz |
| `IdUsuario` | INT (FK) | Referencia a Usuario |
| `Ficha` | VARCHAR(20) | Número de ficha |
| `ProgramaFormacion` | VARCHAR(255) | Programa de formación |
| `Jornada` | VARCHAR(50) | Jornada (Mañana/Tarde/Noche) |

---

### 4. PerfilInstructor

**Tabla**: `PerfilInstructor`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT (PK) | ID del perfil |
| `UsuarioId` | INT (FK) | Referencia a Usuario |
| `profesion` | VARCHAR(255) | Profesión del instructor |
| `ubicacion` | VARCHAR(255) | Ubicación/Oficina |
| `imagen` | TEXT | URL de imagen de perfil |
| `imagenUbicacion` | TEXT | URL de imagen de ubicación |

---

### 5. Evento

**Tabla**: `Evento`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdEvento` | INT (PK) | ID del evento |
| `NombreEvento` | VARCHAR(255) | Nombre del evento |
| `FechaInicio` | DATE | Fecha de inicio |
| `FechaFin` | DATE | Fecha de finalización |
| `HoraInicio` | TIME | Hora de inicio |
| `HoraFin` | TIME | Hora de finalización |
| `UbicacionEvento` | VARCHAR(255) | Ubicación |
| `DescripcionEvento` | TEXT | Descripción |
| `IdPlanificarE` | INT (FK) | Referencia a PlanificacionEvento |
| `IdUsuario` | INT (FK) | Creador del evento |
| `QREntrada` | TEXT | Código QR de entrada |
| `QRSalida` | TEXT | Código QR de salida |

**Relaciones**:
- `HasMany` Actividad
- `BelongsTo` PlanificacionEvento
- `BelongsTo` Usuario (creador)

---

### 6. Actividad

**Tabla**: `Actividad`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdActividad` | INT (PK) | ID de la actividad |
| `NombreActi` | VARCHAR(150) | Nombre de la actividad |
| `FechaInicio` | DATE | Fecha de inicio |
| `FechaFin` | DATE | Fecha de fin |
| `HoraInicio` | TIME | Hora de inicio |
| `HoraFin` | TIME | Hora de fin |
| `TipoLudica` | VARCHAR(255) | Tipo (Recreativa/Deportiva/Cultural) |
| `Descripcion` | TEXT | Descripción |
| `Imagen` | VARCHAR(255) | URL de imagen |
| `Ubicacion` | VARCHAR(150) | Ubicación |
| `CodigoQR` | TEXT | QR de entrada |
| `CodigoQRSalida` | TEXT | QR de salida |
| `IdEvento` | INT (FK) | Evento asociado |
| `IdUsuario` | INT (FK) | Creador |
| `HorarioContinuo` | BOOLEAN | Horario continuo |

---

### 7. Asistencia

**Tabla**: `Asistencia`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdAsistencia` | INT (PK) | ID de asistencia |
| `IdUsuario` | INT (FK) | Usuario que asistió |
| `IdActividad` | INT (FK) | Actividad |
| `FechaAsistencia` | DATE | Fecha de asistencia |
| `HoraEntrada` | TIME | Hora de entrada |
| `HoraSalida` | TIME | Hora de salida |
| `Estado` | VARCHAR(50) | Presente/Ausente/Tardanza |
| `TipoQR` | VARCHAR(20) | entrada/salida |

---

### 8. Feedback

**Tabla**: `Feedback`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdFeedback` | INT (PK) | ID del feedback |
| `IdActividad` | INT (FK) | Actividad evaluada |
| `Pregunta` | TEXT | Pregunta del feedback |
| `TipoRespuesta` | VARCHAR(50) | texto/calificacion/multiple |

---

### 9. SolicitudApoyo

**Tabla**: `SolicitudApoyo`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdSolicitud` | INT (PK) | ID de la solicitud |
| `IdUsuario` | INT (FK) | Usuario solicitante |
| `TipoSolicitud` | VARCHAR(100) | Tipo de apoyo |
| `Descripcion` | TEXT | Descripción |
| `Estado` | VARCHAR(50) | Pendiente/Aprobada/Rechazada |
| `FechaSolicitud` | DATE | Fecha de solicitud |
| `Monto` | DECIMAL(10,2) | Monto solicitado |
| `Comprobante` | VARCHAR(255) | URL del comprobante |

---

### 10. Elemento

**Tabla**: `Elemento`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdElemento` | INT (PK) | ID del elemento |
| `NombreElemento` | VARCHAR(100) | Nombre |
| `Descripcion` | TEXT | Descripción |
| `CantidadDisponible` | INT | Cantidad disponible |
| `Imagen` | VARCHAR(255) | URL de imagen |
| `Estado` | VARCHAR(50) | Disponible/Prestado/Mantenimiento |

---

### 11. PrestamoElementos

**Tabla**: `PrestamoElementos` (AlquilerElementos)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdAlquiler` | INT (PK) | ID del préstamo |
| `IdUsuario` | INT (FK) | Usuario que solicita |
| `IdElemento` | INT (FK) | Elemento prestado |
| `NombreElemento` | VARCHAR(50) | Nombre del elemento |
| `CantidadDisponible` | INT | Cantidad prestada |
| `FechaSolicitud` | DATETIME | Fecha de solicitud |
| `FechaDevolucion` | DATETIME | Fecha de devolución |
| `RegistradoPor` | VARCHAR(50) | Quien registró |
| `Observaciones` | TEXT | Observaciones |
| `CumplioConEntrega` | BOOLEAN | Entregado a tiempo |

---

### 12. Notificaciones

**Tabla**: `Notificaciones`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdNotificacion` | INT (PK) | ID de notificación |
| `IdUsuario` | INT (FK) | Usuario destinatario |
| `Mensaje` | TEXT | Contenido |
| `Tipo` | VARCHAR(50) | info/warning/success/error |
| `Leida` | BOOLEAN | Estado de lectura |
| `FechaCreacion` | DATETIME | Fecha de creación |

---

### 13. Constancia

**Tabla**: `Constancia`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdConstancia` | INT (PK) | ID de constancia |
| `IdUsuario` | INT (FK) | Usuario |
| `IdActividad` | INT (FK) | Actividad |
| `FechaEmision` | DATE | Fecha de emisión |
| `TipoConstancia` | VARCHAR(100) | Tipo |
| `ArchivoURL` | VARCHAR(255) | URL del PDF |

---

### 14. ConsultaIA

**Tabla**: `ConsultaIA`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdConsulta` | INT (PK) | ID de consulta |
| `IdUsuario` | INT (FK) | Usuario |
| `Pregunta` | TEXT | Pregunta realizada |
| `Respuesta` | TEXT | Respuesta de la IA |
| `FechaConsulta` | DATETIME | Fecha |

---

## Diagrama Entidad-Relación

```
┌─────────────┐         ┌──────────────┐
│ RolUsuario  │◄────────│   Usuario    │
│             │ 1     N │              │
└─────────────┘         └──────┬───────┘
                               │ 1
                               │
                    ┌──────────┼──────────┐
                    │ 1        │ 1        │
                    ▼          ▼          ▼
            ┌──────────┐  ┌─────────┐  ┌──────────────┐
            │ Aprendiz │  │Actividad│  │PerfilInstructor│
            └──────────┘  └────┬────┘  └──────────────┘
                               │ N
                               │
                               │ 1
                          ┌────▼─────┐
                          │  Evento  │
                          └────┬─────┘
                               │ 1
                               │
                               │ N
                     ┌─────────┴──────────┐
                     │                    │
                ┌────▼─────┐       ┌─────▼────────┐
                │Asistencia│       │PlanificacionE│
                └──────────┘       └──────────────┘

┌──────────┐         ┌──────────────┐
│ Usuario  │◄────────│SolicitudApoyo│
└────┬─────┘ 1     N └──────────────┘
     │ 1
     │
     │ N
┌────▼──────────┐
│PrestamoElementos│
└────┬──────────┘
     │ N
     │
     │ 1
┌────▼─────┐
│ Elemento │
└──────────┘

┌──────────┐         ┌──────────────┐
│Actividad │◄────────│   Feedback   │
└────┬─────┘ 1     N └──────────────┘
     │ 1                      │ N
     │                        │
     │ N                      │ 1
┌────▼──────────┐    ┌────────▼─────────┐
│RelUsuarioFeedback│  │RelUsuarioFeedback│
└────────────────┘    └──────────────────┘
```

---

## Endpoints de la API

### Autenticación y Usuarios

#### POST `/api/usuario/`
Crear nuevo usuario (registro)

**Request Body**:
```json
{
  "IdentificacionUsuario": "1234567890",
  "Nombre": "Juan",
  "Apellido": "Pérez",
  "Correo": "juan@example.com",
  "Telefono": "3001234567",
  "Contrasena": "password123",
  "FechaRegistro": "2024-01-15",
  "Ficha": "2558963",
  "ProgramaFormacion": "ADSI",
  "Jornada": "Mañana"
}
```

**Response** (201):
```json
{
  "message": "Usuario creado exitosamente. Revisa tu correo para confirmar tu cuenta.",
  "usuario": {
    "IdUsuario": 1,
    "Nombre": "Juan",
    "Correo": "juan@example.com"
  }
}
```

---

#### POST `/api/usuario/login`
Iniciar sesión

**Request Body**:
```json
{
  "Correo": "juan@example.com",
  "Contrasena": "password123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "IdUsuario": 1,
    "Nombre": "Juan",
    "Apellido": "Pérez",
    "Correo": "juan@example.com",
    "IdRol": 2,
    "rol": {
      "NombreRol": "Aprendiz"
    }
  }
}
```

---

#### POST `/api/usuario/confirm-account`
Confirmar cuenta con token

**Request Body**:
```json
{
  "token": "123456"
}
```

---

#### POST `/api/usuario/forgot-password`
Solicitar recuperación de contraseña

**Request Body**:
```json
{
  "Correo": "juan@example.com"
}
```

---

#### POST `/api/usuario/reset-password/:token`
Restablecer contraseña

**Request Body**:
```json
{
  "Contrasena": "newpassword123"
}
```

---

#### GET `/api/usuario/user`
Obtener perfil del usuario autenticado

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "IdUsuario": 1,
  "Nombre": "Juan",
  "Apellido": "Pérez",
  "Correo": "juan@example.com",
  "Telefono": "3001234567",
  "FotoPerfil": "https://...",
  "rol": {
    "NombreRol": "Aprendiz"
  },
  "perfilAprendiz": {
    "Ficha": "2558963",
    "ProgramaFormacion": "ADSI",
    "Jornada": "Mañana"
  }
}
```

---

### Eventos

#### GET `/api/evento`
Obtener todos los eventos

**Response** (200):
```json
[
  {
    "IdEvento": 1,
    "NombreEvento": "Semana Cultural 2024",
    "FechaInicio": "2024-03-01",
    "FechaFin": "2024-03-05",
    "HoraInicio": "08:00:00",
    "HoraFin": "17:00:00",
    "UbicacionEvento": "Auditorio Principal",
    "DescripcionEvento": "Evento cultural anual",
    "QREntrada": "data:image/png;base64,...",
    "QRSalida": "data:image/png;base64,...",
    "actividades": [...]
  }
]
```

---

#### POST `/api/evento`
Crear nuevo evento

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "NombreEvento": "Torneo Deportivo",
  "FechaInicio": "2024-04-10",
  "FechaFin": "2024-04-12",
  "HoraInicio": "09:00:00",
  "HoraFin": "18:00:00",
  "UbicacionEvento": "Cancha Deportiva",
  "DescripcionEvento": "Torneo interficha",
  "IdPlanificarE": 5
}
```

---

### Actividades

#### GET `/api/actividad`
Obtener todas las actividades

**Response** (200):
```json
[
  {
    "IdActividad": 1,
    "NombreActi": "Fútbol Masculino",
    "FechaInicio": "2024-04-10",
    "FechaFin": "2024-04-10",
    "HoraInicio": "09:00:00",
    "HoraFin": "11:00:00",
    "TipoLudica": "Deportiva",
    "Descripcion": "Partido de fútbol",
    "Imagen": "https://...",
    "Ubicacion": "Cancha 1",
    "CodigoQR": "data:image/png;base64,...",
    "IdEvento": 1,
    "IdUsuario": 3
  }
]
```

---

#### POST `/api/actividad`
Crear nueva actividad

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body** (FormData):
```
NombreActi: "Taller de Pintura"
FechaInicio: "2024-05-01"
FechaFin: "2024-05-01"
HoraInicio: "14:00:00"
HoraFin: "16:00:00"
TipoLudica: "Cultural"
Descripcion: "Taller artístico"
Ubicacion: "Sala 201"
IdEvento: 1
imagen: [File]
```

---

### Asistencia

#### POST `/api/asistencia/registrar`
Registrar asistencia mediante QR

**Request Body**:
```json
{
  "IdUsuario": 1,
  "IdActividad": 5,
  "TipoQR": "entrada"
}
```

**Response** (200):
```json
{
  "message": "Asistencia de entrada registrada exitosamente",
  "asistencia": {
    "IdAsistencia": 10,
    "IdUsuario": 1,
    "IdActividad": 5,
    "FechaAsistencia": "2024-03-15",
    "HoraEntrada": "09:05:30",
    "Estado": "Presente"
  }
}
```

---

#### GET `/api/asistencia/usuario/:idUsuario`
Obtener historial de asistencias de un usuario

**Response** (200):
```json
[
  {
    "IdAsistencia": 1,
    "FechaAsistencia": "2024-03-15",
    "HoraEntrada": "09:05:30",
    "HoraSalida": "11:10:00",
    "Estado": "Presente",
    "actividad": {
      "NombreActi": "Fútbol Masculino",
      "TipoLudica": "Deportiva"
    }
  }
]
```

---

### Feedback

#### GET `/api/feedback/actividad/:idActividad`
Obtener preguntas de feedback de una actividad

**Response** (200):
```json
[
  {
    "IdFeedback": 1,
    "Pregunta": "¿Cómo calificarías la organización del evento?",
    "TipoRespuesta": "calificacion"
  },
  {
    "IdFeedback": 2,
    "Pregunta": "¿Qué te pareció la actividad?",
    "TipoRespuesta": "texto"
  }
]
```

---

#### POST `/api/relusuariofeedback`
Enviar respuestas de feedback

**Request Body**:
```json
{
  "IdUsuario": 1,
  "IdFeedback": 1,
  "Respuesta": "5"
}
```

---

### Solicitudes de Apoyo

#### POST `/api/solicitudapoyo`
Crear solicitud de apoyo de sostenimiento

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body**:
```
TipoSolicitud: "Transporte"
Descripcion: "Solicito apoyo para transporte"
Monto: 50000
comprobante: [File]
```

---

#### GET `/api/solicitudapoyo/usuario/:idUsuario`
Obtener solicitudes de un usuario

**Response** (200):
```json
[
  {
    "IdSolicitud": 1,
    "TipoSolicitud": "Transporte",
    "Descripcion": "Solicito apoyo para transporte",
    "Estado": "Pendiente",
    "FechaSolicitud": "2024-03-10",
    "Monto": 50000,
    "Comprobante": "https://..."
  }
]
```

---

#### PUT `/api/solicitudapoyo/:id/estado`
Actualizar estado de solicitud (Admin)

**Request Body**:
```json
{
  "Estado": "Aprobada"
}
```

---

### Elementos y Préstamos

#### GET `/api/elemento`
Obtener catálogo de elementos

**Response** (200):
```json
[
  {
    "IdElemento": 1,
    "NombreElemento": "Balón de Fútbol",
    "Descripcion": "Balón profesional",
    "CantidadDisponible": 5,
    "Imagen": "https://...",
    "Estado": "Disponible"
  }
]
```

---

#### POST `/api/alquilerelementos`
Solicitar préstamo de elemento

**Request Body**:
```json
{
  "IdElemento": 1,
  "CantidadDisponible": 2,
  "FechaSolicitud": "2024-03-20T09:00:00",
  "FechaDevolucion": "2024-03-20T17:00:00",
  "Observaciones": "Para partido de fútbol"
}
```

---

### Notificaciones

#### GET `/api/notificaciones/usuario/:idUsuario`
Obtener notificaciones de un usuario

**Response** (200):
```json
[
  {
    "IdNotificacion": 1,
    "Mensaje": "Tu solicitud ha sido aprobada",
    "Tipo": "success",
    "Leida": false,
    "FechaCreacion": "2024-03-15T10:30:00"
  }
]
```

---

#### PUT `/api/notificaciones/:id/leer`
Marcar notificación como leída

---

### Consultas IA

#### POST `/api/consultaia`
Realizar consulta al chatbot

**Request Body**:
```json
{
  "Pregunta": "¿Cómo puedo inscribirme a una actividad?"
}
```

**Response** (200):
```json
{
  "Respuesta": "Para inscribirte a una actividad, ve al calendario de eventos..."
}
```

---

### Análisis IA

#### GET `/api/analisisia/actividad/:idActividad`
Obtener análisis de IA de una actividad

**Response** (200):
```json
{
  "analisis": {
    "sentimiento": "positivo",
    "participacion": "alta",
    "recomendaciones": [...]
  }
}
```

---

## Variables de Entorno

El archivo `.env` debe contener:

```env
# Base de datos
DB_NAME=activsena
DB_USER=root
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306

# JWT
JWT_SECRET=clave_secreta_muy_segura_2024

# Email
EMAIL_USER=activsena@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnop

# Dialogflow
GOOGLE_APPLICATION_CREDENTIALS=./IA/credentials.json
DIALOGFLOW_PROJECT_ID=activsena-chatbot

# Servidor
PORT=3002
NODE_ENV=development
```

---

## Autenticación y Seguridad

### JWT (JSON Web Tokens)

ActivSena utiliza JWT para autenticación stateless.

**Flujo de autenticación**:

1. Usuario envía credenciales a `/api/usuario/login`
2. Backend valida credenciales con bcrypt
3. Si son válidas, genera un JWT con `jsonwebtoken`
4. Token se envía al cliente
5. Cliente incluye token en header `Authorization: Bearer <token>`
6. Middleware `authenticate` valida el token en cada petición protegida

**Estructura del Token**:
```javascript
{
  "IdUsuario": 1,
  "iat": 1710512345,
  "exp": 1710598745
}
```

**Middleware de Autenticación** (`middleware/auth.ts`):
```typescript
export const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;
  
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No Autorizado" });
  }

  const token = bearer.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.IdUsuario);
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token no válido o expirado" });
  }
};
```

---

### Autorización por Roles

**Middleware** (`middleware/authorizeAdmin.ts`):
```typescript
export const authorizeAdmin = async (req, res, next) => {
  if (req.usuario.IdRol !== 1) {
    return res.status(403).json({ 
      error: "No tienes permisos para realizar esta acción" 
    });
  }
  next();
};
```

**Uso**:
```typescript
router.put("/cambiar-rol/:id", 
  authenticate, 
  authorizeAdmin, 
  UsuarioController.cambiarRolUsuario
);
```

---

### Encriptación de Contraseñas

Se utiliza **bcrypt** con salt rounds de 10:

```typescript
import bcrypt from 'bcrypt';

// Hash
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Verificar
export const checkPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
```

---

### Rate Limiting

Protección contra ataques de fuerza bruta:

```typescript
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por IP
  message: 'Demasiadas peticiones, intenta más tarde'
});
```

---

### Validación de Datos

Se utiliza **express-validator**:

```typescript
body("Correo")
  .isEmail()
  .withMessage("Correo no válido"),
body("Contrasena")
  .isLength({ min: 8 })
  .withMessage("La contraseña debe tener mínimo 8 caracteres"),
handleInputErrors
```

---

## WebSockets y Tiempo Real

ActivSena utiliza **Socket.IO** para comunicación en tiempo real.

### Configuración del Servidor

```typescript
// index.ts
import { Server as SocketIOServer } from 'socket.io';

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);
```

### Eventos Implementados

**Notificaciones en tiempo real**:
```typescript
// Emitir notificación
const io = req.app.get("io");
io.emit(`notificacion-${IdUsuario}`, {
  mensaje: "Nueva notificación",
  tipo: "info"
});
```

**Cliente (React)**:
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

socket.on(`notificacion-${userId}`, (data) => {
  toast.info(data.mensaje);
});
```

---

## Integración con IA

### Dialogflow (Chatbot)

**Endpoint**: `/api/dialogflow`

Integración con Google Dialogflow para chatbot inteligente.

```typescript
import dialogflow from '@google-cloud/dialogflow';

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Detectar intención
const responses = await sessionClient.detectIntent({
  session: sessionPath,
  queryInput: {
    text: {
      text: userMessage,
      languageCode: 'es',
    },
  },
});
```

---

### Análisis de Sentimientos (Python)

Scripts Python en `/backend/IA/` para análisis de feedback:

```python
# analisis_sentimiento.py
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis", 
                             model="nlptown/bert-base-multilingual-uncased-sentiment")

def analizar_comentario(texto):
    resultado = sentiment_analyzer(texto)
    return resultado
```

**Integración desde Node.js**:
```typescript
import { PythonShell } from 'python-shell';

const options = {
  mode: 'json',
  pythonPath: 'python',
  scriptPath: './IA',
  args: [comentario]
};

PythonShell.run('analisis_sentimiento.py', options, (err, results) => {
  // Procesar resultados
});
```

---

## Tareas Programadas (Cron Jobs)

### Actividades Lúdicas Diarias

```typescript
import cron from 'node-cron';

export const iniciarLudicaDiaria = () => {
  cron.schedule('0 0 * * *', async () => {
    // Crear actividad lúdica automática
    console.log('Creando actividad lúdica del día...');
  });
};
```

### Revisión de Asistencias Incompletas

```typescript
export const revisarAsistenciasIncompletas = () => {
  cron.schedule('0 23 * * *', async () => {
    // Marcar asistencias sin salida
    const asistencias = await Asistencia.findAll({
      where: { HoraSalida: null }
    });
    // Actualizar...
  });
};
```

---

## Generación de Documentos

### Códigos QR

```typescript
import QRCode from 'qrcode';

const qrData = JSON.stringify({
  IdActividad: 1,
  IdUsuario: 5,
  tipo: 'entrada'
});

const qrImage = await QRCode.toDataURL(qrData);
```

### PDFs (Constancias)

```typescript
import PDFDocument from 'pdfkit';

const doc = new PDFDocument();
doc.fontSize(20).text('CONSTANCIA DE PARTICIPACIÓN', { align: 'center' });
doc.fontSize(12).text(`Se certifica que ${nombre} participó en...`);
doc.end();
```

---

## Almacenamiento de Archivos

### Cloudinary

Imágenes y documentos se almacenan en Cloudinary:

```typescript
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const result = await cloudinary.v2.uploader.upload(file.path, {
  folder: 'activsena/actividades'
});
```

---

**Última actualización**: Octubre 2025
