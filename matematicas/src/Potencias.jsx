import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Gráfica SVG de crecimiento exponencial
const PowerGraph = ({ base, exp, size = 180 }) => {
  const points = [];
  for (let i = 0; i <= exp; i++) {
    const x = (i / exp) * (size - 20) + 10;
    const y = size - (Math.pow(base, i) / Math.pow(base, exp)) * (size - 20) - 10;
    points.push(`${x},${y}`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: 'drop-shadow(0 0 10px #ec4899)' }}>
      <path d={`M ${points.join(' L ')}`} fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.split(',')[0]} cy={p.split(',')[1]} r="4" fill="white" />
      ))}
    </svg>
  );
};

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#ec4899')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved }) => {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    if (parseInt(userInput) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#ec4899'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.5rem', margin: '1.5rem 0', fontWeight: '900' }}>
        {question.base}<sup style={{ fontSize: '1.5rem', color: '#ec4899' }}>{question.exp}</sup>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : userInput}
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

const Potencias = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ b: 2, e: 3, ans: 8 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const b = Math.floor(Math.random() * 8) + 2;
    const e = Math.floor(Math.random() * 3) + 1;
    setFlashQuest({ b, e, ans: Math.pow(b, e) });
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
    { id: 'pow1', level: 'Fácil', question: { base: 2, exp: 3 }, answer: 8 },
    { id: 'pow2', level: 'Fácil', question: { base: 5, exp: 2 }, answer: 25 },
    { id: 'pow3', level: 'Medio', question: { base: 10, exp: 4 }, answer: 10000 },
    { id: 'pow4', level: 'Dificil', question: { base: 3, exp: 4 }, answer: 81 },
    { id: 'pow5', level: 'Pro', question: { base: 2, exp: 10 }, answer: 1024 },
    { id: 'pow6', level: 'Experto', question: { base: 4, exp: -1 }, answer: 0.25 }, // No parseInt for this one in real life, but using number input
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
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#ec4899' }}>
            <span>MAESTRÍA EXPONENCIAL</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #ec4899, #f43f5e)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #ec4899' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Poder de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ec4899, #f43f5e)', WebkitBackgroundClip: 'text' }}>Potencias</span></h1>
        <p className="hero-subtitle">Multiplicar el mismo número una y otra vez. ¡El lenguaje del crecimiento infinito!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '550px', margin: '0 auto', border: '2px solid #ec4899', background: 'rgba(236, 72, 153, 0.05)', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash Exponencial</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Calcula la potencia rápida ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900' }}>{flashQuest.b}<sup style={{ color: '#ec4899' }}>{flashQuest.e}</sup></div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #ec4899', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#ec4899', padding: '15px 30px', color: 'white' }}>POTENCIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Crecimiento Ilimitado Alcanzado! +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(236, 72, 153, 0.05), transparent)' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#ec4899' }}>¿Qué es una Potencia?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es una forma abreviada de escribir una multiplicación de un mismo número. <br/><br/>
              <strong>Base:</strong> El número que se multiplica.<br/>
              <strong>Exponente:</strong> Cuántas veces se multiplica.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>2³ = 2 × 2 × 2 = 8</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <PowerGraph base={2} exp={5} />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Leyes del Poder <span className="gradient-text">Exponencial</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2v20M2 12h20"/></svg>
            <h4>Exponente Cero</h4>
            <p>Cualquier número elevado a 0 es siempre <strong>1</strong>. (Ejemplo: 5⁰ = 1)</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="m19 12-7 7-7-7M12 19V5"/></svg>
            <h4>Exponentes Negativos</h4>
            <p>Invierten el número. 2⁻¹ es igual a <strong>1/2</strong> (0.5).</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <h4>Producto de Bases Iguales</h4>
            <p>Se suman los exponentes. aⁿ × aᵐ = aⁿ⁺ᵐ.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Entrenamiento de Potencias</h2>
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

export default Potencias;