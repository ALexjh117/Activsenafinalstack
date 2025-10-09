# ActivSena - Sistema de Gestión de Actividades y Eventos

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Objetivo del Sistema](#objetivo-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Scripts Principales](#scripts-principales)
- [Variables de Entorno](#variables-de-entorno)
- [Créditos y Autores](#créditos-y-autores)
- [Licencia](#licencia)

---

## 📖 Descripción General

**ActivSena** es un sistema integral de gestión de actividades, eventos y asistencias diseñado específicamente para instituciones educativas del SENA. La plataforma permite la administración completa del ciclo de vida de eventos académicos, culturales y deportivos, incluyendo:

- Gestión de usuarios (Administradores, Instructores, Aprendices)
- Creación y planificación de eventos y actividades
- Control de asistencia mediante códigos QR
- Sistema de feedback y evaluación
- Gestión de préstamos de elementos
- Análisis de datos con Inteligencia Artificial
- Notificaciones en tiempo real
- Generación de constancias y certificados
- Chat inteligente con Dialogflow

---

## 🎯 Objetivo del Sistema

El objetivo principal de **ActivSena** es:

1. **Digitalizar** la gestión de eventos y actividades académicas
2. **Automatizar** el control de asistencia mediante tecnología QR
3. **Facilitar** la comunicación entre instructores y aprendices
4. **Optimizar** la gestión de recursos y elementos prestables
5. **Proporcionar** análisis inteligentes mediante IA para mejorar la toma de decisiones
6. **Generar** reportes y constancias de participación automáticas
7. **Centralizar** toda la información en una plataforma web accesible

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** (v14+) - Entorno de ejecución
- **TypeScript** (v5.8.3) - Lenguaje de programación tipado
- **Express** (v4.21.2) - Framework web
- **Sequelize** (v6.37.7) - ORM para base de datos
- **MySQL** (v8.0+) - Sistema de gestión de base de datos
- **Socket.IO** (v4.8.1) - Comunicación en tiempo real
- **JWT** (v9.0.2) - Autenticación y autorización
- **Bcrypt** (v6.0.0) - Encriptación de contraseñas
- **Nodemailer** (v7.0.3) - Envío de correos electrónicos
- **QRCode** (v1.5.4) - Generación de códigos QR
- **PDFKit** (v0.17.2) - Generación de documentos PDF
- **Cloudinary** (v2.7.0) - Almacenamiento de imágenes
- **Node-cron** (v4.2.0) - Tareas programadas
- **Dialogflow** (v7.2.0) - Chatbot con IA
- **Python-shell** (v5.0.0) - Integración con scripts Python para IA

### Frontend
- **React** (v19.1.0) - Biblioteca de interfaz de usuario
- **Vite** (v6.2.3) - Build tool y dev server
- **TypeScript** (v5.8.3) - Tipado estático
- **React Router DOM** (v7.4.1) - Enrutamiento
- **Axios** (v1.9.0) - Cliente HTTP
- **Bootstrap** (v5.3.8) - Framework CSS
- **TailwindCSS** (v4.0.15) - Framework CSS utility-first
- **Framer Motion** (v11.18.2) - Animaciones
- **GSAP** (v3.13.0) - Animaciones avanzadas
- **Socket.IO Client** (v4.8.1) - WebSockets cliente
- **React Big Calendar** (v1.19.4) - Calendario de eventos
- **Recharts** (v3.2.1) - Gráficos y visualización de datos
- **SweetAlert2** (v11.22.2) - Alertas personalizadas
- **React Hot Toast** (v2.6.0) - Notificaciones toast
- **HTML2Canvas** (v1.4.1) - Captura de pantalla
- **HTML2PDF.js** (v0.10.3) - Generación de PDFs
- **XLSX** (v0.18.5) - Manejo de archivos Excel
- **QRCode.react** (v4.2.0) - Generación de QR en React
- **HTML5-QRCode** (v2.3.8) - Escaneo de códigos QR
- **JWT-decode** (v4.0.0) - Decodificación de tokens
- **Lucide React** (v0.525.0) - Iconos

### Herramientas de Desarrollo
- **Nodemon** (v3.1.9) - Auto-reload en desarrollo
- **Morgan** (v1.10.0) - Logger HTTP
- **Colors** (v1.4.0) - Colores en consola
- **ESLint** - Linter de código
- **Dotenv** (v16.5.0) - Variables de entorno

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **MySQL** >= 8.0
- **Git**

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/ALexjh117/Activsenafinalstack.git
cd M-de-mentirosas-
```

### Paso 2: Configurar la Base de Datos

1. Crear la base de datos en MySQL:
```bash
mysql -u root -p
CREATE DATABASE activsena;
exit;
```

2. Importar el esquema de la base de datos:
```bash
mysql -u root -p activsena < activsenadatabase.sql
```

### Paso 3: Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```env
# Base de datos
DB_NAME=activsena
DB_USER=root
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura

# Email (Nodemailer)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Dialogflow
GOOGLE_APPLICATION_CREDENTIALS=./ruta/a/tu/credenciales.json
DIALOGFLOW_PROJECT_ID=tu_project_id

# Puerto
PORT=3002
```

### Paso 4: Configurar el Frontend

```bash
cd ../Frontend
npm install
```

### Paso 5: Iniciar el Proyecto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

El backend estará disponible en: `http://localhost:3002`
El frontend estará disponible en: `http://localhost:3000`

---

## 📁 Estructura de Carpetas

```
M-de-mentirosas-/
│
├── backend/                      # Servidor Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/              # Configuraciones (DB, limiter)
│   │   ├── controllers/         # Lógica de negocio
│   │   ├── cron/                # Tareas programadas
│   │   ├── emails/              # Templates de emails
│   │   ├── middleware/          # Middlewares (auth, validación)
│   │   ├── models/              # Modelos Sequelize
│   │   ├── routes/              # Rutas de la API
│   │   ├── scripts/             # Scripts auxiliares
│   │   ├── services/            # Servicios (IA, notificaciones)
│   │   ├── types/               # Tipos TypeScript
│   │   ├── utils/               # Utilidades (auth, token, jwt)
│   │   ├── index.ts             # Punto de entrada
│   │   └── server.ts            # Configuración Express
│   ├── public/                  # Archivos estáticos
│   │   └── qrcodes/            # Códigos QR generados
│   ├── uploads/                 # Archivos subidos
│   ├── IA/                      # Scripts Python para IA
│   ├── .env                     # Variables de entorno
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/                     # Aplicación React + Vite
│   ├── src/
│   │   ├── Components/          # Componentes reutilizables
│   │   ├── Context/             # Context API (AuthContext, etc.)
│   │   ├── pages/               # Páginas de la aplicación
│   │   │   ├── Actividades/
│   │   │   ├── Agenda/
│   │   │   ├── Alquiler/
│   │   │   ├── AnalisisIA/
│   │   │   ├── Asistencia/
│   │   │   ├── ChatAI/
│   │   │   ├── DashBoard/
│   │   │   ├── Feedback/
│   │   │   └── ...
│   │   ├── services/            # Servicios API
│   │   ├── styles/              # Estilos globales
│   │   ├── utils/               # Utilidades
│   │   ├── interfaces/          # Interfaces TypeScript
│   │   ├── Backgrounds/         # Fondos animados
│   │   ├── TextAnimations/      # Animaciones de texto
│   │   ├── main.jsx             # Punto de entrada
│   │   └── RutasComponents.jsx  # Configuración de rutas
│   ├── public/                  # Recursos públicos
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.js
│
├── activsenadatabase.sql        # Dump de la base de datos
├── limpieza.sql                 # Scripts de limpieza
├── Plantilla_Aprendices.xlsx    # Plantilla para carga masiva
├── package.json                 # Dependencias raíz
└── README.md                    # Este archivo
```

---

## 📜 Scripts Principales

### Backend

```bash
# Desarrollo con auto-reload
npm run dev

# Compilar TypeScript
npm run build

# Producción
npm start
```

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🔐 Variables de Entorno

El archivo `.env` del backend debe contener:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_NAME` | Nombre de la base de datos | `activsena` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASS` | Contraseña de MySQL | `password123` |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `JWT_SECRET` | Clave secreta para JWT | `mi_clave_super_secreta_2024` |
| `EMAIL_USER` | Correo para envío de emails | `activsena@gmail.com` |
| `EMAIL_PASS` | Contraseña de aplicación Gmail | `abcd efgh ijkl mnop` |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud Cloudinary | `mi-cloud` |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | `123456789012345` |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | `abcdefghijklmnop` |
| `DIALOGFLOW_PROJECT_ID` | ID del proyecto Dialogflow | `activsena-chatbot` |
| `PORT` | Puerto del servidor | `3002` |

---

## 👥 Créditos y Autores

**ActivSena** fue desarrollado por:

- **Alex** - Desarrollador Full Stack Principal
- **Equipo de desarrollo SENA** - Colaboradores

### Agradecimientos

- SENA Colombia por el apoyo institucional
- Instructores y aprendices que participaron en las pruebas
- Comunidad open source por las librerías utilizadas

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**.

```
Copyright (c) 2024 ActivSena Team

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 📞 Contacto y Soporte

Para reportar bugs, solicitar features o hacer preguntas:

- **Issues**: [GitHub Issues](https://github.com/ALexjh117/Activsenafinalstack/issues)
- **Email**: activsena@sena.edu.co

---

## 🔗 Enlaces Útiles

- [Documentación Técnica Completa](./DOCUMENTACION_TECNICA.md)
- [Manual del Desarrollador](./MANUAL_DESARROLLADOR.md)
- [Manual del Usuario](./MANUAL_USUARIO.md)
- [Guía de Contribución](./CONTRIBUTING.md)

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0
