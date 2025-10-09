# 🎯 ActivSena

> Sistema integral de gestión de actividades, eventos y asistencias para el SENA

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/ALexjh117/Activsenafinalstack)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-19.1.0-61dafb.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue.svg)](https://www.typescriptlang.org)

---

## 📖 Descripción

**ActivSena** es una plataforma web completa que digitaliza y automatiza la gestión de actividades lúdicas, eventos académicos y control de asistencia en instituciones del SENA. Desarrollada con tecnologías modernas y escalables.

### ✨ Características Principales

- 🎫 **Gestión de Eventos y Actividades** - Crear, editar y administrar eventos deportivos, culturales y recreativos
- 📱 **Control de Asistencia con QR** - Registro automático mediante códigos QR
- 💰 **Solicitudes de Apoyo** - Gestión de apoyos de sostenimiento para aprendices
- 🏀 **Préstamo de Elementos** - Sistema de préstamo de material deportivo y cultural
- 📝 **Sistema de Feedback** - Evaluación y retroalimentación de actividades
- 📜 **Generación de Constancias** - Certificados automáticos de participación
- 🤖 **Inteligencia Artificial** - Análisis de sentimientos y chatbot inteligente
- 🔔 **Notificaciones en Tiempo Real** - Alertas instantáneas con Socket.IO
- 📊 **Dashboards Interactivos** - Estadísticas y reportes visuales
- 👥 **Gestión de Usuarios** - Administración de roles (Admin, Instructor, Aprendiz)

---

## 🛠️ Stack Tecnológico

### Backend
```
Node.js + TypeScript + Express + Sequelize + MySQL
Socket.IO + JWT + Bcrypt + Nodemailer + Cloudinary
Dialogflow + Python (IA) + QRCode + PDFKit
```

### Frontend
```
React 19 + TypeScript + Vite
TailwindCSS + Bootstrap + Framer Motion + GSAP
Axios + Socket.IO Client + React Router DOM
Recharts + SweetAlert2 + React Hot Toast
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

```bash
Node.js >= 14.0.0
npm >= 6.0.0
MySQL >= 8.0
Git
```

### Instalación

**1. Clonar el repositorio**
```bash
git clone https://github.com/ALexjh117/Activsenafinalstack.git
cd M-de-mentirosas-
```

**2. Configurar Backend**
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
DB_NAME=activsena
DB_USER=root
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_app
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
PORT=3002
```

**3. Configurar Base de Datos**
```bash
mysql -u root -p
CREATE DATABASE activsena;
exit;
mysql -u root -p activsena < activsenadatabase.sql
```

**4. Configurar Frontend**
```bash
cd ../Frontend
npm install
```

**5. Iniciar Aplicación**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd Frontend
npm run dev
```

🎉 **¡Listo!** 
- Backend: `http://localhost:3002`
- Frontend: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
M-de-mentirosas-/
├── backend/                    # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/            # Configuración DB
│   │   ├── controllers/       # Lógica de negocio (28 archivos)
│   │   ├── models/            # Modelos Sequelize (24 tablas)
│   │   ├── routes/            # Rutas API (30 endpoints)
│   │   ├── middleware/        # Autenticación y validación
│   │   ├── services/          # Servicios auxiliares
│   │   ├── cron/              # Tareas programadas
│   │   └── utils/             # Utilidades
│   └── package.json
│
├── Frontend/                   # Aplicación React
│   ├── src/
│   │   ├── pages/             # Páginas (40+ módulos)
│   │   ├── Components/        # Componentes reutilizables
│   │   ├── Context/           # Estado global
│   │   ├── services/          # Servicios API
│   │   └── styles/            # Estilos
│   └── package.json
│
├── docs/                       # Documentación completa
│   ├── README.md              # Manual principal
│   ├── DOCUMENTACION_TECNICA.md
│   ├── MANUAL_DESARROLLADOR.md
│   ├── DOCUMENTACION_FRONTEND.md
│   ├── MANUAL_USUARIO.md
│   └── ANEXOS.md
│
├── activsenadatabase.sql       # Esquema de BD
└── README.md                   # Este archivo
```

---

## 📚 Documentación

| Documento | Descripción | Enlace |
|-----------|-------------|--------|
| 📘 **README Principal** | Descripción general e instalación | [Ver](docs/README.md) |
| ⚙️ **Documentación Técnica** | Arquitectura, API, modelos | [Ver](docs/DOCUMENTACION_TECNICA.md) |
| 🧑‍💻 **Manual del Desarrollador** | Guía para desarrolladores | [Ver](docs/MANUAL_DESARROLLADOR.md) |
| ⚛️ **Documentación Frontend** | Componentes, rutas, estado | [Ver](docs/DOCUMENTACION_FRONTEND.md) |
| 👥 **Manual del Usuario** | Guía paso a paso para usuarios | [Ver](docs/MANUAL_USUARIO.md) |
| 📊 **Anexos** | Diagramas, casos de uso, roadmap | [Ver](docs/ANEXOS.md) |

---

## 🎭 Roles de Usuario

### 🎓 Aprendiz
- Ver y registrarse en actividades
- Registrar asistencia con QR
- Solicitar apoyo de sostenimiento
- Solicitar préstamo de elementos
- Dar feedback
- Generar constancias

### 👨‍🏫 Instructor
- Todo lo de Aprendiz, más:
- Crear y gestionar actividades
- Gestionar asistencia
- Crear formularios de feedback
- Ver reportes de participación

### 👨‍💼 Administrador
- Todo lo de Instructor, más:
- Gestionar usuarios y roles
- Aprobar solicitudes de apoyo
- Gestionar catálogo de elementos
- Ver estadísticas generales
- Análisis con IA

---

## 🔑 Endpoints Principales

### Autenticación
```http
POST   /api/usuario/                    # Registro
POST   /api/usuario/login               # Login
POST   /api/usuario/confirm-account     # Verificar cuenta
POST   /api/usuario/forgot-password     # Recuperar contraseña
GET    /api/usuario/user                # Perfil usuario
```

### Actividades
```http
GET    /api/actividad                   # Listar actividades
POST   /api/actividad                   # Crear actividad
GET    /api/actividad/:id               # Obtener actividad
PUT    /api/actividad/:id               # Actualizar actividad
DELETE /api/actividad/:id               # Eliminar actividad
```

### Asistencia
```http
POST   /api/asistencia/registrar        # Registrar asistencia QR
GET    /api/asistencia/usuario/:id      # Historial usuario
GET    /api/asistencia/actividad/:id    # Asistencias de actividad
```

### Eventos
```http
GET    /api/evento                      # Listar eventos
POST   /api/evento                      # Crear evento
GET    /api/evento/:id                  # Obtener evento
PUT    /api/evento/:id                  # Actualizar evento
```

### Solicitudes
```http
POST   /api/solicitudapoyo              # Crear solicitud
GET    /api/solicitudapoyo/usuario/:id  # Mis solicitudes
PUT    /api/solicitudapoyo/:id/estado   # Aprobar/Rechazar
```

[Ver documentación completa de API](docs/DOCUMENTACION_TECNICA.md#endpoints-de-la-api)

---

## 🗄️ Base de Datos

### Tablas Principales

- **Usuario** - Datos de usuarios del sistema
- **RolUsuario** - Roles (Admin, Instructor, Aprendiz)
- **Aprendiz** - Información de aprendices (ficha, programa)
- **PerfilInstructor** - Perfil de instructores
- **Evento** - Eventos académicos
- **Actividad** - Actividades lúdicas
- **Asistencia** - Registro de asistencias
- **Feedback** - Evaluaciones de actividades
- **SolicitudApoyo** - Solicitudes de apoyo económico
- **Elemento** - Catálogo de elementos prestables
- **PrestamoElementos** - Préstamos de material
- **Notificaciones** - Notificaciones del sistema
- **Constancia** - Certificados de participación
- **ConsultaIA** - Historial de consultas al chatbot

[Ver diagrama ER completo](docs/ANEXOS.md#modelo-de-base-de-datos)

---

## 🎨 Capturas de Pantalla

### Dashboard Administrador
![Dashboard Admin](docs/screenshots/dashboard-admin.png)

### Registro de Asistencia con QR
![Asistencia QR](docs/screenshots/asistencia-qr.png)

### Gestión de Actividades
![Actividades](docs/screenshots/actividades.png)

### Análisis con IA
![Análisis IA](docs/screenshots/analisis-ia.png)

---

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd Frontend
npm test
```

---

## 🚢 Despliegue

### Backend (Node.js)

```bash
cd backend
npm run build
npm start
```

### Frontend (React)

```bash
cd Frontend
npm run build
# Los archivos estarán en /dist
```

### Variables de Entorno en Producción

```env
NODE_ENV=production
DB_HOST=tu-servidor-mysql.com
JWT_SECRET=clave_super_segura_aleatoria
# ... otras variables
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo de código
refactor: refactorización
test: agregar tests
chore: tareas de mantenimiento
```

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/ALexjh117/Activsenafinalstack/issues) con:

- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Capturas de pantalla (si aplica)
- Información del entorno (navegador, SO, etc.)

---

## 📝 Changelog

### [1.0.0] - 2024-10-09

#### Agregado
- ✨ Sistema completo de gestión de actividades y eventos
- ✨ Control de asistencia con códigos QR
- ✨ Gestión de solicitudes de apoyo de sostenimiento
- ✨ Sistema de préstamo de elementos
- ✨ Feedback y evaluación de actividades
- ✨ Generación automática de constancias
- ✨ Integración con IA (Dialogflow + análisis de sentimientos)
- ✨ Notificaciones en tiempo real con Socket.IO
- ✨ Dashboards interactivos con estadísticas
- ✨ Sistema de roles y permisos
- ✨ Autenticación JWT
- ✨ Envío de emails
- ✨ Almacenamiento en la nube (Cloudinary)
- ✨ Responsive design

---

## 🛣️ Roadmap

### Versión 1.1 (Próximos 3 meses)
- [ ] App móvil nativa (React Native)
- [ ] Mejoras en IA predictiva
- [ ] Sistema de gamificación
- [ ] Integración con Google Calendar

### Versión 1.2 (6 meses)
- [ ] Módulo de encuestas
- [ ] Sistema de mensajería interna
- [ ] Reportes avanzados
- [ ] Integración con redes sociales

