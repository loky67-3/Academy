import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px #00d2ff)' }}>
    <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke="#00d2ff" strokeWidth="5" />
    <path d="M70 140 L50 180 M130 140 L150 180" stroke="#00d2ff" strokeWidth="8" strokeLinecap="round" />
    <circle cx="80" cy="80" r="8" fill="#fff" />
    <circle cx="120" cy="80" r="8" fill="#fff" />
    {expression === 'happy' ? (
      <path d="M80 110 Q 100 130 120 110" stroke="#fff" strokeWidth="4" fill="none" />
    ) : (
      <path d="M80 115 L120 115" stroke="#fff" strokeWidth="4" />
    )}
    <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" />
    <path d="M170 40 L170 60" stroke="#fbbf24" strokeWidth="3" />
  </svg>
);

const ToggleSwitchSVG = ({ isOn, color = "#00d2ff" }) => (
  <svg width="80" height="40" viewBox="0 0 80 40">
    <rect x="0" y="0" width="80" height="40" rx="20" fill={isOn ? color : "#334155"} style={{ transition: '0.3s' }} />
    <circle cx={isOn ? 60 : 20} cy="20" r="16" fill="white" style={{ transition: '0.3s' }} />
  </svg>
);

const BulbSVG = ({ isOn, color = "#fbbf24" }) => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill={isOn ? color : "none"} stroke={isOn ? color : "#475569"} strokeWidth="2" style={{ filter: isOn ? `drop-shadow(0 0 15px ${color})` : 'none', transition: '0.3s' }}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.32 1.35 4.32 3.3 5.33A3 3 0 0 1 10 17h4a3 3 0 0 1 1.7-2.67c1.95-1.01 3.3-3.01 3.3-5.33a7 7 0 0 0-7-7z" />
  </svg>
);

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, note }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    const normalizedInput = uAns.trim().toLowerCase();
    const normalizedAnswer = answer.toString().toLowerCase();
    if (normalizedInput === normalizedAnswer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#00d2ff'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.2rem', minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Verdadero / Falso"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '140px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px' }}>OK</button>}
      </div>
      {note && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{note}</p>}
    </div>
  );
};

