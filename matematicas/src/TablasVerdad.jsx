import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px #f43f5e)' }}>
    <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke="#f43f5e" strokeWidth="5" />
    <path d="M70 140 L50 180 M130 140 L150 180" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
    <circle cx="80" cy="80" r="8" fill="#fff" />
    <circle cx="120" cy="80" r="8" fill="#fff" />
    {expression === 'happy' ? (
      <path d="M80 110 Q 100 130 120 110" stroke="#fff" strokeWidth="4" fill="none" />
    ) : (
      <path d="M80 115 L120 115" stroke="#fff" strokeWidth="4" />
    )}
    <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" />
    <path d="M170 40 L170 60" stroke="#fbbf24" strokeWidth="3" />
  </svg>
);

// Visualización de Símbolos Lógicos SVG
const LogicSymbolSVG = ({ type, color = "#f43f5e", size = 80 }) => {
  const renderSymbol = () => {
    switch(type) {
      case 'AND': return <path d="M20 80 L50 20 L80 80" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />;
      case 'OR': return <path d="M20 20 L50 80 L80 20" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />;
      case 'NOT': return <path d="M20 50 L40 50 L50 30 L70 70 L80 50 L100 50" stroke={color} strokeWidth="6" fill="none" />;
      case 'IF': return <path d="M20 50 L80 50 M60 30 L80 50 L60 70" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />;
      default: return null;
    }
  };
  return <svg width={size} height={size} viewBox="0 0 100 100">{renderSymbol()}</svg>;
};

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
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#f43f5e'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.1rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="V / F"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px', background: '#f43f5e' }}>OK</button>}
      </div>
    </div>
  );
};

