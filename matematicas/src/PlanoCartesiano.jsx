import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#10b981')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Gráfica del Plano Cartesiano dinámico
const CoordinatePlane = ({ pointX = 0, pointY = 0, showPoint = true, size = 200 }) => {
  const center = size / 2;
  const step = size / 10;

  return (
    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'inline-block' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Cuadrícula sutil */}
        {[...Array(11)].map((_, i) => (
          <React.Fragment key={i}>
            <line x1={i * step} y1="0" x2={i * step} y2={size} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1={i * step} x2={size} y2={i * step} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </React.Fragment>
        ))}
        
        {/* Ejes principales */}
        <line x1="0" y1={center} x2={size} y2={center} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1={center} y1="0" x2={center} y2={size} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        
        {/* Etiquetas de Ejes */}
        <text x={size - 15} y={center - 5} fill="#10b981" fontSize="12" fontWeight="bold">X</text>
        <text x={center + 5} y="15" fill="#10b981" fontSize="12" fontWeight="bold">Y</text>

        {/* Punto dinámico */}
        {showPoint && (
          <circle 
            cx={center + (pointX * step / 2)} 
            cy={center - (pointY * step / 2)} 
            r="6" fill="#10b981" 
            style={{ filter: 'drop-shadow(0 0 8px #10b981)', transition: '0.5s' }} 
          />
        )}
      </svg>
    </div>
  );
};

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, point }) => {
  const [uX, setUX] = useState('');
  const [uY, setUY] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    if (parseInt(uX) === answer.x && parseInt(uY) === answer.y && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : 'var(--neon-blue)'}`, textAlign: 'center', minWidth: '280px' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ margin: '1rem 0' }}>
        <CoordinatePlane pointX={point.x} pointY={point.y} size={120} />
      </div>
      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: '1.2rem' }}>(</span>
        <input type="number" value={isSolved ? answer.x : uX} onChange={(e)=>setUX(e.target.value)} disabled={isSolved} placeholder="x" style={{ width: '45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', textAlign: 'center', borderRadius: '5px' }} />
        <span style={{ fontSize: '1.2rem' }}>,</span>
        <input type="number" value={isSolved ? answer.y : uY} onChange={(e)=>setUY(e.target.value)} disabled={isSolved} placeholder="y" style={{ width: '45px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', textAlign: 'center', borderRadius: '5px' }} />
        <span style={{ fontSize: '1.2rem' }}>)</span>
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ padding: '8px 12px', fontSize: '0.7rem', marginLeft: '5px' }}>OK</button>}
      </div>
    </div>
  );
};

const PlanoCartesiano = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ x: 2, y: 3 });
  const [flashInput, setFlashInput] = useState({ x: '', y: '' });
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    setFlashQuest({
      x: Math.floor(Math.random() * 9) - 4,
      y: Math.floor(Math.random() * 9) - 4
    });
    setFlashInput({ x: '', y: '' });
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (parseInt(flashInput.x) === flashQuest.x && parseInt(flashInput.y) === flashQuest.y) {
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
    { id: 'pc1', level: 'Fácil', question: '¿Coordenadas del origen?', point: {x:0, y:0}, answer: {x:0, y:0} },
    { id: 'pc2', level: 'Fácil', question: 'Identifica el punto verde', point: {x:2, y:2}, answer: {x:2, y:2} },
    { id: 'pc3', level: 'Fácil', question: 'Identifica el punto verde', point: {x:-3, y:1}, answer: {x:-3, y:1} },
    { id: 'pc4', level: 'Fácil', question: 'Identifica el punto verde', point: {x:0, y:4}, answer: {x:0, y:4} },
    { id: 'pc5', level: 'Fácil', question: 'Identifica el punto verde', point: {x:4, y:-2}, answer: {x:4, y:-2} },
    // ... hasta 20 ejercicios variados
    { id: 'pc6', level: 'Medio', question: 'Punto en Cuadrante II', point: {x:-2, y:3}, answer: {x:-2, y:3} },
    { id: 'pc7', level: 'Medio', question: 'Punto en el eje X', point: {x:5, y:0}, answer: {x:5, y:0} },
    { id: 'pc8', level: 'Medio', question: 'Punto en Cuadrante III', point: {x:-4, y:-4}, answer: {x:-4, y:-4} },
    { id: 'pc9', level: 'Medio', question: 'Punto en el eje Y', point: {x:0, y:-3}, answer: {x:0, y:-3} },
    { id: 'pc10', level: 'Medio', question: 'Identifica el punto verde', point: {x:1, y:-1}, answer: {x:1, y:-1} },
    { id: 'pc11', level: 'Difícil', question: 'Reflejo de (2,2) en eje X', point: {x:2, y:-2}, answer: {x:2, y:-2} },
    { id: 'pc12', level: 'Difícil', question: 'Reflejo de (1,3) en eje Y', point: {x:-1, y:3}, answer: {x:-1, y:3} },
    { id: 'pc13', level: 'Difícil', question: 'Identifica el punto verde', point: {x:-5, y:0}, answer: {x:-5, y:0} },
    { id: 'pc14', level: 'Difícil', question: 'Identifica el punto verde', point: {x:3, y:3}, answer: {x:3, y:3} },
    { id: 'pc15', level: 'Difícil', question: 'Identifica el punto verde', point: {x:-2, y:-5}, answer: {x:-2, y:-5} },
    { id: 'pc16', level: 'Avanzado', question: 'Punto medio entre (0,0) y (4,4)', point: {x:2, y:2}, answer: {x:2, y:2} },
    { id: 'pc17', level: 'Avanzado', question: 'Identifica el punto verde', point: {x:4, y:1}, answer: {x:4, y:1} },
    { id: 'pc18', level: 'Avanzado', question: 'Identifica el punto verde', point: {x:-1, y:-1}, answer: {x:-1, y:-1} },
    { id: 'pc19', level: 'Avanzado', question: 'Identifica el punto verde', point: {x:0, y:0}, answer: {x:0, y:0} },
    { id: 'pc20', level: 'Avanzado', question: 'Identifica el punto verde', point: {x:2, y:-4}, answer: {x:2, y:-4} },
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
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#10b981' }}>
            <span>MAESTRÍA EN COORDENADAS</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #10b981' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Plano <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', WebkitBackgroundClip: 'text' }}>Cartesiano</span></h1>
        <p className="hero-subtitle">El sistema de navegación universal. ¡Aprende a ubicar cualquier punto en el espacio!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Radar</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿En qué coordenadas está el objetivo? ({flashSolvedCount}/10)</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <CoordinatePlane pointX={flashQuest.x} pointY={flashQuest.y} size={180} />
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ fontSize: '2rem' }}>(</span>
              <input 
                type="number" value={flashInput.x}
                onChange={(e) => setFlashInput({...flashInput, x: e.target.value})}
                placeholder="x"
                style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #10b981', color: 'white', padding: '10px', borderRadius: '10px', width: '70px', fontSize: '1.5rem', textAlign: 'center' }}
              />
              <span style={{ fontSize: '2rem' }}>,</span>
              <input 
                type="number" value={flashInput.y}
                onChange={(e) => setFlashInput({...flashInput, y: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                placeholder="y"
                style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #10b981', color: 'white', padding: '10px', borderRadius: '10px', width: '70px', fontSize: '1.5rem', textAlign: 'center' }}
              />
              <span style={{ fontSize: '2rem' }}>)</span>
              <button onClick={checkFlash} className="btn-login" style={{ background: '#10b981', color: '#020617', padding: '12px 25px' }}>SCAN</button>
            </div>
          </div>
          {flashSolvedCount === 10 && <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', marginTop: '20px' }}>¡Radar Calibrado! Eres un experto explorador. +10 XP</div>}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(16, 185, 129, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#10b981', textAlign: 'left' }}>¿Cómo funciona?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es como un juego de "Batalla Naval". Usamos dos números para encontrar un punto: <br/><br/>
              1. <strong>Eje X (Horizontal):</strong> Indica si vas a la derecha (+) o a la izquierda (-). <br/>
              2. <strong>Eje Y (Vertical):</strong> Indica si vas hacia arriba (+) o hacia abajo (-).
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>Punto = (X, Y) <br/> Ejemplo: (3, -2)</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="benefit-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: 'white', fontWeight: 'bold' }}>
                <div style={{ border: '1px solid #10b981', padding: '10px' }}>Cuadrante II (-,+)</div>
                <div style={{ border: '1px solid #10b981', padding: '10px' }}>Cuadrante I (+,+)</div>
                <div style={{ border: '1px solid #10b981', padding: '10px' }}>Cuadrante III (-,-)</div>
                <div style={{ border: '1px solid #10b981', padding: '10px' }}>Cuadrante IV (+,-)</div>
              </div>
              <p style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Los 4 territorios del plano</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Localización</span></h2>
        <p className="section-subtitle">20 Desafíos para dominar cada rincón del plano. ¡Usa los ojos de lince!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#10b981', color: '#020617' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default PlanoCartesiano;