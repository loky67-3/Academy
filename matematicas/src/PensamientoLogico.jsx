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

// Visualizador de Símbolos de Diagrama de Flujo
const FlowSymbolSVG = ({ type, color = "#0ea5e9", size = 100 }) => {
  const renderSymbol = () => {
    switch(type) {
      case 'start': return <rect x="10" y="30" width="80" height="40" rx="20" fill="none" stroke={color} strokeWidth="4" />;
      case 'process': return <rect x="10" y="30" width="80" height="40" fill="none" stroke={color} strokeWidth="4" />;
      case 'decision': return <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke={color} strokeWidth="4" />;
      case 'io': return <path d="M20 30 L90 30 L80 70 L10 70 Z" fill="none" stroke={color} strokeWidth="4" />;
      default: return null;
    }
  };
  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '20px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">{renderSymbol()}</svg>
      <div style={{ color: color, fontSize: '0.75rem', fontWeight: 'bold', marginTop: '10px', textTransform: 'uppercase' }}>{type}</div>
    </div>
  );
};

// Diagrama de Flujo de Ejemplo: "Lámpara no funciona"
const LogicExampleSVG = () => (
  <svg width="300" height="350" viewBox="0 0 300 350" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '25px', padding: '20px' }}>
    {/* Inicio */}
    <rect x="100" y="10" width="100" height="30" rx="15" fill="none" stroke="white" strokeWidth="2" />
    <text x="150" y="30" fill="white" textAnchor="middle" fontSize="10">Lámpara falla</text>
    <path d="M150 40 L150 60" stroke="white" strokeWidth="2" />

    {/* Decisión 1 */}
    <path d="M150 60 L200 90 L150 120 L100 90 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <text x="150" y="95" fill="white" textAnchor="middle" fontSize="10">¿Enchufada?</text>
    
    <path d="M100 90 L60 90 L60 130" stroke="#ef4444" strokeWidth="2" />
    <text x="75" y="85" fill="#ef4444" fontSize="9">NO</text>
    <rect x="20" y="130" width="80" height="30" fill="none" stroke="#ef4444" strokeWidth="2" />
    <text x="60" y="150" fill="white" textAnchor="middle" fontSize="10">Enchufar</text>

    <path d="M150 120 L150 150" stroke="#10b981" strokeWidth="2" />
    <text x="160" y="135" fill="#10b981" fontSize="9">SÍ</text>

    {/* Decisión 2 */}
    <path d="M150 150 L200 180 L150 210 L100 180 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <text x="150" y="185" fill="white" textAnchor="middle" fontSize="10">¿Foco quemado?</text>

    <path d="M200 180 L240 180 L240 220" stroke="#ef4444" strokeWidth="2" />
    <text x="220" y="175" fill="#ef4444" fontSize="9">SÍ</text>
    <rect x="200" y="220" width="80" height="30" fill="none" stroke="#ef4444" strokeWidth="2" />
    <text x="240" y="240" fill="white" textAnchor="middle" fontSize="10">Cambiar foco</text>

    <path d="M150 210 L150 250" stroke="#10b981" strokeWidth="2" />
    <text x="160" y="225" fill="#10b981" fontSize="9">NO</text>
    <rect x="100" y="250" width="100" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" />
    <text x="150" y="270" fill="white" textAnchor="middle" fontSize="10">Comprar lámpara</text>
  </svg>
);

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [uAns, setUAns] = useState('');
  const [status, setStatus] = useState('idle');

  const check = () => {
    if (uAns.toLowerCase() === answer.toLowerCase() && !isSolved) {
      setStatus('correct');
      onSolved(id);
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="benefit-card" style={{ borderLeft: `4px solid ${isSolved ? '#10b981' : '#0ea5e9'}` }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{topic}</span>
      <h3 style={{ margin: '1rem 0', fontSize: '1.1rem', minHeight: '3rem' }}>{question}</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : uAns}
          onChange={(e) => setUAns(e.target.value)}
          disabled={isSolved}
          placeholder="Símbolo / Respuesta"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '10px', borderRadius: '8px', width: '100%' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ padding: '10px' }}>OK</button>}
      </div>
    </div>
  );
};

