# Manual del Desarrollador - ActivSena

## 📋 Tabla de Contenidos

- [Introducción](#introducción)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Convenciones y Buenas Prácticas](#convenciones-y-buenas-prácticas)
- [Guía de Desarrollo Backend](#guía-de-desarrollo-backend)
- [Guía de Desarrollo Frontend](#guía-de-desarrollo-frontend)
- [Agregar Nuevas Funcionalidades](#agregar-nuevas-funcionalidades)
- [Manejo de Errores y Logs](#manejo-de-errores-y-logs)
- [Testing y Debugging](#testing-y-debugging)
- [Despliegue](#despliegue)

---

## 🎯 Introducción

Este manual está diseñado para desarrolladores que trabajarán en el proyecto **ActivSena**. Aquí encontrarás toda la información necesaria para configurar tu entorno, entender la arquitectura y contribuir al proyecto de manera efectiva.

### Stack Tecnológico

- **Backend**: Node.js + TypeScript + Express + Sequelize
- **Frontend**: React + TypeScript + Vite
- **Base de Datos**: MySQL 8.0+
- **Tiempo Real**: Socket.IO
- **Almacenamiento**: Cloudinary
- **IA**: Dialogflow + Python (análisis de sentimientos)

---

## 🛠️ Configuración del Entorno de Desarrollo

### Requisitos Previos

```bash
# Versiones mínimas requeridas
Node.js >= 14.0.0
npm >= 6.0.0
MySQL >= 8.0
Git
Python >= 3.8 (para módulos de IA)
```

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ALexjh117/Activsenafinalstack.git
cd M-de-mentirosas-
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

**Crear archivo `.env`**:

```env
# Base de datos
DB_NAME=activsena
DB_USER=root
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306

# JWT
JWT_SECRET=clave_secreta_muy_segura_cambiar_en_produccion

# Email (Gmail con contraseña de aplicación)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx

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

### 3. Configurar Base de Datos

```bash
# Crear base de datos
mysql -u root -p
CREATE DATABASE activsena CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Importar esquema
mysql -u root -p activsena < activsenadatabase.sql
```

### 4. Configurar Frontend

```bash
cd ../Frontend
npm install
```

**Crear archivo `.env` (opcional)**:

```env
VITE_API_URL=http://localhost:3002
VITE_SOCKET_URL=http://localhost:3002
```

### 5. Iniciar en Modo Desarrollo

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd Frontend
npm run dev
```

El backend estará en `http://localhost:3002` y el frontend en `http://localhost:3000`.

---

## 📁 Estructura del Proyecto

### Backend (`/backend`)

```
backend/
├── src/
│   ├── config/              # Configuraciones
│   │   ├── db.ts           # Conexión Sequelize
│   │   └── limiter.ts      # Rate limiting
│   │
│   ├── controllers/         # Lógica de negocio (28 archivos)
│   │   ├── UsuarioController.ts
│   │   ├── ActividadController.ts
│   │   ├── AsistenciaController.ts
│   │   └── ...
│   │
│   ├── models/              # Modelos Sequelize (24 archivos)
│   │   ├── Usuario.ts
│   │   ├── Actividad.ts
│   │   ├── Asistencia.ts
│   │   └── ...
│   │
│   ├── routes/              # Rutas API (30 archivos)
│   │   ├── Usuario.Routes.ts
│   │   ├── Actividad.Routes.ts
│   │   └── ...
│   │
│   ├── middleware/          # Middlewares (22 archivos)
│   │   ├── auth.ts         # Autenticación JWT
│   │   ├── authorizeAdmin.ts
│   │   ├── validation.ts
│   │   └── uploadConfig.ts
│   │
│   ├── services/            # Servicios auxiliares
│   │   └── (IA, notificaciones)
│   │
│   ├── utils/               # Utilidades
│   │   ├── auth.ts         # Hash de contraseñas
│   │   ├── token.ts        # Generación de tokens
│   │   └── jwt.ts
│   │
│   ├── cron/                # Tareas programadas
│   │   ├── LudicaJob.ts
│   │   └── RevisarAsistenciasIncompletas.ts
│   │
│   ├── emails/              # Templates de email
│   │   └── AuthEmail.ts
│   │
│   ├── types/               # Tipos TypeScript
│   │
│   ├── index.ts             # Punto de entrada + Socket.IO
│   └── server.ts            # Configuración Express
│
├── public/                  # Archivos estáticos
│   └── qrcodes/            # QR generados
│
├── uploads/                 # Archivos subidos
├── IA/                      # Scripts Python
├── package.json
└── tsconfig.json
```

### Frontend (`/Frontend`)

```
Frontend/
├── src/
│   ├── pages/               # Páginas principales (40+ carpetas)
│   │   ├── Home/
│   │   ├── DashBoard/
│   │   ├── Actividades/
│   │   ├── Asistencia/
│   │   ├── Feedback/
│   │   ├── ApoyoSostenimiento/
│   │   ├── AnalisisIA/
│   │   ├── ChatAI/
│   │   └── ...
│   │
│   ├── Components/          # Componentes reutilizables
│   │   ├── QrGenerador.jsx/
│   │   ├── Notificaciones/
│   │   ├── Carousel/
│   │   └── ...
│   │
│   ├── Context/             # Context API
│   │   └── AuthContext.tsx
│   │
│   ├── services/            # Servicios API
│   │   ├── api.js
│   │   └── ...
│   │
│   ├── styles/              # Estilos globales
│   │
│   ├── utils/               # Utilidades
│   │
│   ├── interfaces/          # Interfaces TypeScript
│   │
│   ├── Backgrounds/         # Fondos animados
│   │
│   ├── TextAnimations/      # Animaciones de texto
│   │
│   ├── main.jsx             # Punto de entrada
│   └── RutasComponents.jsx  # Configuración de rutas
│
├── public/                  # Recursos públicos
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

---

## 📝 Convenciones y Buenas Prácticas

### Nomenclatura

#### Backend (TypeScript)

```typescript
// Archivos: PascalCase
UsuarioController.ts
ActividadModel.ts

// Clases: PascalCase
class UsuarioController { }

// Interfaces: PascalCase con prefijo I (opcional)
interface IUsuario { }

// Funciones: camelCase
const obtenerUsuarios = async () => { }

// Constantes: UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5;

// Variables: camelCase
const usuarioActual = await Usuario.findByPk(id);
```

#### Frontend (React + TypeScript)

```typescript
// Componentes: PascalCase
const DashBoard = () => { }

// Hooks personalizados: camelCase con prefijo use
const useAuth = () => { }

// Funciones: camelCase
const handleSubmit = () => { }

// Constantes: UPPER_SNAKE_CASE o camelCase
const API_URL = 'http://localhost:3002';
```

### Estructura de Archivos

#### Controlador (Backend)

```typescript
// ActividadController.ts
import { Request, Response } from 'express';
import Actividad from '../models/Actividad';

export class ActividadController {
    
    // Obtener todas las actividades
    static obtenerActividades = async (req: Request, res: Response) => {
        try {
            const actividades = await Actividad.findAll({
                include: ['evento', 'usuario']
            });
            
            res.json(actividades);
        } catch (error) {
            console.error('Error al obtener actividades:', error);
            res.status(500).json({ 
                error: 'Error al obtener actividades' 
            });
        }
    };
    
    // Crear actividad
    static crearActividad = async (req: Request, res: Response) => {
        try {
            const actividad = await Actividad.create(req.body);
            res.status(201).json(actividad);
        } catch (error) {
            console.error('Error al crear actividad:', error);
            res.status(500).json({ 
                error: 'Error al crear actividad' 
            });
        }
    };
}
```

#### Modelo (Backend)

```typescript
// Actividad.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Usuario from './Usuario';
import Evento from './Evento';

@Table({
    tableName: 'Actividad',
    timestamps: false
})
class Actividad extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    IdActividad!: number;
    
    @Column({
        type: DataType.STRING(150),
        allowNull: false
    })
    NombreActi!: string;
    
    @ForeignKey(() => Evento)
    @Column({
        type: DataType.INTEGER
    })
    IdEvento!: number;
    
    @BelongsTo(() => Evento)
    evento!: Evento;
}

export default Actividad;
```

#### Ruta (Backend)

```typescript
// Actividad.Routes.ts
import { Router } from 'express';
import { ActividadController } from '../controllers/ActividadController';
import { authenticate } from '../middleware/auth';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

// GET /api/actividad - Obtener todas
router.get('/', 
    ActividadController.obtenerActividades
);

// POST /api/actividad - Crear nueva
router.post('/',
    authenticate,
    body('NombreActi').notEmpty().withMessage('El nombre es obligatorio'),
    body('FechaInicio').isDate().withMessage('Fecha inválida'),
    handleInputErrors,
    ActividadController.crearActividad
);

export default router;
```

#### Componente React

```typescript
// Actividades.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Actividad {
    IdActividad: number;
    NombreActi: string;
    FechaInicio: string;
    TipoLudica: string;
}

const Actividades: React.FC = () => {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        obtenerActividades();
    }, []);
    
    const obtenerActividades = async () => {
        try {
            const { data } = await axios.get('http://localhost:3002/api/actividad');
            setActividades(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div>Cargando...</div>;
    
    return (
        <div className="actividades-container">
            <h1>Actividades</h1>
            {actividades.map(actividad => (
                <div key={actividad.IdActividad}>
                    <h3>{actividad.NombreActi}</h3>
                    <p>{actividad.TipoLudica}</p>
                </div>
            ))}
        </div>
    );
};

export default Actividades;
```

### Manejo de Errores

```typescript
// ✅ CORRECTO - Backend
try {
    const usuario = await Usuario.findByPk(id);
    
    if (!usuario) {
        return res.status(404).json({ 
            error: 'Usuario no encontrado' 
        });
    }
    
    res.json(usuario);
} catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
        error: 'Error interno del servidor' 
    });
}

// ✅ CORRECTO - Frontend
try {
    const { data } = await axios.get('/api/usuario');
    setUsuarios(data);
} catch (error) {
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Error al cargar usuarios');
    }
}
```

### Commits

Usar **Conventional Commits**:

```bash
feat: agregar endpoint para exportar constancias
fix: corregir validación de fechas en actividades
docs: actualizar README con instrucciones de instalación
style: formatear código con prettier
refactor: optimizar consultas de asistencia
test: agregar tests para UsuarioController
chore: actualizar dependencias
```

---

## 🔧 Guía de Desarrollo Backend

### Crear un Nuevo Modelo

**1. Crear archivo en `/src/models/`**:

```typescript
// NuevoModelo.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'NuevoModelo',
    timestamps: false
})
class NuevoModelo extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;
    
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    nombre!: string;
}

