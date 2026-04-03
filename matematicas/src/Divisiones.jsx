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
    <div className="benefit-card" style={{ textAlign: 'left', borderLeft: `4px solid ${isSolved ? 'var(--neon-green)' : '#10b981'}`, opacity: isSolved ? 0.8 : 1 }}>
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

const Divisiones = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 0, b: 0, ans: 0 });
  const [flashInput, setFlashInput] = useState('');
  const [flashFeedback, setFlashFeedback] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlashQuestion = () => {
    // Generamos divisiones exactas para el aprendizaje inicial
    const res = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const a = res * b;
    setFlashQuest({ a, b, ans: res });
    setFlashInput('');
    setFlashFeedback('');
  };

  const checkFlashAnswer = () => {
    if (parseInt(flashInput) === flashQuest.ans) {
      setPoints(prev => prev + 1);
      const nextCount = flashSolvedCount + 1;
      setFlashSolvedCount(nextCount);
      if (nextCount < 10) {
        setFlashFeedback('¡Increíble! +1 XP');
        setTimeout(generateFlashQuestion, 1000);
      } else {
        setFlashFeedback('¡Genio de las Divisiones! 🏆');
      }
    } else {
      setFlashFeedback('¡Inténtalo de nuevo!');
      setTimeout(() => setFlashFeedback(''), 1500);
    }
  };

  useEffect(() => { generateFlashQuestion(); }, []);

  const exercises = [
    { id: 'd1', level: 'Fácil', question: '12 ÷ 3', answer: 4 },
    { id: 'd2', level: 'Fácil', question: '20 ÷ 5', answer: 4 },
    { id: 'd3', level: 'Medio', question: '48 ÷ 6', answer: 8 },
    { id: 'd4', level: 'Medio', question: '81 ÷ 9', answer: 9 },
    { id: 'd5', level: 'Dificil', question: '144 ÷ 12', answer: 12 },
    { id: 'd6', level: 'Dificil', question: '250 ÷ 5', answer: 50 },
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
      <div className="neon-glow-bg" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem', color: '#10b981' }}>
            <span>PROGRESO DE DIVISIONES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', transition: 'width 0.5s ease', boxShadow: '0 0 10px #10b981' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Domina la <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', WebkitBackgroundClip: 'text' }}>División</span></h1>
        <p className="hero-subtitle">Dividir es compartir. ¡Aprende a repartir el conocimiento!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.05)' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash: Divisiones</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Resuelve 10 seguidas para tu certificado ({flashSolvedCount}/10)</p>
          {flashSolvedCount < 10 ? (
            <>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem', color: '#fff' }}>{flashQuest.a} ÷ {flashQuest.b}</div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <input 
                  type="number" 
                  value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlashAnswer()}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #10b981', color: 'white', padding: '15px', borderRadius: '12px', width: '140px', fontSize: '1.8rem', textAlign: 'center' }}
                />
                <button onClick={checkFlashAnswer} className="btn-login" style={{ background: '#10b981', padding: '15px 30px' }}>Ok</button>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px', color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Maestría Alcanzada! +10 XP</div>
          )}
          {flashFeedback && <p style={{ marginTop: '15px', color: flashFeedback.includes('Incre') ? 'var(--neon-green)' : '#ef4444', fontWeight: 'bold' }}>{flashFeedback}</p>}
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ flexDirection: 'column', textAlign: 'left', alignItems: 'flex-start', gap: '20px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>¿Qué es realmente dividir?</h2>
          <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: '100%' }}>
            Dividir es lo opuesto a multiplicar. Si <strong>2 × 3 = 6</strong>, entonces <strong>6 ÷ 3 = 2</strong>. 
            Es el proceso de repartir una cantidad grande en grupos iguales.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', width: '100%' }}>
            <h4 style={{ color: '#10b981', marginBottom: '10px' }}>Partes de la División:</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', listStyle: 'none', padding: 0 }}>
              <li>🔹 <strong>Dividendo:</strong> El total que quieres repartir.</li>
              <li>🔹 <strong>Divisor:</strong> En cuántas partes lo repartes.</li>
              <li>🔹 <strong>Cociente:</strong> Cuánto le toca a cada uno (¡el resultado!).</li>
              <li>🔹 <strong>Resto:</strong> Lo que sobra si la repartición no es exacta.</li>
            </ul>
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

export default Divisiones;