const PensamientoLogico = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '¿Qué símbolo es el Rombo?', ans: 'decisión' });
  const [flashInput, setFlashInput] = useState('');
  const [botStatus, setBotStatus] = useState('idle');
  const [flashSolvedCount, setFlashSolvedCount] = useState(0);

  const generateFlash = () => {
    const questions = [
      { q: 'Símbolo para el final', ans: 'óvalo' },
      { q: 'Símbolo para una acción', ans: 'rectángulo' },
      { q: 'Símbolo para preguntar', ans: 'rombo' },
      { q: '¿Si X=5 y X>3, a dónde voy?', ans: 'sí' },
      { q: 'Símbolo para entrada de datos', ans: 'paralelogramo' },
      { q: '¿Las flechas indican el...?', ans: 'flujo' }
    ];
    setFlashQuest(questions[Math.floor(Math.random() * questions.length)]);
    setFlashInput('');
    setBotStatus('idle');
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase() === flashQuest.ans) {
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
    { id: 'pl1', topic: 'Símbolos', question: '¿Qué forma tiene el inicio?', answer: 'ovalo' },
    { id: 'pl2', topic: 'Símbolos', question: '¿Qué forma tiene el proceso?', answer: 'rectangulo' },
    { id: 'pl3', topic: 'Decisión', question: '¿Qué forma tiene la decisión?', answer: 'rombo' },
    { id: 'pl4', topic: 'Flujo', question: 'Si X=10 y ¿X < 5?, ¿el flujo va a NO?', answer: 'si' },
    { id: 'pl5', topic: 'Entrada', question: 'Símbolo para "Leer Nombre"', answer: 'paralelogramo' },
    { id: 'pl6', topic: 'Flujo', question: 'Si X=2 y ¿X == 2?, ¿el flujo va a SÍ?', answer: 'si' },
    { id: 'pl7', topic: 'Concepto', question: '¿Cómo se llama el camino del diagrama?', answer: 'flujo' },
    { id: 'pl8', topic: 'Símbolos', question: '¿Qué forma tiene el final?', answer: 'ovalo' },
    { id: 'pl9', topic: 'Lógica', question: '¿Es el rombo una pregunta?', answer: 'si' },
    { id: 'pl10', topic: 'Proceso', question: 'Símbolo para "Sumar 1 a X"', answer: 'rectangulo' },
    { id: 'pl11', topic: 'Flujo', question: 'Si X=0 y ¿X > 0?, ¿el flujo va a NO?', answer: 'si' },
    { id: 'pl12', topic: 'Salida', question: 'Símbolo para "Imprimir Resultado"', answer: 'paralelogramo' },
    { id: 'pl13', topic: 'Lógica', question: '¿Se puede iniciar sin un óvalo?', answer: 'no' },
    { id: 'pl14', topic: 'Decisión', question: '¿Cuántas salidas tiene un rombo?', answer: '2' },
    { id: 'pl15', topic: 'Algoritmo', question: '¿Es el diagrama una receta?', answer: 'si' },
    { id: 'pl16', topic: 'Símbolos', question: 'Símbolo de entrada/salida', answer: 'paralelogramo' },
    { id: 'pl17', topic: 'Lógica', question: '¿Si llueve, llevo paraguas? (SÍ/NO)', answer: 'si' },
    { id: 'pl18', topic: 'Concepto', question: '¿Un proceso toma decisiones?', answer: 'no' },
    { id: 'pl19', topic: 'Estructura', question: '¿Las flechas pueden ir hacia atrás?', answer: 'si' },
    { id: 'pl20', topic: 'Final', question: '¿Se llama Algoritmo al proceso?', answer: 'si' }
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 1);
    }
  };

  const progress = (points / (exercises.length + 10)) * 100;

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ProfessorNeon expression={botStatus === 'wrong' ? 'sad' : 'happy'} size={120} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Pensamiento <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #10b981, #0ea5e9)', WebkitBackgroundClip: 'text' }}>Lógico</span></h1>
            <p className="hero-subtitle">"¡Bienvenido! Soy tu guía estratégico. Hoy aprenderás a mapear tu mente usando el Método de Flujo. ¡Organiza tu genio!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>COEFICIENTE ESTRATÉGICO</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #0ea5e9)', transition: '0.5s', boxShadow: '0 0 15px #10b981' }}></div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Desafío Flash Estratégico</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Respuesta rápida: ({flashSolvedCount}/10)</p>
          
          {flashSolvedCount < 10 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#10b981' }}>{flashQuest.q}</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" value={flashInput}
                  onChange={(e) => setFlashInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
                  placeholder="Respuesta"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #10b981', color: 'white', padding: '15px', borderRadius: '12px', width: '180px', fontSize: '1.2rem', textAlign: 'center' }}
                />
                <button onClick={checkFlash} className="btn-login" style={{ background: '#10b981', color: '#020617', padding: '15px 30px' }}>ENVIAR</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--neon-green)', fontWeight: 'bold', fontSize: '1.2rem' }}>¡Arquitecto de Procesos! Has dominado el flujo básico. +10 XP</div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">El Método del <span className="gradient-text">Diagrama de Flujo</span></h2>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(14, 165, 233, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <p className="hero-subtitle" style={{ textAlign: 'left' }}>
              Un diagrama de flujo es un mapa visual de un proceso. Nos permite ver cada paso y cada decisión antes de actuar.
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2.5', textAlign: 'left' }}>
              <li>🚀 <strong>Eficiencia:</strong> Encuentra el camino más corto.</li>
              <li>🛡️ <strong>Orden:</strong> Evita errores y pasos innecesarios.</li>
              <li>🛠️ <strong>Resolución:</strong> Desglosa problemas grandes en mini-tareas.</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <LogicExampleSVG />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Tu Diccionario de <span className="gradient-text">Símbolos</span></h2>
        <p className="section-subtitle">Aprende estas 4 formas y podrás leer cualquier proceso del mundo.</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <FlowSymbolSVG type="start" color="#10b981" />
            <h4 style={{ marginTop: '1rem' }}>Inicio / Fin</h4>
            <p style={{ fontSize: '0.8rem' }}>Marca dónde empieza y dónde termina el viaje lógico.</p>
          </div>
          <div className="benefit-card">
            <FlowSymbolSVG type="process" color="#0ea5e9" />
            <h4 style={{ marginTop: '1rem' }}>Proceso</h4>
            <p style={{ fontSize: '0.8rem' }}>Una acción o cálculo simple (ej: "Sumar A + B").</p>
          </div>
          <div className="benefit-card">
            <FlowSymbolSVG type="decision" color="#fbbf24" />
            <h4 style={{ marginTop: '1rem' }}>Decisión</h4>
            <p style={{ fontSize: '0.8rem' }}>Una pregunta que divide el camino en SÍ o NO.</p>
          </div>
          <div className="benefit-card">
            <FlowSymbolSVG type="io" color="#a855f7" />
            <h4 style={{ marginTop: '1rem' }}>Entrada / Salida</h4>
            <p style={{ fontSize: '0.8rem' }}>Pedir un dato al usuario o mostrar un resultado.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Las Reglas de <span className="gradient-text">Oro</span></h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9' }}>
                <th style={{ padding: '15px' }}>Regla</th>
                <th style={{ padding: '15px' }}>Descripción</th>
                <th style={{ padding: '15px' }}>¿Por qué?</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center', color: 'white' }}>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}><strong>Unidireccional</strong></td>
                <td>El flujo debe ir de arriba a abajo o izquierda a derecha.</td>
                <td>Mantiene la lectura clara.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}><strong>Cierre</strong></td>
                <td>Todo camino debe llevar a un fin.</td>
                <td>Evita bucles infinitos infinitos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px' }}><strong>Simplicidad</strong></td>
                <td>Un símbolo por cada acción pequeña.</td>
                <td>Facilita el debugging mental.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}><strong>Etiquetas</strong></td>
                <td>Las flechas de decisión deben decir SÍ o NO.</td>
                <td>Evita la confusión en rutas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Pensamiento Crítico</span></h2>
        <p className="section-subtitle">20 Desafíos para graduarte como un estratega lógico de élite.</p>
        <div className="grid-container">
          {exercises.map((ex) => (
            <ExerciseCard key={ex.id} {...ex} onSolved={handleSolved} isSolved={solvedIds.includes(ex.id)} />
          ))}
        </div>
      </section>

      {/* --- TORRE DE HANÓI --- */}
      <section className="info-section">
        <h2 className="section-title">El Enigma de la <span className="gradient-text">Torre de Hanói</span></h2>
        <p className="section-subtitle">Un problema clásico para entender la recursividad: mover discos entre postes.</p>
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(168, 85, 247, 0.05), transparent)', alignItems: 'center' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h3 style={{ color: '#a855f7', textAlign: 'left', fontSize: '1.8rem' }}>¿Qué es la Torre de Hanói?</h3>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Es un rompecabezas matemático que consiste en tres postes y un número de discos de diferentes tamaños, que pueden deslizarse sobre cualquier poste. El objetivo es mover toda la pila a otro poste, siguiendo estas reglas:
            </p>
            <ul style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1rem', lineHeight: '1.8', marginTop: '10px' }}>
              <li>🔹 Solo se puede mover un disco a la vez.</li>
              <li>🔹 Un disco más grande nunca puede colocarse encima de uno más pequeño.</li>
              <li>🔹 Cada disco debe estar en uno de los tres postes.</li>
            </ul>
            <p style={{ color: 'var(--neon-green)', textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6', marginTop: '15px' }}>
              Este problema se resuelve elegantemente con la <strong>recursividad</strong>, una técnica donde una función se llama a sí misma.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <HanoiTowerSVG disks={3} size={250} />
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 className="section-subtitle" style={{ color: '#a855f7', marginBottom: '2rem' }}>Solución Recursiva en Diferentes Lenguajes:</h3>
          <div className="benefits-grid">
            <CodeBlock lang="javascript" color="#fbbf24" code={`function hanoi(n, origen, destino, auxiliar) {\n  if (n === 1) {\n    console.log(\`Mover disco 1 de \${origen} a \${destino}\`);\n    return;\n  }\n  hanoi(n - 1, origen, auxiliar, destino);\n  console.log(\`Mover disco \${n} de \${origen} a \${destino}\`);\n  hanoi(n - 1, auxiliar, destino, origen);\n}`} />
            <CodeBlock lang="python" color="#0ea5e9" code={`def hanoi(n, origen, destino, auxiliar):\n    if n == 1:\n        print(f"Mover disco 1 de {origen} a {destino}")\n        return\n    hanoi(n - 1, origen, auxiliar, destino)\n    print(f"Mover disco {n} de {origen} a {destino}")\n    hanoi(n - 1, auxiliar, destino, origen)`} />
            <CodeBlock lang="cpp" color="#ef4444" code={`void hanoi(int n, char origen, char destino, char auxiliar) {\n    if (n == 1) {\n        cout << "Mover disco 1 de " << origen << " a " << destino << endl;\n        return;\n    }\n    hanoi(n - 1, origen, auxiliar, destino);\n    cout << "Mover disco " << n << " de " << origen << " a " << destino << endl;\n    hanoi(n - 1, auxiliar, destino, origen);\n}`} />
          </div>
        </div>
      </section>

      {/* --- ALGORITMOS ESENCIALES --- */}
      <section className="info-section">
        <h2 className="section-title">Algoritmos Esenciales: <span className="gradient-text">Tu Caja de Herramientas</span></h2>
        <p className="section-subtitle">Los algoritmos son recetas para resolver problemas. ¡Domina estos básicos y desbloquea la eficiencia!</p>
        
        {/* Búsqueda Binaria */}
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(14, 165, 233, 0.05), transparent)', alignItems: 'center', marginTop: '3rem' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h3 style={{ color: '#0ea5e9', textAlign: 'left', fontSize: '1.8rem' }}>Búsqueda Binaria (Binary Search)</h3>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Imagina buscar una palabra en un diccionario. No empiezas desde la primera página, ¿verdad? Abres por la mitad, y si no está, descartas la mitad que no sirve. ¡Así funciona la búsqueda binaria!
            </p>
            <ul style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1rem', lineHeight: '1.8', marginTop: '10px' }}>
              <li>✅ **Eficiente:** Mucho más rápida que buscar uno por uno.</li>
              <li>⚠️ **Requisito:** ¡La lista debe estar ordenada!</li>
              <li>💡 **Idea:** Divide y vencerás.</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <AlgorithmVisualSVG type="binarySearch" items={[2, 5, 8, 10, 12, 15, 20]} target={12} />
          </div>
        </div>
        <CodeBlock lang="python" color="#0ea5e9" code={`def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1 # No encontrado`} />

        {/* Ordenamiento Burbuja */}
        <div className="certificate-section" style={{ gap: '40px', background: 'linear-gradient(rgba(239, 68, 68, 0.05), transparent)', alignItems: 'center', marginTop: '3rem' }}>
          <div className="cert-text" style={{ flex: 1 }}>
            <h3 style={{ color: '#ef4444', textAlign: 'left', fontSize: '1.8rem' }}>Ordenamiento Burbuja (Bubble Sort)</h3>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Es el algoritmo de ordenamiento más simple. Compara elementos adyacentes y los intercambia si están en el orden incorrecto. Repite esto hasta que no se necesiten más intercambios.
            </p>
            <ul style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '1rem', lineHeight: '1.8', marginTop: '10px' }}>
              <li>🐢 **Simple pero Lento:** Fácil de entender, pero ineficiente para grandes volúmenes de datos.</li>
              <li>🔄 **Concepto:** Los elementos "más pesados" (grandes) burbujean hacia el final.</li>
              <li>📚 **Educativo:** Excelente para aprender los fundamentos de los algoritmos de ordenamiento.</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <AlgorithmVisualSVG type="bubbleSort" items={[64, 34, 25, 12, 22]} />
          </div>
        </div>
        <CodeBlock lang="python" color="#ef4444" code={`def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j] # Intercambio\n    return arr`} />
      </section>

      {/* --- MENSAJE DE FELICITACIÓN --- */}
      <section className="info-section" style={{ marginTop: '5rem' }}>
        <div className="benefit-card" style={{ background: 'linear-gradient(45deg, #10b981, #0ea5e9)', padding: '4rem', borderRadius: '30px', boxShadow: '0 0 50px rgba(16, 185, 129, 0.5)' }}>
          <h2 style={{ fontSize: '3rem', color: '#020617', fontWeight: '900', marginBottom: '1.5rem' }}>
            ¡FELICIDADES, ARQUITECTO DE LA LÓGICA!
          </h2>
          <p style={{ fontSize: '1.8rem', color: '#020617', lineHeight: '1.6' }}>
            Has navegado por los intrincados caminos del pensamiento algorítmico, desentrañado la recursividad de Hanói y dominado las estrategias de búsqueda y ordenamiento. Tu mente ahora está calibrada para resolver cualquier desafío.
          </p>
          <p style={{ fontSize: '1.2rem', color: '#020617', marginTop: '2rem', fontWeight: 'bold' }}>
            El equipo de EDUNEON te felicita por tu dedicación y maestría. ¡El futuro de la programación te espera!
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    </div>
  );
};

export default PensamientoLogico;