export default NuevoModelo;
```

**2. Registrar en `/src/config/db.ts`**:

```typescript
import NuevoModelo from '../models/NuevoModelo';

db.addModels([
    // ... otros modelos
    NuevoModelo
]);
```

**3. Sincronizar base de datos**:

```bash
npm run dev
# Sequelize sincronizará automáticamente
```

### Crear un Nuevo Endpoint

**1. Crear controlador**:

```typescript
// NuevoController.ts
export class NuevoController {
    static metodo = async (req: Request, res: Response) => {
        try {
            // Lógica
            res.json({ message: 'Éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error' });
        }
    };
}
```

**2. Crear ruta**:

```typescript
// Nuevo.Routes.ts
import { Router } from 'express';
import { NuevoController } from '../controllers/NuevoController';

const router = Router();

router.get('/', NuevoController.metodo);

export default router;
```

**3. Registrar en `/src/server.ts`**:

```typescript
import nuevoRoutes from './routes/Nuevo.Routes';

app.use('/api/nuevo', nuevoRoutes);
```

### Agregar Middleware

```typescript
// middleware/miMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const miMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Lógica del middleware
    console.log('Middleware ejecutado');
    next();
};

// Uso en ruta
router.get('/', miMiddleware, Controller.metodo);
```

### Trabajar con Relaciones

```typescript
// Obtener con relaciones
const actividad = await Actividad.findByPk(id, {
    include: [
        { model: Evento, as: 'evento' },
        { model: Usuario, as: 'usuario' },
        { 
            model: Asistencia, 
            as: 'asistencias',
            include: [{ model: Usuario }]
        }
    ]
});

