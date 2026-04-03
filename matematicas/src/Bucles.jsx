import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => {
  const colors = { body: '#a855f7', face: '#fff', eye: '#fff' };
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 10px ${colors.body})` }}>
      <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke={colors.body} strokeWidth="5" />
      <path d="M70 140 L50 180 M130 140 L150 180" stroke={colors.body} strokeWidth="8" strokeLinecap="round" />
      <circle cx="80" cy="80" r="8" fill={colors.eye} />
      <circle cx="120" cy="80" r="8" fill={colors.eye} />
      {expression === 'happy' ? (
        <path d="M80 110 Q 100 130 120 110" stroke="#fff" strokeWidth="4" fill="none" />
      ) : (
        <path d="M80 115 L120 115" stroke="#fff" strokeWidth="4" />
      )}
      <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" />
      <path d="M170 40 L170 60" stroke="#fbbf24" strokeWidth="3" />
    </svg>
  );
};

// Diagrama de flujo de un Bucle For
const LoopFlowchartSVG = ({ size = 320 }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <svg width={size} height={size} viewBox="0 0 300 350">
      {/* Inicio */}
      <rect x="110" y="5" width="80" height="25" rx="12" fill="none" stroke="white" strokeWidth="2" />
      <text x="150" y="22" fill="white" textAnchor="middle" fontSize="10">INICIO</text>
      <path d="M150 30 L150 50" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Inicialización */}
      <rect x="100" y="50" width="100" height="35" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      <text x="150" y="72" fill="white" textAnchor="middle" fontSize="10">var i = 0</text>
      <path d="M150 85 L150 105" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Condición (Rombo) */}
      <path d="M150 105 L200 135 L150 165 L100 135 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <text x="150" y="140" fill="white" textAnchor="middle" fontSize="10">{"¿i < 5?"}</text>
      
      {/* Proceso (Cuerpo del bucle) */}
      <path d="M150 165 L150 195" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="160" y="180" fill="#10b981" fontSize="10">SÍ</text>
      <rect x="100" y="195" width="100" height="35" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="150" y="217" fill="white" textAnchor="middle" fontSize="10">Hacer Tarea</text>
      
      {/* Incremento */}
      <path d="M150 230 L150 255" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="110" y="255" width="80" height="30" fill="none" stroke="#a855f7" strokeWidth="2" />
      <text x="150" y="275" fill="white" textAnchor="middle" fontSize="10">i++</text>

      {/* Retorno al rombo */}
      <path d="M110 270 L60 270 L60 135 L100 135" stroke="#a855f7" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

      {/* Salida (NO) */}
      <path d="M200 135 L250 135 L250 300 L190 300" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <text x="220" y="130" fill="#ef4444" fontSize="10">NO</text>
      <rect x="110" y="285" width="80" height="30" rx="15" fill="none" stroke="white" strokeWidth="2" />
      <text x="150" y="305" fill="white" textAnchor="middle" fontSize="10">FIN</text>

      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="white" /></marker></defs>
    </svg>
    <p style={{ color: '#a855f7', marginTop: '10px', fontSize: '0.9rem' }}>El Ciclo de Repetición</p>
  </div>
);

const DetailedLoopSVG = ({ size = "100%" }) => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '40px', border: '2px solid var(--neon-purple)', margin: '2rem 0', overflow: 'hidden' }}>
    <svg width={size} viewBox="0 0 600 500" style={{ maxWidth: '800px', display: 'block', margin: '0 auto' }}>
      <defs>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
        </marker>
      </defs>

      {/* 1. Inicio */}
      <rect x="250" y="10" width="100" height="40" rx="20" fill="none" stroke="#fff" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="300" y="35" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">ENTRADA</text>
      <line x1="300" y1="50" x2="300" y2="80" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* 2. Inicialización */}
      <rect x="200" y="80" width="200" height="50" fill="rgba(14, 165, 233, 0.1)" stroke="#0ea5e9" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="300" y="105" fill="#fff" textAnchor="middle" fontSize="14">Inicializar Contador</text>
      <text x="300" y="122" fill="#0ea5e9" textAnchor="middle" fontSize="12">let i = 0;</text>
      <line x1="300" y1="130" x2="300" y2="160" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* 3. Condición */}
      <path d="M300 160 L400 200 L300 240 L200 200 Z" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="300" y="195" fill="#fff" textAnchor="middle" fontSize="14">¿Condición?</text>
      <text x="300" y="215" fill="#fbbf24" textAnchor="middle" fontSize="14" fontWeight="bold">{"i < Límite"}</text>

      {/* Ruta SÍ (hacia abajo) */}
      <line x1="300" y1="240" x2="300" y2="280" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)" />
      <text x="315" y="265" fill="#10b981" fontSize="14" fontWeight="bold">SÍ</text>

      {/* 4. Cuerpo del Bucle */}
      <rect x="200" y="280" width="200" height="60" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="300" y="305" fill="#fff" textAnchor="middle" fontSize="14">EJECUTAR TAREA</text>
      <text x="300" y="325" fill="#94a3b8" textAnchor="middle" fontSize="12">(Código dentro de {})</text>
      <line x1="300" y1="340" x2="300" y2="370" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* 5. Actualización */}
      <rect x="220" y="370" width="160" height="50" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="300" y="395" fill="#fff" textAnchor="middle" fontSize="14">ACTUALIZACIÓN</text>
      <text x="300" y="412" fill="#a855f7" textAnchor="middle" fontSize="14" fontWeight="bold">i++</text>

      {/* Retorno al rombo */}
      <path d="M220 395 L100 395 L100 200 L200 200" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
      <text x="110" y="290" fill="#a855f7" fontSize="12" transform="rotate(-90, 110, 290)">Repetir Ciclo</text>

      {/* Ruta NO (hacia la derecha) */}
      <line x1="400" y1="200" x2="480" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
      <text x="430" y="190" fill="#ef4444" fontSize="14" fontWeight="bold">NO</text>

      {/* 6. Fin */}
      <rect x="480" y="180" width="100" height="40" rx="20" fill="none" stroke="#fff" strokeWidth="3" filter="url(#neon-glow)" />
      <text x="530" y="205" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">SALIDA</text>
    </svg>
  </div>
);

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    if (uAns.trim().toLowerCase() === answer.toString().toLowerCase() && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#a855f7'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.1rem', minHeight: '3.5rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Rta"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px', background: '#a855f7' }}>OK</button>}
      </div>
    </div>
  );
};

const Bucles = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: 'for(i=0; i<3; i++)', ans: '3' });
  const [flashInput, setFlashInput] = useState('');
  const [botStatus, setBotStatus] = useState('idle');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlash = () => {
    const limit = Math.floor(Math.random() * 8) + 2;
    setFlashQuest({ q: `for(i=0; i<${limit}; i++)`, ans: limit.toString() });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput === flashQuest.ans) {
      setPoints(prev => prev + 1);
      setFlashSolvedCount(prev => prev + 1);
      setBotStatus('correct');
      if (flashSolvedCount < 9) setTimeout(generateFlash, 1000);
    } else {
      setBotStatus('wrong');
      setTimeout(() => setBotStatus('idle'), 1500);
    }
  };

  useEffect(() => { generateFlash(); }, []);

  const exercises = [
    { id: 'b1', topic: 'FOR', question: '¿Cuántas veces se repite i<10 si empieza en 0?', answer: '10' },
    { id: 'b2', topic: 'FOR', question: '¿Si i empieza en 1 y termina en i<=5, cuántas van?', answer: '5' },
    { id: 'b3', topic: 'WHILE', question: '¿Qué bucle evalúa la condición AL FINAL?', answer: 'do while' },
    { id: 'b4', topic: 'LÓGICA', question: '¿Cómo se llama un bucle que nunca termina?', answer: 'infinito' },
    { id: 'b5', topic: 'FOR', question: 'for(i=0; i<2; i++) produce 0 y...', answer: '1' },
    { id: 'b6', topic: 'SINTAXIS', question: '¿Palabra para saltar a la siguiente iteración?', answer: 'continue' },
    { id: 'b7', topic: 'SINTAXIS', question: '¿Palabra para detener el bucle por completo?', answer: 'break' },
    { id: 'b8', topic: 'LÓGICA', question: 'var i=5; while(i>0) { i-- } ¿Repeticiones?', answer: '5' },
    { id: 'b9', topic: 'INCREMENTO', question: 'Si uso i+=2 en i<10 empezando en 0, ¿cuántas van?', answer: '5' },
    { id: 'b10', topic: 'CONCEPTO', question: '¿Qué bucle es mejor si sé el número exacto de vueltas?', answer: 'for' },
    { id: 'b11', topic: 'FOR', question: 'for(i=10; i>7; i--) ¿Cuántas vueltas?', answer: '3' },
    { id: 'b12', topic: 'WHILE', question: '¿While(false) se ejecuta alguna vez? (si/no)', answer: 'no' },
    { id: 'b13', topic: 'DO-WHILE', question: '¿Do-While se ejecuta al menos una vez? (si/no)', answer: 'si' },
    { id: 'b14', topic: 'NESTED', question: 'Un bucle dentro de otro se llama bucle...', answer: 'anidado' },
    { id: 'b15', topic: 'ARRAY', question: 'Para recorrer una lista, ¿qué bucle es el más común?', answer: 'for' },
    { id: 'b16', topic: 'CONTADOR', question: 'i++ es lo mismo que i = i + ...', answer: '1' },
    { id: 'b17', topic: 'LÓGICA', question: 'for(i=0; i<100; i=100) ¿Cuántas vueltas?', answer: '1' },
    { id: 'b18', topic: 'SINTAXIS', question: '¿En el FOR, qué separa las 3 partes?', answer: ';' },
    { id: 'b19', topic: 'INFINITO', question: 'while(true) es un bucle...', answer: 'infinito' },
    { id: 'b20', topic: 'FINAL', question: '¿El índice suele empezar en 0 o 1?', answer: '0' }
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / (exercises.length + 10)) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Maestría en <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #a855f7, #d946ef)', WebkitBackgroundClip: 'text' }}>Bucles</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy tu instructor de eficiencia. Hoy aprenderás a delegar el trabajo repetitivo a la máquina. ¡Repite después de mí: Lógica!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a855f7', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>COEFICIENTE DE ITERACIÓN</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7, #d946ef)', transition: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Conteo Rápido</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿Cuántas veces se ejecutará este bucle? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#a855f7', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px solid #a855f7' }}><code>{flashQuest.q}</code></div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #a855f7', color: 'white', padding: '15px', borderRadius: '12px', width: '100px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#a855f7', color: 'white', padding: '15px 30px' }}>CONTAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Maestro de las Vueltas! Has dominado el conteo de ciclos. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Inmersión Profunda: <span className="gradient-text">Anatomía de un Ciclo</span></h2>
        <p className="section-subtitle">Visualiza cómo la lógica fluye, se evalúa y se repite hasta alcanzar el objetivo.</p>
        <DetailedLoopSVG />
        <div className="benefits-grid" style={{ marginTop: '2rem' }}>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#0ea5e9' }}>El Motor de Inicio</h4>
            <p style={{ fontSize: '0.9rem' }}>Todo bucle necesita un punto de partida. Definimos dónde empezamos (inicialización) y qué condición debe mantenerse viva.</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fbbf24' }}>El Centinela</h4>
            <p style={{ fontSize: '0.9rem' }}>La condición (el rombo) es el guardia. Decide si el código entra una vez más al ciclo o si es hora de terminar la ejecución.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Método del <span className="gradient-text">Diagrama de Repetición</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(168, 85, 247, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>
              Un bucle es un camino que vuelve sobre sí mismo. La única forma de salir es que la <strong>condición</strong> se vuelva falsa.
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2.5', textAlign: 'left' }}>
              <li>🏁 <strong>Inicialización:</strong> Se crea la variable que contará las vueltas.</li>
              <li>❓ <strong>Condición:</strong> ¿Debo dar otra vuelta?</li>
              <li>🛠️ <strong>Cuerpo:</strong> La tarea que se repite.</li>
              <li>📈 <strong>Actualización:</strong> Se suma o resta al contador.</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <LoopFlowchartSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tipos de <span className="gradient-text">Bucles</span></h2>
        <p className="section-subtitle">Diferentes herramientas para diferentes necesidades de repetición.</p>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#0ea5e9' }}>1. Bucle FOR</h4>
            <p style={{ fontSize: '0.85rem' }}>Ideal cuando sabes <strong>exactamente</strong> cuántas veces quieres repetir algo.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <code>for(let i=0; i{"<"}10; i++)</code>
            </div>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fbbf24' }}>2. Bucle WHILE</h4>
            <p style={{ fontSize: '0.85rem' }}>Úsalo cuando no sabes cuántas vueltas darás, solo que quieres seguir <strong>mientras</strong> algo sea verdad.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <code>while(usuario_conectado)</code>
            </div>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#10b981' }}>3. Bucle DO-WHILE</h4>
            <p style={{ fontSize: '0.85rem' }}>Asegura que la tarea se haga <strong>al menos una vez</strong> antes de preguntar la condición.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <code>do {"{"} tarea() {"}"} while(x)</code>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla de <span className="gradient-text">Comparación</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                <th style={{ padding: '15px' }}>Característica</th>
                <th style={{ padding: '15px' }}>FOR</th>
                <th style={{ padding: '15px' }}>WHILE</th>
                <th style={{ padding: '15px' }}>DO WHILE</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>¿Sabe cuántas vueltas?</td><td>Sí</td><td>No</td><td>No</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>¿Mínimo de ejecuciones?</td><td>0</td><td>0</td><td style={{color: '#10b981', fontWeight: 'bold'}}>1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>¿Uso principal?</td><td>Contar</td><td>Condiciones</td><td>Entrada datos</td>
              </tr>
              <tr>
                <td>Complejidad</td><td>Media</td><td>Simple</td><td>Baja</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Ciclos</span></h2>
        <p className="section-subtitle">Supera estos 20 desafíos para convertirte en un experto en automatización lógica.</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#a855f7', color: 'white' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Bucles;