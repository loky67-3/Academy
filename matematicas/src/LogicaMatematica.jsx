import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px #10b981)' }}>
    <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke="#10b981" strokeWidth="5" />
    <path d="M70 140 L50 180 M130 140 L150 180" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
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

// Visualización de Compuertas Lógicas SVG
const LogicGateSVG = ({ type, color = "#10b981", size = 120 }) => {
  const renderGate = () => {
    switch(type) {
      case 'AND': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M20 30 L50 30 A 30 30 0 0 1 50 90 L20 90 Z" />
          <line x1="0" y1="45" x2="20" y2="45" />
          <line x1="0" y1="75" x2="20" y2="75" />
          <line x1="80" y1="60" x2="100" y2="60" />
        </g>
      );
      case 'OR': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M20 30 Q40 60 20 90 Q65 90 85 60 Q65 30 20 30 Z" />
          <line x1="0" y1="45" x2="25" y2="45" />
          <line x1="0" y1="75" x2="25" y2="75" />
          <line x1="85" y1="60" x2="105" y2="60" />
        </g>
      );
      case 'NOT': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M30 30 L30 90 L75 60 Z" />
          <circle cx="82" cy="60" r="6" stroke={color} />
          <line x1="10" y1="60" x2="30" y2="60" />
          <line x1="88" y1="60" x2="108" y2="60" />
        </g>
      );
      case 'NOR': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M20 30 Q40 60 20 90 Q65 90 85 60 Q65 30 20 30 Z" />
          <circle cx="92" cy="60" r="6" stroke={color} />
          <line x1="0" y1="45" x2="25" y2="45" />
          <line x1="0" y1="75" x2="25" y2="75" />
          <line x1="98" y1="60" x2="118" y2="60" />
        </g>
      );
      case 'NAND': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M20 30 L50 30 A 30 30 0 0 1 50 90 L20 90 Z" />
          <circle cx="86" cy="60" r="6" stroke={color} />
          <line x1="0" y1="45" x2="20" y2="45" />
          <line x1="0" y1="75" x2="20" y2="75" />
          <line x1="92" y1="60" x2="112" y2="60" />
        </g>
      );
      case 'XOR': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M12 30 Q32 60 12 90" />
          <path d="M22 30 Q42 60 22 90 Q67 90 87 60 Q67 30 22 30 Z" />
          <line x1="0" y1="45" x2="16" y2="45" />
          <line x1="0" y1="75" x2="16" y2="75" />
          <line x1="87" y1="60" x2="107" y2="60" />
        </g>
      );
      case 'XNOR': return (
        <g fill="none" stroke={color} strokeWidth="4">
          <path d="M12 30 Q32 60 12 90" />
          <path d="M22 30 Q42 60 22 90 Q67 90 87 60 Q67 30 22 30 Z" />
          <circle cx="93" cy="60" r="6" stroke={color} />
          <line x1="0" y1="45" x2="16" y2="45" />
          <line x1="0" y1="75" x2="16" y2="75" />
          <line x1="99" y1="60" x2="119" y2="60" />
        </g>
      );
      default: return null;
    }
  };
  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '15px', border: '1px solid var(--glass-border)', display: 'inline-block' }}>
      <svg width={size} height={size} viewBox="0 0 120 120">{renderGate()}</svg>
      <div style={{ color: color, fontSize: '0.7rem', fontWeight: 'bold', marginTop: '5px' }}>{type}</div>
    </div>
  );
};

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    if (uAns.toLowerCase() === answer.toString().toLowerCase() && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#bef264'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.1rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Respuesta"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100px', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px' }}>OK</button>}
      </div>
    </div>
  );
};

