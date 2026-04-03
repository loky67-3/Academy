import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- PERSONAJE FLASK-BOT (THE ALCHEMIST) ---
const FlaskBot = ({ expression = 'happy', size = 150 }) => {
  const flaskColor = "#f43f5e"; // Chilli Red / Flask Aesthetic
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 20px ${flaskColor})` }}>
      {/* Botella de Poción (Flask) */}
      <path d="M70 40 L70 70 L40 140 A60 60 0 1 0 160 140 L130 70 L130 40 Z" fill="rgba(15, 23, 42, 0.95)" stroke={flaskColor} strokeWidth="6" />
      <rect x="65" y="30" width="70" height="10" rx="5" fill={flaskColor} />
      
      {/* Líquido Mágico */}
      <path d="M55 110 Q 100 130 145 110 A 50 50 0 1 1 55 110" fill={flaskColor} opacity="0.4" />
      
      {/* Ojos Digitales */}
      <circle cx="85" cy="140" r="8" fill="white" />
      <circle cx="115" cy="140" r="8" fill="white" />
      
      {expression === 'happy' ? (
        <path d="M85 160 Q 100 175 115 160" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M90 165 L110 165" stroke="white" strokeWidth="4" strokeLinecap="round" />
      )}
      
      <text x="100" y="20" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '2px' }}>FLASK-SERVER</text>
    </svg>
  );
};

// --- COMPONENTE DE FLECHA NEÓN ---
const NeonArrow = ({ text, top }) => (
  <div className="neon-arrow-wrapper" style={{ top: top }}>
    <span className="neon-arrow-text">
      {text}
    </span>
    <svg width="40" height="20" viewBox="0 0 40 20">
      <path d="M0 10 H30 M30 5 L38 10 L30 15" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

const ProgramacionFlask = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(10);
  const [solved, setSolved] = useState([]);
  const [botStatus, setBotStatus] = useState('happy');

  const handleSolved = (id) => {
    if (!solved.includes(id)) {
      setSolved([...solved, id]);
      setXp(prev => prev + 30);
      setBotStatus('happy');
    }
  };

  const triggerError = () => {
    setBotStatus('sad');
    setTimeout(() => setBotStatus('happy'), 2000);
  };

  const codeFlask = `
from flask import Flask, render_template, request, jsonify

# 1. CREACIÓN DE LA INSTANCIA
app = Flask(__name__)

# 2. BASE DE DATOS EN MEMORIA
db_alquimia = {
    "pociones": {"curacion": 5, "fuerza": 2},
    "maestros": ["Merlín", "Nicolas Flamel"]
}

# 3. RUTA PRINCIPAL (GET)
@app.route('/')
def index():
    return jsonify({"mensaje": "Servidor Alquimista Online", "version": "2.0"})

# 4. RUTA CON PARÁMETROS DINÁMICOS
@app.route('/alquimista/<nombre>')
def saludar(nombre):
    if nombre in db_alquimia["maestros"]:
        return f"<h1>Bienvenido, Gran Maestro {nombre}</h1>"
    return "<h1>Acceso Denegado: No eres un alquimista registrado</h1>", 403

# 5. MANEJO DE MÉTODOS HTTP (POST)
@app.route('/pocion/crear', methods=['POST'])
def crear_pocion():
    data = request.json
    nueva = data.get("nombre")
    db_alquimia["pociones"][nueva] = 1
    return jsonify({"status": "success", "inventario": db_alquimia["pociones"]})

