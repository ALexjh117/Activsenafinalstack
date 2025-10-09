# 📚 Índice de Documentación - ActivSena

> Acceso rápido a toda la documentación del proyecto

---

## 🗂️ Documentos Disponibles

### 📘 1. README Principal
**Descripción general del proyecto, instalación y configuración**

📄 [**Ver README.md**](README.md)

**Contenido:**
- ✅ Descripción general del proyecto
- ✅ Objetivo del sistema
- ✅ Tecnologías utilizadas (Backend + Frontend)
- ✅ Instalación paso a paso
- ✅ Estructura de carpetas
- ✅ Scripts principales (npm run dev, build, start)
- ✅ Variables de entorno requeridas
- ✅ Créditos y licencia

**Ideal para:** Conocer el proyecto por primera vez

---

### ⚙️ 2. Documentación Técnica
**Arquitectura, API, modelos de base de datos y seguridad**

📄 [**Ver DOCUMENTACION_TECNICA.md**](DOCUMENTACION_TECNICA.md)

**Contenido:**
- ✅ Arquitectura general del sistema (diagramas)
- ✅ Estructura del backend (controllers, models, routes)
- ✅ Modelos y entidades (24 tablas)
- ✅ Diagrama Entidad-Relación (ER)
- ✅ Endpoints de la API (30+ endpoints documentados)
  - Autenticación y usuarios
  - Eventos y actividades
  - Asistencia con QR
  - Feedback
  - Solicitudes de apoyo
  - Préstamo de elementos
  - Notificaciones
  - Consultas IA
- ✅ Variables de entorno (.env)
- ✅ Autenticación y seguridad (JWT, bcrypt, rate limiting)
- ✅ WebSockets y tiempo real (Socket.IO)
- ✅ Integración con IA (Dialogflow + Python)
- ✅ Tareas programadas (cron jobs)
- ✅ Generación de documentos (QR, PDFs)
- ✅ Almacenamiento en la nube (Cloudinary)

**Ideal para:** Desarrolladores backend, arquitectos de software

---

### 🧑‍💻 3. Manual del Desarrollador
**Guía completa para desarrolladores que trabajarán en el proyecto**

📄 [**Ver MANUAL_DESARROLLADOR.md**](MANUAL_DESARROLLADOR.md)

**Contenido:**
- ✅ Configuración del entorno de desarrollo
- ✅ Estructura detallada del proyecto
- ✅ Convenciones y buenas prácticas
  - Nomenclatura (PascalCase, camelCase)
  - Estructura de archivos
  - Manejo de errores
  - Commits (Conventional Commits)
- ✅ Guía de desarrollo backend
  - Crear modelos Sequelize
  - Crear controladores
  - Crear rutas y endpoints
  - Agregar middlewares
  - Trabajar con relaciones
- ✅ Guía de desarrollo frontend
  - Crear componentes React
  - Crear páginas
  - Agregar rutas
  - Usar Context API
  - Hacer peticiones HTTP
- ✅ Agregar nuevas funcionalidades (ejemplo completo)
- ✅ Manejo de errores y logs
- ✅ Testing y debugging
- ✅ Despliegue en producción
- ✅ Recursos adicionales

**Ideal para:** Desarrolladores nuevos en el equipo, contribuidores

---

### ⚛️ 4. Documentación del Frontend
**Arquitectura, componentes, rutas y gestión de estado**

📄 [**Ver DOCUMENTACION_FRONTEND.md**](DOCUMENTACION_FRONTEND.md)

**Contenido:**
- ✅ Arquitectura del frontend (diagramas de flujo)
- ✅ Stack tecnológico frontend (React 19, Vite, TypeScript)
- ✅ Estructura de componentes (árbol completo)
- ✅ Gestión de estado
  - AuthContext (autenticación global)
  - IAContext (análisis IA)
  - useState y useEffect
- ✅ Rutas y navegación
  - Configuración de React Router
  - Navegación programática
  - Rutas protegidas
- ✅ Servicios y API
  - Configuración de Axios
  - Interceptores
  - Servicios por módulo
- ✅ Autenticación
  - Flujo de login
  - Persistencia de sesión
