import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Componente para mostrar fracciones de forma realista
const FractionDisplay = ({ num, den, size = '1.5rem', color = 'white' }) => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', margin: '0 5px', fontSize: size, color }}>
    <span style={{ borderBottom: `2px solid ${color}`, padding: '0 5px' }}>{num}</span>
    <span>{den}</span>
  </div>
);

// Representación visual de Pizza/Pastel
const PizzaFraction = ({ num, den, size = 120, activeColor = "var(--neon-blue)" }) => {
  const center = size / 2;
  const radius = center - 5;
  const slices = [];

  for (let i = 0; i < den; i++) {
    const startAngle = (i * 360) / den - 90;
    const endAngle = ((i + 1) * 360) / den - 90;
    
    const x1 = center + radius * Math.cos(Math.PI * startAngle / 180);
    const y1 = center + radius * Math.sin(Math.PI * startAngle / 180);
    const x2 = center + radius * Math.cos(Math.PI * endAngle / 180);
    const y2 = center + radius * Math.sin(Math.PI * endAngle / 180);
    
    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${360/den > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;

    slices.push(
      <path
        key={i}
        d={pathData}
        fill={i < num ? activeColor : "rgba(255,255,255,0.05)"}
        stroke="var(--bg-deep)"
        strokeWidth="2"
        style={{ transition: 'fill 0.3s ease, transform 0.3s ease', transformOrigin: 'center' }}
      />
    );
  }

  return (
    <svg width={size} height={size} style={{ filter: `drop-shadow(0 0 10px ${activeColor}44)` }}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {slices}
    </svg>
  );
};

// Muñequito SVG que reacciona
const NeonBot = ({ status }) => {
  const getExpression = () => {
    if (status === 'correct') return <path d="M9 11h.01M15 11h.01M9 15c.5 1 1.5 2 3 2s2.5-1 3-2" strokeWidth="2" strokeLinecap="round"/>;
    if (status === 'wrong') return <path d="M9 11h.01M15 11h.01M9 17s1-1 3-1 3 1 3 1" strokeWidth="2" strokeLinecap="round"/>;
    return <path d="M9 11h.01M15 11h.01M9 16h6" strokeWidth="2" strokeLinecap="round"/>;
  };

  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#f59e0b')} strokeWidth="1.5" style={{ transition: '0.3s', filter: 'drop-shadow(0 0 8px currentColor)' }}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4M8 21v2M16 21v2" />
      {getExpression()}
    </svg>
  );
};

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
    <div className="benefit-card" style={{ textAlign: 'center', borderLeft: `4px solid ${isSolved ? '#10b981' : '#f59e0b'}`, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ marginTop: '1rem' }}>
        <PizzaFraction num={question.num % (question.den + 1)} den={question.den} size={80} activeColor={isSolved ? '#10b981' : '#f59e0b'} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        <FractionDisplay num={question.num} den={question.den} size="2rem" color={isSolved ? '#10b981' : 'white'} />
        <span style={{ fontSize: '1.5rem', margin: '0 10px' }}>=</span>
        <input 
          type="number" 
          value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          placeholder="?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '70px', textAlign: 'center', fontSize: '1.2rem' }}
        />
      </div>
      {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ width: '100%' }}>Validar</button>}
    </div>
  );
};