// Crear con relaciones
const evento = await Evento.create({
    NombreEvento: 'Mi Evento',
    actividades: [
        { NombreActi: 'Actividad 1' },
        { NombreActi: 'Actividad 2' }
    ]
}, {
    include: [Actividad]
});
```

---

## ⚛️ Guía de Desarrollo Frontend

### Crear un Nuevo Componente

```typescript
// src/Components/MiComponente/MiComponente.tsx
import React from 'react';
import './MiComponente.css';

interface MiComponenteProps {
    titulo: string;
    onAction?: () => void;
}

const MiComponente: React.FC<MiComponenteProps> = ({ titulo, onAction }) => {
    return (
        <div className="mi-componente">
            <h2>{titulo}</h2>
            <button onClick={onAction}>Acción</button>
        </div>
    );
};

export default MiComponente;
```

### Crear una Nueva Página

```typescript
// src/pages/MiPagina/MiPagina.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const MiPagina: React.FC = () => {
    const { usuario } = useAuth();
    const [datos, setDatos] = useState([]);
    
    useEffect(() => {
        cargarDatos();
    }, []);
    
    const cargarDatos = async () => {
        try {
            const { data } = await axios.get('/api/datos');
            setDatos(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div>
            <h1>Mi Página</h1>
            {/* Contenido */}
        </div>
    );
};

export default MiPagina;
```

### Agregar Ruta

```typescript
// RutasComponents.jsx
import MiPagina from './pages/MiPagina/MiPagina';

<Routes>
    {/* ... otras rutas */}
    <Route path="/mi-pagina" element={<MiPagina />} />
</Routes>
```

### Usar Context API

```typescript
// Context/MiContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface MiContextType {
    valor: string;
    setValor: (val: string) => void;
}