- ✅ Páginas principales
  - HomePage
  - DashBoard (Admin, Aprendiz, Instructor)
  - Actividades
  - Asistencia con QR
- ✅ Componentes reutilizables
  - QRGenerator
  - NotificationBell
  - Carousel
- ✅ Estilos y diseño
  - Sistema de diseño
  - Paleta de colores
  - Animaciones (Framer Motion, GSAP)
- ✅ Optimización y performance
  - Code splitting
  - Memoización
  - Lazy loading

**Ideal para:** Desarrolladores frontend, diseñadores UI/UX

---

### 👥 5. Manual del Usuario
**Guía paso a paso para usuarios finales del sistema**

📄 [**Ver MANUAL_USUARIO.md**](MANUAL_USUARIO.md)

**Contenido:**
- ✅ Introducción al sistema
- ✅ Acceso al sistema
  - Registro de cuenta (paso a paso)
  - Iniciar sesión
  - Recuperar contraseña
- ✅ Roles de usuario (Aprendiz, Instructor, Administrador)
- ✅ **Guía para Aprendices**
  - Dashboard del aprendiz
  - Ver y registrarse en actividades
  - Registrar asistencia con QR (2 métodos)
  - Solicitar apoyo de sostenimiento
  - Solicitar préstamo de elementos
  - Dar feedback
  - Generar constancias
  - Ver historial de asistencias
- ✅ **Guía para Instructores**
  - Dashboard del instructor
  - Crear actividades (formulario completo)
  - Gestionar asistencia (3 métodos)
  - Ver reportes de asistencia
  - Crear formularios de feedback
  - Ver resultados de feedback
  - Aprobar solicitudes de préstamo
- ✅ **Guía para Administradores**
  - Dashboard del administrador
  - Gestionar usuarios (crear, editar, eliminar, cambiar roles)
  - Cargar usuarios masivamente (Excel)
  - Gestionar eventos
  - Aprobar solicitudes de apoyo
  - Gestionar catálogo de elementos
  - Análisis con IA
  - Ver estadísticas generales
- ✅ Funcionalidades comunes
  - Notificaciones
  - Perfil de usuario
  - Chat con asistente virtual
  - Uso desde dispositivos móviles
- ✅ Preguntas frecuentes (FAQ)
- ✅ Soporte técnico (canales de contacto)
- ✅ Consejos y buenas prácticas

**Ideal para:** Aprendices, instructores, administradores, usuarios finales

---

### 📊 6. Anexos
**Diagramas, casos de uso, roadmap y glosario**

📄 [**Ver ANEXOS.md**](ANEXOS.md)

**Contenido:**
- ✅ **Diagramas de flujo**
  - Flujo de registro de usuario
  - Flujo de inicio de sesión
  - Flujo de registro de asistencia con QR
  - Flujo de solicitud de apoyo de sostenimiento
- ✅ **Diagramas de casos de uso**
  - Casos de uso - Aprendiz
  - Casos de uso - Instructor
  - Casos de uso - Administrador
- ✅ **Diagramas de secuencia**
  - Secuencia: Registro de asistencia con QR
  - Secuencia: Creación de actividad
- ✅ **Modelo de base de datos**
  - Diagrama Entidad-Relación completo (24 tablas)
  - Relaciones entre entidades
- ✅ **Roadmap y mejoras futuras**
  - Versión 1.1 (3 meses): App móvil, IA mejorada, gamificación
  - Versión 1.2 (6 meses): Encuestas, mensajería, reportes avanzados
  - Versión 2.0 (12 meses): Evaluación 360°, IA avanzada, AR, Blockchain
  - Mejoras técnicas continuas
- ✅ **Glosario de términos**
  - Términos técnicos (API, JWT, QR, ORM, etc.)
  - Términos del dominio (Ficha, Jornada, Constancia, etc.)
- ✅ **Créditos y equipo**
  - Equipo de desarrollo
  - Tecnologías utilizadas
  - Agradecimientos
  - Licencia
- ✅ **Estadísticas del proyecto**
  - Líneas de código
  - Funcionalidades implementadas

**Ideal para:** Arquitectos, stakeholders, gerentes de proyecto

---

### 🌟 7. README para GitHub
**Versión resumida y atractiva para el repositorio de GitHub**

