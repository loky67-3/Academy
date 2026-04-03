import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => {
  const colors = { body: '#fbbf24', face: '#fff', eye: '#fff' }; // Main color for Condicionales module
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

// Diagrama de flujo SVG interactivo
const FlowchartSVG = ({ size = 300 }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <svg width={size} height={size * 0.8} viewBox="0 0 300 240">
      <rect x="110" y="10" width="80" height="30" rx="15" fill="none" stroke="white" strokeWidth="2" />
      <text x="150" y="30" fill="white" textAnchor="middle" fontSize="12">INICIO</text>
      <path d="M150 40 L150 60" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

      <path d="M150 60 L200 90 L150 120 L100 90 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <text x="150" y="95" fill="white" textAnchor="middle" fontSize="10">{"¿X > 10?"}</text>
      
      <path d="M200 90 L240 90 L240 140" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="220" y="85" fill="#10b981" fontSize="10">SÍ</text>
      <rect x="200" y="140" width="80" height="30" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="240" y="160" fill="white" textAnchor="middle" fontSize="10">Ruta A</text>

      <path d="M100 90 L60 90 L60 140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="80" y="85" fill="#ef4444" fontSize="10">NO</text>
      <rect x="20" y="140" width="80" height="30" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="60" y="160" fill="white" textAnchor="middle" fontSize="10">Ruta B</text>

      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="white" /></marker></defs>
    </svg>
    <p style={{ color: '#fbbf24', marginTop: '10px', fontSize: '0.9rem' }}>El Método del Rombo (Decisión)</p>
  </div>
);

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    if (uAns.toLowerCase() === answer.toString().toLowerCase() && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#fbbf24'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.1rem', minHeight: '3rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="v / f"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px', background: '#fbbf24', color: '#000' }}>OK</button>}
      </div>
    </div>
  );
};

const Condicionales = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '5 > 3', ans: 'verdadero' });
  const [flashInput, setFlashInput] = useState('');
  const [botStatus, setBotStatus] = useState('idle');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlash = () => {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const ops = ['>', '<', '==', '!='];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let res;
    if (op === '>') res = a > b;
    else if (op === '<') res = a < b;
    else if (op === '==') res = a === b;
    else res = a !== b;

    setFlashQuest({ q: `${a} ${op} ${b}`, ans: res ? 'v' : 'f' });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase() === flashQuest.ans) {
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

  const categories = [
    { id: 'c1', topic: 'Igualdad (==)', question: 'Si x=5, ¿x == 5?', answer: 'v' },
    { id: 'c2', topic: 'Diferencia (!=)', question: 'Si x=10, ¿x != 10?', answer: 'f' },
    { id: 'c3', topic: 'Comparación (> / <)', question: '¿15 > 20?', answer: 'f' },
    { id: 'c4', topic: 'Else-If', question: 'Si x=7, ¿es (x>5 && x<10)?', answer: 'v' },
    { id: 'c5', topic: 'Lógica Combinada', question: '¿!(5 == 5)?', answer: 'f' }
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / (categories.length + 10)) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Poder de las <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text' }}>Decisiones</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy tu instructor de lógica. Hoy aprenderás a dominar el 'Si sucede esto, haz aquello'. ¡El corazón de la inteligencia!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>MAESTRÍA EN CONDICIONALES</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', transition: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #fbbf24', background: 'rgba(251, 191, 36, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Decisión</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Escribe 'v' para Verdadero o 'f' para Falso: ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fbbf24' }}>{flashQuest.q}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="v / f"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #fbbf24', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#fbbf24', color: '#000', padding: '15px 30px' }}>DECIDIR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Mente Lógica! Has dominado las bifurcaciones. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Método del <span className="gradient-text">Flujo Lógico</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(251, 191, 36, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>
              Un condicional es como un guardia en una puerta. Solo te deja pasar si cumples la <strong>condición</strong>.
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2.5', textAlign: 'left' }}>
              <li>💎 <strong>IF (Si):</strong> La pregunta inicial.</li>
              <li>🛣️ <strong>ELSE (Si no):</strong> El camino alternativo.</li>
              <li>🚦 <strong>Operadores:</strong> Los criterios de comparación.</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <FlowchartSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">La Sintaxis de la <span className="gradient-text">Inteligencia</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fbbf24' }}>1. El "Si" Simple</h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <code>if (energía {'<'} 10) {'{'} <br/> &nbsp; dormir(); <br/> {'}'}</code>
            </div>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fbbf24' }}>2. La Bifurcación</h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
              <code>if (llueve) {'{'} <br/> &nbsp; llevarParaguas(); <br/> {'}'} else {'{'} <br/> &nbsp; lentesSol(); <br/> {'}'}</code>
            </div>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fbbf24' }}>3. Operadores Clave</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>
              <strong>==</strong> Es igual a <br/>
              <strong>!=</strong> Es diferente de <br/>
              <strong>&&</strong> Y (Ambos verdaderos) <br/>
              <strong>||</strong> O (Uno verdadero)
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla de <span className="gradient-text">Comparaciones</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                <th style={{ padding: '15px' }}>Operador</th>
                <th style={{ padding: '15px' }}>Significado</th>
                <th style={{ padding: '15px' }}>Ejemplo Verdadero</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>==</strong></td><td>Igualdad absoluta</td><td>5 == 5</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>!=</strong></td><td>Diferencia</td><td>5 != 10</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>{'>'}</strong></td><td>Mayor que</td><td>10 {'>'} 2</td></tr>
              <tr><td><strong>{'<'}</strong></td><td>Menor que</td><td>1 {'<'} 100</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Estaciones de <span className="gradient-text">Entrenamiento</span></h2>
        <p className="section-subtitle">Completa las 5 categorías maestras para dominar el flujo.</p>
        <div className="grid-container">
          {categories.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#fbbf24', color: '#000' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Condicionales;