const MiContext = createContext<MiContextType | undefined>(undefined);

export const MiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [valor, setValor] = useState('');
    
    return (
        <MiContext.Provider value={{ valor, setValor }}>
            {children}
        </MiContext.Provider>
    );
};

export const useMiContext = () => {
    const context = useContext(MiContext);
    if (!context) throw new Error('useMiContext debe usarse dentro de MiProvider');
    return context;
};
```

### Hacer Peticiones HTTP

```typescript
// Con axios
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// GET
const obtenerDatos = async () => {
    const { data } = await axios.get(`${API_URL}/datos`);
    return data;
};

// POST con autenticación
const crearDato = async (dato: any) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`${API_URL}/datos`, dato, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

// PUT
const actualizarDato = async (id: number, dato: any) => {
    const { data } = await axios.put(`${API_URL}/datos/${id}`, dato);
    return data;
};

// DELETE
const eliminarDato = async (id: number) => {
    await axios.delete(`${API_URL}/datos/${id}`);
};
```

---

## ➕ Agregar Nuevas Funcionalidades

### Ejemplo: Agregar Módulo de "Eventos Especiales"

#### Backend

**1. Crear modelo**:

```typescript
// models/EventoEspecial.ts
@Table({ tableName: 'EventoEspecial' })
class EventoEspecial extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    IdEventoEspecial!: number;
    
    @Column({ type: DataType.STRING(200) })
    Titulo!: string;
    
    @Column({ type: DataType.TEXT })
    Descripcion!: string;
}
```

**2. Crear controlador**:

```typescript
// controllers/EventoEspecialController.ts
export class EventoEspecialController {
    static obtenerTodos = async (req: Request, res: Response) => {
        const eventos = await EventoEspecial.findAll();
        res.json(eventos);
    };
    
    static crear = async (req: Request, res: Response) => {
        const evento = await EventoEspecial.create(req.body);
        res.status(201).json(evento);
    };
}
```

**3. Crear rutas**:

```typescript
// routes/EventoEspecial.Routes.ts
const router = Router();

router.get('/', EventoEspecialController.obtenerTodos);
router.post('/', authenticate, EventoEspecialController.crear);

export default router;
```

**4. Registrar en server.ts**:

```typescript
import eventoEspecialRoutes from './routes/EventoEspecial.Routes';
app.use('/api/evento-especial', eventoEspecialRoutes);
```

#### Frontend

**1. Crear servicio**:

```typescript
// services/eventoEspecialService.ts
export const obtenerEventosEspeciales = async () => {
    const { data } = await axios.get('/api/evento-especial');
    return data;
};

