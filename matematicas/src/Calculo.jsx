import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Personaje Animado: Profesor NeonBot
const ProfessorNeon = ({ expression = 'happy', size = 120 }) => {
  const colors = { body: '#8b5cf6', face: '#fff', eye: '#00d2ff' };
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' }}>
      {/* Cuerpo/Monitor */}
      <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke={colors.body} strokeWidth="5" />
      <path d="M70 140 L50 180 M130 140 L150 180" stroke={colors.body} strokeWidth="8" strokeLinecap="round" />
      {/* Cara */}
      <circle cx="80" cy="80" r="8" fill={colors.eye} />
      <circle cx="120" cy="80" r="8" fill={colors.eye} />
      {expression === 'happy' ? (
        <path d="M80 110 Q100 130 120 110" stroke="#fff" strokeWidth="4" fill="none" />
      ) : (
        <path d="M80 115 L120 115" stroke="#fff" strokeWidth="4" />
      )}
      {/* Birrete de graduado */}
      <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" />
      <path d="M170 40 L170 60" stroke="#fbbf24" strokeWidth="3" />
    </svg>
  );
};

// Nuevo personaje: Sir Manzanita (Inspiración de Newton)
const SirManzanita = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))' }}>
    <circle cx="100" cy="110" r="60" fill="#ef4444" />
    <path d="M100 50 Q100 20 120 20" stroke="#8b5cf6" strokeWidth="8" fill="none" />
    <path d="M115 35 Q140 20 130 50 Z" fill="#10b981" />
    <circle cx="80" cy="100" r="6" fill="white" />
    <circle cx="120" cy="100" r="6" fill="white" />
    <path d="M85 130 Q100 150 115 130" stroke="white" strokeWidth="4" fill="none" />
  </svg>
);

// Icono de Avión para ejemplos de rutas
const AirplaneSVG = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px #0ea5e9)' }}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

// Gráfica de área bajo la curva para el avión
const FlightPathSVG = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }}>
    <path d="M20 180 L20 140 Q100 140 180 60 L180 180 Z" fill="rgba(14, 165, 233, 0.2)" />
    <path d="M20 140 Q100 140 180 60" fill="none" stroke="#0ea5e9" strokeWidth="4" />
    <text x="50" y="170" fill="#0ea5e9" fontSize="12" fontWeight="bold">Distancia Recorrida (Integral)</text>
  </svg>
);

// Gráfica de Derivada (Tangente)
const DerivativeVisualSVG = ({ size = 250 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }}>
    <line x1="20" y1="180" x2="180" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    <line x1="20" y1="20" x2="20" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    {/* Curva f(x) = x^2 */}
    <path d="M20 180 Q 100 180 180 20" fill="none" stroke="#8b5cf6" strokeWidth="4" />
    {/* Línea Tangente */}
    <line x1="60" y1="160" x2="180" y2="60" stroke="#10b981" strokeWidth="3" strokeDasharray="5" />
    <circle cx="120" cy="110" r="5" fill="#10b981" />
    <text x="130" y="130" fill="white" fontSize="10">Pendiente = f'(x)</text>
  </svg>
);

// Visualización de las Leyes de Newton
const NewtonLawsSVG = ({ law }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
    <svg width="200" height="150" viewBox="0 0 200 150">
      {law === 1 && ( // Inercia
        <g>
          <rect x="70" y="80" width="60" height="40" fill="#8b5cf6" rx="5" />
          <path d="M20 120 L180 120" stroke="white" strokeWidth="2" />
          <text x="100" y="60" fill="white" textAnchor="middle" fontSize="12">V = 0 (Sin cambio)</text>
        </g>
      )}
      {law === 2 && ( // F=ma
        <g>
          <rect x="40" y="80" width="60" height="40" fill="#8b5cf6" rx="5" />
          <path d="M10 100 L40 100" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
          <path d="M100 100 L180 100" stroke="#10b981" strokeWidth="8" markerEnd="url(#arrow)" />
          <text x="100" y="60" fill="white" textAnchor="middle" fontSize="12">Fuerza → Aceleración</text>
        </g>
      )}
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
    </svg>
  </div>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, topic }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    if (parseFloat(uAns) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#8b5cf6'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic} | {level}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.2rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '80px' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px' }}>OK</button>}
      </div>
    </div>
  );
};

