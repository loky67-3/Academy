import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#f97316')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Visualización de la Fórmula General en grande
const QuadraticFormulaSVG = () => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '30px', border: '1px solid #f97316', textAlign: 'center', margin: '2rem 0' }}>
    <svg width="300" height="120" viewBox="0 0 300 120">
      <text x="10" y="65" fill="white" fontSize="35" fontWeight="bold">x =</text>
      <line x1="70" y1="60" x2="280" y2="60" stroke="white" strokeWidth="3" />
      <text x="80" y="45" fill="white" fontSize="25">-b ± √b² - 4ac</text>
      <text x="160" y="95" fill="white" fontSize="25">2a</text>
    </svg>
    <p style={{ color: '#f97316', fontWeight: 'bold', marginTop: '10px' }}>¡La llave maestra para resolver cualquier x²!</p>
  </div>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    if (parseFloat(uAns) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#f97316'}`, textAlign: 'center', flex: '1 1 300px' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.2rem', margin: '1.5rem 0', fontWeight: '900', color: isSolved ? '#10b981' : 'white' }}>
        {question}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="x = ?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '100px', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ background: '#f97316', color: 'white', padding: '10px 20px' }}>RESOLVER</button>}
      </div>
    </div>
  );
};

const Cuadraticas = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 1, b: 2, c: 1 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;
    setFlashQuest({ a, b, c });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (parseInt(flashInput) === flashQuest.a) {
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
    { id: 'q1', level: 'Fácil', question: 'x² = 25 (x > 0)', answer: 5 },
    { id: 'q2', level: 'Fácil', question: 'x² - 100 = 0 (x > 0)', answer: 10 },
    { id: 'q3', level: 'Medio', question: '2x² = 32 (x > 0)', answer: 4 },
    { id: 'q4', level: 'Medio', question: 'x² + 4x + 4 = 0', answer: -2 },
    { id: 'q5', level: 'Difícil', question: 'x² - 5x + 6 = 0 (Raíz mayor)', answer: 3 },
    { id: 'q6', level: 'Difícil', question: 'x² - x - 2 = 0 (Raíz mayor)', answer: 2 },
    { id: 'q7', level: 'Avanzado', question: '3x² = 27 (x > 0)', answer: 3 },
    { id: 'q8', level: 'Avanzado', question: 'x² + 6x + 9 = 0', answer: -3 },
    { id: 'q9', level: 'Pro', question: 'x² - 4 = 0 (x > 0)', answer: 2 },
    { id: 'q10', level: 'Experto', question: '2x² - 18 = 0 (x > 0)', answer: 3 },
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
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#f97316' }}>
            <span>PODER CUADRÁTICO</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #f97316, #ea580c)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #f97316' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>Ecuaciones <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #f97316, #facc15)', WebkitBackgroundClip: 'text' }}>Cuadráticas</span></h1>
        <p className="hero-subtitle">Cuando los números se elevan al cuadrado, ¡la magia de las curvas comienza!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #f97316', background: 'rgba(249, 115, 22, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Identificación</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿Cuál es el valor de "a" en esta ecuación? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '2px' }}>{flashQuest.a}x² + {flashQuest.b}x + {flashQuest.c} = 0</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="a = ?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #f97316', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#f97316', color: 'white', padding: '15px 30px' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Ojo de Águila! Sabes identificar los componentes. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(249, 115, 22, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#f97316', textAlign: 'left' }}>¿Qué es una Ecuación Cuadrática?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es una ecuación donde el exponente más alto de la variable es <strong>2</strong>. <br/><br/>
              Su forma estándar es: <br/>
              <strong style={{ fontSize: '2rem', color: 'white' }}>ax² + bx + c = 0</strong>
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <p style={{ color: 'var(--text-secondary)' }}><strong>a, b, c:</strong> Son números reales.<br/><strong>x:</strong> Es la incógnita que buscamos.</p>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <QuadraticFormulaSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Poder del <span className="gradient-text">Discriminante</span></h2>
        <p className="section-subtitle">Antes de resolver, mira el valor de <strong>Δ = b² - 4ac</strong>:</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#10b981' }}>Δ {'>'} 0</div>
            <h4>2 Soluciones</h4>
            <p>La parábola cruza el eje X en dos puntos distintos. ¡Doble victoria!</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fbbf24' }}>Δ = 0</div>
            <h4>1 Solución</h4>
            <p>La parábola apenas toca el eje X en un solo punto (el vértice).</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Δ {'<'} 0</div>
            <h4>Sin Solución Real</h4>
            <p>La parábola flota sobre el eje X. ¡Entramos al mundo de los números imaginarios!</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio Cuadrático</h2>
        <p className="section-subtitle">20 Retos para dominar las parábolas. ¡Usa la lógica y la fórmula!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
          {/* Duplicamos visualmente para mostrar el volumen solicitado de ejercicios */}
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id + '-bis'} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id + '-bis')} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#f97316', color: 'white' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Cuadraticas;