export const crearEventoEspecial = async (evento: any) => {
    const { data } = await axios.post('/api/evento-especial', evento);
    return data;
};
```

**2. Crear página**:

```typescript
// pages/EventosEspeciales/EventosEspeciales.tsx
const EventosEspeciales = () => {
    const [eventos, setEventos] = useState([]);
    
    useEffect(() => {
        cargarEventos();
    }, []);
    
    const cargarEventos = async () => {
        const data = await obtenerEventosEspeciales();
        setEventos(data);
    };
    
    return (
        <div>
            <h1>Eventos Especiales</h1>
            {/* UI */}
        </div>
    );
};
```

**3. Agregar ruta**:

```typescript
<Route path="/eventos-especiales" element={<EventosEspeciales />} />
```

---

## 🐛 Manejo de Errores y Logs

### Backend

```typescript
// Middleware global de errores (server.ts)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Logging con Morgan
import morgan from 'morgan';
app.use(morgan('dev')); // En desarrollo
app.use(morgan('combined')); // En producción

// Logs personalizados
import colors from 'colors';

console.log(colors.green('✅ Operación exitosa'));
console.log(colors.red('❌ Error crítico'));
console.log(colors.yellow('⚠️ Advertencia'));
console.log(colors.blue('ℹ️ Información'));
```

### Frontend

```typescript
// Interceptor de Axios para errores
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Token expirado
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        
        if (error.response?.status === 403) {
            toast.error('No tienes permisos para esta acción');
        }
        
        return Promise.reject(error);
    }
);

// Error Boundary
class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        console.error('Error capturado:', error, errorInfo);
    }
    
    render() {
        return this.props.children;
    }
}
```

---

## 🧪 Testing y Debugging

### Debugging Backend

```typescript
// Usar console.log estratégicamente
console.log('📥 Request body:', req.body);
console.log('👤 Usuario autenticado:', req.usuario);
console.log('📊 Resultado query:', resultado);

// Debugger de Node.js
// Agregar breakpoint en código
debugger;

// Ejecutar con inspector
node --inspect-brk dist/index.js
```

### Debugging Frontend

```typescript
// React DevTools
// Instalar extensión en Chrome/Firefox

// Console logs
console.log('Estado actual:', estado);
console.table(arrayDeDatos);

// Debugger
debugger;

// Inspeccionar props
const MiComponente = (props) => {
    console.log('Props recibidas:', props);
    return <div>...</div>;
};
```

### Herramientas Útiles

```bash
# Postman / Insomnia
# Para probar endpoints de la API

# MySQL Workbench
# Para inspeccionar la base de datos

# Redux DevTools (si se usa Redux)
# Para inspeccionar estado global

# React Developer Tools
# Para inspeccionar componentes
```

---

## 🚀 Despliegue

### Preparar para Producción

#### Backend

```bash
# 1. Compilar TypeScript
npm run build

# 2. Configurar variables de entorno
# Crear .env.production

# 3. Iniciar en producción
npm start
```

#### Frontend

```bash
# 1. Build de producción
npm run build

# 2. Los archivos estarán en /dist
# Servir con servidor estático (nginx, apache, etc.)
```

### Variables de Entorno en Producción

```env
# Backend
NODE_ENV=production
DB_HOST=tu-servidor-mysql.com
JWT_SECRET=clave_super_segura_aleatoria_larga
PORT=3002

# Desactivar logs detallados
DEBUG=false
```

### Checklist de Despliegue

- [ ] Cambiar `JWT_SECRET` a valor seguro
- [ ] Configurar CORS para dominio específico
- [ ] Habilitar HTTPS
- [ ] Configurar backups de base de datos
- [ ] Configurar logs en archivo (no solo consola)
- [ ] Optimizar imágenes y assets
- [ ] Minificar código
- [ ] Configurar CDN para assets estáticos
- [ ] Implementar rate limiting
- [ ] Configurar monitoreo (PM2, New Relic, etc.)

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Node.js](https://nodejs.org/docs)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Socket.IO](https://socket.io/docs/)

### Comunidad

- GitHub Issues: [Reportar bugs](https://github.com/ALexjh117/Activsenafinalstack/issues)
- Documentación del proyecto: `/docs`

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0