const Booleanos = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: 'true && true', ans: 'true' });
  const [flashInput, setFlashInput] = useState('');
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const ops = [
      { q: 'true && false', ans: 'false' },
      { q: 'false || true', ans: 'true' },
      { q: '!true', ans: 'false' },
      { q: '!false', ans: 'true' },
      { q: 'true || true', ans: 'true' },
      { q: 'false && false', ans: 'false' }
    ];
    setFlashQuest(ops[Math.floor(Math.random() * ops.length)]);
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase() === flashQuest.ans) {
      setPoints(prev => prev + 1);
      setBotStatus('correct');
      setTimeout(generateFlash, 1000);
    } else {
      setBotStatus('wrong');
      setTimeout(() => setBotStatus('idle'), 1500);
    }
  };

  useEffect(() => { generateFlash(); }, []);

  const exercises = [
    // FÁCIL
    { id: 'b1', level: 'Fácil', question: 'true && true', answer: 'true' },
    { id: 'b2', level: 'Fácil', question: 'true || false', answer: 'true' },
    { id: 'b3', level: 'Fácil', question: '!true', answer: 'false' },
    { id: 'b4', level: 'Fácil', question: '1 == 1', answer: 'true' },
    { id: 'b5', level: 'Fácil', question: '5 > 10', answer: 'false' },
    { id: 'b6', level: 'Fácil', question: 'false || true', answer: 'true' },
    { id: 'b7', level: 'Fácil', question: 'true && false', answer: 'false' },
    { id: 'b8', level: 'Fácil', question: '!false', answer: 'true' },
    { id: 'b9', level: 'Fácil', question: '10 < 20', answer: 'true' },
    { id: 'b10', level: 'Fácil', question: '4 != 4', answer: 'false' },
    // MEDIO
    { id: 'b11', level: 'Medio', question: '(true && false) || true', answer: 'true' },
    { id: 'b12', level: 'Medio', question: '!(true && true)', answer: 'false' },
    { id: 'b13', level: 'Medio', question: '(5 > 2) && (3 < 1)', answer: 'false' },
    { id: 'b14', level: 'Medio', question: '(true || false) && !false', answer: 'true' },
    { id: 'b15', level: 'Medio', question: '10 >= 10 && 5 == 5', answer: 'true' },
    { id: 'b16', level: 'Medio', question: '!(false || false)', answer: 'true' },
    { id: 'b17', level: 'Medio', question: 'true && (false || true)', answer: 'true' },
    { id: 'b18', level: 'Medio', question: '(8 != 8) || (1 == 1)', answer: 'true' },
    { id: 'b19', level: 'Medio', question: '!true || !false', answer: 'true' },
    { id: 'b20', level: 'Medio', question: '(true && true) && (false || true)', answer: 'true' },
    // DIFÍCIL
    { id: 'b21', level: 'Difícil', question: '¿!(A && B) es lo mismo que !A || !B?', answer: 'true', note: 'Leyes de De Morgan' },
    { id: 'b22', level: 'Difícil', question: 'Simplifica: A || (A && B)', answer: 'A', note: 'Responde con la letra A' },
    { id: 'b23', level: 'Difícil', question: '!(true || (false && true))', answer: 'false' },
    { id: 'b24', level: 'Difícil', question: '(5 > 3 || 2 < 1) && !(4 == 4)', answer: 'false' },
    { id: 'b25', level: 'Difícil', question: 'Simplifica: A && (B || !B)', answer: 'A', note: 'B || !B siempre es true' },
    { id: 'b26', level: 'Difícil', question: '!( !true && !false )', answer: 'true' },
    { id: 'b27', level: 'Difícil', question: '(true && false) || !(false || true)', answer: 'false' },
    { id: 'b28', level: 'Difícil', question: 'Si A=1, B=0, ¿(A || B) && !(A && B)?', answer: '1', note: 'Responde 1 o 0' },
    { id: 'b29', level: 'Difícil', question: 'Ley de Identidad: A || falso = ?', answer: 'A', note: 'Responde con A' },
    { id: 'b30', level: 'Difícil', question: 'Ley de Nulidad: A && falso = ?', answer: 'falso' },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / (exercises.length + 5)) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Universo <span className="gradient-text">Booleano</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy tu mentor digital. Hoy descubriremos cómo el mundo se reduce a dos estados: Verdadero o Falso. ¡Domina la lógica binaria!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00d2ff', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>MAESTRÍA BINARIA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #a855f7)', transition: '0.5s', boxShadow: '0 0 15px #00d2ff' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '500px', margin: '0 auto', border: '2px solid #00d2ff', background: 'rgba(0, 210, 255, 0.05)', textAlign: 'center', padding: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío de Verdad Rápido</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Evalúa la expresión:</p>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>{flashQuest.q}</div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <input 
              type="text" value={flashInput}
              onChange={(e) => setFlashInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
              placeholder="true / false"
              style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #00d2ff', color: 'white', padding: '12px', borderRadius: '10px', width: '120px', textAlign: 'center' }}
            />
            <button onClick={checkFlash} className="btn-login" style={{ background: '#00d2ff', color: '#020617' }}>ENVIAR</button>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">1. ¿Qué es un <span className="gradient-text">Booleano</span>?</h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(0, 210, 255, 0.05), transparent)' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Un booleano es un tipo de dato que solo puede tener dos valores posibles. Es la base de toda la electrónica digital.
            </p>
            <div className="benefits-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div className="benefit-card" style={{ padding: '1rem' }}>
                <BulbSVG isOn={true} />
                <h4 style={{ color: '#fbbf24', marginTop: '10px' }}>True (1)</h4>
                <p style={{ fontSize: '0.8rem' }}>Encendido / Verdadero</p>
              </div>
              <div className="benefit-card" style={{ padding: '1rem' }}>
                <BulbSVG isOn={false} />
                <h4 style={{ color: '#475569', marginTop: '10px' }}>False (0)</h4>
                <p style={{ fontSize: '0.8rem' }}>Apagado / Falso</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="benefit-card">
              <h3 style={{ color: '#00d2ff' }}>George Boole</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Matemático inglés que en 1847 inventó el Álgebra de Boole, permitiendo tratar la lógica con símbolos matemáticos.</p>
              <div style={{ marginTop: '20px' }}><ToggleSwitchSVG isOn={true} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">2. Los 3 Pilares <span className="gradient-text">Lógicos</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h2 style={{ color: '#00d2ff' }}>AND (&&)</h2>
            <p><strong>Y Lógico</strong>: Solo es verdad si AMBOS son verdaderos.</p>
            <table style={{ width: '100%', marginTop: '15px', fontSize: '0.8rem' }}>
              <tr style={{ color: '#94a3b8' }}><td>T && T</td><td>= T</td></tr>
              <tr style={{ color: '#94a3b8' }}><td>T && F</td><td>= F</td></tr>
            </table>
          </div>
          <div className="benefit-card">
            <h2 style={{ color: '#a855f7' }}>OR (||)</h2>
            <p><strong>O Lógico</strong>: Es verdad si AL MENOS UNO es verdadero.</p>
            <table style={{ width: '100%', marginTop: '15px', fontSize: '0.8rem' }}>
              <tr style={{ color: '#94a3b8' }}><td>T || F</td><td>= T</td></tr>
              <tr style={{ color: '#94a3b8' }}><td>F || F</td><td>= F</td></tr>
            </table>
          </div>
          <div className="benefit-card">
            <h2 style={{ color: '#ef4444' }}>NOT (!)</h2>
            <p><strong>Negación</strong>: Invierte el valor actual.</p>
            <table style={{ width: '100%', marginTop: '15px', fontSize: '0.8rem' }}>
              <tr style={{ color: '#94a3b8' }}><td>!True</td><td>= False</td></tr>
              <tr style={{ color: '#94a3b8' }}><td>!False</td><td>= True</td></tr>
            </table>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">3. Tabla Maestra de <span className="gradient-text">Operadores</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(0, 210, 255, 0.2)', color: '#00d2ff' }}>
                <th style={{ padding: '15px' }}>Operación</th>
                <th style={{ padding: '15px' }}>Símbolo</th>
                <th style={{ padding: '15px' }}>Descripción</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>Igualdad</td><td>==</td><td>Verifica si dos valores son iguales.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>Desigualdad</td><td>!=</td><td>Verifica si son diferentes.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td>Mayor que</td><td>&gt;</td><td>Compara magnitud.</td>
              </tr>
              <tr>
                <td>XOR</td><td>^</td><td>Es verdad solo si son DIFERENTES.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">4. Reglas de Oro del <span className="gradient-text">Álgebra de Boole</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#10b981' }}>Leyes de De Morgan</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              <code>!(A && B) = !A || !B</code><br/>
              <code>!(A || B) = !A && !B</code>
            </p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#00d2ff' }}>Leyes de Identidad</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              <code>A && True = A</code><br/>
              <code>A || False = A</code>
            </p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#a855f7' }}>Ley de Nulidad</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              <code>A && False = False</code><br/>
              <code>A || True = True</code>
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Booleanos</span></h2>
        <p className="section-subtitle">Supera los 30 niveles para convertirte en un Maestro de la Lógica.</p>
        
        <h3 style={{ color: '#10b981', marginBottom: '1.5rem' }}>Nivel 1: Iniciación</h3>
        <div className="grid-container" style={{ marginBottom: '3rem' }}>
          {exercises.filter(e => e.level === 'Fácil').map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>

        <h3 style={{ color: '#fbbf24', marginBottom: '1.5rem' }}>Nivel 2: Intermedio</h3>
        <div className="grid-container" style={{ marginBottom: '3rem' }}>
          {exercises.filter(e => e.level === 'Medio').map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>

        <h3 style={{ color: '#ef4444', marginBottom: '1.5rem' }}>Nivel 3: Experto</h3>
        <div className="grid-container">
          {exercises.filter(e => e.level === 'Difícil').map((ex) => (
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

export default Booleanos;