const Fracciones = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ n1: 1, d1: 4, n2: 2, d2: 4, ans: 3 });
  const [flashInput, setFlashInput] = useState('');
  const [flashFeedback, setFlashFeedback] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');
  const [demoDen, setDemoDen] = useState(4);
  const [demoNum, setDemoNum] = useState(1);

  const generateFlashQuestion = () => {
    const commonDen = Math.floor(Math.random() * 8) + 2;
    const n1 = Math.floor(Math.random() * 5) + 1;
    const n2 = Math.floor(Math.random() * 4) + 1;
    setFlashQuest({ n1, d1: commonDen, n2, d2: commonDen, ans: n1 + n2 });
    setFlashInput('');
    setFlashFeedback('');
    setBotStatus('idle');
  };

  const checkFlashAnswer = () => {
    if (parseInt(flashInput) === flashQuest.ans) {
      setPoints(prev => prev + 1);
      setFlashSolvedCount(prev => prev + 1);
      setBotStatus('correct');
      if (flashSolvedCount < 9) {
        setFlashFeedback('¡Increíble! El denominador se queda igual.');
        setTimeout(generateFlashQuestion, 1200);
      } else {
        setFlashFeedback('¡Maestría en Fracciones! 🏆');
      }
    } else {
      setBotStatus('wrong');
      setFlashFeedback('¡Casi! Suma solo los de arriba.');
      setTimeout(() => setBotStatus('idle'), 1500);
    }
  };

  useEffect(() => { generateFlashQuestion(); }, []);

  const exercises = [
    { id: 'f1', level: 'Visual', question: { num: 4, den: 2 }, answer: 2 },
    { id: 'f2', level: 'Visual', question: { num: 9, den: 3 }, answer: 3 },
    { id: 'f3', level: 'Medio', question: { num: 10, den: 5 }, answer: 2 },
    { id: 'f4', level: 'Medio', question: { num: 12, den: 4 }, answer: 3 },
    { id: 'f5', level: 'Pro', question: { num: 50, den: 10 }, answer: 5 },
    { id: 'f6', level: 'Pro', question: { num: 100, den: 25 }, answer: 4 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const totalToWin = exercises.length + 10;
  const progress = Math.min((points / totalToWin) * 100, 100);

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '20px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#f59e0b' }}>
            <span>PODER DE FRACCIONES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #f59e0b' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Pizza de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text' }}>Fracciones</span></h1>
        <p className="hero-subtitle">Aprende a ver el mundo en partes. ¡La precisión es tu nuevo superpoder!</p>
      </section>

      <section className="info-section" style={{ paddingTop: '0' }}>
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <NeonBot status={botStatus} />
          </div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash: Suma de Partes</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Suma los numeradores ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <PizzaFraction num={flashQuest.n1} den={flashQuest.d1} size={100} activeColor="#f59e0b" />
                <PizzaFraction num={flashQuest.n2} den={flashQuest.d2} size={100} activeColor="#fbbf24" />
              </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <FractionDisplay num={flashQuest.n1} den={flashQuest.d1} size="2.5rem" />
              <span style={{ fontSize: '2rem' }}>+</span>
              <FractionDisplay num={flashQuest.n2} den={flashQuest.d2} size="2.5rem" />
              <span style={{ fontSize: '2rem' }}>=</span>
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                <input 
                  type="number" 
                  value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlashAnswer()}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #f59e0b', color: 'white', padding: '10px', borderRadius: '10px', width: '80px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <div style={{ width: '80px', height: '2px', background: 'white', margin: '5px 0' }}></div>
                <span style={{ fontSize: '1.5rem' }}>{flashQuest.d1}</span>
              </div>
              <button onClick={checkFlashAnswer} className="btn-login" style={{ background: '#f59e0b', color: '#000', padding: '10px 25px' }}>OK</button>
            </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>¡Neon-Bot está muy feliz! Has dominado las fracciones.</div>
          )}
          {flashFeedback && <p style={{ marginTop: '1.5rem', color: botStatus === 'correct' ? 'var(--neon-green)' : '#f87171', fontWeight: 'bold' }}>{flashFeedback}</p>}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'stretch', gap: '30px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', color: '#f59e0b', textAlign: 'center' }}>Interactúa con tu Pizza</h2>
          
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Mueve los controles para ver cómo cambia la pizza. El <strong>Denominador</strong> corta las rebanadas y el <strong>Numerador</strong> indica cuántas te vas a comer.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem' }}>Denominador (Slices): {demoDen}</label>
                <input 
                  type="range" min="1" max="12" value={demoDen} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setDemoDen(val);
                    if (demoNum > val) setDemoNum(val);
                  }} 
                  style={{ accentColor: '#f59e0b' }}
                />
                
                <label style={{ fontSize: '0.9rem', marginTop: '10px' }}>Numerador (Comidas): {demoNum}</label>
                <input 
                  type="range" min="0" max={demoDen} value={demoNum} 
                  onChange={(e) => setDemoNum(parseInt(e.target.value))} 
                  style={{ accentColor: '#fbbf24' }}
                />
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '30px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', minWidth: '250px' }}>
              <PizzaFraction num={demoNum} den={demoDen} size={180} activeColor="#f59e0b" />
              <FractionDisplay num={demoNum} den={demoDen} size="2.5rem" color="#f59e0b" />
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Retos de Simplificación</h2>
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

export default Fracciones;