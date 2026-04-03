import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfessorNeon = ({ expression = 'happy', size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 10px #bef264)' }}>
    <rect x="40" y="40" width="120" height="100" rx="20" fill="rgba(0,0,0,0.4)" stroke="#bef264" strokeWidth="5" />
    <path d="M70 140 L50 180 M130 140 L150 180" stroke="#bef264" strokeWidth="8" strokeLinecap="round" />
    <circle cx="80" cy="80" r="8" fill="#fff" />
    <circle cx="120" cy="80" r="8" fill="#fff" />
    {expression === 'happy' ? (
      <path d="M80 110 Q100 130 120 110" stroke="#fff" strokeWidth="4" fill="none" />
    ) : (
      <path d="M80 115 L120 115" stroke="#fff" strokeWidth="4" />
    )}
    <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" />
    <path d="M170 40 L170 60" stroke="#fbbf24" strokeWidth="3" />
  </svg>
);

const NeonBot = ({ status, size = 60 }) => (
  <ProfessorNeon expression={status === 'wrong' ? 'sad' : 'happy'} size={size} />
);

const BalanceVisual = ({ left, right, color = "#bef264" }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '2rem 0' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '40px' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: `2px solid ${color}`, minWidth: '100px', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>{left}</div>
      <div style={{ fontSize: '3rem', paddingBottom: '10px' }}>=</div>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: `2px solid ${color}`, minWidth: '100px', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>{right}</div>
    </div>
    <div style={{ width: '300px', height: '10px', background: 'white', borderRadius: '5px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '30px solid rgba(255,255,255,0.2)' }}></div>
    </div>
  </div>
);

// Visualización de los componentes de un término algebraico
const TerminologySVG = () => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '25px', border: '1px solid #bef264', textAlign: 'center' }}>
    <svg width="250" height="150" viewBox="0 0 250 150">
      <text x="20" y="80" fill="#fbbf24" fontSize="60" fontWeight="900">3</text>
      <text x="60" y="80" fill="#bef264" fontSize="80" fontWeight="900">x</text>
      <text x="100" y="40" fill="#ef4444" fontSize="40" fontWeight="900">2</text>
      
      <path d="M35 90 L35 120" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#dot)" />
      <text x="10" y="140" fill="#fbbf24" fontSize="12">Coeficiente</text>
      
      <path d="M75 90 L75 120" stroke="#bef264" strokeWidth="2" markerEnd="url(#dot)" />
      <text x="60" y="140" fill="#bef264" fontSize="12">Variable</text>
      
      <path d="M115 20 L150 20" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dot)" />
      <text x="160" y="25" fill="#ef4444" fontSize="12">Exponente</text>
      
      <defs><marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"><circle cx="5" cy="5" r="3" fill="context-stroke" /></marker></defs>
    </svg>
  </div>
);

// Visualización de una Función (Parábola) para Álgebra Avanzada
const FunctionGraph = ({ size = 200 }) => {
  const points = [];
  for (let x = -10; x <= 10; x += 0.5) {
    const plotX = (x + 10) * (size / 20);
    const plotY = size - (x * x) * (size / 100); // y = x^2
    points.push(`${plotX},${plotY}`);
  }

  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <line x1="0" y1={size} x2={size} y2={size} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <line x1={size/2} y1="0" x2={size/2} y2={size} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d={`M ${points.join(' L ')}`} fill="none" stroke="#bef264" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 8px #bef264)' }} />
      </svg>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Gráfica de y = x²</p>
    </div>
  );
};

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
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#bef264'}`, textAlign: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '2.2rem', margin: '1.5rem 0', fontWeight: '900', color: isSolved ? '#10b981' : 'white' }}>
        {question}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0 10px' }}>
          <span style={{ color: '#bef264', fontWeight: 'bold', marginRight: '5px' }}>x =</span>
          <input 
            type="number" value={isSolved ? answer : userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSolved}
            placeholder="?"
            style={{ background: 'transparent', border: 'none', color: 'white', padding: '12px', width: '80px', fontSize: '1.2rem', textAlign: 'center', outline: 'none' }}
          />
        </div>
        {!isSolved && <button onClick={checkAnswer} className="btn-card" style={{ marginTop: 0 }}>DESPEJAR</button>}
      </div>
    </div>
  );
};

