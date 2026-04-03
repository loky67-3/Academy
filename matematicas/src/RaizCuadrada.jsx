import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#6366f1')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

const SquareRootVisual = ({ value, size = 120 }) => {
  const root = Math.sqrt(value);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '15px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${root}, 1fr)`, gap: '4px', padding: '10px' }}>
        {[...Array(value)].map((_, i) => (
          <div key={i} style={{ width: size/(root*2), height: size/(root*2), background: '#6366f1', borderRadius: '2px', boxShadow: '0 0 5px #6366f1' }}></div>
        ))}
      </div>
    </div>
  );
};

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved }) => {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    if (parseFloat(userInput) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#6366f1'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.5rem', margin: '1rem 0', fontWeight: '900', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: '3rem', marginRight: '-5px' }}>√</span>
        <span style={{ borderTop: '3px solid white', paddingTop: '5px' }}>{question}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" step="0.1" value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          placeholder="?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '100px', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>OK</button>}
      </div>
    </div>
  );
};

const RaizCuadrada = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ n: 4, ans: 2 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const roots = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const res = roots[Math.floor(Math.random() * roots.length)];
    setFlashQuest({ n: res * res, ans: res });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (parseInt(flashInput) === flashQuest.ans) {
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
    { id: 'sqrt1', level: 'Fácil', question: 4, answer: 2 },
    { id: 'sqrt2', level: 'Fácil', question: 25, answer: 5 },
    { id: 'sqrt3', level: 'Medio', question: 81, answer: 9 },
    { id: 'sqrt4', level: 'Medio', question: 144, answer: 12 },
    { id: 'sqrt5', level: 'Dificil', question: 625, answer: 25 },
    { id: 'sqrt6', level: 'Avanzado', question: 2.25, answer: 1.5 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = Math.min((points / (exercises.length + 10)) * 100, 100);

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#6366f1' }}>
            <span>DOMINIO DE RAÍCES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #6366f1' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Raíz <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text' }}>Cuadrada</span></h1>
        <p className="hero-subtitle">El viaje inverso a la potencia. ¡Encuentra el origen de los números!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '550px', margin: '0 auto', border: '2px solid #6366f1', background: 'rgba(99, 102, 241, 0.05)', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Raíces</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿Cuál es el origen? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '4rem', marginRight: '-5px' }}>√</span>
                <span style={{ borderTop: '4px solid white', paddingTop: '5px' }}>{flashQuest.n}</span>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #6366f1', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#6366f1', padding: '15px 30px', color: 'white' }}>SOLUCIONAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Has encontrado todas las raíces! +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(99, 102, 241, 0.05), transparent)' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#6366f1' }}>¿Qué es la Raíz?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              La raíz cuadrada de un número es otro número que, multiplicado por sí mismo, da el primero. <br/><br/>
              Si <strong>5² = 25</strong>, entonces <strong>√25 = 5</strong>.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>√16 = 4 porque 4 × 4 = 16</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <SquareRootVisual value={16} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Visualización de un cuadrado perfecto (4x4)</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Métodos de <span className="gradient-text">Cálculo</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" style={{marginBottom: '1rem'}}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6M9 15h6"/></svg>
            <h4>Tablas de Cuadrados</h4>
            <p>Memorizar los primeros 12 cuadrados (1, 4, 9, 16...) es la forma más rápida de resolver raíces comunes.</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2v20M2 12h20"/></svg>
            <h4>Estimación</h4>
            <p>Si √20 no es exacta, sabemos que está entre √16 (4) y √25 (5). ¡Aproximadamente 4.4!</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>
            <h4>Factorización</h4>
            <p>Descomponer el número en factores primos ayuda a simplificar raíces grandes rápidamente.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Entrenamiento de Raíces</h2>
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

export default RaizCuadrada;