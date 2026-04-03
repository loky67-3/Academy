import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const NeonBot = ({ status, size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={status === 'correct' ? '#10b981' : (status === 'wrong' ? '#ef4444' : '#8b5cf6')} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M9 15h.01M15 15h.01" />
    {status === 'correct' ? <path d="M9 18c1 1 3 1 4 0" /> : <path d="M9 18h4" />}
  </svg>
);

// Visualización de la "Máquina de Funciones"
const FunctionMachineSVG = ({ input, rule, output, color = "#8b5cf6" }) => (
  <div style={{ textAlign: 'center', margin: '2rem 0' }}>
    <svg width="300" height="150" viewBox="0 0 300 150">
      {/* Entrada */}
      <path d="M10 75 L60 75" stroke="white" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="5,5" />
      <text x="15" y="65" fill="white" fontSize="14">Entrada (x)</text>
      <text x="30" y="95" fill={color} fontSize="20" fontWeight="bold">{input}</text>

      {/* La Máquina */}
      <rect x="70" y="30" width="160" height="90" rx="15" fill="rgba(0,0,0,0.4)" stroke={color} strokeWidth="4" style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
      <text x="150" y="70" fill="white" fontSize="18" textAnchor="middle" fontWeight="bold">f(x)</text>
      <text x="150" y="100" fill={color} fontSize="16" textAnchor="middle">{rule}</text>

      {/* Salida */}
      <path d="M240 75 L290 75" stroke="white" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="245" y="65" fill="white" fontSize="14">Salida (y)</text>
      <text x="255" y="95" fill="#10b981" fontSize="20" fontWeight="bold">{output}</text>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
        </marker>
      </defs>
    </svg>
  </div>
);

// Componente Genérico para Gráficas de Funciones
const FunctionGraphSVG = ({ type, color = "#8b5cf6", size = 200 }) => {
  const points = [];
  const center = size / 2;
  const scale = size / 20; // 1 unidad = scale píxeles

  // Generar puntos según el tipo de función
  for (let x = -10; x <= 10; x += 0.5) {
    let y;
    if (type === 'linear') y = x; // f(x) = x
    else if (type === 'quadratic') y = x * x / 4; // f(x) = x²/4 (escalada para visualización)
    else if (type === 'exponential') y = Math.pow(1.5, x); // f(x) = 1.5^x
    else if (type === 'logarithmic') {
      if (x <= 0) continue;
      y = Math.log2(x); // f(x) = log2(x)
    }

    const svgX = center + x * scale;
    const svgY = center - y * scale;
    
    if (svgY >= 0 && svgY <= size) {
      points.push(`${svgX},${svgY}`);
    }
  }

  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'inline-block' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Ejes */}
        <line x1="0" y1={center} x2={size} y2={center} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1={center} y1="0" x2={center} y2={size} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Curva de la función */}
        <path 
          d={`M ${points.join(' L ')}`} 
          fill="none" 
          stroke={color} 
          strokeWidth="3" 
          style={{ filter: `drop-shadow(0 0 8px ${color})` }} 
        />
      </svg>
    </div>
  );
};