const Algebra = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ a: 5, b: 12, ans: 7 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const a = Math.floor(Math.random() * 15) + 1;
    const ans = Math.floor(Math.random() * 15) + 1;
    const b = a + ans;
    setFlashQuest({ a, b, ans });
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
    { id: 'alg1', level: 'Básico', question: 'x + 10 = 25', answer: 15 },
    { id: 'alg2', level: 'Básico', question: '3x = 12', answer: 4 },
    { id: 'alg3', level: 'Medio', question: '2x - 5 = 11', answer: 8 },
    { id: 'alg4', level: 'Medio', question: 'x/4 + 2 = 6', answer: 16 },
    { id: 'alg5', level: 'Difícil', question: '5x + 10 = 2x + 40', answer: 10 },
    { id: 'alg6', level: 'Difícil', question: '2(x + 3) = 20', answer: 7 },
    { id: 'alg7', level: 'Avanzado', question: 'x² - 9 = 0 (x > 0)', answer: 3 },
    { id: 'alg8', level: 'Avanzado', question: '√(x + 4) = 5', answer: 21 },
    { id: 'alg9', level: 'Experto', question: '3x/2 = 15', answer: 10 },
    { id: 'alg10', level: 'Pro', question: 'x² + x = 2 (x > 0)', answer: 1 },
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = Math.min((points / (exercises.length + 10)) * 100, 100); // 10 ejercicios + 10 flash

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <div className="neon-glow-bg" style={{ top: '15%', left: '5%', background: 'radial-gradient(circle, rgba(190, 242, 100, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
          <ProfessorNeon size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Maestría en <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #bef264, #84cc16)', WebkitBackgroundClip: 'text' }}>Álgebra</span></h1>
            <p className="hero-subtitle">"¡Bienvenido al lenguaje del universo! Soy tu guía para dominar las variables y resolver el gran misterio de la X."</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#bef264' }}>
            <span>MAESTRÍA EN ÁLGEBRA</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #bef264, #84cc16)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #bef264' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #bef264', background: 'rgba(190, 242, 100, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Despeje</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>¿Cuánto vale X? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px' }}>x + {flashQuest.a} = {flashQuest.b}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="?"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #bef264', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#bef264', padding: '15px 30px', color: '#020617' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Misterio Resuelto! Eres un maestro del despeje. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Origen: <span className="gradient-text">Al-Juarismi</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(251, 191, 36, 0.05), transparent)', alignItems: 'center' }}>
          <div className="benefit-card" style={{ flex: 1, fontSize: '3rem' }}>📜</div>
          <div className="cert-text" style={{ flex: 2 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              La palabra <strong>Álgebra</strong> viene del árabe <em>al-jabr</em> ("restauración"). Fue sistematizada por <strong>Muhammad ibn Musa al-Khwarizmi</strong> en el siglo IX. 
              <br/><br/>
              Él inventó el método de pasar términos de un lado al otro del igual para equilibrar la balanza. ¡Gracias a él, hoy podemos programar computadoras y lanzar cohetes!
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">1. Anatomía de un <span className="gradient-text">Término</span></h2>
        <p className="section-subtitle">Antes de resolver, debemos conocer las piezas de nuestra máquina algebraica.</p>
        <div className="certificate-section" style={{ background: 'none', border: 'none', padding: 0 }}>
          <div style={{ flex: 1 }}><TerminologySVG /></div>
          <div className="cert-text" style={{ flex: 1 }}>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2.5' }}>
              <li>🔢 <strong>Coeficiente:</strong> El número que multiplica a la variable.</li>
              <li>📦 <strong>Variable:</strong> La letra (contenedor) que guarda un valor desconocido.</li>
              <li>⚡ <strong>Exponente:</strong> Indica cuántas veces se multiplica la variable por sí misma.</li>
              <li>💎 <strong>Constante:</strong> Un número solo (ej. +5) que no cambia.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">2. Tabla de <span className="gradient-text">Identidades de Oro</span></h2>
        <p className="section-subtitle">Estas fórmulas son "atajos" que todo maestro de álgebra debe memorizar.</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(190, 242, 100, 0.2)', color: '#bef264' }}>
                <th style={{ padding: '20px' }}>Nombre</th>
                <th style={{ padding: '20px' }}>Fórmula</th>
                <th style={{ padding: '20px' }}>Resultado Expandido</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>Binomio al Cuadrado</td>
                <td>(a + b)²</td>
                <td>a² + 2ab + b²</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>Diferencia de Cuadrados</td>
                <td>(a + b)(a - b)</td>
                <td>a² - b²</td>
              </tr>
              <tr>
                <td style={{ padding: '15px' }}>Binomio al Cubo</td>
                <td>(a + b)³</td>
                <td>a³ + 3a²b + 3ab² + b³</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(190, 242, 100, 0.05), transparent)', alignItems: 'stretch' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#bef264', textAlign: 'left' }}>¿Qué es el Álgebra?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Es el arte de generalizar. La letra <strong>"x"</strong> es una variable: un contenedor para cualquier número. <br/><br/>
              Nuestro trabajo es dejar a la <strong>"x"</strong> sola de un lado para descubrir su valor secreto.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.2rem' }}>Si x + 5 = 10, entonces x = 5</code>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <BalanceVisual left="x + 5" right="10" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Álgebra en la <span className="gradient-text">Vida Real</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <h4>Programación</h4>
            <p>Las variables en el código (`let x = 10`) son álgebra pura aplicada a algoritmos y lógica de software.</p>
          </div>
          <div className="benefit-card">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <h4>Ingeniería</h4>
            <p>Desde construir puentes hasta lanzar cohetes, el álgebra predice resultados antes de mover un solo ladrillo.</p>
          </div>
          <div className="benefit-card">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M21 12V7H5a2 2 0 0 1 0-4h14V2"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>
            <h4>Economía</h4>
            <p>Calcular intereses, impuestos y ganancias requiere balances de ecuaciones constantes para optimizar el dinero.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(to left, rgba(190, 242, 100, 0.05), transparent)' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <FunctionGraph />
          </div>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#bef264', textAlign: 'left' }}>Álgebra Avanzada: Funciones</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Cuando una variable depende de otra, creamos una <strong>función</strong>. <br/><br/>
              Las funciones cuadráticas (como y = x²) dibujan curvas llamadas parábolas, esenciales para entender el movimiento físico.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', border: '1px dashed var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-blue)', fontSize: '1.1rem' }}>f(x) = ax² + bx + c</code>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Reglas de <span className="gradient-text">Oro</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <h4>El Salto del Igual</h4>
            <p>Cuando un número pasa al otro lado del igual, ¡cambia su signo! (+ pasa a -, × pasa a ÷).</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6M9 15h6"/></svg>
            <h4>Equilibrio Total</h4>
            <p>Lo que le hagas a un lado de la balanza, ¡tienes que hacérselo al otro también!</p>
          </div>
          <div className="benefit-card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2" style={{marginBottom: '1rem'}}><path d="M12 2v20M2 12h20"/></svg>
            <h4>Despeje Final</h4>
            <p>Tu objetivo siempre es que la <strong>X</strong> quede positiva y completamente sola.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Entrenamiento de Álgebra</h2>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#bef264', color: '#020617' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Algebra;