const LogicaMatematica = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '1 AND 1', ans: '1' });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];
    const gate = gates[Math.floor(Math.random() * gates.length)];
    const a = Math.round(Math.random());
    const b = Math.round(Math.random());
    
    let q, ans;
    switch(gate) {
      case 'AND': q = `${a} AND ${b}`; ans = (a && b).toString(); break;
      case 'OR': q = `${a} OR ${b}`; ans = (a || b).toString(); break;
      case 'NOT': q = `NOT ${a}`; ans = (a === 1 ? 0 : 1).toString(); break;
      case 'NAND': q = `${a} NAND ${b}`; ans = (!(a && b) ? 1 : 0).toString(); break;
      case 'NOR': q = `${a} NOR ${b}`; ans = (!(a || b) ? 1 : 0).toString(); break;
      case 'XOR': q = `${a} XOR ${b}`; ans = (a !== b ? 1 : 0).toString(); break;
      default: q = '1 AND 1'; ans = '1';
    }
    setFlashQuest({ q, ans });
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput === flashQuest.ans) {
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
    { id: 'l1', topic: 'Compuertas', question: 'AND: 1 y 1 = ?', answer: '1' },
    { id: 'l2', topic: 'Compuertas', question: 'OR: 1 o 0 = ?', answer: '1' },
    { id: 'l3', topic: 'Compuertas', question: 'NOT: No 1 = ?', answer: '0' },
    { id: 'l4', topic: 'NOR', question: 'NOR: 0 nor 0 = ?', answer: '1' },
    { id: 'l5', topic: 'NOR', question: 'NOR: 1 nor 0 = ?', answer: '0' },
    { id: 'l6', topic: 'Álgebra', question: 'A · 0 = ?', answer: '0' },
    { id: 'l7', topic: 'Álgebra', question: 'A + 1 = ?', answer: '1' },
    { id: 'l8', topic: 'Pensamiento', question: '¿Si P es falso, ~P es...?', answer: 'Verdadero' },
    { id: 'l9', topic: 'Compuertas', question: 'NAND: 1 nand 1 = ?', answer: '0' },
    { id: 'l10', topic: 'Álgebra', question: 'A · A = ?', answer: 'A' },
    { id: 'l11', topic: 'Tablas', question: 'En OR, ¿cuántos 1s hay en la salida?', answer: '3' },
    { id: 'l12', topic: 'Tablas', question: 'En NOR, ¿cuántos 1s hay en la salida?', answer: '1' },
    { id: 'l13', topic: 'NOR', question: '0 NOR 1 = ?', answer: '0' },
    { id: 'l14', topic: 'Lógica', question: 'Simbolo de conjunción (y)', answer: '^' },
    { id: 'l15', topic: 'XNOR', question: 'XNOR: 1 xnor 0 = ?', answer: '0' },
    { id: 'l16', topic: 'Boole', question: 'A + A\' = ?', answer: '1' },
    { id: 'l17', topic: 'Boole', question: 'A · A\' = ?', answer: '0' },
    { id: 'l18', topic: 'XOR', question: 'XOR: 1 xor 1 = ?', answer: '0' },
    { id: 'l19', topic: 'XNOR', question: 'XNOR: 0 xnor 0 = ?', answer: '1' },
    { id: 'l20', topic: 'Final', question: '¿1 byte son cuántos bits?', answer: '8' },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / exercises.length) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Lógica <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', WebkitBackgroundClip: 'text' }}>Matemática</span></h1>
            <p className="hero-subtitle">"¡Hola! Soy el Guardián de la Verdad. Hoy aprenderás a pensar como una computadora usando el poder de los 0s y 1s."</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>NIVEL DE PENSAMIENTO LÓGICO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #bef264)', transition: '0.5s' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={80} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Bits</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Procesa la señal: {flashQuest.q} ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#10b981' }}>{flashQuest.q} = ?</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="0 / 1"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #10b981', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#10b981', color: 'white', padding: '15px 30px' }}>PROCESAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Procesador Calibrado! Has dominado los bits. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Arquitecto de la Lógica: <span className="gradient-text">George Boole</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(16, 185, 129, 0.05), transparent)' }}>
          <div className="benefit-card" style={{ flex: 1, fontSize: '4rem' }}>🧠</div>
          <div className="cert-text" style={{ flex: 2 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>
              En 1854, George Boole inventó un sistema donde las ideas podían ser solo <strong>Verdaderas (1)</strong> o <strong>Falsas (0)</strong>. 
              Sin este descubrimiento, no existiría el internet ni los videojuegos. ¡Boole convirtió el pensamiento en matemáticas!
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Las Compuertas <span className="gradient-text">Fundamentales</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="AND" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Solo da <strong>1</strong> si AMBOS son 1.</p>
          </div>
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="OR" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Da <strong>1</strong> si al menos uno es 1.</p>
          </div>
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="NOT" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Invierte todo: 1→0, 0→1.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Compuertas <span className="gradient-text">Avanzadas</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="NAND" color="#38bdf8" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Inverso de AND. 0 solo si ambos son 1.</p>
          </div>
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="NOR" color="#ef4444" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Inverso de OR. 1 solo si ambos son 0.</p>
          </div>
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="XOR" color="#a855f7" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>O exclusiva. 1 solo si son diferentes.</p>
          </div>
          <div className="benefit-card" style={{ padding: '1.5rem' }}>
            <LogicGateSVG type="XNOR" color="#f59e0b" />
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Inverso de XOR. 1 solo si son iguales.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Guía Rápida de <span className="gradient-text">Decisión</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                <th style={{ padding: '15px' }}>Compuerta</th>
                <th style={{ padding: '15px' }}>Descripción Lógica</th>
                <th style={{ padding: '15px' }}>¿Cuándo da 1?</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>AND</strong></td><td>Conjunción</td><td>Solo cuando todas son 1</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>OR</strong></td><td>Disyunción</td><td>Cuando hay al menos un 1</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>NOT</strong></td><td>Negación</td><td>Cuando la entrada es 0</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>NAND</strong></td><td>AND Negado</td><td>Siempre, excepto 1 y 1</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>NOR</strong></td><td>OR Negado</td><td>Solo cuando todas son 0</td></tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}><td><strong>XOR</strong></td><td>OR Exclusivo</td><td>Cuando las entradas son distintas</td></tr>
              <tr><td><strong>XNOR</strong></td><td>Equivalencia</td><td>Cuando las entradas son iguales</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Foco Especial: Compuerta <span className="gradient-text">NOR</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'rgba(239, 68, 68, 0.02)' }}>
          <div style={{ flex: 1 }}>
            <LogicGateSVG type="NOR" color="#ef4444" size={150} />
          </div>
          <div className="cert-text" style={{ flex: 1 }}>
            <h3 style={{ color: '#ef4444' }}>La Compuerta Universal</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              La compuerta <strong>NOR</strong> es un OR seguido de un NOT. Solo da <strong>1</strong> cuando todas sus entradas son 0.
            </p>
            <table style={{ marginTop: '20px', width: '100%', color: 'white', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#ef4444' }}><th>A</th><th>B</th><th>Salida</th></tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                <tr style={{ borderBottom: '1px solid #333' }}><td>0</td><td>0</td><td style={{ color: '#10b981', fontWeight: 'bold' }}>1</td></tr>
                <tr style={{ borderBottom: '1px solid #333' }}><td>0</td><td>1</td><td>0</td></tr>
                <tr style={{ borderBottom: '1px solid #333' }}><td>1</td><td>0</td><td>0</td></tr>
                <tr><td>1</td><td>1</td><td>0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Reglas del <span className="gradient-text">Álgebra Booleana</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                <th style={{ padding: '15px' }}>Ley</th>
                <th style={{ padding: '15px' }}>Operación AND (·)</th>
                <th style={{ padding: '15px' }}>Operación OR (+)</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>Identidad</td>
                <td>A · 1 = A</td>
                <td>A + 0 = A</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>Nula</td>
                <td>A · 0 = 0</td>
                <td>A + 1 = 1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}>Idempotente</td>
                <td>A · A = A</td>
                <td>A + A = A</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Inversa</td>
                <td>A · A' = 0</td>
                <td>A + A' = 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Pensamiento Lógico</span></h2>
        <p className="section-subtitle">Supera estos 20 desafíos binarios para calibrar tu procesador mental.</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>Volver al Cuartel General</button>
      </div>
    </div>
  );
};

export default LogicaMatematica;