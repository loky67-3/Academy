import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#38bdf8')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

const BalanceVisual = ({ left, right, isBalanced }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0', transition: '0.5s' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '30px', transform: isBalanced ? 'rotate(0deg)' : 'rotate(-5deg)', transition: '0.5s' }}>
      <div className="benefit-card" style={{ padding: '20px', minWidth: '120px', border: '2px solid #38bdf8', fontSize: '2rem' }}>{left}</div>
      <div style={{ fontSize: '3rem', color: isBalanced ? '#10b981' : '#38bdf8' }}>=</div>
      <div className="benefit-card" style={{ padding: '20px', minWidth: '120px', border: '2px solid #38bdf8', fontSize: '2rem' }}>{right}</div>
    </div>
    <div style={{ width: '350px', height: '8px', background: 'white', borderRadius: '4px', marginTop: '10px' }}></div>
    <div style={{ width: '0', height: '0', borderLeft: '25px solid transparent', borderRight: '25px solid transparent', borderBottom: '40px solid rgba(255,255,255,0.1)' }}></div>
  </div>
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
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#38bdf8'}`, textAlign: 'center', flex: '1 1 300px' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.5rem', margin: '1.5rem 0', fontWeight: '900', color: isSolved ? '#10b981' : 'white' }}>
        {question}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          placeholder="x = ?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '100px', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>RESOLVER</button>}
      </div>
    </div>
  );
};

const Ecuaciones = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 2, b: 10, ans: 5, op: '×' });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const types = ['+', '-', '×'];
    const type = types[Math.floor(Math.random() * 3)];
    let a, b, ans;

    if (type === '+') {
      a = Math.floor(Math.random() * 20) + 1;
      ans = Math.floor(Math.random() * 20) + 1;
      b = a + ans;
    } else if (type === '-') {
      ans = Math.floor(Math.random() * 20) + 1;
      a = Math.floor(Math.random() * 20) + 1;
      b = ans - a;
    } else {
      a = Math.floor(Math.random() * 10) + 2;
      ans = Math.floor(Math.random() * 10) + 1;
      b = a * ans;
    }

    setFlashQuest({ a, b, ans, op: type });
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
    { id: 'eq1', level: 'Iniciación', question: 'x + 5 = 15', answer: 10 },
    { id: 'eq2', level: 'Iniciación', question: 'x - 10 = 5', answer: 20 },
    { id: 'eq3', level: 'Básico', question: '3x = 21', answer: 7 },
    { id: 'eq4', level: 'Básico', question: 'x / 2 = 8', answer: 16 },
    { id: 'eq5', level: 'Medio', question: '2x + 4 = 14', answer: 5 },
    { id: 'eq6', level: 'Medio', question: '5x - 5 = 20', answer: 5 },
    { id: 'eq7', level: 'Difícil', question: 'x/3 + 7 = 10', answer: 9 },
    { id: 'eq8', level: 'Difícil', question: '4x + 10 = 2x + 20', answer: 5 },
    { id: 'eq9', level: 'Avanzado', question: '3(x - 2) = 12', answer: 6 },
    { id: 'eq10', level: 'Maestro', question: '2x/4 + 1 = 6', answer: 10 },
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
      <div className="neon-glow-bg" style={{ top: '10%', right: '5%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#38bdf8' }}>
            <span>MAESTRÍA EN ECUACIONES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #38bdf8' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>El Secreto de las <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text' }}>Ecuaciones</span></h1>
        <p className="hero-subtitle">Imagina que una ecuación es una balanza. Tu misión es descubrir el peso de la <strong>X</strong> manteniendo el equilibrio.</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #38bdf8', background: 'rgba(56, 189, 248, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Equilibrio</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Resuelve rápido para ganar XP ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px' }}>
                {flashQuest.op === '×' ? `${flashQuest.a}x = ${flashQuest.b}` : `x ${flashQuest.op} ${flashQuest.a} = ${flashQuest.b}`}
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #38bdf8', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#38bdf8', padding: '15px 30px', color: '#020617' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Balanza Equilibrada! Eres un experto. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(56, 189, 248, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#38bdf8', textAlign: 'left' }}>¿Cómo resolverlas?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              La regla es simple: <strong>Haz lo contrario</strong>. <br/><br/>
              Si un número está sumando, pásalo al otro lado restando. Si está multiplicando, pásalo dividiendo. ¡Es como rebobinar una película!
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.3rem' }}>x + 5 = 10 <br/> x = 10 - 5 <br/> x = 5</code>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <BalanceVisual left="x + 5" right="10" isBalanced={true} />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Pasos de un <span className="gradient-text">Maestro</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>1️⃣</div>
            <h4>Identifica la X</h4>
            <p>Mira dónde está tu incógnita y qué números la acompañan.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>2️⃣</div>
            <h4>Mueve lo Lejano</h4>
            <p>Primero quita los números que suman o restan al grupo de la X.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>3️⃣</div>
            <h4>Libera a la X</h4>
            <p>Al final, quita los números que multiplican o dividen a la X.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de Ecuaciones</h2>
        <p className="section-subtitle">Practica con estos 10 retos de dificultad progresiva. ¡Grandes números para grandes mentes!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#38bdf8', color: '#020617' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Ecuaciones;