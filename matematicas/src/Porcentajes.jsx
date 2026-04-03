import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Círculo de porcentaje visual
const PercentageCircle = ({ percent, size = 150, color = "#a855f7" }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        <circle 
          cx="80" cy="80" r={radius} fill="none" stroke={color} strokeWidth="12" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>{percent}%</span>
    </div>
  );
};

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#a855f7')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 11h.01" />
    {status === 'correct' ? <path d="M9 17c1 1 3 1 4 0" /> : <path d="M9 17h4" />}
  </svg>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, percentHint }) => {
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
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#a855f7'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ margin: '1.5rem 0' }}>
        <PercentageCircle percent={isSolved ? 100 : percentHint} size={100} color={isSolved ? '#10b981' : '#a855f7'} />
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>OK</button>}
      </div>
    </div>
  );
};

const Porcentajes = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ p: 10, n: 100, ans: 10 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');
  const [demoValue, setDemoValue] = useState(50);

  const generateFlash = () => {
    const p = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
    const n = Math.floor(Math.random() * 9 + 1) * 20;
    setFlashQuest({ p, n, ans: (p * n) / 100 });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (parseFloat(flashInput) === flashQuest.ans) {
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
    { id: 'p1', level: 'Fácil', question: '¿Cuánto es el 50% de 80?', answer: 40, percentHint: 50 },
    { id: 'p2', level: 'Fácil', question: '¿Cuánto es el 10% de 200?', answer: 20, percentHint: 10 },
    { id: 'p3', level: 'Medio', question: '25% de 120', answer: 30, percentHint: 25 },
    { id: 'p4', level: 'Medio', question: 'Si compras algo de $200 con 15% de descuento, ¿cuánto descuentas?', answer: 30, percentHint: 15 },
    { id: 'p5', level: 'Dificil', question: '75% de una deuda de $400', answer: 300, percentHint: 75 },
    { id: 'p6', level: 'Fácil', question: '5% de comisión sobre $1000', answer: 50, percentHint: 5 },
    { id: 'p7', level: 'Medio', question: '30% de 150 invitados', answer: 45, percentHint: 30 },
    { id: 'p8', level: 'Experto', question: 'Calcula el 12.5% de 80', answer: 10, percentHint: 12 },
    { id: 'p9', level: 'Experto', question: '90% de un examen de 50 preguntas', answer: 45, percentHint: 90 },
    { id: 'p10', level: 'Reto Pro', question: 'Si una población de 200 crece un 120%, ¿cuántos hay ahora?', answer: 240, percentHint: 100 },
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
      <div className="neon-glow-bg" style={{ top: '10%', left: '10%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '20px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#a855f7' }}>
            <span>MAESTRÍA DE PORCENTAJES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7, #ec4899)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #a855f7' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Poder de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text' }}>Porcentajes</span></h1>
        <p className="hero-subtitle">Desde ofertas en tiendas hasta crecimiento de datos. ¡Domina las porciones de 100!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Calcula rápido ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{flashQuest.p}% de {flashQuest.n}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #a855f7', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#a855f7', padding: '15px 30px', color: 'white' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>¡Eres un experto en cálculos rápidos! +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px' }}>
          <div className="cert-text">
            <h2 className="section-title" style={{ color: '#a855f7' }}>¿Qué es un Porcentaje?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es simplemente una fracción cuyo denominador es siempre <strong>100</strong>. Decir 25% es lo mismo que decir 25 de cada 100 unidades.
            </p>
            <div style={{ marginTop: '20px' }}>
              <label style={{ color: 'var(--text-secondary)' }}>Ajusta el círculo: {demoValue}%</label>
              <input 
                type="range" min="0" max="100" value={demoValue} 
                onChange={(e) => setDemoValue(e.target.value)}
                style={{ width: '100%', accentColor: '#a855f7', marginTop: '10px' }}
              />
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
            <PercentageCircle percent={demoValue} />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Retos del Mundo Real</h2>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} percentHint={ex.percentHint} />
          ))}
        </div>
      </section>

      <section className="info-section" style={{ paddingTop: 0 }}>
        <div className="benefit-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--glass-border)' }}>
          <h3>Truco de Genio: El método 10%</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Para sacar el 10% de cualquier número, solo mueve el punto decimal un lugar a la izquierda. <br/>
            Ejemplo: 10% de 450 → 45.0. <br/>
            ¡Sabiendo el 10%, puedes sacar el 20% (duplicando) o el 5% (dividiendo a la mitad)!
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Porcentajes;