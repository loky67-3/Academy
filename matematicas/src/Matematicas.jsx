import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved }) => {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, wrong

  const checkAnswer = () => {
    if (parseFloat(userInput) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else if (parseFloat(userInput) !== answer) {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ textAlign: 'left', marginBottom: '1.5rem', borderLeft: `4px solid ${isSolved ? 'var(--neon-green)' : (level === 'Avanzado' ? 'var(--neon-purple)' : 'var(--neon-blue)')}`, opacity: isSolved ? 0.8 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Nivel: {level}</span>
        {isSolved && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>}
      </div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{question} = ?</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          placeholder="Tu respuesta"
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--glass-border)', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '8px',
            width: '120px',
            cursor: isSolved ? 'not-allowed' : 'text'
          }}
        />
        {!isSolved && (
          <button 
            onClick={checkAnswer}
            className="btn-card" 
            style={{ marginTop: 0, padding: '10px 20px' }}
          >
            Verificar
          </button>
        )}
      </div>
      {status === 'wrong' && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px' }}>Inténtalo de nuevo...</p>}
    </div>
  );
};

const Matematicas = () => {
  const navigate = useNavigate();
  const [solvedIds, setSolvedIds] = useState([]);
  const [points, setPoints] = useState(0);

  // Estados para el MODO FLASH (Matemáticas)
  const [flashQuest, setFlashQuest] = useState({ a: 0, b: 0, ans: 0 });
  const [flashInput, setFlashInput] = useState('');
  const [flashFeedback, setFlashFeedback] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlashQuestion = () => {
    const a = Math.floor(Math.random() * 450) + 50;
    const b = Math.floor(Math.random() * 450) + 50;
    setFlashQuest({ a, b, ans: a + b });
    setFlashInput('');
    setFlashFeedback('');
  };

  const checkFlashAnswer = () => {
    if (parseInt(flashInput) === flashQuest.ans) {
      setPoints(prev => prev + 1);
      const nextCount = flashSolvedCount + 1;
      setFlashSolvedCount(nextCount);
      
      if (nextCount < 10) {
        setFlashFeedback('¡Excelente! +1 XP');
        setTimeout(generateFlashQuestion, 1000);
      } else {
        setFlashFeedback('¡Desafío Flash Completado! 🏆');
      }
    } else {
      setFlashFeedback('¡Casi! Intenta otra vez');
      setTimeout(() => setFlashFeedback(''), 1500);
    }
  };

  useEffect(() => {
    generateFlashQuestion();
  }, []);

  const exercises = [
    { id: 'math-1', level: 'Difícil', question: '1,458 + 2,789', answer: 4247 },
    { id: 'math-2', level: 'Difícil', question: '12,500 + 8,750', answer: 21250 },
    { id: 'math-3', level: 'Avanzado', question: '45.67 + 89.12', answer: 134.79 },
    { id: 'math-4', level: 'Avanzado', question: '125 + 450 + 890 + 12', answer: 1477 },
    { id: 'math-5', level: 'Mental', question: '99 + 54', answer: 153 },
    { id: 'math-6', level: 'Mental', question: '67 + 25', answer: 92 },
    { id: 'math-7', level: 'Mental', question: '150 + 275', answer: 425 },
    { id: 'math-8', level: 'Mental', question: '48 + 33', answer: 81 },
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
      <div className="neon-glow-bg" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)' }}></div>
      
      <Navbar />
      
      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 10px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem', color: 'var(--neon-blue)' }}>
            <span>PROGRESO DE MAESTRÍA MATEMÁTICA</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))', transition: 'width 0.5s ease', boxShadow: '0 0 10px var(--neon-blue)' }}></div>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Dominando las <span className="gradient-text">Sumas</span></h1>
          <p className="hero-subtitle">Desde lo básico hasta el cálculo mental avanzado.</p>
        </div>
      </section>

      {/* MODO DESAFÍO FLASH (Matemáticas) */}
      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid var(--neon-blue)', background: 'rgba(14, 165, 233, 0.05)' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío <span className="gradient-text">Flash Mat</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Resuelve 10 ejercicios rápidos para el certificado ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <>
              <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '4px' }}>
                {flashQuest.a} + {flashQuest.b}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                <input 
                  type="number" 
                  value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlashAnswer()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid var(--neon-blue)', color: 'white', padding: '15px', borderRadius: '12px', width: '140px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlashAnswer} className="btn-login" style={{ padding: '15px 30px' }}>Enviar</button>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px', color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginRight: '10px'}}><path d="M20 6 9 17l-5-5"/></svg>
              ¡Completaste el Desafío Flash!
            </div>
          )}
          {flashFeedback && <p style={{ marginTop: '15px', color: flashFeedback.includes('Exce') || flashFeedback.includes('Comp') ? 'var(--neon-green)' : 'var(--neon-purple)', fontWeight: 'bold' }}>{flashFeedback}</p>}
        </div>
      </section>

      <section className="info-section" style={{ paddingTop: 0 }}>
        <div className="certificate-section" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', gap: '20px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
            <i className="fas fa-book-open" style={{ color: 'var(--neon-blue)', marginRight: '15px' }}></i>
            La Suma: El Pilar de la Lógica
          </h2>
          <p className="hero-subtitle" style={{ maxWidth: '100%', fontSize: '1rem', textAlign: 'left' }}>
            Sumar no es solo juntar números; es la base de algoritmos complejos. 
            En su forma normal, sumamos unidades con unidades, decenas con decenas, y llevamos el exceso a la siguiente columna.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)', width: '100%' }}>
            <code style={{ color: 'var(--neon-green)', fontSize: '1.1rem' }}>
              // Método Tradicional: <br />
              1. De derecha a izquierda, llevando unidades al siguiente nivel.
            </code>
          </div>
        </div>
      </section>

      <section className="info-section" style={{ paddingBottom: '20px' }}>
        <h2 className="section-title">El Arte del <span className="gradient-text">Cálculo Mental</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4 style={{ color: 'var(--neon-blue)', marginBottom: '10px' }}>1. Descomposición</h4>
            <p style={{ fontSize: '0.9rem' }}>Suma de izquierda a derecha. Para 56 + 27: Suma 50+20=70, luego 6+7=13. Total: 70+13 = 83.</p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: 'var(--neon-purple)', marginBottom: '10px' }}>2. Redondeo</h4>
            <p style={{ fontSize: '0.9rem' }}>Para 99 + 54, piensa en (100 + 54) - 1. Es mucho más rápido compensar que sumar dígito a dígito.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Desafíos de Alto Nivel</h2>
        <p className="section-subtitle">Demuestra tu precisión con estas operaciones complejas.</p>
        
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Matematicas;