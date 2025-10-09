# Documentación del Frontend - ActivSena

## 📋 Tabla de Contenidos

- [Introducción](#introducción)
- [Arquitectura del Frontend](#arquitectura-del-frontend)
- [Estructura de Componentes](#estructura-de-componentes)
- [Gestión de Estado](#gestión-de-estado)
- [Rutas y Navegación](#rutas-y-navegación)
- [Servicios y API](#servicios-y-api)
- [Autenticación](#autenticación)
- [Páginas Principales](#páginas-principales)
- [Componentes Reutilizables](#componentes-reutilizables)
- [Estilos y Diseño](#estilos-y-diseño)
- [Optimización y Performance](#optimización-y-performance)

---

## 🎯 Introducción

El frontend de **ActivSena** está construido con **React 19** y **TypeScript**, utilizando **Vite** como build tool para un desarrollo rápido y eficiente. La aplicación implementa una arquitectura modular y escalable con componentes reutilizables.

### Stack Tecnológico Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.0 | Biblioteca UI |
| **TypeScript** | 5.8.3 | Tipado estático |
| **Vite** | 6.2.3 | Build tool y dev server |
| **React Router DOM** | 7.4.1 | Enrutamiento SPA |
| **Axios** | 1.9.0 | Cliente HTTP |
| **Bootstrap** | 5.3.8 | Framework CSS |
| **TailwindCSS** | 4.0.15 | Utility-first CSS |
| **Framer Motion** | 11.18.2 | Animaciones |
| **GSAP** | 3.13.0 | Animaciones avanzadas |
| **Socket.IO Client** | 4.8.1 | WebSockets |
| **React Big Calendar** | 1.19.4 | Calendario de eventos |
| **Recharts** | 3.2.1 | Gráficos y visualización |
| **SweetAlert2** | 11.22.2 | Alertas modales |
| **React Hot Toast** | 2.6.0 | Notificaciones toast |
| **Lucide React** | 0.525.0 | Iconos |

---

## 🏗️ Arquitectura del Frontend

### Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO                              │
│                       ↓                                 │
│                  COMPONENTES UI                         │
│                       ↓                                 │
│              EVENTOS / HANDLERS                         │
│                       ↓                                 │
│              SERVICIOS API (Axios)                      │
│                       ↓                                 │
│              BACKEND (REST API)                         │
│                       ↓                                 │
│              ACTUALIZACIÓN ESTADO                       │
│                       ↓                                 │
│              RE-RENDER COMPONENTES                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              GESTIÓN DE ESTADO GLOBAL                   │
│                                                         │
│  Context API (AuthContext, IAContext)                   │
│         ↓                    ↓                          │
│    useState              useEffect                      │
│         ↓                    ↓                          │
│  Componentes consumidores                               │
└─────────────────────────────────────────────────────────┘
```

### Patrón de Arquitectura

ActivSena utiliza una arquitectura **basada en componentes** con separación de responsabilidades:

- **Pages**: Componentes de página completa
- **Components**: Componentes reutilizables
- **Context**: Estado global compartido
- **Services**: Lógica de comunicación con API
- **Utils**: Funciones auxiliares
- **Interfaces**: Definiciones de tipos TypeScript

---

## 📦 Estructura de Componentes

### Árbol de Componentes Principal

```
App (RutasComponents.jsx)
├── ToastProvider
├── AuthProvider (Context)
│   └── IAProvider (Context)
│       └── Routes
│           ├── HomePage
│           ├── DashBoard (Admin)
│           │   ├── Sidebar
│           │   ├── Navbar
│           │   └── Content
│           │       ├── GestionUsuarios
│           │       ├── GestionActividades
│           │       ├── GestionEventos
│           │       └── Estadísticas
│           │
│           ├── DashBoardAp (Aprendiz)
│           │   ├── MisActividades
│           │   ├── MisAsistencias
│           │   ├── MisSolicitudes
│           │   └── Notificaciones
│           │
│           ├── DashBoardIn (Instructor)
│           │   ├── CrearActividad
│           │   ├── GestionarAsistencia
│           │   └── Feedback
│           │
│           ├── Actividades
│           │   ├── ListaActividades
│           │   ├── DetalleActividad
│           │   └── FormularioActividad
│           │
│           ├── Asistencia
│           │   ├── EscanerQR
│           │   ├── HistorialAsistencia
│           │   └── QRGenerator
│           │
│           ├── Feedback
│           │   ├── FormularioFeedback
│           │   └── ResultadosFeedback
│           │
│           ├── ApoyoSostenimiento
│           │   ├── FormularioSolicitud
│           │   └── MisSolicitudes
│           │
│           └── AnalisisIA
│               ├── DashboardIA
│               └── ChatAI
```

### Estructura de Carpetas Detallada

```
src/
├── pages/                          # Páginas principales (40+ módulos)
│   ├── Home/                       # Página de inicio
│   │   ├── HomePage.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── styles.css
│   │
│   ├── DashBoard/                  # Dashboard Administrador
│   │   ├── DashBoard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── GestionUsuarios.tsx
│   │   ├── Estadisticas.tsx
│   │   └── ...
│   │
│   ├── Actividades/                # Gestión de actividades
│   │   ├── Actividades.tsx
│   │   ├── CrearActividad.tsx
│   │   ├── EditarActividad.tsx
│   │   ├── DetalleActividad.tsx
│   │   └── ListaActividades.tsx
│   │
│   ├── Asistencia/                 # Control de asistencia
│   │   ├── Asistencia.tsx
│   │   ├── EscanerQR.tsx
│   │   ├── HistorialAsistencia.tsx
│   │   ├── RegistroManual.tsx
│   │   └── ReporteAsistencia.tsx
│   │
│   ├── Feedback/                   # Sistema de feedback
│   │   ├── Feedbacks.tsx
│   │   ├── CrearFeedback.tsx
│   │   ├── ResponderFeedback.tsx
│   │   ├── ResultadosFeedback.tsx
│   │   └── AnalisisFeedback.tsx
│   │
│   ├── ApoyoSostenimiento/         # Solicitudes de apoyo
│   │   ├── ApoyoSostenimiento.tsx
│   │   ├── FormularioSolicitud.tsx
│   │   ├── MisSolicitudes.tsx
│   │   ├── AprobarSolicitudes.tsx
│   │   └── HistorialSolicitudes.tsx
│   │
│   ├── Alquiler/                   # Préstamo de elementos
│   │   ├── CatalogoElementos.tsx
│   │   ├── SolicitarPrestamo.tsx
│   │   ├── MisPrestamos.tsx
│   │   └── GestionPrestamos.tsx
│   │
│   ├── AnalisisIA/                 # Análisis con IA
│   │   ├── DashboardIA.tsx
│   │   ├── AnalisisSentimientos.tsx
│   │   └── IAcontext.tsx
│   │
│   ├── ChatAI/                     # Chatbot Dialogflow
│   │   ├── ChatAI.tsx
│   │   ├── ChatWindow.tsx
│   │   └── MessageBubble.tsx
│   │
│   ├── Agenda/                     # Calendario de eventos
│   │   ├── Agenda.tsx
│   │   ├── CalendarioMensual.tsx
│   │   ├── VistaEvento.tsx
│   │   └── FiltrosAgenda.tsx
│   │
│   ├── Constancia/                 # Certificados y constancias
│   │   ├── MisConstancias.tsx
│   │   ├── GenerarConstancia.tsx
│   │   └── VistaPrevia.tsx
│   │
│   ├── UserView/                   # Perfil de usuario
│   │   ├── Perfil.tsx
│   │   ├── EditarPerfil.tsx
│   │   ├── CambiarContrasena.tsx
│   │   └── ConfiguracionCuenta.tsx
│   │
│   └── ...
│
├── Components/                     # Componentes reutilizables
│   ├── QrGenerador.jsx/
│   │   ├── QRGenerator.jsx        # Generador de QR
│   │   ├── QRGeneratorSalida.jsx
│   │   ├── EscanerHtml5QR.jsx     # Escáner QR
│   │   └── QRDisplay.jsx
│   │
│   ├── Notificaciones/
│   │   ├── NotificationBell.tsx
│   │   ├── NotificationList.tsx
│   │   └── NotificationItem.tsx
│   │
│   ├── Carousel/
│   │   ├── Carousel.tsx
│   │   └── CarouselItem.tsx
│   │
│   ├── CircularGallery/
│   │   └── CircularGallery.tsx
│   │
│   └── ResumenIA/
│       └── ResumenCard.tsx
│
├── Context/                        # Context API
│   └── AuthContext.tsx             # Autenticación global
│
├── services/                       # Servicios API
│   ├── api.js                      # Configuración Axios
│   ├── authService.js
│   ├── actividadService.js
│   └── ...
│
├── interfaces/                     # Tipos TypeScript
│   └── types.ts
│
├── utils/                          # Utilidades
│   ├── formatters.ts
│   └── validators.ts
│
├── styles/                         # Estilos globales
│   ├── global.css
│   ├── variables.css
│   └── animations.css
│
├── Backgrounds/                    # Fondos animados
│   └── AnimatedBackground.tsx
│
├── TextAnimations/                 # Animaciones de texto
│   ├── TypeWriter.tsx
│   └── FadeIn.tsx
│
├── RutasComponents.jsx             # Configuración de rutas
└── main.jsx                        # Punto de entrada
```

---

## 🔄 Gestión de Estado

### AuthContext (Autenticación Global)

```typescript
// Context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface Usuario {
    IdUsuario: number;
    Nombre: string;
    Apellido: string;
    Correo: string;
    IdRol: number;
    rol?: {
        NombreRol: string;
    };
}

interface AuthContextType {
    usuario: Usuario | null;
    token: string | null;
    login: (token: string, usuario: Usuario) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isInstructor: boolean;
    isAprendiz: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Recuperar token del localStorage al cargar
        const storedToken = localStorage.getItem('token');
        const storedUsuario = localStorage.getItem('usuario');
        
        if (storedToken && storedUsuario) {
            try {
                const decoded = jwtDecode(storedToken);
                const now = Date.now() / 1000;
                
                if (decoded.exp && decoded.exp > now) {
                    setToken(storedToken);
                    setUsuario(JSON.parse(storedUsuario));
                } else {
                    // Token expirado
                    logout();
                }
            } catch (error) {
                logout();
            }
        }
    }, []);

    const login = (newToken: string, newUsuario: Usuario) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('usuario', JSON.stringify(newUsuario));
        setToken(newToken);
        setUsuario(newUsuario);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    const value = {
        usuario,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: usuario?.IdRol === 1,
        isInstructor: usuario?.IdRol === 3,
        isAprendiz: usuario?.IdRol === 2,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};
```

### IAContext (Análisis de IA)

```typescript
// pages/AnalisisIA/IAcontext.tsx
import React, { createContext, useContext, useState } from 'react';

interface IAContextType {
    analisis: any[];
    setAnalisis: (data: any[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const IAContext = createContext<IAContextType | undefined>(undefined);

export const IAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [analisis, setAnalisis] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <IAContext.Provider value={{ analisis, setAnalisis, loading, setLoading }}>
            {children}
        </IAContext.Provider>
    );
};

export const useIA = () => {
    const context = useContext(IAContext);
    if (!context) throw new Error('useIA debe usarse dentro de IAProvider');
    return context;
};
```

### Estado Local con useState

```typescript
// Ejemplo en componente de Actividades
const Actividades: React.FC = () => {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtro, setFiltro] = useState('todas');
    const [busqueda, setBusqueda] = useState('');

    // Efectos secundarios
    useEffect(() => {
        cargarActividades();
    }, [filtro]);

    const cargarActividades = async () => {
        try {
            setLoading(true);
            const data = await obtenerActividades(filtro);
            setActividades(data);
        } catch (err) {
            setError('Error al cargar actividades');
        } finally {
            setLoading(false);
        }
    };

    // Filtrado local
    const actividadesFiltradas = actividades.filter(act =>
        act.NombreActi.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <input 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar actividad..."
            />
            {/* Renderizar actividades */}
        </div>
    );
};
```

---

## 🛣️ Rutas y Navegación

### Configuración de Rutas

```typescript
// RutasComponents.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { IAProvider } from "./pages/AnalisisIA/IAcontext";

// Importar páginas
import HomePage from "../public/HomePage";
import DashBoard from "../public/DashBoard";
import DashBoardAp from "../public/DashBoardAp";
import DashBoardIn from "../public/DashBoardIn";
import Registro from "../public/Registro";
import Actividades from "./pages/Actividades/Actividades";
import Asistencia from "./pages/Asistencia/Asistencia";
import Feedbacks from "./pages/Feedback/Feedbacks";
import ApoyoSostenimiento from "./pages/ApoyoSostenimiento/ApoyoSostenimiento";

export default function RutasComponents() {
    return (
        <BrowserRouter>
            <ToastProvider />
            <AuthProvider>
                <IAProvider>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/verificar-token" element={<VerificarToken />} />

                        {/* Rutas protegidas - Dashboards */}
                        <Route path="/dash" element={<DashBoard />} />
                        <Route path="/dashap" element={<DashBoardAp />} />
                        <Route path="/dashin" element={<DashBoardIn />} />

                        {/* Rutas de funcionalidades */}
                        <Route path="/actividades" element={<Actividades />} />
                        <Route path="/asistencia" element={<Asistencia />} />
                        <Route path="/historial" element={<HistorialAsistencia />} />
                        <Route path="/feedbacks/:idActividad" element={<Feedbacks />} />
                        <Route path="/apoyo-sostenimiento" element={<ApoyoSostenimiento />} />
                        <Route path="/agenda" element={<Agenda />} />
                        <Route path="/cuenta" element={<Cuenta />} />
                    </Routes>
                </IAProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
```

### Navegación Programática

```typescript
import { useNavigate } from 'react-router-dom';

const MiComponente = () => {
    const navigate = useNavigate();

    const irAActividades = () => {
        navigate('/actividades');
    };

    const irADetalle = (id: number) => {
        navigate(`/actividades/${id}`);
    };

    const volver = () => {
        navigate(-1); // Volver atrás
    };

    return (
        <div>
            <button onClick={irAActividades}>Ver Actividades</button>
            <button onClick={volver}>Volver</button>
        </div>
    );
};
```

### Rutas Protegidas

```typescript
// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { isAuthenticated, usuario } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && usuario?.IdRol !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

// Uso
<Route 
    path="/dash" 
    element={
        <ProtectedRoute requiredRole={1}>
            <DashBoard />
        </ProtectedRoute>
    } 
/>
```

---

## 🌐 Servicios y API

### Configuración de Axios

```typescript
// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
```

### Servicios por Módulo

```typescript
// services/actividadService.ts
import api from './api';

export const obtenerActividades = async () => {
    const { data } = await api.get('/actividad');
    return data;
};

export const obtenerActividadPorId = async (id: number) => {
    const { data } = await api.get(`/actividad/${id}`);
    return data;
};

export const crearActividad = async (actividad: FormData) => {
    const { data } = await api.post('/actividad', actividad, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
};

export const actualizarActividad = async (id: number, actividad: any) => {
    const { data } = await api.put(`/actividad/${id}`, actividad);
    return data;
};

export const eliminarActividad = async (id: number) => {
    await api.delete(`/actividad/${id}`);
};

// services/asistenciaService.ts
export const registrarAsistencia = async (datos: any) => {
    const { data } = await api.post('/asistencia/registrar', datos);
    return data;
};

export const obtenerHistorialAsistencia = async (idUsuario: number) => {
    const { data } = await api.get(`/asistencia/usuario/${idUsuario}`);
    return data;
};

// services/authService.ts
export const login = async (correo: string, contrasena: string) => {
    const { data } = await api.post('/usuario/login', { Correo: correo, Contrasena: contrasena });
    return data;
};

export const registro = async (usuario: any) => {
    const { data } = await api.post('/usuario', usuario);
    return data;
};

export const obtenerPerfil = async () => {
    const { data } = await api.get('/usuario/user');
    return data;
};
```

---

## 🔐 Autenticación

### Flujo de Login

```typescript
// pages/Login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { login as loginService } from '../../services/authService';
import toast from 'react-hot-toast';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const data = await loginService(correo, contrasena);
            
            // Guardar en context
            login(data.token, data.usuario);
            
            toast.success('¡Bienvenido!');
            
            // Redirigir según rol
            if (data.usuario.IdRol === 1) {
                navigate('/dash'); // Admin
            } else if (data.usuario.IdRol === 2) {
                navigate('/dashap'); // Aprendiz
            } else if (data.usuario.IdRol === 3) {
                navigate('/dashin'); // Instructor
            }
        } catch (error) {
            toast.error('Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo electrónico"
                required
            />
            <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
        </form>
    );
};
```

### Persistencia de Sesión

```typescript
// El AuthContext ya maneja la persistencia con localStorage
// Al recargar la página, se recupera el token y usuario

useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsuario = localStorage.getItem('usuario');
    
    if (storedToken && storedUsuario) {
        // Verificar si el token no ha expirado
        const decoded = jwtDecode(storedToken);
        if (decoded.exp > Date.now() / 1000) {
            setToken(storedToken);
            setUsuario(JSON.parse(storedUsuario));
        }
    }
}, []);
```

---

## 📄 Páginas Principales

### 1. HomePage (Página de Inicio)

```typescript
// pages/Home/HomePage.tsx
const HomePage = () => {
    return (
        <div className="homepage">
            <Hero />
            <Features />
            <About />
            <Contact />
        </div>
    );
};

// Sección Hero
const Hero = () => {
    return (
        <section className="hero">
            <h1>Bienvenido a ActivSena</h1>
            <p>Sistema integral de gestión de actividades y eventos</p>
            <button onClick={() => navigate('/registro')}>
                Comenzar
            </button>
        </section>
    );
};
```

### 2. DashBoard (Administrador)

```typescript
// pages/DashBoard/DashBoard.tsx
const DashBoard = () => {
    const { usuario } = useAuth();
    const [estadisticas, setEstadisticas] = useState({
        totalUsuarios: 0,
        totalActividades: 0,
        totalEventos: 0,
        asistenciaPromedio: 0
    });

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="dashboard-content">
                <h1>Panel de Administración</h1>
                
                <div className="stats-grid">
                    <StatCard 
                        title="Usuarios" 
                        value={estadisticas.totalUsuarios}
                        icon={<Users />}
                    />
                    <StatCard 
                        title="Actividades" 
                        value={estadisticas.totalActividades}
                        icon={<Activity />}
                    />
                    <StatCard 
                        title="Eventos" 
                        value={estadisticas.totalEventos}
                        icon={<Calendar />}
                    />
                </div>

                <GraficosAsistencia />
                <TablaRecientes />
            </main>
        </div>
    );
};
```

### 3. Actividades

```typescript
// pages/Actividades/Actividades.tsx
const Actividades = () => {
    const [actividades, setActividades] = useState([]);
    const [filtro, setFiltro] = useState('todas');

    const actividadesFiltradas = actividades.filter(act => {
        if (filtro === 'todas') return true;
        return act.TipoLudica === filtro;
    });

    return (
        <div className="actividades-page">
            <h1>Actividades</h1>
            
            <div className="filtros">
                <button onClick={() => setFiltro('todas')}>Todas</button>
                <button onClick={() => setFiltro('Deportiva')}>Deportivas</button>
                <button onClick={() => setFiltro('Cultural')}>Culturales</button>
                <button onClick={() => setFiltro('Recreativa')}>Recreativas</button>
            </div>

            <div className="actividades-grid">
                {actividadesFiltradas.map(actividad => (
                    <ActividadCard key={actividad.IdActividad} actividad={actividad} />
                ))}
            </div>
        </div>
    );
};
```

### 4. Asistencia con QR

```typescript
// pages/Asistencia/Asistencia.tsx
import { Html5QrcodeScanner } from 'html5-qrcode';

const Asistencia = () => {
    const [escaneando, setEscaneando] = useState(false);
    const { usuario } = useAuth();

    const onScanSuccess = async (decodedText: string) => {
        try {
            const datos = JSON.parse(decodedText);
            
            await registrarAsistencia({
                IdUsuario: usuario.IdUsuario,
                IdActividad: datos.IdActividad,
                TipoQR: datos.tipo
            });
            
            toast.success('Asistencia registrada correctamente');
        } catch (error) {
            toast.error('Error al registrar asistencia');
        }
    };

    useEffect(() => {
        if (escaneando) {
            const scanner = new Html5QrcodeScanner('qr-reader', {
                fps: 10,
                qrbox: 250
            }, false);
            
            scanner.render(onScanSuccess, onScanError);
            
            return () => scanner.clear();
        }
    }, [escaneando]);

    return (
        <div className="asistencia-page">
            <h1>Registrar Asistencia</h1>
            <button onClick={() => setEscaneando(!escaneando)}>
                {escaneando ? 'Detener' : 'Escanear QR'}
            </button>
            <div id="qr-reader"></div>
        </div>
    );
};
```

---

## 🧩 Componentes Reutilizables

### QRGenerator

```typescript
// Components/QrGenerador.jsx/QRGenerator.jsx
import QRCode from 'qrcode.react';

const QRGenerator = ({ IdUsuario, IdActividad, tipo }) => {
    const qrData = JSON.stringify({
        IdUsuario,
        IdActividad,
        tipo, // 'entrada' o 'salida'
        timestamp: Date.now()
    });

    return (
        <div className="qr-generator">
            <QRCode 
                value={qrData}
                size={256}
                level="H"
                includeMargin={true}
            />
            <p>Escanea este código para registrar {tipo}</p>
        </div>
    );
};
```

### NotificationBell

```typescript
// Components/Notificaciones/NotificationBell.tsx
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [noLeidas, setNoLeidas] = useState(0);
    const { usuario } = useAuth();

    useEffect(() => {
        const socket = io('http://localhost:3002');
        
        socket.on(`notificacion-${usuario.IdUsuario}`, (notif) => {
            setNotificaciones(prev => [notif, ...prev]);
            setNoLeidas(prev => prev + 1);
            toast.info(notif.Mensaje);
        });

        return () => socket.disconnect();
    }, [usuario]);

    return (
        <div className="notification-bell">
            <Bell />
            {noLeidas > 0 && <span className="badge">{noLeidas}</span>}
        </div>
    );
};
```

---

## 🎨 Estilos y Diseño

### Sistema de Diseño

**Paleta de Colores**:
```css
:root {
    --primary: #39A900;      /* Verde SENA */
    --secondary: #FF6600;    /* Naranja */
    --dark: #1a1a1a;
    --light: #f5f5f5;
    --success: #28a745;
    --danger: #dc3545;
    --warning: #ffc107;
    --info: #17a2b8;
}
```

**Tipografía**:
```css
body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1 { font-size: 2.5rem; font-weight: 700; }
h2 { font-size: 2rem; font-weight: 600; }
h3 { font-size: 1.5rem; font-weight: 600; }
```

### Animaciones con Framer Motion

```typescript
import { motion } from 'framer-motion';

const FadeIn = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const SlideIn = ({ children }) => (
    <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
    >
        {children}
    </motion.div>
);
```

---

## ⚡ Optimización y Performance

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const Actividades = lazy(() => import('./pages/Actividades/Actividades'));
const DashBoard = lazy(() => import('./pages/DashBoard/DashBoard'));

<Suspense fallback={<Loading />}>
    <Routes>
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/dash" element={<DashBoard />} />
    </Routes>
</Suspense>
```

### Memoización

```typescript
import { useMemo, useCallback } from 'react';

const ListaActividades = ({ actividades, filtro }) => {
    // Memoizar cálculos costosos
    const actividadesFiltradas = useMemo(() => {
        return actividades.filter(act => act.TipoLudica === filtro);
    }, [actividades, filtro]);

    // Memoizar callbacks
    const handleClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []);

    return (
        <div>
            {actividadesFiltradas.map(act => (
                <ActividadCard 
                    key={act.IdActividad}
                    actividad={act}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
};
```

### Optimización de Imágenes

```typescript
// Lazy loading de imágenes
<img 
    src={actividad.Imagen} 
    alt={actividad.NombreActi}
    loading="lazy"
/>

// Usar WebP con fallback
<picture>
    <source srcSet="imagen.webp" type="image/webp" />
    <img src="imagen.jpg" alt="Descripción" />
</picture>
```

---

**Última actualización**: Octubre 2025  
**Versión**: 1.0.0