📄 [**Ver README_GITHUB.md**](../README_GITHUB.md)

**Contenido:**
- ✅ Descripción breve y atractiva
- ✅ Badges (versión, licencia, tecnologías)
- ✅ Características principales (lista visual)
- ✅ Stack tecnológico
- ✅ Inicio rápido (instalación en 5 pasos)
- ✅ Estructura del proyecto (árbol simplificado)
- ✅ Tabla de documentación con enlaces
- ✅ Roles de usuario
- ✅ Endpoints principales
- ✅ Capturas de pantalla
- ✅ Testing y despliegue
- ✅ Cómo contribuir
- ✅ Reportar bugs
- ✅ Changelog
- ✅ Roadmap
- ✅ Licencia
- ✅ Contacto y soporte
- ✅ Estadísticas del proyecto
- ✅ Enlaces útiles

**Ideal para:** Visitantes del repositorio, nuevos contribuidores

---

## 🎯 Guía de Lectura Recomendada

### Para Usuarios Finales
1. 📘 [README.md](README.md) - Conocer el proyecto
2. 👥 [MANUAL_USUARIO.md](MANUAL_USUARIO.md) - Aprender a usar el sistema

### Para Desarrolladores Nuevos
1. 📘 [README.md](README.md) - Instalar el proyecto
2. 🧑‍💻 [MANUAL_DESARROLLADOR.md](MANUAL_DESARROLLADOR.md) - Entender el código
3. ⚙️ [DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md) - Profundizar en la arquitectura
4. ⚛️ [DOCUMENTACION_FRONTEND.md](DOCUMENTACION_FRONTEND.md) - Trabajar en el frontend

### Para Arquitectos y Líderes Técnicos
1. ⚙️ [DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md) - Arquitectura completa
2. 📊 [ANEXOS.md](ANEXOS.md) - Diagramas y casos de uso
3. 🧑‍💻 [MANUAL_DESARROLLADOR.md](MANUAL_DESARROLLADOR.md) - Estándares de código

### Para Stakeholders y Gerentes
1. 📘 [README.md](README.md) - Visión general
2. 📊 [ANEXOS.md](ANEXOS.md) - Roadmap y estadísticas
3. 👥 [MANUAL_USUARIO.md](MANUAL_USUARIO.md) - Funcionalidades para usuarios

---

## 📥 Descargar Documentación

### Formato Markdown (.md)
Todos los documentos están disponibles en formato Markdown en la carpeta `/docs`:

```
docs/
├── INDEX.md                      ← Estás aquí
├── README.md
├── DOCUMENTACION_TECNICA.md
├── MANUAL_DESARROLLADOR.md
├── DOCUMENTACION_FRONTEND.md
├── MANUAL_USUARIO.md
└── ANEXOS.md
```

### Convertir a PDF

Puedes convertir cualquier documento Markdown a PDF usando herramientas como:

**Opción 1: Pandoc (Línea de comandos)**
```bash
pandoc README.md -o README.pdf
```

**Opción 2: VS Code + Extensión**
- Instala la extensión "Markdown PDF"
- Abre el archivo .md
- Presiona `Ctrl+Shift+P` → "Markdown PDF: Export (pdf)"