# 6. LANZAMIENTO DEL KERNEL
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
  `.trim();

  return ( 
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section style={{ padding: '180px 10% 60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <FlaskBot expression={botStatus === 'sad' ? 'sad' : 'happy'} />
          <div style={{ textAlign: 'left', maxWidth: '700px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '900', margin: 0 }}>
              Flask <span style={{ color: '#f43f5e' }}>Micro-Engine</span>
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginTop: '20px' }}>
              "Domina la magia de los servidores. Flask es ligero, rápido y te da el control total sobre cada bit de tu backend."
            </p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', margin: '50px auto 0', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid #f43f5e44' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>SERVER DEPLOYMENT PROGRESS</span>
            <span>{xp} XP</span>
          </div>
          <div style={{ height: '15px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(xp, 100)}%`, height: '100%', background: '#ffffff', transition: '1.5s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 0 20px #f43f5e' }}></div>
          </div>
        </div>
      </section>

      {/* --- CONCEPTS SECTION --- */}
      <section style={{ padding: '4rem 10%' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '4rem' }}>
          Lógica de <span style={{ color: '#f43f5e' }}>Framework</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <div style={{ padding: '30px', border: '2px solid #ffffff', borderRadius: '25px' }}>
            <h3 style={{ fontSize: '2rem', color: '#f43f5e', marginBottom: '15px' }}>01. Routing</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              Es el mapa del tesoro. Tú decides qué código se ejecuta cuando el usuario visita una URL específica como <code>/login</code> o <code>/tienda</code>.
            </p>
          </div>
          <div style={{ padding: '30px', border: '2px solid #ffffff', borderRadius: '25px' }}>
            <h3 style={{ fontSize: '2rem', color: '#f43f5e', marginBottom: '15px' }}>02. WSGI</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              Flask usa el estándar WSGI para comunicarse con el servidor web. Es el traductor entre Python y el protocolo HTTP de internet.
            </p>
          </div>
        </div>
      </section>

      {/* --- CODE DEEP DIVE WITH NEON ARROWS --- */}
      <section style={{ padding: '4rem 10%', background: '#000' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', textAlign: 'left', marginBottom: '3rem' }}>
          Anatomía del <span style={{ color: '#f43f5e' }}>Micro-Servidor</span>
        </h2>
        
        <div className="code-container-flask">
          <div style={{ background: '#000', borderRadius: '20px', border: '3px solid #ffffff', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            <div style={{ background: '#ffffff', padding: '10px 25px', display: 'flex', justifyContent: 'space-between', color: '#000', fontWeight: '900' }}>
              <span>SERVER_KERNEL.PY</span>
              <span style={{ color: '#f43f5e' }}>PYTHON 3.12</span>
            </div>
            
            <div style={{ position: 'relative', overflow: 'visible' }}>
              {/* ARROWS EXPLAINING CODE */}
              <NeonArrow top="20px" text="Importamos el motor de Flask" />
              <NeonArrow top="65px" text="Iniciamos el núcleo de la App" />
              <NeonArrow top="110px" text="Diccionario como Base de Datos" />
              <NeonArrow top="180px" text="Endpoint principal (Root)" />
              <NeonArrow top="245px" text="Variables dinámicas en URL" />
              <NeonArrow top="300px" text="Manejo de códigos de error HTTP" />
              <NeonArrow top="360px" text="Recepción de datos JSON" />
              <NeonArrow top="410px" text="Convierte diccionarios a JSON" />
              <NeonArrow top="460px" text="Lanza el servidor en puerto 5000" />

              <pre style={{ padding: '40px', margin: 0, color: '#ffffff', fontSize: '1.3rem', fontFamily: 'JetBrains Mono, monospace', lineHeight: '1.8', overflowX: 'auto' }}>
                <code>{codeFlask}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXERCISE SECTION --- */}
      <section style={{ padding: '4rem 10%' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', textAlign: 'center', marginBottom: '3rem' }}>
          Flask <span style={{ color: '#f43f5e' }}>Laboratory</span>
        </h2>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '5px solid #f43f5e' }}>
            <h4 style={{ color: '#f43f5e', fontSize: '1.2rem', marginBottom: '15px' }}>RETO #1: INICIALIZACIÓN</h4>
            <p style={{ fontSize: '1rem', color: '#cbd5e1' }}>Escribe la instrucción para crear la app de Flask:</p>
            <div style={{ marginTop: '20px' }}>
              <code style={{ background: '#000', padding: '10px', borderRadius: '5px' }}>app = ___(__name__)</code>
              <input 
                type="text" 
                placeholder="?"
                disabled={solved.includes('f1')}
                onChange={(e) => e.target.value.trim() === 'Flask' ? handleSolved('f1') : (e.target.value.length > 4 && triggerError())}
                style={{ background: '#1e293b', border: '1px solid #f43f5e', color: '#fff', padding: '10px', borderRadius: '8px', width: '100%', marginTop: '10px' }}
              />
            </div>
          </div>

          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '5px solid #f43f5e' }}>
            <h4 style={{ color: '#f43f5e', fontSize: '1.2rem', marginBottom: '15px' }}>RETO #2: ROUTING</h4>
            <p style={{ fontSize: '1rem', color: '#cbd5e1' }}>Símbolo que inicia un decorador de ruta:</p>
            <div style={{ marginTop: '20px' }}>
              <code style={{ background: '#000', padding: '10px', borderRadius: '5px' }}>___app.route('/')</code>
              <input 
                type="text" 
                placeholder="?"
                disabled={solved.includes('f2')}
                onChange={(e) => e.target.value.trim() === '@' ? handleSolved('f2') : (e.target.value.length > 0 && triggerError())}
                style={{ background: '#1e293b', border: '1px solid #f43f5e', color: '#fff', padding: '10px', borderRadius: '8px', width: '100%', marginTop: '10px' }}
              />
            </div>
          </div>

          <div className="benefit-card" style={{ textAlign: 'left', borderTop: '5px solid #f43f5e' }}>
            <h4 style={{ color: '#f43f5e', fontSize: '1.2rem', marginBottom: '15px' }}>RETO #3: RESPUESTAS</h4>
            <p style={{ fontSize: '1rem', color: '#cbd5e1' }}>Función para enviar JSON al cliente:</p>
            <div style={{ marginTop: '20px' }}>
              <code style={{ background: '#000', padding: '10px', borderRadius: '5px' }}>{'return ___({"ok": True})'}</code>
              <input 
                type="text" 
                placeholder="?"
                disabled={solved.includes('f3')}
                onChange={(e) => e.target.value.trim() === 'jsonify' ? handleSolved('f3') : (e.target.value.length >= 7 && triggerError())}
                style={{ background: '#1e293b', border: '1px solid #f43f5e', color: '#fff', padding: '10px', borderRadius: '8px', width: '100%', marginTop: '10px' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '60px 0 100px' }}>
        <button 
          className="btn-login" 
          style={{ background: '#ffffff', color: '#000', padding: '1.5rem 4rem', fontSize: '1.3rem', fontWeight: '900', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: '0.3s' }}
          onClick={() => navigate('/')}
        >
          VOLVER AL MAINFRAME
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .benefit-card {
          background: #0a0a0a;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s;
        }
        .benefit-card:hover { transform: translateY(-10px); background: #111; }
        code { font-family: 'JetBrains Mono', monospace; color: #f43f5e; }

        /* Sistema de Flechas Neón Responsivo */
        .code-container-flask {
          position: relative;
          margin-left: 300px;
        }

        .neon-arrow-wrapper {
          position: absolute;
          left: -280px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 270px;
          pointer-events: none;
        }

        .neon-arrow-text {
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 900;
          background: #f43f5e;
          padding: 6px 12px;
          border-radius: 6px;
          box-shadow: 0 0 15px rgba(244, 63, 94, 0.6);
          text-align: right;
          flex: 1;
          text-transform: uppercase;
        }

        @media (max-width: 1200px) {
          .code-container-flask { margin-left: 0; }
          .neon-arrow-wrapper { display: none; }
        }

      `}} />
    </div>
  );
};

export default ProgramacionFlask;