const TablasVerdad = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: 'V ∧ V', ans: 'V' });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const ops = ['∧', '∨', '→', '↔'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const a = Math.random() > 0.5 ? 'V' : 'F';
    const b = Math.random() > 0.5 ? 'V' : 'F';
    
    let q = `${a} ${op} ${b}`, ans;
    if (op === '∧') ans = (a === 'V' && b === 'V') ? 'V' : 'F';
    else if (op === '∨') ans = (a === 'V' || b === 'V') ? 'V' : 'F';
    else if (op === '→') ans = (a === 'V' && b === 'F') ? 'F' : 'V';
    else ans = (a === b) ? 'V' : 'F';

    setFlashQuest({ q, ans });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput.toUpperCase() === flashQuest.ans) {
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
    { id: 'tv1', topic: 'Conjunción', question: 'V ∧ F es...', answer: 'F' },
    { id: 'tv2', topic: 'Disyunción', question: 'F ∨ V es...', answer: 'V' },
    { id: 'tv3', topic: 'Negación', question: '¬(V) es...', answer: 'F' },
    { id: 'tv4', topic: 'Condicional', question: 'V → F es...', answer: 'F' },
    { id: 'tv5', topic: 'Bicondicional', question: 'F ↔ F es...', answer: 'V' },
    { id: 'tv6', topic: 'Tautología', question: '¿P ∨ ¬P siempre es V?', answer: 'V' },
    { id: 'tv7', topic: 'Contradicción', question: '¿P ∧ ¬P siempre es V?', answer: 'F' },
    { id: 'tv8', topic: 'Combinada', question: '(V ∧ V) → F es...', answer: 'F' },
    { id: 'tv9', topic: 'Combinada', question: '¬(F ∨ F) es...', answer: 'V' },
    { id: 'tv10', topic: 'Lógica', question: 'Si antecedente es F, ¿V → P es?', answer: 'V' },
    { id: 'tv11', topic: 'Bicondicional', question: 'V ↔ F es...', answer: 'F' },
    { id: 'tv12', topic: 'Negación', question: '¬(¬V) es...', answer: 'V' },
    { id: 'tv13', topic: 'Disyunción', question: 'F ∨ F es...', answer: 'F' },
    { id: 'tv14', topic: 'Conjunción', question: 'V ∧ V es...', answer: 'V' },
    { id: 'tv15', topic: 'Condicional', question: 'F → V es...', answer: 'V' },
    { id: 'tv16', topic: 'Combinada', question: '(F ∨ V) ∧ V es...', answer: 'V' },
    { id: 'tv17', topic: 'Combinada', question: '¬V ∨ V es...', answer: 'V' },
    { id: 'tv18', topic: 'Definición', question: '¿Contingencia es V y F?', answer: 'V' },
    { id: 'tv19', topic: 'Combinada', question: '(V → F) ↔ F es...', answer: 'V' },
    { id: 'tv20', topic: 'Lógica', question: 'Número de filas para 3 variables', answer: '8' },
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
          <ProfessorNeon size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Tablas de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #f43f5e, #fb7185)', WebkitBackgroundClip: 'text' }}>Verdad</span></h1>
            <p className="hero-subtitle">"¡Bienvenido! Soy el Arquitecto de la Certeza. Hoy aprenderás a separar la verdad de la falsedad usando la lógica pura."</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>DOMINIO LOGÍSTICO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #f43f5e, #fbbf24)', transition: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #f43f5e', background: 'rgba(244, 63, 94, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={80} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Certeza Rápida</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Evalúa la proposición: {flashQuest.q} ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', color: '#f43f5e' }}>{flashQuest.q} = ?</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="V / F"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #f43f5e', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#f43f5e', color: 'white', padding: '15px 30px' }}>EVALUAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Mente Analítica! Has dominado los fundamentos. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Los Padres de las Tablas: <span className="gradient-text">Wittgenstein y Post</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(244, 63, 94, 0.05), transparent)' }}>
          <div className="benefit-card" style={{ flex: 1, fontSize: '4rem' }}>🖋️</div>
          <div className="cert-text" style={{ flex: 2 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>
              A principios del siglo XX, **Ludwig Wittgenstein** y **Emil Post** desarrollaron de forma independiente las tablas de verdad. 
              Su objetivo era simple: crear una forma visual de calcular el valor de verdad de cualquier frase compleja. 
              ¡Convirtieron la filosofía en un cálculo matemático!
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Los Conectivos <span className="gradient-text">Lógicos</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <LogicSymbolSVG type="AND" />
            <h4 style={{ color: '#f43f5e' }}>Conjunción (∧)</h4>
            <p style={{ fontSize: '0.8rem' }}>"P y Q". Solo es Verdad si ambos son verdad.</p>
          </div>
          <div className="benefit-card">
            <LogicSymbolSVG type="OR" />
            <h4 style={{ color: '#f43f5e' }}>Disyunción (∨)</h4>
            <p style={{ fontSize: '0.8rem' }}>"P o Q". Es Verdad si al menos uno lo es.</p>
          </div>
          <div className="benefit-card">
            <LogicSymbolSVG type="IF" />
            <h4 style={{ color: '#f43f5e' }}>Condicional (→)</h4>
            <p style={{ fontSize: '0.8rem' }}>"Si P entonces Q". Solo es Falso si V implica F.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla Maestra de <span className="gradient-text">Verdad</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>
                <th style={{ padding: '15px' }}>P</th>
                <th style={{ padding: '15px' }}>Q</th>
                <th style={{ padding: '15px' }}>P ∧ Q (y)</th>
                <th style={{ padding: '15px' }}>P ∨ Q (o)</th>
                <th style={{ padding: '15px' }}>P → Q (si...entonces)</th>
                <th style={{ padding: '15px' }}>P ↔ Q (si y solo si)</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>V</td><td>V</td><td>V</td><td>V</td><td>V</td><td>V</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>V</td><td>F</td><td>F</td><td>V</td><td style={{color: '#f43f5e', fontWeight: 'bold'}}>F</td><td>F</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td>F</td><td>V</td><td>F</td><td>V</td><td>V</td><td>F</td></tr>
              <tr><td>F</td><td>F</td><td>F</td><td>F</td><td>V</td><td>V</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conceptos <span className="gradient-text">Base</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#bef264' }}>1. Tautología</h4>
            <p style={{ fontSize: '0.85rem' }}>Cuando el resultado final de la tabla es **siempre Verdadero**, sin importar los valores de entrada. Es una verdad universal.</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#ef4444' }}>2. Contradicción</h4>
            <p style={{ fontSize: '0.85rem' }}>Cuando el resultado final es **siempre Falso**. Es algo lógicamente imposible.</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#38bdf8' }}>3. Contingencia</h4>
            <p style={{ fontSize: '0.85rem' }}>Cuando el resultado tiene **mezcla de V y F**. Depende de las circunstancias.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Pensamiento Crítico</span></h2>
        <p className="section-subtitle">Completa estos 20 retos para dominar las estructuras del pensamiento. Usa "V" para Verdadero y "F" para Falso.</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#f43f5e' }} onClick={() => navigate('/')}>Volver al Cuartel General</button>
      </div>
    </div>
  );
};

export default TablasVerdad;