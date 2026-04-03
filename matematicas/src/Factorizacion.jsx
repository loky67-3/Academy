import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#d946ef')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Visualización de la "Factor Machine"
const FactorMachineSVG = ({ input, output1, output2 }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>{input}</div>
    <svg width="200" height="100" viewBox="0 0 200 100">
      <path d="M100 0 L100 40 M100 40 L40 90 M100 40 L160 90" stroke="#d946ef" strokeWidth="3" fill="none" />
      <circle cx="100" cy="40" r="8" fill="#d946ef" />
    </svg>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
      <div style={{ background: 'rgba(217, 70, 239, 0.1)', padding: '10px 20px', borderRadius: '10px', border: '1px solid #d946ef', color: '#d946ef', fontWeight: 'bold' }}>{output1}</div>
      <div style={{ background: 'rgba(217, 70, 239, 0.1)', padding: '10px 20px', borderRadius: '10px', border: '1px solid #d946ef', color: '#d946ef', fontWeight: 'bold' }}>{output2}</div>
    </div>
  </div>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  // Motor de validación mejorado: Ignora espacios y reconoce orden de factores simple
  const checkAnswer = () => {
    const normalizedInput = uAns.replace(/\s/g, '').toLowerCase();
    const normalizedAnswer = answer.replace(/\s/g, '').toLowerCase();
    
    // Intento básico de reconocer orden inverso en binomios (ej: (x+1)(x+2) vs (x+2)(x+1))
    const reverseAnswer = normalizedAnswer.split(')(').reverse().join(')(');

    if ((normalizedInput === normalizedAnswer || normalizedInput === reverseAnswer) && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#d946ef'}`, textAlign: 'center', transition: '0.3s' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.5rem', margin: '1.5rem 0', fontWeight: '900', letterSpacing: '1px', color: isSolved ? '#10b981' : 'white' }}>
        {question}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Factores..."
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '100%', fontSize: '1.1rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ background: '#d946ef', color: 'white', padding: '10px' }}>FACTORIZAR</button>}
      </div>
    </div>
  );
};

const Factorizacion = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ n: 12, a: 3, b: 4 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    setFlashQuest({ n: a * b, a, b });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    const val = parseInt(flashInput);
    if (val === flashQuest.a || val === flashQuest.b) {
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
    // FÁCIL: Factor Común Monomio
    { id: 'fact1', level: 'Fácil', question: 'x² + 5x', answer: 'x(x+5)' },
    { id: 'fact2', level: 'Fácil', question: '3a - 3b', answer: '3(a-b)' },
    { id: 'fact3', level: 'Fácil', question: '5x + 10', answer: '5(x+2)' },
    { id: 'fact4', level: 'Fácil', question: 'y² - y', answer: 'y(y-1)' },
    { id: 'fact5', level: 'Fácil', question: '4x² + 2x', answer: '2x(2x+1)' },
    // MEDIO: Diferencia de Cuadrados
    { id: 'fact6', level: 'Medio', question: 'x² - 16', answer: '(x+4)(x-4)' },
    { id: 'fact7', level: 'Medio', question: 'a² - 25', answer: '(a+5)(a-5)' },
    { id: 'fact8', level: 'Medio', question: '4y² - 9', answer: '(2y+3)(2y-3)' },
    { id: 'fact9', level: 'Medio', question: 'x² - 1', answer: '(x+1)(x-1)' },
    { id: 'fact10', level: 'Medio', question: '100 - x²', answer: '(10+x)(10-x)' },
    // DIFÍCIL: Trinomios Cuadrados
    { id: 'fact11', level: 'Difícil', question: 'x² + 6x + 9', answer: '(x+3)²' },
    { id: 'fact12', level: 'Difícil', question: 'x² + 5x + 6', answer: '(x+2)(x+3)' },
    { id: 'fact13', level: 'Difícil', question: 'x² - 10x + 25', answer: '(x-5)²' },
    { id: 'fact14', level: 'Difícil', question: 'x² + 2x + 1', answer: '(x+1)²' },
    { id: 'fact15', level: 'Difícil', question: 'x² - x - 6', answer: '(x-3)(x+2)' },
    // AVANZADO / EXPERTO
    { id: 'fact16', level: 'Avanzado', question: '2x² + 4x', answer: '2x(x+2)' },
    { id: 'fact17', level: 'Avanzado', question: 'x³ + x²', answer: 'x²(x+1)' },
    { id: 'fact18', level: 'Pro', question: 'x² - y²', answer: '(x+y)(x-y)' },
    { id: 'fact19', level: 'Experto', question: 'x³ - x', answer: 'x(x+1)(x-1)' },
    { id: 'fact20', level: 'Maestro', question: 'x⁴ - 16', answer: '(x²+4)(x+2)(x-2)' },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const totalToWin = exercises.length + 10; // 20 ejercicios + 10 flash
  const progress = Math.min((points / totalToWin) * 100, 100);

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#d946ef' }}>
            <span style={{ letterSpacing: '1px', fontWeight: 'bold' }}>MAESTRÍA EN FACTORIZACIÓN</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #d946ef, #a855f7)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #d946ef' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>Arte de <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #d946ef, #a855f7)', WebkitBackgroundClip: 'text' }}>Factorizar</span></h1>
        <p className="hero-subtitle">Desarma expresiones complejas en sus bloques más simples. ¡La base del cálculo avanzado!</p>
      </section>

      <section className="info-section" style={{ paddingTop: '0' }}>
        <div className="benefit-card" style={{ maxWidth: '550px', margin: '0 auto', border: '2px solid #d946ef', background: 'rgba(217, 70, 239, 0.05)', textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Factores</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Dime un factor del número ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: '900' }}>{flashQuest.n}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #d946ef', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#d946ef', color: 'white', padding: '12px 25px' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Bloques Desarmados! +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section" style={{ background: 'rgba(217, 70, 239, 0.02)', borderRadius: '50px', margin: '2rem 5%' }}>
        <h2 className="section-title">El Mapa de la <span className="gradient-text">Factorización</span></h2>
        <p className="section-subtitle">Sigue esta ruta lógica para saber qué método aplicar siempre:</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍 1.</div>
            <h4>¿Hay Factor Común?</h4>
            <p>¿Algo se repite en TODOS los términos? Si sí, extráelo primero. <br/> <strong>2x + 4 = 2(x+2)</strong></p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️ 2.</div>
            <h4>¿Son 2 términos restando?</h4>
            <p>Si ambos tienen raíz cuadrada, es Diferencia de Cuadrados. <br/> <strong>x² - 9 = (x+3)(x-3)</strong></p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📐 3.</div>
            <h4>¿Son 3 términos?</h4>
            <p>Busca dos números que sumen el de enmedio y multipliquen el último. <br/> <strong>x²+5x+6 = (x+2)(x+3)</strong></p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(217, 70, 239, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#d946ef', textAlign: 'left' }}>¿Qué es Factorizar?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.2rem' }}>
              Es el proceso inverso a la multiplicación. Si tienes una suma, buscas qué "bloques" multiplicados dieron ese resultado. <br/><br/>
              Es como decir que <strong>10</strong> es el resultado de <strong>2 × 5</strong>. Pero con letras.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.5rem' }}>x² + 2x = x(x + 2)</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <FactorMachineSVG input="x² - 9" output1="(x + 3)" output2="(x - 3)" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Técnicas de <span className="gradient-text">Élite</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2v20M2 12h20"/></svg>
            <h4>Factor Común</h4>
            <p>Busca lo que se repite en todos los términos y sácalo afuera de un paréntesis.</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M5 12h14"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
            <h4>Diferencia de Cuadrados</h4>
            <p>Si tienes a² - b², siempre se convierte en (a+b)(a-b). ¡Es una regla infalible!</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/></svg>
            <h4>Trinomios</h4>
            <p>Busca dos números que sumados den el del medio y multiplicados den el último.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de Factorización</h2>
        <p className="section-subtitle">10 Retos para dominar el arte de los bloques matemáticos. ¡Usa paréntesis!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#d946ef', color: 'white' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Factorizacion;