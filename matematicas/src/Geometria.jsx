import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#fbbf24')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Visualizador de figuras geométricas interactivo
const ShapeVisualizer = ({ type, size = 150, color = "#fbbf24" }) => {
  const drawShape = () => {
    switch(type) {
      case 'square': return <rect x="35" y="35" width="80" height="80" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'rectangle': return <rect x="25" y="45" width="100" height="60" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'triangle': return <path d="M75 35 L115 115 L35 115 Z" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'circle': return <circle cx="75" cy="75" r="45" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'trapezoid': return <path d="M50 40 L100 40 L130 110 L20 110 Z" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'rhombus': return <path d="M75 25 L120 75 L75 125 L30 75 Z" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />;
      case 'pythagoras': return (
        <g stroke={color} strokeWidth="2">
          <path d="M40 110 L40 40 L110 110 Z" fill="rgba(251, 191, 36, 0.1)" strokeWidth="3" />
          <rect x="40" y="100" width="10" height="10" fill="none" stroke={color} />
          <text x="25" y="75" fill="white" fontSize="14" fontWeight="bold">a</text>
          <text x="75" y="125" fill="white" fontSize="14" fontWeight="bold">b</text>
          <text x="85" y="75" fill={color} fontSize="14" fontWeight="bold">c</text>
        </g>
      );
      case 'cube': return (
        <g stroke={color} strokeWidth="2" fill="rgba(251, 191, 36, 0.05)">
          <rect x="30" y="50" width="60" height="60" />
          <rect x="60" y="20" width="60" height="60" />
          <line x1="30" y1="50" x2="60" y2="20" />
          <line x1="90" y1="50" x2="120" y2="20" />
          <line x1="30" y1="110" x2="60" y2="80" />
          <line x1="90" y1="110" x2="120" y2="80" />
        </g>
      );
      case 'cylinder': return (
        <g stroke={color} strokeWidth="2" fill="rgba(251, 191, 36, 0.05)">
          <ellipse cx="75" cy="35" rx="40" ry="15" />
          <path d="M35 35 L35 115 A 40 15 0 0 0 115 115 L 115 35" />
          <ellipse cx="75" cy="115" rx="40" ry="15" fill="none" strokeDasharray="4" />
        </g>
      );
      case 'hexagon': return (
        <path d="M75 25 L118 50 L118 100 L75 125 L32 100 L32 50 Z" stroke={color} strokeWidth="3" fill="rgba(251, 191, 36, 0.1)" />
      );
      default: return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 150 150" style={{ filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.3))' }}>
      {drawShape()}
    </svg>
  );
};

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, shape }) => {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    const val = parseFloat(userInput);
    if (Math.abs(val - answer) < 0.1 && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#fbbf24'}`, textAlign: 'center', minWidth: '280px' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ margin: '1rem 0' }}>
        <ShapeVisualizer type={shape} size={100} color={isSolved ? '#10b981' : '#fbbf24'} />
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          placeholder="Rta"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '90px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ padding: '10px 15px', fontSize: '0.8rem' }}>OK</button>}
      </div>
    </div>
  );
};

