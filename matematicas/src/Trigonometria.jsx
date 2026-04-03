import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#0ea5e9')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Visualización de Triángulo Rectángulo con etiquetas
const TrigTriangleSVG = ({ size = 250, color = "#0ea5e9" }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <svg width={size} height={size} viewBox="0 0 200 200">
      <path d="M40 160 L160 160 L40 40 Z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      {/* Ángulo Recto */}
      <path d="M40 150 L50 150 L50 160" fill="none" stroke={color} strokeWidth="2" />
      {/* Etiquetas */}
      <text x="90" y="175" fill="white" fontSize="12" textAnchor="middle">Cateto Adyacente (b)</text>
      <text x="30" y="100" fill="white" fontSize="12" textAnchor="middle" style={{ writingMode: 'vertical-rl' }}>Cateto Opuesto (a)</text>
      <text x="110" y="90" fill={color} fontSize="14" fontWeight="bold" transform="rotate(-45, 110, 90)">Hipotenusa (c)</text>
      <text x="55" y="155" fill="var(--neon-purple)" fontSize="16">θ</text>
    </svg>
  </div>
);

// Círculo Unitario SVG
const UnitCircleSVG = ({ size = 250 }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <svg width={size} height={size} viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="1" strokeDasharray="4" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="1" strokeDasharray="4" />
      {/* Radio vector */}
      <line x1="100" y1="100" x2="156" y2="44" stroke="#ec4899" strokeWidth="3" />
      <circle cx="156" cy="44" r="5" fill="#ec4899" />
      <text x="145" y="35" fill="white" fontSize="10">(cos θ, sin θ)</text>
      <path d="M120 100 A20 20 0 0 0 114 86" fill="none" stroke="#ec4899" strokeWidth="2" />
      <text x="125" y="95" fill="#ec4899" fontSize="14">θ</text>
    </svg>
    <p style={{ color: '#ec4899', marginTop: '10px', fontSize: '0.9rem' }}>El Círculo Unitario (Radio = 1)</p>
  </div>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, note }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    const val = parseFloat(uAns);
    // Tolerancia para decimales
    if (Math.abs(val - answer) < 0.02 && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#0ea5e9'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <h3 style={{ fontSize: '1.2rem', margin: '1rem 0', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
        <input 
          type="number" step="0.01" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Rta"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '90px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ padding: '10px 15px', fontSize: '0.8rem' }}>OK</button>}
      </div>
      {note && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{note}</p>}
    </div>
  );
};

