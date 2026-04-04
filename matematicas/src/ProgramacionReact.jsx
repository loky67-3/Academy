import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- CONFIGURACIÓN DE DISEÑO (DESIGN TOKENS) ---
const UI = {
  colors: {
    bg: '#020617',
    surface: '#000000',
    text: '#ffffff',
    secondary: '#94a3b8',
    accent: '#61dbfb', // React Cyan
    border: '#ffffff',
    firebase: '#ffca28'
  },
  fonts: {
    mono: '"JetBrains Mono", "Fira Code", monospace',
    sans: '"Inter", system-ui, sans-serif'
  },
  shadows: {
    glow: '0 0 20px rgba(97, 219, 251, 0.3)',
    hard: '0 20px 50px rgba(0,0,0,0.8)'
  }
};

// --- PERSONAJE ATOMIC-BOT (REACT MASCOT) ---
const AtomicBot = ({ expression = 'happy', size = 150 }) => {
  const { accent: reactColor } = UI.colors;
  return (
    <div className="atomic-bot-container">
    <svg width={size} height={size} viewBox="0 0 200 200" className="react-atom-svg">
      {/* Órbitas del Átomo */}
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke={reactColor} strokeWidth="2" transform="rotate(0, 100, 100)" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke={reactColor} strokeWidth="2" transform="rotate(60, 100, 100)" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke={reactColor} strokeWidth="2" transform="rotate(120, 100, 100)" opacity="0.5" />
      
      {/* Cuerpo del Robot */}
      <rect x="60" y="60" width="80" height="80" rx="20" fill="rgba(15, 23, 42, 0.95)" stroke={reactColor} strokeWidth="5" />
      <circle cx="85" cy="90" r="8" fill="white" />
      <circle cx="115" cy="90" r="8" fill="white" />
      
      {expression === 'happy' ? (
        <path d="M85 110 Q 100 125 115 110" stroke={reactColor} strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M90 115 L110 115" stroke="white" strokeWidth="4" strokeLinecap="round" />
      )}
      
      {/* Núcleo */}
      <circle cx="100" cy="100" r="10" fill={reactColor} />
      <text x="100" y="30" fill="white" fontSize="16" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '3px' }}>REACT-OS</text>
    </svg>
    </div>
  );
};

// --- BLOQUE DE CÓDIGO MASIVO (WHITE THEME) ---
const BigCodeBlock = ({ title, code, description }) => (
  <div className="code-card">
    <div className="code-header">
      <span className="code-title">{title}</span>
      <span className="code-lang">MASTER CODE</span>
    </div>
    <div className="code-body">
      <pre className="code-content">
        <code>{code}</code>
      </pre>
      {description && (
        <div className="code-explanation">
          <strong className="explanation-label">Lógica del Sistema:</strong> <br/> {description}
        </div>
      )}
    </div>
  </div>
);

const GiantNumberStep = ({ num, title, text }) => (
  <div className="step-container">
    <div className="step-number">{num}</div>
    <div className="step-content">
      <h3 className="step-title">{title}</h3>
      <p className="step-text">{text}</p>
    </div>
  </div>
);

