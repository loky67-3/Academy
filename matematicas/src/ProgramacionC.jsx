import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- TUTOR: CYBER-DUO (RED EDITION) ---
const CyberDuo = ({ expression = 'happy', size = 160 }) => {
  const red = "#ef4444";
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 20px ${red}66)` }}>
      <circle cx="100" cy="100" r="80" fill="rgba(15, 23, 42, 0.95)" stroke={red} strokeWidth="6" />
      {/* Ojos estilo Duo pero robóticos */}
      <circle cx="70" cy="85" r="20" fill="white" />
      <circle cx="130" cy="85" r="20" fill="white" />
      <circle cx="70" cy="85" r="8" fill="#000" />
      <circle cx="130" cy="85" r="8" fill="#000" />
      {/* Pico/Boca */}
      {expression === 'happy' ? (
        <path d="M85 130 Q 100 155 115 130" stroke={red} strokeWidth="6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M85 140 L115 140" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      )}
      {/* Antenas de Hardware */}
      <path d="M60 30 L80 50 M140 30 L120 50" stroke={red} strokeWidth="4" />
      <text x="100" y="30" fill="white" fontSize="12" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '3px' }}>C-OS 1.0</text>
    </svg>
  );
};

// --- VISUALIZADOR DE HARDWARE (MICROCONTROLADOR) ---
const MicroSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="40" y="40" width="120" height="120" fill="#1e293b" stroke="#ef4444" strokeWidth="4" />
    <text x="100" y="105" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="bold">ATMEL / ARM</text>
    {/* Pines */}
    {[0, 1, 2, 3].map(i => (
      <React.Fragment key={i}>
        <rect x={20} y={60 + i*25} width="20" height="10" fill="#ef4444" />
        <rect x={160} y={60 + i*25} width="20" height="10" fill="#ef4444" />
        <rect x={60 + i*25} y={20} width="10" height="20" fill="#ef4444" />
        <rect x={60 + i*25} y={160} width="10" height="20" fill="#ef4444" />
      </React.Fragment>
    ))}
  </svg>
);

// --- BLOQUE DE CÓDIGO CON FLECHAS NEÓN ---
const CCode = ({ title, code, annotations = [] }) => (
  <div style={{ background: '#000', borderRadius: '25px', border: '3px solid #ef4444', margin: '3rem 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ background: '#ef4444', padding: '10px 25px', color: '#000', fontWeight: '900', display: 'flex', justifyContent: 'space-between' }}>
      <span>{title}</span>
      <span>KERNEL_C</span>
    </div>
    <div style={{ padding: '40px', position: 'relative' }}>
      <pre style={{ margin: 0, color: '#fff', fontSize: '1.4rem', fontFamily: 'monospace', lineHeight: '1.7' }}>
        <code>{code}</code>
      </pre>
      {annotations.map((ann, i) => (
        <div key={i} style={{ position: 'absolute', left: '105%', top: ann.top, width: '300px', display: 'flex', alignItems: 'center', gap: '15px' }} className="mobile-hide">
          <svg width="40" height="20"><path d="M40 10 L10 10 M15 5 L5 10 L15 15" stroke="#ef4444" strokeWidth="3" fill="none" /></svg>
          <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>{ann.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const BigExplanation = ({ num, title, text }) => (
  <div style={{ textAlign: 'left', margin: '4rem 0', borderLeft: '8px solid #ef4444', paddingLeft: '40px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '15px' }}>
      <span style={{ fontSize: '5rem', fontWeight: '900', color: '#fff', opacity: 0.2 }}>{num}</span>
      <h3 style={{ fontSize: '3rem', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.8rem', color: '#fff', lineHeight: '1.4' }}>{text}</p>
  </div>
);

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [input, setInput] = useState('');
  const check = () => { if (input.trim() === answer && !isSolved) onSolved(id); };
  return (
    <div className="benefit-card" style={{ border: `3px solid ${isSolved ? '#10b981' : '#ef4444'}`, textAlign: 'left', background: 'rgba(239, 68, 68, 0.05)', padding: '2rem' }}>
      <span style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px' }}>{topic}</span>
      <h4 style={{ margin: '1.5rem 0', fontSize: '1.5rem', color: '#fff' }}>{question}</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSolved}
          style={{ background: '#000', border: '1px solid #ef4444', color: '#fff', padding: '15px', borderRadius: '10px', width: '100%', fontSize: '1.2rem', fontFamily: 'monospace' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ background: '#ef4444', color: '#000', fontWeight: 'bold' }}>RUN</button>}
      </div>
    </div>
  );
};

const ProgramacionC = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [botStatus, setBotStatus] = useState('happy');

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 10);
      setBotStatus('happy');
    }
  };

  return (
    <div className="home-container" style={{ paddingBottom: '120px', paddingLeft: '8%', paddingRight: '5%' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '180px 0 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <CyberDuo expression={botStatus} />
          <div style={{ textAlign: 'left', maxWidth: '800px' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: '900', lineHeight: '0.8', margin: 0 }}>
              Arquitectura <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text' }}>C</span>
            </h1>
            <p style={{ fontSize: '2rem', color: '#94a3b8', marginTop: '30px' }}>
              "El lenguaje de los dioses. Si quieres hablar con el hardware, debes hablar en C."
            </p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', marginTop: '60px', padding: '25px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '30px', border: '2px solid #ef4444' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>
            <span>KERNEL SYNC</span>
            <span>{points}%</span>
          </div>
          <div style={{ height: '20px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${points}%`, height: '100%', background: '#ef4444', boxShadow: '0 0 20px #ef4444', transition: '1s' }}></div>
          </div>
        </div>
      </section>

      {/* --- HARDWARE CONNECTION --- */}
      <section className="info-section">
        <div style={{ display: 'flex', gap: '100px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', textAlign: 'left' }}>DOMINA LA <span style={{ color: '#ef4444' }}>MÁQUINA</span></h2>
            <p style={{ fontSize: '1.5rem', textAlign: 'left', lineHeight: '1.6', color: '#94a3b8' }}>
              C no tiene "magia". Lo que ves es lo que hay. Es el lenguaje detrás de los microcontroladores de un robot, el motor de un coche y el sistema operativo que estás usando ahora mismo.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
              <MicroSVG />
            </div>
          </div>
        </div>
      </section>

      {/* --- VARIABLES --- */}
      <section className="info-section">
        <BigExplanation 
          num="01" title="Variables & Tipos" 
          text="En C, debes decirle a la memoria EXACTAMENTE qué vas a guardar. Un 'int' guarda números enteros, un 'float' decimales y un 'char' un solo carácter." 
        />
        <CCode 
          title="declaracion.c"
          code={`int vida = 100;\nfloat energia = 95.5;\nchar letra = 'A';\n\nprintf("Vida: %d", vida);`}
          annotations={[
            { top: '40px', text: 'Entero (4 bytes)' },
            { top: '75px', text: 'Decimal (4 bytes)' },
            { top: '110px', text: 'Carácter (1 byte)' },
            { top: '175px', text: 'Salida de datos formateada' }
          ]}
        />
      </section>

      {/* --- CONTROL DE FLUJO --- */}
      <section className="info-section" style={{ background: '#000', padding: '5rem', borderRadius: '50px', border: '2px solid #334155' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '4rem' }}>FLUJO DE <span style={{ color: '#ef4444' }}>CONTROL</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px' }}>
          <div>
            <h3 style={{ color: '#ef4444', fontSize: '2rem', textAlign: 'left' }}>IF / ELSE</h3>
            <CCode 
              title="decision.c"
              code={`if (sensor > 50) {\n    mover_robot();\n} else {\n    detener();\n}`}
            />
          </div>
          <div>
            <h3 style={{ color: '#ef4444', fontSize: '2rem', textAlign: 'left' }}>WHILE LOOP</h3>
            <CCode 
              title="bucle.c"
              code={`while (energia > 0) {\n    trabajar();\n    energia--;\n}`}
            />
          </div>
        </div>
      </section>

      {/* --- FUNCTIONS --- */}
      <section className="info-section">
        <BigExplanation 
          num="02" title="Funciones" 
          text="Las funciones son bloques de construcción. En C, siempre empezamos en la función 'main'. Es el corazón de tu programa." 
        />
        <CCode 
          title="main.c"
          code={`#include <stdio.h>\n\nvoid saludar() {\n    printf("¡Hola, Mundo!");\n}\n\nint main() {\n    saludar();\n    return 0;\n}`}
          annotations={[
            { top: '20px', text: 'Librería estándar' },
            { top: '55px', text: 'No devuelve nada (void)' },
            { top: '125px', text: 'Punto de entrada vital' }
          ]}
        />
      </section>

      {/* --- EXERCISE LAB --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '5rem', fontWeight: '900', marginBottom: '1rem' }}>C <span style={{ color: '#ef4444' }}>LABORATORY</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', marginBottom: '4rem' }}>De 0 a 10: Demuestra que ya no eres un novato.</p>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <ExerciseCard 
            id="c1" topic="VARIABLES" question="Tipo de dato para números enteros:" 
            answer="int" onSolved={handleSolved} isSolved={solvedIds.includes('c1')} 
          />
          <ExerciseCard 
            id="c2" topic="SINTAXIS" question="¿Con qué símbolo termina cada línea?" 
            answer=";" onSolved={handleSolved} isSolved={solvedIds.includes('c2')} 
          />
          <ExerciseCard 
            id="c3" topic="SALIDA" question="Función para imprimir en pantalla:" 
            answer="printf" onSolved={handleSolved} isSolved={solvedIds.includes('c3')} 
          />
          <ExerciseCard 
            id="c4" topic="LIBRERÍA" question="¿Cómo se llama stdio.h? (#include <___>)" 
            answer="stdio.h" onSolved={handleSolved} isSolved={solvedIds.includes('c4')} 
          />
          <ExerciseCard 
            id="c5" topic="BUCLES" question="Bucle que se repite 'mientras' sea cierto:" 
            answer="while" onSolved={handleSolved} isSolved={solvedIds.includes('c5')} 
          />
          <ExerciseCard 
            id="c6" topic="ENTRADA" question="Función para LEER datos del teclado:" 
            answer="scanf" onSolved={handleSolved} isSolved={solvedIds.includes('c6')} 
          />
          <ExerciseCard 
            id="c7" topic="MEMORIA" question="¿Cuántos bytes ocupa un 'char'?" 
            answer="1" onSolved={handleSolved} isSolved={solvedIds.includes('c7')} 
          />
          <ExerciseCard 
            id="c8" topic="LOGICA" question="Operador para comparar igualdad (A ___ B):" 
            answer="==" onSolved={handleSolved} isSolved={solvedIds.includes('c8')} 
          />
          <ExerciseCard 
            id="c9" topic="FUNCIONES" question="¿Cómo se llama la función principal?" 
            answer="main" onSolved={handleSolved} isSolved={solvedIds.includes('c9')} 
          />
          <ExerciseCard 
            id="c10" topic="SISTEMA" question="¿Qué valor devuelve main al terminar bien?" 
            answer="0" onSolved={handleSolved} isSolved={solvedIds.includes('c10')} 
          />
        </div>
      </section>

      {/* --- CONGRATS --- */}
      {solvedIds.length === 10 && (
        <section className="info-section" style={{ marginTop: '5rem' }}>
          <div className="benefit-card" style={{ background: 'linear-gradient(45deg, #ef4444, #991b1b)', padding: '5rem', borderRadius: '40px', boxShadow: '0 0 100px rgba(239, 68, 68, 0.4)' }}>
            <h2 style={{ fontSize: '4rem', color: '#fff', fontWeight: '900', marginBottom: '20px' }}>¡FELICIDADES, ARQUITECTO DE BAJO NIVEL!</h2>
            <p style={{ fontSize: '2rem', color: '#fff' }}>
              Has cruzado el umbral. De novato a conocedor del núcleo. Cyber-Duo está orgulloso de tu sincronización con el hardware.
            </p>
            <p style={{ fontSize: '1.2rem', marginTop: '30px', fontWeight: 'bold', color: '#000' }}>
              El equipo de EDUNEON te felicita. ¡Has dominado el lenguaje que mueve el mundo!
            </p>
          </div>
        </section>
      )}

      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <button className="btn-login" style={{ background: '#fff', color: '#000', padding: '20px 60px', fontSize: '1.5rem', fontWeight: '900' }} onClick={() => navigate('/')}>VOLVER AL MAINFRAME</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-hide { display: block; }
        @media (max-width: 1200px) { .mobile-hide { display: none; } }
        
        .gradient-text {
          -webkit-text-fill-color: transparent;
        }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
        }

        .benefit-card:hover {
          animation: pulse-red 2s infinite;
        }
      `}} />
    </div>
  );
};

export default ProgramacionC;