const Geometria = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ s: 5, ans: 25 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const side = Math.floor(Math.random() * 10) + 2;
    setFlashQuest({ s: side, ans: side * side });
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
    // FÁCIL (Perímetros y Áreas básicas)
    { id: 'geo1', level: 'Fácil', question: 'Perímetro de un cuadrado de lado 5', answer: 20, shape: 'square' },
    { id: 'geo2', level: 'Fácil', question: 'Área de un cuadrado de lado 10', answer: 100, shape: 'square' },
    { id: 'geo3', level: 'Fácil', question: 'Perímetro de un triángulo equilátero de lado 6', answer: 18, shape: 'triangle' },
    { id: 'geo4', level: 'Fácil', question: 'Área de un rectángulo de 4x8', answer: 32, shape: 'square' },
    { id: 'geo5', level: 'Fácil', question: 'Radio de un círculo si su diámetro es 12', answer: 6, shape: 'circle' },

    // MEDIO (Círculos y Triángulos)
    { id: 'geo6', level: 'Medio', question: 'Área de un triángulo: base 10, altura 5', answer: 25, shape: 'triangle' },
    { id: 'geo7', level: 'Medio', question: 'Circunferencia de radio 5 (usa PI=3.14)', answer: 31.4, shape: 'circle' },
    { id: 'geo8', level: 'Medio', question: 'Suma de los ángulos internos de un triángulo', answer: 180, shape: 'triangle' },
    { id: 'geo9', level: 'Medio', question: 'Área de un círculo de radio 2 (usa PI=3.14)', answer: 12.56, shape: 'circle' },
    { id: 'geo10', level: 'Medio', question: 'Lado de un cuadrado si su área es 64', answer: 8, shape: 'rectangle' },

    // DIFÍCIL (Pitágoras)
    { id: 'geo11', level: 'Difícil', question: 'Hipotenusa (c) si a=3 y b=4 (Pitágoras)', answer: 5, shape: 'pythagoras' },
    { id: 'geo12', level: 'Difícil', question: 'Lado a si hipotenusa c=13 y b=12', answer: 5, shape: 'pythagoras' },
    { id: 'geo13', level: 'Difícil', question: 'Perímetro de un círculo de diámetro 20 (PI=3.14)', answer: 62.8, shape: 'circle' },
    { id: 'geo14', level: 'Difícil', question: 'Área de un rombo: D=10, d=6', answer: 30, shape: 'square' },
    { id: 'geo15', level: 'Difícil', question: 'Área de un trapecio: B=10, b=6, h=5', answer: 40, shape: 'square' },

    // AVANZADO (Volúmenes y Ángulos)
    { id: 'geo16', level: 'Avanzado', question: 'Volumen de un cubo de lado 3', answer: 27, shape: 'cube' },
    { id: 'geo17', level: 'Avanzado', question: 'Ángulo complementario de 30°', answer: 60, shape: 'triangle' },
    { id: 'geo18', level: 'Avanzado', question: 'Hipotenusa si los catetos son 6 y 8', answer: 10, shape: 'pythagoras' },
    { id: 'geo19', level: 'Avanzado', question: 'Área de un hexágono regular: perímetro 30, apotema 4', answer: 60, shape: 'hexagon' },
    { id: 'geo20', level: 'Avanzado', question: 'Volumen de un cilindro: r=2, h=10 (PI=3.14)', answer: 125.6, shape: 'cylinder' },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const totalPossible = exercises.length + 10;
  const progress = Math.min((points / totalPossible) * 100, 100);

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#fbbf24' }}>
            <span>MAESTRÍA EN GEOMETRÍA</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #fbbf24' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>Mundo de la <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text' }}>Geometría</span></h1>
        <p className="hero-subtitle">Desde el punto más pequeño hasta las formas más complejas. ¡Aprende a medir el universo!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #fbbf24', background: 'rgba(251, 191, 36, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Áreas</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿Cuál es el área de este cuadrado? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <ShapeVisualizer type="square" size={120} />
              <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>Lado = {flashQuest.s}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="Área?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #fbbf24', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#fbbf24', color: '#020617', padding: '15px 30px' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Arquitecto Legendario! Has dominado el espacio. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Biblioteca de <span className="gradient-text">Fórmulas Maestras</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ borderTop: '3px solid #fbbf24' }}>
            <ShapeVisualizer type="square" size={80} />
            <h4 style={{ marginTop: '1rem' }}>Cuadrado / Rectángulo</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>P:</strong> 4 × L o 2(b+h)<br/>
              <strong>A:</strong> L² o base × altura
            </p>
          </div>
          <div className="benefit-card" style={{ borderTop: '3px solid #fbbf24' }}>
            <ShapeVisualizer type="triangle" size={80} />
            <h4 style={{ marginTop: '1rem' }}>Triángulo</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>P:</strong> Suma de sus 3 lados<br/>
              <strong>A:</strong> (base × altura) / 2
            </p>
          </div>
          <div className="benefit-card" style={{ borderTop: '3px solid #fbbf24' }}>
            <ShapeVisualizer type="circle" size={80} />
            <h4 style={{ marginTop: '1rem' }}>Círculo</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>C:</strong> 2 × π × r<br/>
              <strong>A:</strong> π × r²
            </p>
          </div>
          <div className="benefit-card" style={{ borderTop: '3px solid #fbbf24' }}>
            <ShapeVisualizer type="trapezoid" size={80} />
            <h4 style={{ marginTop: '1rem' }}>Trapecio</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>A:</strong> ((B + b) × h) / 2
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla de <span className="gradient-text">Propiedades Geométricas</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Concepto</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Propiedad Vital</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Uso Común</th>
              </tr>
            </thead>
            <tbody style={{ color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Ángulos Internos Triángulo</strong></td>
                <td style={{ padding: '15px' }}>Siempre suman 180°</td>
                <td style={{ padding: '15px' }}>Encontrar ángulos faltantes.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Teorema de Pitágoras</strong></td>
                <td style={{ padding: '15px' }}>a² + b² = c²</td>
                <td style={{ padding: '15px' }}>Triángulos rectángulos solamente.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}><strong>Número PI (π)</strong></td>
                <td style={{ padding: '15px' }}>Aproximadamente 3.1416</td>
                <td style={{ padding: '15px' }}>Cualquier cálculo con curvas.</td>
              </tr>
              <tr>
                <td style={{ padding: '15px' }}><strong>Ángulos Rectos</strong></td>
                <td style={{ padding: '15px' }}>Miden exactamente 90°</td>
                <td style={{ padding: '15px' }}>Esquinas de cuadrados y rectángulos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Geometría en <span className="gradient-text">3D (Volúmenes)</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <ShapeVisualizer type="cube" size={100} />
            <h4>Cubo</h4>
            <p style={{ fontSize: '0.9rem' }}>
              <strong>V:</strong> Lado × Lado × Lado (L³)<br/>
              Ej: Lado 2 → Vol = 8
            </p>
          </div>
          <div className="benefit-card">
            <ShapeVisualizer type="cylinder" size={100} />
            <h4>Cilindro</h4>
            <p style={{ fontSize: '0.9rem' }}>
              <strong>V:</strong> π × r² × altura<br/>
              Como un área de círculo con altura.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(251, 191, 36, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#fbbf24', textAlign: 'left' }}>¿Qué es la Geometría?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es el estudio de las formas, el tamaño y la posición de las cosas. <br/><br/>
              <strong>Perímetro:</strong> El borde de una figura (Suma de todos sus lados).<br/>
              <strong>Área:</strong> El espacio que ocupa una figura (Lo de adentro).
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>Área Cuadrado = Lado × Lado</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="benefit-card" style={{ padding: '2rem' }}>
              <ShapeVisualizer type="pythagoras" size={180} />
              <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Teorema de Pitágoras: a² + b² = c²</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conceptos <span className="gradient-text">Fundamentales</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2v20M2 12h20"/></svg>
            <h4>Ángulos</h4>
            <p>Se miden en grados (°). Un ángulo recto mide 90° y parece una esquina perfecta en "L".</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{marginBottom: '1rem'}}><circle cx="12" cy="12" r="10"/><path d="M12 12L19 7"/></svg>
            <h4>Círculos y PI</h4>
            <p>PI (π ≈ 3.14) es la relación mágica entre el diámetro y la circunferencia de cualquier círculo.</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>
            <h4>3D y Volumen</h4>
            <p>Cuando añadimos profundidad, medimos cuánto líquido cabe dentro de una forma (Largo x Ancho x Alto).</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de Geometría</h2>
        <p className="section-subtitle">20 Desafíos para convertirte en un maestro del espacio. ¡Buena suerte!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#fbbf24', color: '#020617' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Geometria;