**Opción 3: Herramientas Online**
- [Markdown to PDF](https://www.markdowntopdf.com/)
- [CloudConvert](https://cloudconvert.com/md-to-pdf)

---

## 🔍 Búsqueda Rápida

### Por Tema

| Tema | Documento | Sección |
|------|-----------|---------|
| **Instalación** | README.md | Instalación y Configuración |
| **API Endpoints** | DOCUMENTACION_TECNICA.md | Endpoints de la API |
| **Base de Datos** | DOCUMENTACION_TECNICA.md | Modelos y Entidades |
| **Autenticación** | DOCUMENTACION_TECNICA.md | Autenticación y Seguridad |
| **Crear Componente** | MANUAL_DESARROLLADOR.md | Guía de Desarrollo Frontend |
| **Crear Endpoint** | MANUAL_DESARROLLADOR.md | Guía de Desarrollo Backend |
| **Usar QR** | MANUAL_USUARIO.md | Registrar Asistencia con QR |
| **Roles y Permisos** | MANUAL_USUARIO.md | Roles de Usuario |
| **Diagramas** | ANEXOS.md | Diagramas de Flujo |
| **Roadmap** | ANEXOS.md | Roadmap y Mejoras Futuras |

### Por Rol

| Rol | Documentos Recomendados |
|-----|------------------------|
| **Aprendiz** | MANUAL_USUARIO.md (Guía para Aprendices) |
| **Instructor** | MANUAL_USUARIO.md (Guía para Instructores) |
| **Administrador** | MANUAL_USUARIO.md (Guía para Administradores) |
| **Desarrollador Backend** | MANUAL_DESARROLLADOR.md, DOCUMENTACION_TECNICA.md |
| **Desarrollador Frontend** | MANUAL_DESARROLLADOR.md, DOCUMENTACION_FRONTEND.md |
| **DevOps** | MANUAL_DESARROLLADOR.md (Despliegue) |
| **Arquitecto** | DOCUMENTACION_TECNICA.md, ANEXOS.md |
| **Product Owner** | README.md, ANEXOS.md (Roadmap) |
| **QA Tester** | MANUAL_USUARIO.md, DOCUMENTACION_TECNICA.md |

---

## 📊 Estadísticas de Documentación

| Métrica | Valor |
|---------|-------|
| **Total de documentos** | 7 archivos |
| **Páginas totales** | ~150 páginas |
| **Palabras totales** | ~35,000 palabras |
| **Diagramas** | 15+ diagramas |
| **Ejemplos de código** | 100+ ejemplos |
| **Capturas de pantalla** | 10+ imágenes |
| **Tablas** | 50+ tablas |

---

## 🆘 ¿Necesitas Ayuda?

### No encuentras lo que buscas?

1. **Usa la búsqueda de GitHub**: Presiona `/` en el repositorio
2. **Revisa el glosario**: [ANEXOS.md - Glosario](ANEXOS.md#glosario-de-términos)
3. **Consulta las FAQ**: [MANUAL_USUARIO.md - Preguntas Frecuentes](MANUAL_USUARIO.md#preguntas-frecuentes)
4. **Abre un issue**: [GitHub Issues](https://github.com/ALexjh117/Activsenafinalstack/issues)
5. **Contacta al equipo**: activsena@sena.edu.co

---

## 🔄 Actualizaciones

**Última actualización de la documentación**: Octubre 2025  
**Versión del sistema**: 1.0.0  
**Versión de la documentación**: 1.0.0

### Historial de Cambios

- **2024-10-09**: Documentación completa inicial
  - README principal
  - Documentación técnica
  - Manual del desarrollador
  - Documentación del frontend
  - Manual del usuario
  - Anexos con diagramas
  - README para GitHub
  - Índice de documentación

---

## 📝 Contribuir a la Documentación

¿Encontraste un error o quieres mejorar la documentación?

1. Fork el repositorio
2. Edita el archivo .md correspondiente
3. Haz un Pull Request con tus cambios
4. Describe qué mejoraste

**Guía de estilo:**
- Usa Markdown estándar
- Incluye ejemplos de código cuando sea posible
- Agrega diagramas si ayudan a explicar
- Mantén un tono claro y profesional
- Revisa la ortografía

---

## ⭐ Documentación Destacada

### 🏆 Más Consultados

1. 📘 **README.md** - Instalación y configuración
2. 👥 **MANUAL_USUARIO.md** - Guía de uso
3. ⚙️ **DOCUMENTACION_TECNICA.md** - API Reference

### 🆕 Recién Agregados

- ✨ Diagramas de flujo completos
- ✨ Casos de uso detallados
- ✨ Roadmap del proyecto
- ✨ Glosario de términos

---

<div align="center">

## 🎉 ¡Documentación Completa!

Toda la documentación de **ActivSena** está lista para consultar.

**¿Por dónde empezar?**

[📘 README Principal](README.md) | [👥 Manual de Usuario](MANUAL_USUARIO.md) | [🧑‍💻 Manual de Desarrollador](MANUAL_DESARROLLADOR.md)

---

**Hecho con ❤️ para el SENA**

[⬆ Volver arriba](#-índice-de-documentación---activsena)

</div>
