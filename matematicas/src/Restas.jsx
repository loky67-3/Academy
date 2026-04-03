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
    <div className="benefit-card" style={{ textAlign: 'left', borderLeft: `4px solid ${isSolved ? 'var(--neon-green)' : '#ef4444'}`, opacity: isSolved ? 0.8 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
        {isSolved && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>}
      </div>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', letterSpacing: '2px' }}>{question} = ?</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          value={isSolved ? answer : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSolved}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '130px', fontSize: '1.2rem', cursor: isSolved ? 'not-allowed' : 'text' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>Validar</button>}
      </div>
    </div>
  );
};

const Restas = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 0, b: 0, ans: 0 });
  const [flashInput, setFlashInput] = useState('');
  const [flashFeedback, setFlashFeedback] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlashQuestion = () => {
    const a = Math.floor(Math.random() * 90) + 10;
    const b = Math.floor(Math.random() * a); // Asegura que no sea negativo
    setFlashQuest({ a, b, ans: a - b });
    setFlashInput('');
    setFlashFeedback('');
  };

  const checkFlashAnswer = () => {
    if (parseInt(flashInput) === flashQuest.ans) {
      setPoints(prev => prev + 1);
      const nextCount = flashSolvedCount + 1;
      setFlashSolvedCount(nextCount);
      if (nextCount < 10) {
        setFlashFeedback('¡Brillante! +1 XP');
        setTimeout(generateFlashQuestion, 1000);
      } else {
        setFlashFeedback('¡Maestro de la Resta! 🏆');
      }
    } else {
      setFlashFeedback('¡Inténtalo de nuevo!');
      setTimeout(() => setFlashFeedback(''), 1500);
    }
  };

  useEffect(() => { generateFlashQuestion(); }, []);

  const exercises = [
    { id: 'r1', level: 'Fácil', question: '10 - 4', answer: 6 },
    { id: 'r2', level: 'Fácil', question: '25 - 12', answer: 13 },
    { id: 'r3', level: 'Medio', question: '100 - 45', answer: 55 },
    { id: 'r4', level: 'Medio', question: '82 - 37', answer: 45 },
    { id: 'r5', level: 'Dificil', question: '450 - 125', answer: 325 },
    { id: 'r6', level: 'Dificil', question: '1000 - 333', answer: 667 },
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
      <div className="neon-glow-bg" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem', color: '#ef4444' }}>
            <span>PROGRESO DE RESTRAS</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #ef4444, #f43f5e)', transition: 'width 0.5s ease', boxShadow: '0 0 10px #ef4444' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Domina la <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ef4444, #f43f5e)', WebkitBackgroundClip: 'text' }}>Resta</span></h1>
        <p className="hero-subtitle">Quitar es tan importante como poner. ¡Aprende el arte de la diferencia!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash: Restas</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Resuelve 10 seguidas ({flashSolvedCount}/10)</p>
          {flashSolvedCount < 10 ? (
            <>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#fff' }}>{flashQuest.a} - {flashQuest.b}</div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <input 
                  type="number" 
                  value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlashAnswer()}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #ef4444', color: 'white', padding: '15px', borderRadius: '12px', width: '140px', fontSize: '1.8rem', textAlign: 'center' }}
                />
                <button onClick={checkFlashAnswer} className="btn-login" style={{ background: '#ef4444', padding: '15px 30px' }}>Ok</button>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px', color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Reto Superado! +10 XP</div>
          )}
          {flashFeedback && <p style={{ marginTop: '15px', color: flashFeedback.includes('Brill') ? 'var(--neon-green)' : '#f43f5e', fontWeight: 'bold' }}>{flashFeedback}</p>}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', gap: '20px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>¿Cómo restar como un profesional?</h2>
          <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: '100%' }}>
            Cuando el número de arriba es más pequeño que el de abajo en una columna, ¡no te asustes! Simplemente <strong>"pide prestado"</strong> una decena al vecino de la izquierda.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', width: '100%' }}>
            <h4 style={{ color: '#ef4444', marginBottom: '10px' }}>Ejemplo Visual: 32 - 18</h4>
            <code style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.2rem' }}>
              &nbsp; 2 (prestó)<br/>
              &nbsp; <s>3</s> 12 (se volvió 12)<br/>
              - 1 &nbsp;8<br/>
              ----------<br/>
              &nbsp; 1 &nbsp;4
            </code>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Práctica General</h2>
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

export default Restas;