import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => {
  const colors = { body: '#0ea5e9', face: '#fff', eye: '#fff' };
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

// Visualización de Estructuras (Array, Stack, Queue)
const StructureVisualizerSVG = ({ type, items = ["A", "B", "C"] }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '25px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <svg width="250" height="150" viewBox="0 0 250 150">
      {type === 'array' && (
        <g>
          {items.map((item, i) => (
            <g key={i} transform={`translate(${20 + i * 75}, 50)`}>
              <rect width="60" height="60" fill="none" stroke="#0ea5e9" strokeWidth="3" rx="8" />
              <text x="30" y="35" fill="white" textAnchor="middle" fontSize="20" fontWeight="bold">{item}</text>
              <text x="30" y="75" fill="#94a3b8" textAnchor="middle" fontSize="12">idx: {i}</text>
            </g>
          ))}
        </g>
      )}
      {type === 'stack' && (
        <g transform="translate(85, 10)">
          <path d="M0 0 L0 120 L80 120 L80 0" fill="none" stroke="#a855f7" strokeWidth="3" />
          {items.map((item, i) => (
            <g key={i} transform={`translate(5, ${85 - i * 35})`}>
              <rect width="70" height="30" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" rx="5" />
              <text x="35" y="20" fill="white" textAnchor="middle" fontSize="14">{item}</text>
            </g>
          ))}
          <text x="40" y="-10" fill="#a855f7" textAnchor="middle" fontSize="10">TOP (LIFO)</text>
        </g>
      )}
      {type === 'queue' && (
        <g transform="translate(20, 40)">
          <line x1="0" y1="0" x2="210" y2="0" stroke="#10b981" strokeWidth="3" />
          <line x1="0" y1="60" x2="210" y2="60" stroke="#10b981" strokeWidth="3" />
          {items.map((item, i) => (
            <g key={i} transform={`translate(${140 - i * 65}, 5)`}>
              <rect width="60" height="50" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="30" y="30" fill="white" textAnchor="middle" fontSize="14">{item}</text>
            </g>
          ))}
          <text x="0" y="80" fill="#10b981" fontSize="10">SALIDA (FRONT)</text>
          <text x="160" y="80" fill="#10b981" fontSize="10">ENTRADA (REAR)</text>
        </g>
      )}
    </svg>
    <h4 style={{ marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{type}</h4>
  </div>
);

const DecisionFlowSVG = () => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '40px', border: '2px solid #0ea5e9', margin: '2rem 0', overflow: 'hidden' }}>
    <svg width="100%" viewBox="0 0 800 500" style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
        </marker>
      </defs>

      {/* Inicio */}
      <rect x="325" y="10" width="150" height="40" rx="20" fill="none" stroke="white" strokeWidth="3" />
      <text x="400" y="35" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">¿NECESITO DATOS?</text>
      <line x1="400" y1="50" x2="400" y2="90" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Decisión 1 */}
      <path d="M400 90 L550 140 L400 190 L250 140 Z" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <text x="400" y="145" fill="white" textAnchor="middle" fontSize="12">¿IMPORTA EL ORDEN?</text>

      {/* Ruta No */}
      <line x1="250" y1="140" x2="150" y2="140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="200" y="130" fill="#ef4444" fontSize="12">NO</text>
      <rect x="20" y="120" width="130" height="40" rx="5" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2" />
      <text x="85" y="145" fill="white" textAnchor="middle" fontSize="12">OBJETO / DICT</text>

      {/* Ruta Sí */}
      <line x1="400" y1="190" x2="400" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="415" y="210" fill="#10b981" fontSize="12">SÍ</text>

      {/* Decisión 2 */}
      <path d="M400 230 L550 280 L400 330 L250 280 Z" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <text x="400" y="285" fill="white" textAnchor="middle" fontSize="12">¿ÚLTIMO EN ENTRAR?</text>

      {/* Stack */}
      <line x1="550" y1="280" x2="650" y2="280" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="600" y="270" fill="#a855f7" fontSize="12">ES PRIMERO</text>
      <rect x="650" y="260" width="100" height="40" rx="5" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth="2" />
      <text x="700" y="285" fill="white" textAnchor="middle" fontSize="12">STACK (Pila)</text>

      {/* Queue */}
      <line x1="250" y1="280" x2="150" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="200" y="270" fill="#10b981" fontSize="12">VA AL FINAL</text>
      <rect x="20" y="260" width="130" height="40" rx="5" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
      <text x="85" y="285" fill="white" textAnchor="middle" fontSize="12">QUEUE (Cola)</text>

      {/* Array */}
      <line x1="400" y1="330" x2="400" y2="380" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="415" y="355" fill="#0ea5e9" fontSize="12">ACCESO DIRECTO</text>
      <rect x="325" y="380" width="150" height="40" rx="5" fill="rgba(14, 165, 233, 0.1)" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="405" fill="white" textAnchor="middle" fontSize="12">ARRAY (Lista)</text>
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
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#0ea5e9'}` }}>
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
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px' }}>OK</button>}
      </div>
    </div>
  );
};