### Versión 2.0 (12 meses)
- [ ] Módulo de evaluación 360°
- [ ] IA avanzada con NLP
- [ ] Realidad Aumentada
- [ ] Certificados en Blockchain

[Ver roadmap completo](docs/ANEXOS.md#roadmap-y-mejoras-futuras)

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
Copyright (c) 2024 ActivSena Team

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 👥 Autores

- **Alex** - *Desarrollador Full Stack Principal* - [GitHub](https://github.com/ALexjh117)

### Agradecimientos

- SENA Colombia por el apoyo institucional
- Instructores y aprendices que participaron en las pruebas
- Comunidad open source por las librerías utilizadas

---

## 📞 Contacto y Soporte

- 📧 **Email**: activsena@sena.edu.co
- 🐛 **Issues**: [GitHub Issues](https://github.com/ALexjh117/Activsenafinalstack/issues)
- 📖 **Documentación**: [Ver docs](docs/)
- 🌐 **Website**: [SENA Colombia](https://www.sena.edu.co)

---

## 🌟 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/ALexjh117/Activsenafinalstack?style=social)
![GitHub forks](https://img.shields.io/github/forks/ALexjh117/Activsenafinalstack?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/ALexjh117/Activsenafinalstack?style=social)

- 📦 **260+ archivos**
- 💻 **40,500+ líneas de código**
- 🗄️ **24 tablas en base de datos**
- 🔌 **30+ endpoints de API**
- 📄 **40+ páginas frontend**
- 🎨 **150+ componentes**
- 📚 **6 documentos técnicos**

---

## 🔗 Enlaces Útiles

- [Documentación Completa](docs/)
- [Guía de Instalación](docs/README.md#instalación-y-configuración)
- [API Reference](docs/DOCUMENTACION_TECNICA.md#endpoints-de-la-api)
- [Manual del Usuario](docs/MANUAL_USUARIO.md)
- [Guía del Desarrollador](docs/MANUAL_DESARROLLADOR.md)
- [Diagramas y Casos de Uso](docs/ANEXOS.md)

---

<div align="center">

**Hecho con ❤️ para el SENA**

⭐ Si te gusta este proyecto, dale una estrella en GitHub

[⬆ Volver arriba](#-activsena)

</div>