const ProgramacionReact = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 10);
    }
  };

  return (
    <div className="react-master-page">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '180px 10% 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <AtomicBot />
          <div style={{ textAlign: 'left', maxWidth: '700px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#fff' }}>React <span style={{ color: '#61dbfb' }}>Architecture</span></h1>
            <p className="hero-subtitle" style={{ color: '#94a3b8', fontSize: '1.6rem' }}>"No solo construyas sitios web. Construye interfaces reactivas que dominen el DOM y escalen al infinito."</p>
          </div>
        </div>
        
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '50px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid #ffffff22' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '2px' }}>
            <span>KERNEL PERFORMANCE</span>
            <span>{points} XP</span>
          </div>
          <div style={{ height: '20px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: '#ffffff', transition: '1.5s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 0 20px #61dbfb' }}></div>
          </div>
        </div>
      </section>

      {/* --- CORE CONCEPTS --- */}
      <section className="info-section">
        <h2 className="section-title" style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '-3px' }}>DOMINIO <span style={{ color: '#61dbfb' }}>REACT</span></h2>
        
        <GiantNumberStep 
          num="01" title="Componentes" 
          text="React es el motor de interfaces. Divide la UI en piezas atómicas llamadas Componentes. Cada pieza maneja su propia lógica y estilo, permitiendo crear sistemas complejos a partir de bloques simples." 
        />
        <BigCodeBlock 
          title="Estructura Básica"
          code={`function Saludo(props) {\n  return (\n    <div className="card">\n      <h1>Hola, {props.nombre}</h1>\n    </div>\n  );\n}`}
          description="El flujo de datos unidireccional es vital. Usamos Props (propiedades) para inyectar datos desde un padre hacia un hijo, permitiendo que un mismo diseño se use con mil datos diferentes."
        />

        <GiantNumberStep 
          num="02" title="Hooks (Estado)" 
          text="Los Hooks son funciones que te permiten 'enganchar' el estado de React y el ciclo de vida. useState es la memoria del componente: si el dato cambia, la interfaz se refresca sin recargar la página." 
        />
        <BigCodeBlock 
          title="Mecánica de useState & useEffect"
          code={`const [data, setData] = useState([]);\n\nuseEffect(() => {\n  const fetchData = async () => {\n    const response = await fetch('api/endpoint');\n    const json = await response.json();\n    setData(json);\n  };\n  fetchData();\n}, []); // El array vacío evita bucles infinitos`}
          description="1. useState crea un estado persistente. 2. useEffect detecta el nacimiento del componente. 3. Sincronizamos datos externos con la UI de forma asíncrona."
        />
      </section>

      {/* --- ROUTING SECTION --- */}
      <section className="info-section" style={{ background: '#000', padding: '5rem 10%' }}>
        <h2 className="section-title">Navegación <span style={{ color: '#61dbfb' }}>Estratégica</span></h2>
        <p style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>¿Cómo organizar las rutas de tu aplicación de forma profesional?</p>
        
        <div className="benefits-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="benefit-card" style={{ background: 'transparent', border: '2px solid #334155' }}>
            <BigCodeBlock 
              title="App.jsx (Router Config)"
              code={`import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';\n\nconst App = () => (\n  <BrowserRouter>\n    <Navbar />\n    <Routes>\n      <Route path="/" element={<Landing />} />\n      <Route path="/dashboard" element={\n        <ProtectedRoute>\n          <AdminPanel />\n        </ProtectedRoute>\n      } />\n      <Route path="/404" element={<NotFound />} />\n      <Route path="*" element={<Navigate to="/404" />} />\n    </Routes>\n  </BrowserRouter>\n);`}
              description="Navegación sin recarga. El BrowserRouter intercepta las URLs del navegador y el componente Routes actúa como un switch que elige qué mostrar basándose en la URL."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.5rem' }}>BrowserRouter</h4>
                <p>Envuelve toda tu app para habilitar la navegación sin recargar la página.</p>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#61dbfb' }}>Routes & Route</h4>
                <p>El despachador. Mira la URL y decide qué componente debe renderizarse en ese momento.</p>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#ffffff', fontSize: '1.5rem' }}>useNavigate()</h4>
                <p>Un hook para cambiar de página mediante código (por ejemplo, después de un login).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FIREBASE INTEGRATION --- */}
      <section className="info-section">
        <div className="firebase-master-container">
          <h2 className="section-title" style={{ fontSize: '4rem' }}>CLOUD <span style={{ color: '#ffca28' }}>FIREBASE</span></h2>
          <p style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '3rem' }}>Conecta tu lógica con el mundo real. Firebase maneja el backend por ti.</p>
          
          <div style={{ marginTop: '3rem' }}>
            <BigCodeBlock 
              title="firebaseConfig.js"
              code={`import { initializeApp } from "firebase/app";\nimport { getFirestore } from "firebase/firestore";\nimport { getAuth } from "firebase/auth";\n\nconst config = {\n  apiKey: "REACT_APP_API_KEY",\n  authDomain: "edu-neon.firebaseapp.com",\n  projectId: "edu-neon",\n  storageBucket: "edu-neon.appspot.com",\n};\n\nconst app = initializeApp(config);\nexport const db = getFirestore(app);\nexport const auth = getAuth(app);`}
              description="Configuración maestra. Centralizamos la conexión a la base de datos (Firestore) y al motor de usuarios (Auth)."
            />
            
            <BigCodeBlock 
              title="CRUD Ops (Create & Read)"
              code={`import { collection, addDoc, onSnapshot } from "firebase/firestore";\n\n// 1. Crear documento\nconst saveUser = (u) => addDoc(collection(db, "users"), u);\n\n// 2. Leer en tiempo real\nuseEffect(() => {\n  const unsub = onSnapshot(collection(db, "users"), (snap) => {\n    const docs = snap.docs.map(doc => ({...doc.data(), id: doc.id}));\n    console.log(docs);\n  });\n  return () => unsub();\n}, []);`}
              description="Firestore es reactivo. Con onSnapshot, cualquier cambio en la base de datos actualiza la pantalla de todos los usuarios al instante."
            />
          </div>
        </div>
      </section>

      {/* --- FOLDER STRUCTURE --- */}
      <section className="info-section">
        <h2 className="section-title">Organización <span style={{ color: '#61dbfb' }}>Industrial</span></h2>
        <div className="benefit-card" style={{ textAlign: 'left', background: '#000', border: '1px solid #334155' }}>
          <pre style={{ fontSize: '1.2rem', color: '#ffffff' }}>
            {`src/\n ├── assets/       # Imágenes y estilos globales\n ├── components/   # Piezas pequeñas (Botones, inputs)\n ├── context/      # Estado global (Auth, Temas)\n ├── hooks/        # Lógica personalizada (useLocalStorage)\n ├── pages/        # Vistas completas (Home, Login, Dashboard)\n ├── services/     # Llamadas a Firebase / APIs\n └── App.jsx       # Rutas y configuración principal`}
          </pre>
          <p style={{ marginTop: '20px', color: '#94a3b8' }}>Esta estructura permite que 50 desarrolladores trabajen en el mismo proyecto sin chocar.</p>
        </div>
      </section>

      {/* --- EXERCISE LAB --- */}
      <section className="info-section">
        <h2 className="section-title">React <span style={{ color: '#61dbfb' }}>Laboratory</span></h2>
        <p className="section-subtitle">Completa el código para que el Virtual DOM no colapse.</p>
        <div className="grid-container">
          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '4px solid #61dbfb' }}>
            <h4 style={{ color: '#61dbfb', marginBottom: '10px' }}>LOGIC #1</h4>
            <p style={{ fontSize: '1.1rem' }}>Importar el hook para manejar estados:</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <code style={{ fontSize: '1rem', background: '#000', padding: '10px', borderRadius: '5px' }}>import {'{'} ___ {'}'} from 'react';</code>
              <input 
                type="text" 
                placeholder="Hook?"
                onChange={(e) => e.target.value === 'useState' && handleSolved('r1')}
                style={{ background: '#1e293b', border: '1px solid #61dbfb', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '4px solid #61dbfb' }}>
            <h4 style={{ color: '#61dbfb', marginBottom: '10px' }}>LOGIC #2</h4>
            <p style={{ fontSize: '1.1rem' }}>Atributo para poner clases en JSX:</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <code style={{ fontSize: '1rem', background: '#000', padding: '10px', borderRadius: '5px' }}>&lt;div ___="container"&gt;</code>
              <input 
                type="text" 
                placeholder="..."
                onChange={(e) => e.target.value === 'className' && handleSolved('r2')}
                style={{ background: '#1e293b', border: '1px solid #61dbfb', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '4px solid #61dbfb' }}>
            <h4 style={{ color: '#61dbfb', marginBottom: '10px' }}>FIREBASE</h4>
            <p style={{ fontSize: '1.1rem' }}>Función para inicializar la app:</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <code style={{ fontSize: '1rem', background: '#000', padding: '10px', borderRadius: '5px' }}>const app = ___ (config);</code>
              <input 
                type="text" 
                placeholder="..."
                onChange={(e) => e.target.value === 'initializeApp' && handleSolved('r3')}
                style={{ background: '#1e293b', border: '1px solid #61dbfb', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '4px solid #61dbfb' }}>
            <h4 style={{ color: '#61dbfb', marginBottom: '10px' }}>ROUTING</h4>
            <p style={{ fontSize: '1.1rem' }}>Componente para crear enlaces:</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <code style={{ fontSize: '1rem', background: '#000', padding: '10px', borderRadius: '5px' }}>&lt;___ to="/home"&gt;</code>
              <input 
                type="text" 
                placeholder="..."
                onChange={(e) => e.target.value === 'Link' && handleSolved('r4')}
                style={{ background: '#1e293b', border: '1px solid #61dbfb', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}
              />
            </div>
          </div>
        </div>

        {/* Fénix de React - Decorativo */}
        <div className="mobile-hide" style={{ position: 'absolute', left: '2%', bottom: '10%', animation: 'float 8s ease-in-out infinite', opacity: 0.6 }}>
          <svg width="180" height="180" viewBox="0 0 100 100">
            <path d="M50 10 Q 90 40 50 90 Q 10 40 50 10" fill="none" stroke="#61dbfb" strokeWidth="2" />
            <circle cx="50" cy="45" r="10" fill="#61dbfb" filter="blur(5px)" />
          </svg>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '80px' }}>
        <button className="btn-login" style={{ background: '#fff', color: '#000', padding: '1.5rem 4rem', fontSize: '1.2rem', fontWeight: '900' }} onClick={() => navigate('/')}>VOLVER AL MAINFRAME</button>
      </div>

      {/* --- SISTEMA DE ESTILOS CENTRALIZADO --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .react-master-page {
          background: ${UI.colors.bg};
          color: ${UI.colors.text};
          min-height: 100vh;
          font-family: ${UI.colors.sans};
        }

        /* Atomic Bot Animation */
        .atomic-bot-container {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }
        .react-atom-svg {
          filter: drop-shadow(0 0 20px ${UI.colors.accent});
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        /* Code Card Architecture */
        .code-card {
          background: ${UI.colors.surface};
          border-radius: 20px;
          border: 3px solid ${UI.colors.border};
          margin: 3rem 0;
          overflow: hidden;
          text-align: left;
          box-shadow: ${UI.shadows.hard};
          transition: 0.3s transform ease;
        }
        .code-card:hover { transform: scale(1.01); }
        
        .code-header {
          background: ${UI.colors.border};
          padding: 12px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .code-title { color: #000; font-weight: 900; font-size: 1rem; }
        .code-lang { color: ${UI.colors.accent}; font-weight: 800; font-size: 0.8rem; }

        .code-content {
          padding: 40px;
          margin: 0;
          color: ${UI.colors.text};
          font-size: 1.3rem;
          font-family: ${UI.colors.mono};
          line-height: 1.7;
          overflow-x: auto;
        }

        .code-explanation {
          padding: 30px;
          background: ${UI.colors.text};
          color: #000;
          border-top: 1px solid #334155;
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.6;
        }
        .explanation-label { text-transform: uppercase; letter-spacing: 1px; color: ${UI.colors.accent}; }

        /* Step Design */
        .step-container {
          display: flex;
          gap: 40px;
          gap: 20px;
          margin: 6rem 0;
          text-align: left;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .step-number {
          font-size: 12rem;
          font-weight: 900;
          color: ${UI.colors.text};
          line-height: 0.7;
          opacity: 0.1;
          min-width: 180px;
          min-width: 100px;
          user-select: none;
        }
        @media (max-width: 768px) {
          .step-number { font-size: 6rem; min-width: 60px; }
          .step-title { font-size: 2rem; }
        }
        .step-title {
          font-size: 3rem;
          color: ${UI.colors.text};
          font-weight: 900;
          margin-bottom: 20px;
          text-transform: uppercase;
          border-bottom: 4px solid ${UI.colors.accent};
          display: inline-block;
        }
        .step-text {
          font-size: 1.6rem;
          color: ${UI.colors.secondary};
          line-height: 1.6;
          font-weight: 400;
        }

        /* Firebase Section */
        .firebase-master-container {
          border: 5px solid ${UI.colors.text};
          border-radius: 40px;
          padding: 5rem;
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 0 40px rgba(255, 202, 40, 0.1);
        }
      `}} />
    </div>
  );
};

export default ProgramacionReact;