const EstructurasDatos = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: 'LIFO es...', ans: 'stack' });
  const [flashInput, setFlashInput] = useState('');
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const questions = [
      { q: 'FIFO es...', ans: 'queue' },
      { q: 'LIFO es...', ans: 'stack' },
      { q: 'Acceso por índice', ans: 'array' },
      { q: 'Key / Value', ans: 'objeto' },
      { q: 'Último en entrar es el primero', ans: 'stack' },
      { q: 'Primero en entrar es el primero', ans: 'queue' }
    ];
    setFlashQuest(questions[Math.floor(Math.random() * questions.length)]);
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase() === flashQuest.ans) {
      setPoints(prev => prev + 1);
      setBotStatus('correct');
      setTimeout(generateFlash, 1000);
    } else {
      setBotStatus('wrong');
      setTimeout(() => setBotStatus('idle'), 1500);
    }
  };

  useEffect(() => { generateFlash(); }, []);

  const exercises = [
    { id: 'ed1', topic: 'Array', question: '¿Índice del primer elemento?', answer: '0' },
    { id: 'ed2', topic: 'Stack', question: '¿Qué significa LIFO?', answer: 'last in first out' },
    { id: 'ed3', topic: 'Queue', question: '¿Qué significa FIFO?', answer: 'first in first out' },
    { id: 'ed4', topic: 'Dict', question: '¿Cómo se accede a un valor?', answer: 'clave' },
    { id: 'ed5', topic: 'JS', question: 'Método para añadir al final de un Array', answer: 'push' },
    { id: 'ed6', topic: 'Python', question: 'Método para añadir al final de una List', answer: 'append' },
    { id: 'ed7', topic: 'Stack', question: 'Acción de quitar de una pila', answer: 'pop' },
    { id: 'ed8', topic: 'Queue', question: 'Ejemplo de cola en la vida real', answer: 'fila' },
    { id: 'ed9', topic: 'Array', question: 'Si un array tiene 5 elementos, ¿último índice?', answer: '4' },
    { id: 'ed10', topic: 'Concepto', question: 'Estructura que usa Clave-Valor', answer: 'objeto' },
    { id: 'ed11', topic: 'JS', question: 'Quitar el primer elemento de un Array', answer: 'shift' },
    { id: 'ed12', topic: 'Python', question: '¿Cómo se llama un Objeto en Python?', answer: 'diccionario' },
    { id: 'ed13', topic: 'Stack', question: '¿Pila de platos es Stack o Queue?', answer: 'stack' },
    { id: 'ed14', topic: 'Queue', question: '¿Impresora enviando documentos?', answer: 'queue' },
    { id: 'ed15', topic: 'Memory', question: 'Estructura más rápida para búsqueda por ID', answer: 'objeto' },
    { id: 'ed16', topic: 'JS', question: 'Convertir objeto a String', answer: 'json.stringify' },
    { id: 'ed17', topic: 'Python', question: 'Ver todas las llaves de un dict', answer: 'keys()' },
    { id: 'ed18', topic: 'Logic', question: '¿Un Array puede tener distintos tipos?', answer: 'si' },
    { id: 'ed19', topic: 'Final', question: 'Estructura ideal para el historial "Deshacer"', answer: 'stack' },
    { id: 'ed20', topic: 'Final', question: 'Estructura ideal para un chat', answer: 'queue' }
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
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Estructuras de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text' }}>Datos</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy tu arquitecto de datos. Hoy aprenderás a construir los cimientos de cualquier aplicación moderna. ¡Ordenemos el mundo!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>NIVEL DE ARQUITECTO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #a855f7)', transition: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Clasificación</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Escribe la estructura correcta: ({flashQuest.q})</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0ea5e9' }}>{flashQuest.q}</div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input 
                type="text" value={flashInput}
                onChange={(e) => setFlashInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                placeholder="array / stack / queue..."
                style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #0ea5e9', color: 'white', padding: '15px', borderRadius: '12px', width: '220px', fontSize: '1.2rem', textAlign: 'center' }}
              />
              <button onClick={checkFlash} className="btn-login" style={{ background: '#0ea5e9', color: 'white', padding: '15px 30px' }}>ENVIAR</button>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Mapa de <span className="gradient-text">Decisión</span></h2>
        <p className="section-subtitle">¿No sabes qué usar? Sigue este flujo para encontrar la estructura perfecta para tu problema.</p>
        <DecisionFlowSVG />
      </section>

      <section className="info-section">
        <h2 className="section-title">Galería de <span className="gradient-text">Estructuras</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <StructureVisualizerSVG type="array" items={[10, 25, 30]} />
            <h4 style={{ color: '#0ea5e9', marginTop: '1rem' }}>Arreglos (Listas)</h4>
            <p style={{ fontSize: '0.8rem' }}>Elementos en fila con un número de posición (índice). ¡Rápidos para leer!</p>
          </div>
          <div className="benefit-card">
            <StructureVisualizerSVG type="stack" items={["Libro 3", "Libro 2", "Libro 1"]} />
            <h4 style={{ color: '#a855f7', marginTop: '1rem' }}>Pilas (Stacks)</h4>
            <p style={{ fontSize: '0.8rem' }}>Como una pila de platos. Solo puedes interactuar con el de arriba.</p>
          </div>
          <div className="benefit-card">
            <StructureVisualizerSVG type="queue" items={["User 3", "User 2", "User 1"]} />
            <h4 style={{ color: '#10b981', marginTop: '1rem' }}>Colas (Queues)</h4>
            <p style={{ fontSize: '0.8rem' }}>Como la fila del cine. El primero que llega es el primero que sale.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">JS vs <span className="gradient-text">Python</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9' }}>
                <th style={{ padding: '20px' }}>Estructura</th>
                <th style={{ padding: '20px' }}>JavaScript</th>
                <th style={{ padding: '20px' }}>Python</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Array / Lista</strong></td>
                <td><code>[1, 2, 3]</code></td>
                <td><code>[1, 2, 3]</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Objeto / Dict</strong></td>
                <td><code>{"{id: 1}"}</code></td>
                <td><code>{"{'id': 1}"}</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Añadir</strong></td>
                <td><code>arr.push(4)</code></td>
                <td><code>list.append(4)</code></td>
              </tr>
              <tr>
                <td style={{ padding: '15px' }}><strong>Longitud</strong></td>
                <td><code>arr.length</code></td>
                <td><code>len(list)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Estructuras</span></h2>
        <p className="section-subtitle">Resuelve estos 20 desafíos para obtener tu rango de Arquitecto Neon.</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default EstructurasDatos;