const Calculo = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);

  const exercises = [
    // LÍMITES
    { id: 'c1', topic: 'Límites', level: 'Fácil', question: 'lim x→2 (x + 5)', answer: 7 },
    { id: 'c2', topic: 'Límites', level: 'Fácil', question: 'lim x→0 (3x + 10)', answer: 10 },
    { id: 'c3', topic: 'Límites', level: 'Medio', question: 'lim x→3 (x²)', answer: 9 },
    { id: 'c4', topic: 'Límites', level: 'Medio', question: 'lim x→1 ( (x²-1)/(x-1) )', answer: 2 },
    { id: 'c5', topic: 'Límites', level: 'Difícil', question: 'lim x→5 (2x - 4)', answer: 6 },
    
    // DERIVADAS (Regla de la potencia)
    { id: 'c6', topic: 'Derivadas', level: 'Fácil', question: 'f(x)=5x. f\'(2) = ?', answer: 5 },
    { id: 'c7', topic: 'Derivadas', level: 'Fácil', question: 'f(x)=x². f\'(x) cuando x=3', answer: 6 },
    { id: 'c8', topic: 'Derivadas', level: 'Medio', question: 'f(x)=x³. f\'(2) = ?', answer: 12 },
    { id: 'c9', topic: 'Derivadas', level: 'Medio', question: 'f(x)=4x². f\'(1) = ?', answer: 8 },
    { id: 'c10', topic: 'Derivadas', level: 'Difícil', question: 'f(x)=x² + 2x. f\'(5) = ?', answer: 12 },

    // INTEGRALES (Básicas)
    { id: 'c11', topic: 'Integrales', level: 'Fácil', question: '∫ 1 dx de 0 a 5', answer: 5 },
    { id: 'c12', topic: 'Integrales', level: 'Fácil', question: '∫ 2 dx de 0 a 10', answer: 20 },
    { id: 'c13', topic: 'Integrales', level: 'Medio', question: '∫ x dx de 0 a 2', answer: 2 },
    { id: 'c14', topic: 'Integrales', level: 'Medio', question: '∫ 2x dx de 0 a 3', answer: 9 },
    { id: 'c15', topic: 'Integrales', level: 'Difícil', question: '∫ 3x² dx de 0 a 2', answer: 8 },

    // MIXTO
    { id: 'c16', topic: 'General', level: 'Avanzado', question: 'Derivada de una constante (f(x)=100)', answer: 0 },
    { id: 'c17', topic: 'General', level: 'Avanzado', question: 'lim x→-1 (x³)', answer: -1 },
    { id: 'c18', topic: 'General', level: 'Avanzado', question: '∫ 4x³ dx de 0 a 1', answer: 1 },
    { id: 'c19', topic: 'General', level: 'Avanzado', question: 'f(x)=10x. f\'(99)', answer: 10 },
    { id: 'c20', topic: 'General', level: 'Avanzado', question: 'lim x→4 (√x)', answer: 2 },

    // RUTAS AÉREAS
    { id: 'air1', topic: 'Aero', level: 'Ingeniería', question: 'Velocidad v(t)=200t. ¿Posición en t=2? (Integral)', answer: 400 },
    { id: 'air2', topic: 'Aero', level: 'Ingeniería', question: 'Posición s(t)=5t². ¿Velocidad en t=10? (Derivada)', answer: 100 },
    { id: 'air3', topic: 'Aero', level: 'Ingeniería', question: 'Aceleración a(t)=9.8. ¿Velocidad tras 10s?', answer: 98 },
    { id: 'air4', topic: 'Aero', level: 'Ingeniería', question: 'v(t)=500. ¿Distancia en 3 horas?', answer: 1500 },

    // NUEVOS: LEYES DE NEWTON
    { id: 'n1', topic: 'Física', level: 'Newton', question: 'F = m·a. Si m=5, a=4, ¿F?', answer: 20 },
    { id: 'n2', topic: 'Física', level: 'Newton', question: 'Si f(t) es posición, f\'(t) es...', answer: 0, note: 'Escribe 0 para Velocidad' },
    { id: 'n3', topic: 'Física', level: 'Newton', question: 'Segunda derivada de la posición es...', answer: 1, note: 'Escribe 1 para Aceleración' },
    { id: 'n4', topic: 'Física', level: 'Newton', question: 'Peso (P = m·g). Si m=10 y g=9.8, ¿P?', answer: 98 },
    { id: 'n5', topic: 'Física', level: 'Newton', question: '¿Cuántas son las leyes de Newton?', answer: 3 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / exercises.length) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />
      
      <header className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Maestría en <span className="gradient-text">Cálculo</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy NeonBot. Hoy aprenderemos la matemática del movimiento infinito. ¡Prepárate para expandir tu mente!"</p>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>NIVEL DE CIENTÍFICO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #00d2ff)', transition: '0.5s', boxShadow: '0 0 15px #8b5cf6' }}></div>
          </div>
        </div>
      </header>

      <section className="info-section">
        <h2 className="section-title">Newton y el <span className="gradient-text">Cálculo Físico</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(239, 68, 68, 0.05), transparent)', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <SirManzanita />
          </div>
          <div className="cert-text" style={{ flex: 2 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Newton no solo inventó el cálculo (él lo llamaba <strong>Fluxiones</strong>); lo hizo para demostrar cómo la fuerza cambia el movimiento.
            </p>
            <div className="benefits-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
               <div className="benefit-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                 <h4 style={{ color: '#ef4444' }}>1. Ley de Inercia</h4>
                 <p style={{ fontSize: '0.85rem' }}>"Todo cuerpo sigue en su estado a menos que una fuerza lo obligue a cambiar". Sin cálculo, no podríamos medir ese <em>cambio</em> instantáneo.</p>
               </div>
               <div className="benefit-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                 <h4 style={{ color: '#fbbf24' }}>2. Ley de Fuerza (F = m · a)</h4>
                 <p style={{ fontSize: '0.85rem' }}>La aceleración es la <strong>derivada</strong> de la velocidad. Newton unió la fuerza con el cálculo aquí.</p>
               </div>
               <div className="benefit-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                 <h4 style={{ color: '#10b981' }}>3. Acción y Reacción</h4>
                 <p style={{ fontSize: '0.85rem' }}>A toda acción corresponde una reacción igual y opuesta. Es el equilibrio del universo.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Cálculo en Acción: <span className="gradient-text">Rutas Aéreas</span></h2>
        <p className="section-subtitle">¿Cómo sabe un piloto dónde está? El cálculo conecta la velocidad con la distancia.</p>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(to right, rgba(14, 165, 233, 0.05), transparent)' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
              <AirplaneSVG />
              <h3 style={{ color: '#0ea5e9' }}>El Desafío del Vuelo</h3>
            </div>
            <p style={{ lineHeight: '1.8' }}>
              Si un avión tiene una velocidad que cambia según <strong>v(t) = 100 + 20t</strong>:
            </p>
            <ul style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              <li>✈️ <strong>Derivada:</strong> Nos dice la <em>aceleración</em> del avión en un segundo exacto.</li>
              <li>🗺️ <strong>Integral:</strong> Nos dice la <em>distancia total</em> recorrida desde el despegue.</li>
            </ul>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1px solid #0ea5e9' }}>
               <p style={{ color: 'white' }}><strong>Ejemplo:</strong> Para saber cuánto avanzó el avión en 2 horas, sumamos (integramos) toda su velocidad durante ese tiempo.</p>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <FlightPathSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conceptos <span className="gradient-text">Fundamentales</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <NewtonLawsSVG law={1} />
            <h4 style={{ marginTop: '1rem', color: '#8b5cf6' }}>Inercia</h4>
            <p style={{ fontSize: '0.8rem' }}>La resistencia al cambio. Si la derivada es cero, no hay cambio.</p>
          </div>
          <div className="benefit-card">
            <NewtonLawsSVG law={2} />
            <h4 style={{ marginTop: '1rem', color: '#ef4444' }}>F = m · a</h4>
            <p style={{ fontSize: '0.8rem' }}>La fuerza crea aceleración. ¡Cálculo en acción!</p>
          </div>
          <div className="benefit-card">
            <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🍎 ⇆ 🍏</div>
            <h4 style={{ marginTop: '1rem' }}>Acción/Reacción</h4>
            <p style={{ fontSize: '0.8rem' }}>Las fuerzas siempre vienen en parejas. El universo es un balance.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla de <span className="gradient-text">Operaciones Maestras</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                <th style={{ padding: '20px' }}>Función Original f(x)</th>
                <th style={{ padding: '20px' }}>⚡ Derivada (Bajar Poder)</th>
                <th style={{ padding: '20px' }}>🌊 Integral (Subir Poder)</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '20px' }}>Constante <strong>C</strong> (ej. 10)</td>
                <td style={{ color: '#ef4444' }}>0</td>
                <td style={{ color: '#10b981' }}>C · x + C</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '20px' }}>Variable <strong>x</strong></td>
                <td style={{ color: '#ef4444' }}>1</td>
                <td style={{ color: '#10b981' }}>x² / 2 + C</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '20px' }}>Potencia <strong>xⁿ</strong></td>
                <td style={{ color: '#ef4444' }}>n · xⁿ⁻¹</td>
                <td style={{ color: '#10b981' }}>xⁿ⁺¹ / (n+1) + C</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '20px' }}>Seno <strong>sin(x)</strong></td>
                <td style={{ color: '#ef4444' }}>cos(x)</td>
                <td style={{ color: '#10b981' }}>-cos(x) + C</td>
              </tr>
              <tr>
                <td style={{ padding: '20px' }}>Exponencial <strong>eˣ</strong></td>
                <td style={{ color: '#ef4444' }}>eˣ</td>
                <td style={{ color: '#10b981' }}>eˣ + C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conceptos de <span className="gradient-text">Oro</span></h2>
        <div className="benefits-grid">
          {/* Limite */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>1. Límites</h4>
            <p>Un límite es el valor al que una función <strong>se acerca</strong> tanto como queramos, sin necesidad de llegar a él.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
              <p style={{ color: '#00d2ff', fontSize: '1.2rem' }}>Si f(x) = x + 2, y x se acerca a 3...</p>
              <p style={{ color: 'white', fontWeight: 'bold' }}>El límite es 5.</p>
            </div>
          </div>
          {/* Derivada */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>2. Derivadas</h4>
            <DerivativeVisualSVG />
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>La derivada mide <strong>qué tan rápido</strong> cambia algo en un instante exacto.</p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
              <li>🚀 Velocidad instantánea de un cohete.</li>
              <li>📈 Crecimiento de una red social por segundo.</li>
              <li>📐 La pendiente de una curva en un punto.</li>
            </ul>
            <div style={{ background: '#1e293b', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <h4 style={{ color: '#10b981' }}>Regla de Oro:</h4>
              <code>Si f(x) = xⁿ  → f'(x) = n · xⁿ⁻¹</code>
            </div>
          </div>
          {/* Integral */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#0ea5e9', marginBottom: '1rem' }}>3. Integrales</h4>
            <div style={{ fontSize: '3rem', color: '#0ea5e9' }}>∫</div>
            <h4 style={{ color: '#fbbf24' }}>Acumulación</h4>
            <p>Si la derivada divide para ver el cambio, la integral suma todo para ver el total acumulado.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Cálculo</span></h2>
        <p className="section-subtitle">Resuelve estos 20 desafíos para obtener tu rango de Ingeniero Neon.</p>
        
        <div className="grid-container">
          {exercises.map(ex => (
            <ExerciseCard 
              key={ex.id} 
              {...ex} 
              onSolved={handleSolved} 
              isSolved={solvedIds.includes(ex.id)} 
            />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>Volver al Cuartel General</button>
      </div>
    </div>
  );
};

export default Calculo;