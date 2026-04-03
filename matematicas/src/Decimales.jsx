import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#22d3ee')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
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
    const val = parseFloat(userInput);
    // Usamos una pequeña tolerancia para evitar errores de precisión de punto flotante de JS
    if (Math.abs(val - answer) < 0.01 && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#22d3ee'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <h3 style={{ fontSize: '1.8rem', margin: '1.5rem 0', letterSpacing: '1px' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" step="0.01"
          value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '120px', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>OK</button>}
      </div>
    </div>
  );
};

const Decimales = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const op = Math.random() > 0.5 ? '+' : '-';
    let a = (Math.random() * 10).toFixed(1);
    let b = (Math.random() * 5).toFixed(1);
    
    if (op === '-' && parseFloat(a) < parseFloat(b)) [a, b] = [b, a];
    
    const res = op === '+' ? parseFloat(a) + parseFloat(b) : parseFloat(a) - parseFloat(b);
    
    setFlashQuest({ a, b, op, ans: parseFloat(res.toFixed(1)) });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (Math.abs(parseFloat(flashInput) - flashQuest.ans) < 0.01) {
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
    { id: 'd1', level: 'Básico', question: '0.5 + 0.25', answer: 0.75 },
    { id: 'd2', level: 'Básico', question: '1.0 - 0.4', answer: 0.6 },
    { id: 'd3', level: 'Negativos', question: '-1.5 + 0.5', answer: -1.0 },
    { id: 'd4', level: 'Avanzado', question: '12.45 + 7.55', answer: 20.0 },
    { id: 'd5', level: 'Avanzado', question: '-5.2 - 2.8', answer: -8.0 },
    { id: 'd6', level: 'Experto', question: '0.125 + 0.125', answer: 0.25 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const totalPoints = exercises.length + 10;
  const progress = Math.min((points / totalPoints) * 100, 100);

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#22d3ee' }}>
            <span>PRECISIÓN DECIMAL</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #22d3ee, #0ea5e9)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #22d3ee' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Mundo <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #22d3ee, #0ea5e9)', WebkitBackgroundClip: 'text' }}>Decimal</span></h1>
        <p className="hero-subtitle">Descubre los números entre los números. ¡Donde la precisión se encuentra con la lógica!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid #22d3ee', background: 'rgba(34, 211, 238, 0.05)', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash Decimal</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Calcula rápido con punto decimal ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900' }}>{flashQuest.a} {flashQuest.op} {flashQuest.b}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" step="0.1" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #22d3ee', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#22d3ee', padding: '15px 30px', color: '#020617' }}>OK</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Precisión Milimétrica Alcanzada! +10 XP</div>
          )}
          {botStatus === 'wrong' && <p style={{marginTop: '10px', color: '#ef4444'}}>Alinea el punto decimal...</p>}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <h2 className="section-title">¿Dónde usamos decimales?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" style={{marginBottom: '1rem'}}><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/></svg>
              <h4>Dinero</h4>
              <p>$10.50 significa 10 dólares y 50 centavos.</p>
            </div>
            <div className="benefit-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
              <h4>Temperatura</h4>
              <p>36.5°C es la temperatura normal del cuerpo.</p>
            </div>
            <div className="benefit-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" style={{marginBottom: '1rem'}}><rect width="16" height="10" x="4" y="7" rx="2"/><path d="M12 7V3M8 3h8"/></svg>
              <h4>Peso</h4>
              <p>1.25kg de harina para un pastel delicioso.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Operaciones con Negativos</h2>
        <p className="section-subtitle">Cuando restas un decimal mayor a uno menor, ¡obtienes un número negativo! Ejemplo: 0.5 - 1.0 = -0.5</p>
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

export default Decimales;