const Trigonometria = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: 'sin(90°)', ans: 1 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const values = [
      {q: 'sin(0°)', ans: 0}, {q: 'cos(0°)', ans: 1},
      {q: 'sin(90°)', ans: 1}, {q: 'cos(90°)', ans: 0},
      {q: 'tan(45°)', ans: 1}, {q: 'sin(30°)', ans: 0.5},
      {q: 'cos(60°)', ans: 0.5}, {q: 'sin(180°)', ans: 0}
    ];
    setFlashQuest(values[Math.floor(Math.random() * values.length)]);
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
    // FÁCILES (10) - SOH CAH TOA y conceptos básicos
    { id: 'tr1', level: 'Fácil', question: 'Si opuesto=3 e hipotenusa=5, ¿cuánto vale sin(θ)?', answer: 0.6 },
    { id: 'tr2', level: 'Fácil', question: 'Suma de los ángulos de cualquier triángulo (°)', answer: 180 },
    { id: 'tr3', level: 'Fácil', question: 'Si adyacente=4 e hipotenusa=5, ¿cuánto vale cos(θ)?', answer: 0.8 },
    { id: 'tr4', level: 'Fácil', question: 'Si opuesto=1 y adyacente=1, ¿cuánto vale tan(θ)?', answer: 1 },
    { id: 'tr5', level: 'Fácil', question: '¿Cuál es el sin(90°)?', answer: 1 },
    { id: 'tr6', level: 'Fácil', question: 'En SOH, la S es de Seno y la O de...', answer: 0, note: 'Escribe 0 para "Opuesto"' },
    { id: 'tr7', level: 'Fácil', question: '¿Cuál es el cos(0°)?', answer: 1 },
    { id: 'tr8', level: 'Fácil', question: 'Si θ=45°, ¿cuánto vale tan(θ)?', answer: 1 },
    { id: 'tr9', level: 'Fácil', question: 'El lado más largo de un triángulo rectángulo es...', answer: 0, note: 'Escribe 0 para Hipotenusa' },
    { id: 'tr10', level: 'Fácil', question: 'sin(30°) en decimales', answer: 0.5 },

    // MEDIOS (10) - Pitágoras y ángulos notables
    { id: 'tr11', level: 'Medio', question: 'Hipotenusa si catetos son 6 y 8', answer: 10 },
    { id: 'tr12', level: 'Medio', question: 'Calcula sin(θ)² + cos(θ)²', answer: 1 },
    { id: 'tr13', level: 'Medio', question: 'Si cos(θ)=0.5, ¿cuánto vale θ en grados?', answer: 60 },
    { id: 'tr14', level: 'Medio', question: 'Valor de sin(45°) aproximado (2 decimales)', answer: 0.71 },
    { id: 'tr15', level: 'Medio', question: 'Si tan(θ)=1, ¿cuántos grados tiene θ?', answer: 45 },
    { id: 'tr16', level: 'Medio', question: 'Cateto faltante si hipotenusa=13 y cateto=5', answer: 12 },
    { id: 'tr17', level: 'Medio', question: '¿Qué función es Opuesto / Adyacente? (1:sin, 2:cos, 3:tan)', answer: 3 },
    { id: 'tr18', level: 'Medio', question: 'Valor de sin(270°)', answer: -1 },
    { id: 'tr19', level: 'Medio', question: 'Si sin(θ)=1, ¿cuánto vale cos(θ)?', answer: 0 },
    { id: 'tr20', level: 'Medio', question: 'Convertir π radianes a grados', answer: 180 },

    // DIFÍCILES (10) - Círculo unitario y aplicaciones
    { id: 'tr21', level: 'Difícil', question: 'Si sin(θ)=0.8 y θ en cuadrante I, ¿cos(θ)?', answer: 0.6 },
    { id: 'tr22', level: 'Difícil', question: 'Valor de tan(60°) aproximado', answer: 1.73 },
    { id: 'tr23', level: 'Difícil', question: 'Si cos(θ)=-1, ¿cuánto vale θ en grados?', answer: 180 },
    { id: 'tr24', level: 'Difícil', question: 'sin(π/6) en decimales', answer: 0.5 },
    { id: 'tr25', level: 'Difícil', question: 'En el círculo unitario, ¿qué coordenada es el sin(θ)? (1:x, 2:y)', answer: 2 },
    { id: 'tr26', level: 'Difícil', question: 'Si tan(θ)=0, ¿cuánto vale sin(θ)?', answer: 0 },
    { id: 'tr27', level: 'Difícil', question: 'Hipotenusa si catetos son 1 y 1 (2 decimales)', answer: 1.41 },
    { id: 'tr28', level: 'Difícil', question: 'Valor de cos(3π/2)', answer: 0 },
    { id: 'tr29', level: 'Difícil', question: 'Si sin(θ)=cos(θ), ¿cuántos grados tiene θ?', answer: 45 },
    { id: 'tr30', level: 'Difícil', question: 'Valor de sin(390°)', answer: 0.5 },
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
      <div className="neon-glow-bg" style={{ top: '10%', right: '5%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '25px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#0ea5e9' }}>
            <span>DOMINIO TRIGONOMÉTRICO</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #0ea5e9' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>Poder de la <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text' }}>Trigonometría</span></h1>
        <p className="hero-subtitle">La ciencia de los triángulos y los ciclos. ¡Aprende a medir ángulos como un ingeniero!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Ángulos Notables</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Calcula rápido el valor de: {flashQuest.q} ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900' }}>{flashQuest.q} = ?</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" step="0.1" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="0.0"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #0ea5e9', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#0ea5e9', color: 'white', padding: '15px 30px' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Maestro de Ángulos! Has desbloqueado el Círculo Unitario. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">1. El Triángulo <span className="gradient-text">Rectángulo</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(14, 165, 233, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Todo comienza con un triángulo que tiene un ángulo de <strong>90°</strong>. Los nombres de sus lados dependen de dónde estés parado (el ángulo θ):
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Recuerda que el <strong>Teorema de Pitágoras (a² + b² = c²)</strong> es el cimiento de la trigonometría. La hipotenusa (c) siempre es el lado opuesto al ángulo recto.
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
              <li>📏 <strong>Hipotenusa:</strong> El lado más largo, frente al ángulo recto.</li>
              <li>📐 <strong>Cateto Opuesto:</strong> El lado que está "lejos" de tu ángulo θ.</li>
              <li>🧱 <strong>Cateto Adyacente:</strong> El lado que está "junto" a tu ángulo θ.</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <TrigTriangleSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">2. El Mantra Sagrado: <span className="gradient-text">SOH CAH TOA</span></h2>
        <p className="section-subtitle">Aprende estas tres sílabas y dominarás el 90% de la trigonometría básica:</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h2 style={{ color: '#0ea5e9' }}>SOH</h2>
            <h4>Seno = Opuesto / Hipotenusa</h4>
            <p>sin(θ) = O / H</p>
          </div>
          <div className="benefit-card">
            <h2 style={{ color: '#8b5cf6' }}>CAH</h2>
            <h4>Coseno = Adyacente / Hipotenusa</h4>
            <p>cos(θ) = A / H</p>
          </div>
          <div className="benefit-card">
            <h2 style={{ color: '#ec4899' }}>TOA</h2>
            <h4>Tangente = Opuesto / Adyacente</h4>
            <p>tan(θ) = O / A</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">3. El Círculo <span className="gradient-text">Unitario</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(to left, rgba(236, 72, 153, 0.05), transparent)', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <UnitCircleSVG />
          </div>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Cuando el radio es <strong>1</strong>, la trigonometría se vuelve mágica. Cualquier punto en el círculo tiene coordenadas (x, y):
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <p style={{ color: 'white', fontSize: '1.2rem' }}>
                <strong>x = cos(θ)</strong> <br />
                <strong>y = sin(θ)</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
                De aquí nace la identidad más famosa: <br />
                <code style={{ color: 'var(--neon-green)' }}>sin²θ + cos²θ = 1</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">4. Biblioteca de <span className="gradient-text">Fórmulas Fundamentales</span></h2>
        <p className="section-subtitle">Estas son las herramientas esenciales para resolver identidades y problemas de ingeniería.</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4 style={{ color: '#0ea5e9' }}>Identidades Recíprocas</h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px', marginTop: '10px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Cosecante:</strong> csc(θ) = 1 / sin(θ)</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Secante:</strong> sec(θ) = 1 / cos(θ)</p>
              <p style={{ fontSize: '0.9rem' }}><strong>Cotangente:</strong> cot(θ) = 1 / tan(θ)</p>
            </div>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#8b5cf6' }}>Identidades de Cociente</h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px', marginTop: '10px' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>tan(θ) = sin(θ) / cos(θ)</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>cot(θ) = cos(θ) / sin(θ)</p>
            </div>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#ec4899' }}>Identidades Pitagóricas</h4>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px', marginTop: '10px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--neon-green)', fontWeight: 'bold' }}>sin²θ + cos²θ = 1</p>
              <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>1 + tan²θ = sec²θ</p>
              <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>1 + cot²θ = csc²θ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conversión de <span className="gradient-text">Ángulos</span></h2>
        <div className="benefit-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--glass-border)', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '30px', padding: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#bef264' }}>Grados a Radianes</h4>
              <p style={{ fontSize: '1.3rem', marginTop: '10px', fontWeight: 'bold' }}>rad = (grad × π) / 180</p>
            </div>
            <div style={{ fontSize: '2.5rem', color: 'var(--text-secondary)' }}>⇆</div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#bef264' }}>Radianes a Grados</h4>
              <p style={{ fontSize: '1.3rem', marginTop: '10px', fontWeight: 'bold' }}>grad = (rad × 180) / π</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tabla de <span className="gradient-text">Valores Notables</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9' }}>
                <th style={{ padding: '15px' }}>Ángulo (°)</th>
                <th style={{ padding: '15px' }}>sin(θ)</th>
                <th style={{ padding: '15px' }}>cos(θ)</th>
                <th style={{ padding: '15px' }}>tan(θ)</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>0°</td>
                <td>0</td>
                <td>1</td>
                <td>0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>30°</td>
                <td>1/2</td>
                <td>√3/2</td>
                <td>√3/3</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>45°</td>
                <td>√2/2</td>
                <td>√2/2</td>
                <td>1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>60°</td>
                <td>√3/2</td>
                <td>1/2</td>
                <td>√3</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>90°</td>
                <td>1</td>
                <td>0</td>
                <td>Indefinido</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio <span className="gradient-text">Trigonométrico</span></h2>
        <p className="section-subtitle">30 Desafíos para dominar los triángulos. ¡Usa 2 decimales si es necesario!</p>
        
        <h3 style={{ color: '#10b981', marginBottom: '1.5rem' }}>Nivel 1: Iniciación (Fácil)</h3>
        <div className="grid-container" style={{ marginBottom: '3rem' }}>
          {exercises.filter(e => e.level === 'Fácil').map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>

        <h3 style={{ color: '#fbbf24', marginBottom: '1.5rem' }}>Nivel 2: Intermedio (Medio)</h3>
        <div className="grid-container" style={{ marginBottom: '3rem' }}>
          {exercises.filter(e => e.level === 'Medio').map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>

        <h3 style={{ color: '#ef4444', marginBottom: '1.5rem' }}>Nivel 3: Experto (Difícil)</h3>
        <div className="grid-container">
          {exercises.filter(e => e.level === 'Difícil').map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#0ea5e9', color: 'white' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Trigonometria;