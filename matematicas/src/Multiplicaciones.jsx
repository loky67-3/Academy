import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

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
    <div className="benefit-card" style={{ textAlign: 'left', borderLeft: `4px solid ${isSolved ? 'var(--neon-green)' : 'var(--neon-purple)'}`, opacity: isSolved ? 0.8 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
        {isSolved && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>}
      </div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{question} = ?</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100px', cursor: isSolved ? 'not-allowed' : 'text' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>Validar</button>}
      </div>
    </div>
  );
};

const Multiplicaciones = () => {
  const navigate = useNavigate();
  const [activeTable, setActiveTable] = useState(2);
  const [solvedIds, setSolvedIds] = useState([]);
  const [randomExercises, setRandomExercises] = useState([]);
  const [randomSolvedIds, setRandomSolvedIds] = useState([]);
  const [points, setPoints] = useState(0);

  // Estados para el modo secuencial "Uno a Uno"
  const [seqQuest, setSeqQuest] = useState({ a: 0, b: 0, ans: 0 });
  const [seqInput, setSeqInput] = useState('');
  const [seqFeedback, setSeqFeedback] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateSeqQuestion = () => {
    const a = Math.floor(Math.random() * 11) + 2;
    const b = Math.floor(Math.random() * 11) + 2;
    setSeqQuest({ a, b, ans: a * b });
    setSeqInput('');
    setSeqFeedback('');
  };

  const checkSeqAnswer = () => {
    if (parseInt(seqInput) === seqQuest.ans) {
      setPoints(prev => prev + 1);
      const nextCount = flashSolvedCount + 1;
      setFlashSolvedCount(nextCount);

      if (nextCount < 10) {
        setSeqFeedback('¡Excelente! +1 XP');
        setTimeout(generateSeqQuestion, 1000);
      } else {
        setSeqFeedback('¡Desafío Flash Completado! 🏆');
      }
    } else {
      setSeqFeedback('¡Casi! Intenta otra vez');
      setTimeout(() => setSeqFeedback(''), 1500);
    }
  };

  const generateRandomChallenge = () => {
    const count = 12;
    const newExercises = [];
    for (let i = 0; i < count; i++) {
      const isHard = Math.random() > 0.4; 
      let a, b;
      if (isHard) {
        a = Math.floor(Math.random() * 7) + 6; // Tablas del 6 al 12
        b = Math.floor(Math.random() * 11) + 2; 
      } else {
        a = Math.floor(Math.random() * 4) + 2; // Tablas del 2 al 5
        b = Math.floor(Math.random() * 9) + 2; 
      }
      newExercises.push({
        id: `rnd-${i}-${Date.now()}`,
        level: isHard ? 'Experto' : 'Iniciación',
        question: `${a} × ${b}`,
        answer: a * b
      });
    }
    setRandomExercises(newExercises);
    setRandomSolvedIds([]);
  };

  useEffect(() => {
    generateRandomChallenge();
    generateSeqQuestion();
  }, []);

  const exercises = [
    { id: 1, level: 'Sencillo', question: '2 × 3', answer: 6 },
    { id: 2, level: 'Sencillo', question: '5 × 2', answer: 10 },
    { id: 3, level: 'Básico', question: '7 × 8', answer: 56 },
    { id: 4, level: 'Básico', question: '9 × 6', answer: 54 },
    { id: 5, level: 'Intermedio', question: '12 × 5', answer: 60 },
    { id: 6, level: 'Intermedio', question: '15 × 3', answer: 45 },
    { id: 7, level: 'Mental', question: '99 × 2', answer: 198 },
    { id: 8, level: 'Mental', question: '25 × 4', answer: 100 },
    { id: 9, level: 'Pro', question: '11 × 11', answer: 121 },
    { id: 10, level: 'Maestro', question: '125 × 2', answer: 250 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const handleRandomSolved = (id) => {
    if (!randomSolvedIds.includes(id)) {
      setRandomSolvedIds([...randomSolvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = Math.min((points / (exercises.length + 10)) * 100, 100); // 10 ejercicios fijos + 10 flash

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%)' }}></div>
      <Navbar />
      
      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem', color: 'var(--neon-blue)' }}>
            <span>PROGRESO DEL CERTIFICADO</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))', transition: 'width 0.5s ease', boxShadow: '0 0 10px var(--neon-blue)' }}></div>
          </div>
        </div>

        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Tablas de <span className="gradient-text">Multiplicar</span></h1>
        <p className="hero-subtitle">El superpoder de la suma repetida de forma ultrarrápida.</p>
      </section>

      {/* MODO DESAFÍO FLASH (Uno a Uno) */}
      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid var(--neon-blue)', background: 'rgba(14, 165, 233, 0.05)' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío <span className="gradient-text">Flash</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Resuelve 10 ejercicios rápidos para el certificado ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <>
              <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '4px' }}>
                {seqQuest.a} × {seqQuest.b}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                <input 
                  type="number" 
                  value={seqInput}
                  onChange={(e) => setSeqInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkSeqAnswer()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid var(--neon-blue)', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkSeqAnswer} className="btn-login" style={{ padding: '15px 30px' }}>Enviar</button>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px', color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginRight: '10px'}}><path d="M20 6 9 17l-5-5"/></svg>
              ¡Completaste el Desafío Flash de Multiplicación!
            </div>
          )}
          {seqFeedback && <p style={{ marginTop: '15px', color: seqFeedback.includes('Exce') || seqFeedback.includes('Comp') ? 'var(--neon-green)' : 'var(--neon-purple)', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>{seqFeedback}</p>}
        </div>
      </section>

      <section className="info-section" style={{ paddingTop: '20px' }}>
        <h2 className="section-title">Estudia las <span className="gradient-text">Tablas</span></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <button 
              key={num} 
              onClick={() => setActiveTable(num)}
              style={{ 
                padding: '10px 20px', 
                borderRadius: '10px', 
                border: '1px solid var(--glass-border)', 
                background: activeTable === num ? 'var(--neon-blue)' : 'var(--glass)',
                color: activeTable === num ? '#020617' : 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              Tabla del {num}
            </button>
          ))}
        </div>
        <div className="benefit-card" style={{ maxWidth: '400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '1.2rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} style={{ color: i % 2 === 0 ? 'white' : 'var(--text-secondary)' }}>
              {activeTable} × {i} = <span style={{ color: 'var(--neon-blue)' }}>{activeTable * i}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', gap: '20px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Multiplicaciones <span className="gradient-text">Sencillas</span></h2>
          <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: '100%' }}>
            ¿Sabías que <strong>3 × 4</strong> es exactamente lo mismo que sumar <strong>3 + 3 + 3 + 3</strong>? 
            Es una forma rápida de contar grupos iguales. ¡Es el atajo favorito de los matemáticos!
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h4 style={{ color: 'var(--neon-blue)' }}>Paso 1: Alineación</h4>
              <p style={{ fontSize: '0.9rem' }}>Escribe los números uno debajo del otro, alineando las unidades a la derecha.</p>
            </div>
            <div className="benefit-card">
              <h4 style={{ color: 'var(--neon-purple)' }}>Paso 2: Multiplicación</h4>
              <p style={{ fontSize: '0.9rem' }}>Multiplica cada dígito del número de abajo por cada dígito del de arriba (de derecha a izquierda).</p>
            </div>
            <div className="benefit-card">
              <h4 style={{ color: 'var(--neon-green)' }}>Paso 3: El Espacio</h4>
              <p style={{ fontSize: '0.9rem' }}>Si multiplicas por decenas, deja un espacio a la derecha o añade un cero antes de empezar.</p>
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', width: '100%', marginTop: '20px' }}>
            <h4 style={{ color: 'var(--neon-blue)', marginBottom: '10px' }}>Ejemplo: 24 × 12</h4>
            <code style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
              &nbsp;&nbsp;24<br/>
              x 12<br/>
              ----<br/>
              &nbsp;&nbsp;48  (2 x 24)<br/>
              +240  (10 x 24, ¡nota el cero!)<br/>
              ----<br/>
              &nbsp;288
            </code>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Trucos de <span className="gradient-text">Genio</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4 style={{ color: 'var(--neon-blue)' }}>Multiplicar por 5</h4>
            <p style={{ fontSize: '0.85rem' }}>Divide el número entre 2 y multiplícalo por 10. Ejemplo: 12 x 5 → 12/2 = 6 → 60.</p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: 'var(--neon-green)' }}>Multiplicar por 9</h4>
            <p style={{ fontSize: '0.85rem' }}>Multiplica por 10 y resta el número original. Ejemplo: 7 x 9 → (7 x 10) - 7 = 63.</p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: 'var(--neon-purple)' }}>El Truco del 11</h4>
            <p style={{ fontSize: '0.85rem' }}>Para números de 2 cifras (ej. 15), suma sus dígitos (1+5=6) y ponlo en medio: 165.</p>
          </div>
        </div>
      </section>

      <section className="info-section" style={{ borderTop: '1px solid var(--glass-border)', marginTop: '40px' }}>
        <h2 className="section-title">Generador de Desafíos <span className="gradient-text">Aleatorios</span></h2>
        <p className="section-subtitle">Practica con multiplicaciones combinadas de todos los niveles. ¡Ideales para dominar las tablas!</p>
        <button onClick={generateRandomChallenge} className="btn-login" style={{ marginBottom: '30px', fontSize: '0.9rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          Generar Nuevo Mix
        </button>
        <div className="grid-container">
          {randomExercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleRandomSolved} isSolved={randomSolvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Reto Final: Gana tu <span className="gradient-text">Certificado</span></h2>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '10px', verticalAlign: 'middle' }}><path d="m15 18-6-6 6-6"/></svg>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Multiplicaciones;