const ExerciseCard = ({ id, level, question, answer, onSolved, isSolved, func }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const checkAnswer = () => {
    if (parseFloat(uAns) === answer && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#8b5cf6'}`, textAlign: 'center', flex: '1 1 300px' }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>NIVEL: {level}</span>
      <div style={{ fontSize: '1.8rem', margin: '1rem 0', color: '#8b5cf6', fontWeight: 'bold' }}>{func}</div>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="number" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '10px', width: '100px', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {!isSolved && <button onClick={checkAnswer} className="btn-login" style={{ background: '#8b5cf6', padding: '10px 20px' }}>ENVIAR</button>}
      </div>
    </div>
  );
};

const Funciones = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ x: 2, a: 3, ans: 5 });
  const [flashInput, setFlashInput] = useState('');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);
  const [botStatus, setBotStatus] = useState('idle');

  const generateFlash = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const a = Math.floor(Math.random() * 10) + 1;
    setFlashQuest({ x, a, ans: x + a });
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
    // Lineales
    { id: 'fn1', level: 'Lineal', func: 'f(x) = 2x + 3', question: 'Calcula f(5)', answer: 13 },
    { id: 'fn2', level: 'Lineal', func: 'f(x) = -x + 10', question: 'Calcula f(4)', answer: 6 },
    // Cuadráticas
    { id: 'fn7', level: 'Cuadrática', func: 'f(x) = x²', question: 'Calcula f(6)', answer: 36 },
    { id: 'fn12', level: 'Cuadrática', func: 'f(x) = x² + 2x + 1', question: 'Calcula f(2)', answer: 9 },
    // Exponenciales
    { id: 'fn21', level: 'Exponencial', func: 'f(x) = 2ˣ', question: 'Calcula f(3)', answer: 8 },
    { id: 'fn22', level: 'Exponencial', func: 'f(x) = 3ˣ + 1', question: 'Calcula f(2)', answer: 10 },
    // Logarítmicas
    { id: 'fn23', level: 'Logarítmica', func: 'f(x) = log₂(x)', question: 'Calcula f(16)', answer: 4 },
    { id: 'fn24', level: 'Logarítmica', func: 'f(x) = log₁₀(100)', question: '¿Cuál es el valor?', answer: 2 },
    // Otros
    { id: 'fn4', level: 'Fácil', func: 'f(x) = x/2', question: 'Calcula f(16)', answer: 8 },
    { id: 'fn10', level: 'Medio', func: 'f(x) = √(x)', question: 'Calcula f(64)', answer: 8 },
    { id: 'fn11', level: 'Difícil', func: 'f(x) = 3x - 5', question: 'Si f(x)=10, ¿x?', answer: 5 },
    { id: 'fn16', level: 'Avanzado', func: 'f(x) = 2x²', question: 'Calcula f(4)', answer: 32 },
    { id: 'fn20', level: 'Avanzado', func: 'f(x) = x² - x', question: 'Calcula f(5)', answer: 20 },
    { id: 'fn14', level: 'Difícil', func: 'f(x) = (x+2)²', question: 'Calcula f(3)', answer: 25 },
    { id: 'fn3', level: 'Fácil', func: 'f(x) = x - 8', question: 'Calcula f(100)', answer: 92 },
    { id: 'fn6', level: 'Medio', func: 'f(x) = 5x + 1', question: 'Calcula f(0)', answer: 1 },
    { id: 'fn19', level: 'Avanzado', func: 'f(x) = 3(x+1)', question: 'Calcula f(9)', answer: 30 },
    { id: 'fn18', level: 'Avanzado', func: 'f(x) = |x - 10|', question: 'Calcula f(2)', answer: 8 },
    { id: 'fn15', level: 'Difícil', func: 'f(x) = 120/x', question: 'Calcula f(6)', answer: 20 },
    { id: 'fn9', level: 'Medio', func: 'f(x) = x³', question: 'Calcula f(3)', answer: 27 },
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
      <div className="neon-glow-bg" style={{ top: '10%', left: '5%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' }}></div>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '120px 10% 20px' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginBottom: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#8b5cf6' }}>
            <span>MAESTRÍA EN FUNCIONES</span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #d946ef)', transition: 'width 0.5s ease', boxShadow: '0 0 15px #8b5cf6' }}></div>
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>Mundo de las <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #8b5cf6, #d946ef)', WebkitBackgroundClip: 'text' }}>Funciones</span></h1>
        <p className="hero-subtitle">Descubre cómo los valores se transforman. Si cambias el origen, ¡cambias el destino!</p>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}><NeonBot status={botStatus} /></div>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash de Evaluación</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Si f(x) = x + {flashQuest.a}, ¿cuánto es f({flashQuest.x})? ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px' }}>f({flashQuest.x}) = ?</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="number" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="y"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #8b5cf6', color: 'white', padding: '15px', borderRadius: '12px', width: '120px', fontSize: '1.5rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#8b5cf6', color: 'white', padding: '15px 30px' }}>PROCESAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Máquina Calibrada! Eres un experto evaluador. +10 XP</div>
          )}
        </div>
      </section>

      {/* Nuevas Secciones de Tipos de Funciones */}
      <section className="info-section">
        <h2 className="section-title">El Atlas de las <span className="gradient-text">Funciones</span></h2>
        <div className="benefits-grid">
          {/* Lineal */}
          <div className="benefit-card">
            <FunctionGraphSVG type="linear" color="#0ea5e9" size={150} />
            <h4 style={{ color: '#0ea5e9', marginTop: '1rem' }}>Lineales (f(x) = mx + b)</h4>
            <p style={{ fontSize: '0.9rem' }}>Dibujan una línea recta. Representan cambios constantes, como la velocidad de un crucero.</p>
          </div>
          {/* Cuadrática */}
          <div className="benefit-card">
            <FunctionGraphSVG type="quadratic" color="#f97316" size={150} />
            <h4 style={{ color: '#f97316', marginTop: '1rem' }}>Cuadráticas (ax² + bx + c)</h4>
            <p style={{ fontSize: '0.9rem' }}>Dibujan parábolas. Son perfectas para modelar la trayectoria de un proyectil o un salto.</p>
          </div>
          {/* Exponencial */}
          <div className="benefit-card">
            <FunctionGraphSVG type="exponential" color="#ec4899" size={150} />
            <h4 style={{ color: '#ec4899', marginTop: '1rem' }}>Exponenciales (aˣ)</h4>
            <p style={{ fontSize: '0.9rem' }}>Crecimiento explosivo. Se usan para modelar poblaciones de bacterias o el interés compuesto.</p>
          </div>
          {/* Logarítmica */}
          <div className="benefit-card">
            <FunctionGraphSVG type="logarithmic" color="#10b981" size={150} />
            <h4 style={{ color: '#10b981', marginTop: '1rem' }}>Logarítmicas (logₐ x)</h4>
            <p style={{ fontSize: '0.9rem' }}>El crecimiento se frena. Miden la intensidad del sonido (decibelios) o terremotos (Richter).</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(139, 92, 246, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#8b5cf6', textAlign: 'left' }}>Diferencias Clave</h2>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
              <li>📏 <strong>Lineal:</strong> Si X aumenta 1, Y siempre aumenta lo mismo.</li>
              <li>🎢 <strong>Cuadrática:</strong> Tiene un punto máximo o mínimo (vértice).</li>
              <li>🚀 <strong>Exponencial:</strong> Entre más grande es X, más rápido crece Y.</li>
              <li>🐌 <strong>Logarítmica:</strong> Inversa de la exponencial; crece cada vez más lento.</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', border: '1px dashed #8b5cf6' }}>
             <h4 style={{ color: 'white', marginBottom: '1rem' }}>Resumen de Gráficas</h4>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <FunctionGraphSVG type="linear" color="#0ea5e9" size={100} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FunctionGraphSVG type="quadratic" color="#f97316" size={100} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FunctionGraphSVG type="exponential" color="#ec4899" size={100} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FunctionGraphSVG type="logarithmic" color="#10b981" size={100} />
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(139, 92, 246, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h2 className="section-title" style={{ color: '#8b5cf6', textAlign: 'left' }}>¿Qué es una Función?</h2>
            <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              Imagina una máquina: le das un número (entrada <strong>x</strong>), ella hace un cálculo (regla) y te devuelve otro número (salida <strong>y</strong>). <br/><br/>
              Lo más importante es que para cada <strong>x</strong>, ¡solo existe un resultado <strong>y</strong>!
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '15px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
              <code style={{ color: 'var(--neon-green)', fontSize: '1.3rem' }}>f(x) = 2x <br/> f(5) = 2(5) = 10</code>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <FunctionMachineSVG input="5" rule="Multiplicar por 2" output="10" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Conceptos de <span className="gradient-text">Ingeniería</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📥</div>
            <h4>Dominio</h4>
            <p>Es el conjunto de todos los valores de entrada (x) que la máquina puede procesar.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📤</div>
            <h4>Rango</h4>
            <p>Es el conjunto de todos los valores de salida (y) que la máquina puede generar.</p>
          </div>
          <div className="benefit-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔄</div>
            <h4>Inversa</h4>
            <p>Es la función que "deshace" lo que hizo la original. Si f suma 1, f⁻¹ resta 1.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de Funciones</h2>
        <p className="section-subtitle">20 Desafíos para dominar la lógica de transformación. ¡Atrévete a calcular!</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#8b5cf6', color: 'white' }} onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default Funciones;