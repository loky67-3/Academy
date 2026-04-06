import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- SENSEI PYTHON (SNAKE-BOT SVG) ---
const SenseiPython = ({ expression = 'happy', size = 140 }) => {
  const yellow = "#ffd43b";
  const blue = "#306998";
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 15px ${yellow})` }}>
      <path d="M40 150 Q 70 120 100 150 T 160 150" fill="none" stroke={blue} strokeWidth="15" strokeLinecap="round" />
      <rect x="60" y="40" width="80" height="80" rx="20" fill="rgba(15, 23, 42, 0.9)" stroke={yellow} strokeWidth="6" />
      <circle cx="85" cy="75" r="8" fill="white" />
      <circle cx="115" cy="75" r="8" fill="white" />
      {expression === 'happy' ? (
        <path d="M85 95 Q 100 110 115 95" stroke={yellow} strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M90 100 L110 100" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      )}
      <text x="100" y="30" fill={yellow} fontSize="18" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '2px' }}>PY-BOT</text>
      <path d="M140 60 L160 40 M140 80 L160 100" stroke={blue} strokeWidth="4" />
    </svg>
  );
};

// --- BLOQUE DE CÓDIGO VISIBLE ---
const PythonCode = ({ title, code }) => (
  <div style={{ background: '#000000', borderRadius: '15px', border: '2px solid #ffd43b', margin: '1.5rem 0', overflow: 'hidden', textAlign: 'left', boxShadow: '0 0 25px rgba(255, 212, 59, 0.1)' }}>
    <div style={{ background: '#1e293b', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.8rem', color: '#ffd43b', fontWeight: 'bold' }}>{title.toUpperCase()}</span>
      <span style={{ color: '#306998', fontSize: '0.7rem', fontWeight: 'bold' }}>PYTHON 3.x</span>
    </div>
    <pre style={{ padding: '40px', margin: 0, color: '#ffffff', fontSize: '2rem', fontFamily: 'Consolas, monospace', fontWeight: '900', lineHeight: '1.7', overflowX: 'auto' }}>
      <code>{code}</code>
    </pre>
  </div>
);

const LoopVisualizer = () => (
  <div style={{ background: '#000', padding: '2rem', borderRadius: '25px', border: '2px solid #ffd43b', margin: '2rem 0' }}>
    <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Mecánica de <span style={{ color: '#ffd43b' }}>Iteración</span></h3>
    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ border: '2px dashed #306998', padding: '20px', borderRadius: '15px' }}>
        <h4 style={{ color: '#ffd43b' }}>FOR Loop</h4>
        <p style={{ color: '#fff', fontSize: '0.9rem' }}>Recorre una lista elemento por elemento hasta el final.</p>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px' }}>[ 🟢 → 🟢 → 🟢 ]</div>
      </div>
      <div style={{ border: '2px dashed #ffd43b', padding: '20px', borderRadius: '15px' }}>
        <h4 style={{ color: '#306998' }}>WHILE Loop</h4>
        <p style={{ color: '#fff', fontSize: '0.9rem' }}>Se repite infinitamente hasta que la condición sea False.</p>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px' }}>🔄 (Condición?)</div>
      </div>
    </div>
  </div>
);

const FunctionAnatomy = () => (
  <div style={{ background: '#000', padding: '2.5rem', borderRadius: '30px', border: '2px solid #306998', margin: '2rem 0', textAlign: 'left' }}>
    <h3 style={{ color: '#ffd43b', fontSize: '2rem', marginBottom: '1.5rem' }}>Anatomía de una <span style={{ color: '#fff' }}>Función</span></h3>
    <div style={{ position: 'relative', fontFamily: 'monospace', fontSize: '1.4rem', color: '#fff', lineHeight: '2' }}>
      <div><span style={{ color: '#306998' }}>def</span> <span style={{ color: '#ffd43b' }}>mi_funcion</span>(<span style={{ color: '#fb923c' }}>parametro</span>):</div>
      <div style={{ paddingLeft: '40px' }}>   <span style={{ color: '#94a3b8' }}># Bloque de código</span></div>
      <div style={{ paddingLeft: '40px' }}>   <span style={{ color: '#306998' }}>return</span> <span style={{ color: '#10b981' }}>resultado</span></div>
      
      {/* Etiquetas Flotantes */}
      <div style={{ position: 'absolute', top: '-10px', left: '0', fontSize: '0.7rem', color: '#306998' }}>PALABRA CLAVE</div>
      <div style={{ position: 'absolute', top: '-10px', left: '120px', fontSize: '0.7rem', color: '#ffd43b' }}>NOMBRE ÚNICO</div>
      <div style={{ position: 'absolute', bottom: '-10px', left: '40px', fontSize: '0.7rem', color: '#10b981' }}>SALIDA DE DATOS</div>
    </div>
    <p style={{ marginTop: '2rem', fontSize: '1.1rem', color: '#94a3b8' }}>Las funciones son "fábricas" de código: Entran datos, se procesan y sale una respuesta.</p>
  </div>
);

const BigExplanation = ({ num, title, text }) => (
  <div style={{ textAlign: 'left', margin: '2.5rem 0', borderLeft: '6px solid #ffd43b', paddingLeft: '30px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
      <span style={{ fontSize: '3.5rem', fontWeight: '900', color: '#ffffff', WebkitTextStroke: '1px #306998' }}>{num}</span>
      <h3 style={{ fontSize: '2rem', color: '#ffd43b', fontWeight: 'bold' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.4rem', color: '#ffffff', lineHeight: '1.6', fontWeight: '500' }}>{text}</p>
  </div>
);

const PythonFlowchart = () => (
  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '3rem', borderRadius: '35px', border: '2px solid #306998', margin: '3rem 0' }}>
    <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '2.5rem' }}>Lógica de <span style={{ color: '#ffd43b' }}>Flujo Python</span></h2>
    <svg width="100%" viewBox="0 0 800 450" style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#306998" />
        </marker>
      </defs>
      <rect x="325" y="10" width="150" height="50" rx="25" fill="none" stroke="#ffffff" strokeWidth="3" />
      <text x="400" y="42" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">INPUT</text>
      <line x1="400" y1="60" x2="400" y2="110" stroke="#306998" strokeWidth="4" markerEnd="url(#arrow-blue)" />
      <path d="M400 110 L550 170 L400 230 L250 170 Z" fill="none" stroke="#ffd43b" strokeWidth="4" />
      <text x="400" y="175" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">if / else</text>
      <line x1="550" y1="170" x2="650" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-blue)" />
      <text x="600" y="160" fill="#10b981" fontWeight="bold">SÍ</text>
      <rect x="650" y="145" width="120" height="50" rx="10" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="710" y="175" fill="#ffffff" textAnchor="middle" fontSize="14">print("Ok")</text>
      <line x1="250" y1="170" x2="150" y2="170" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-blue)" />
      <text x="200" y="160" fill="#ef4444" fontWeight="bold">NO</text>
      <rect x="30" y="145" width="120" height="50" rx="10" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="90" y="175" fill="#ffffff" textAnchor="middle" fontSize="14">Repetir</text>
      <line x1="400" y1="230" x2="400" y2="330" stroke="#306998" strokeWidth="4" markerEnd="url(#arrow-blue)" />
      <rect x="325" y="330" width="150" height="50" rx="25" fill="none" stroke="#ffffff" strokeWidth="3" />
      <text x="400" y="362" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">FIN</text>
    </svg>
  </div>
);

// --- LABORATORIO DE DICCIONARIOS (MANZANAS Y PERAS) ---
const DictionaryFruitLab = () => {
  const yellow = "#ffd43b";
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '40px', border: `2px solid ${yellow}`, margin: '4rem 0' }}>
      <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', marginBottom: '2rem' }}>DICCIONARIO DE <span style={{ color: yellow }}>FRUTAS</span></h2>
      <p style={{ fontSize: '1.6rem', color: '#94a3b8', marginBottom: '3rem' }}>Imagina que un diccionario es una caja con etiquetas. Buscas por nombre, no por posición.</p>
      <PythonCode 
        title="frutas_dict.py"
        code={`# 1. Crear el diccionario\ninventario = {"manzanas": 10, "peras": 5}\n\n# 2. Acceder a un valor\nprint(inventario["manzanas"])  # Salida: 10\n\n# 3. AGREGAR o ACTUALIZAR\ninventario["uvas"] = 20        # Nueva fruta\ninventario["peras"] = 15       # Cambia las que ya había\n\n# 4. ELIMINAR\ndel inventario["manzanas"]     # ¡Adiós manzanas!`} 
      />
      <div className="benefit-card" style={{ marginTop: '3rem', border: '1px dashed #ffd43b', textAlign: 'left', padding: '2rem' }}>
        <h4 style={{ color: yellow, fontSize: '1.8rem' }}>¿Cómo mostrar usuarios?</h4>
        <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>Si guardas usuarios en un diccionario, puedes ver sus nombres así:</p>
        <pre style={{ color: '#bef264', marginTop: '20px', fontSize: '1.4rem', fontWeight: 'bold' }}>
          for usuario in db_usuarios.keys():<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;print(f"Usuario detectado: {'{usuario}'}")
        </pre>
      </div>
    </div>
  );
};

// --- SECCIÓN DE GEOMETRÍA CON BUCLES ---
const ShapeLoopLab = () => {
  const blue = "#306998";
  return (
    <div style={{ margin: '4rem 0', textAlign: 'left' }}>
      <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#fff' }}>DIBUJANDO CON <span style={{ color: blue }}>BUCLES</span></h2>
      <p style={{ fontSize: '1.6rem', color: '#94a3b8', marginBottom: '3rem' }}>Python puede repetir dibujos usando el poder de las matemáticas y strings.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
        <div>
          <h4 style={{ color: blue, fontSize: '2rem', marginBottom: '1rem' }}>Cuadrado 5x5</h4>
          <PythonCode title="cuadrado.py" code={`for i in range(5):\n    print("🍎 " * 5)`} />
        </div>
        <div>
          <h4 style={{ color: '#bef264', fontSize: '2rem', marginBottom: '1rem' }}>Triángulo de Peras</h4>
          <PythonCode title="triangulo.py" code={`for i in range(1, 6):\n    print("🍐 " * i)`} />
        </div>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h4 style={{ color: '#fb923c', fontSize: '2rem', marginBottom: '1rem' }}>Rectángulo Dinámico</h4>
        <PythonCode title="rectangulo.py" code={`ancho = 10\nalto = 3\nfor i in range(alto):\n    print("🍓 " * ancho)`} />
      </div>
    </div>
  );
};

// --- EXPLICACIÓN DE LÓGICA PURA (BOOLEANOS, RETURN, NONE) ---
const PureLogicSection = () => {
  return (
    <div style={{ background: '#000', padding: '5rem', borderRadius: '50px', border: '2px solid #334155', margin: '4rem 0' }}>
      <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#fff', marginBottom: '4rem' }}>EL CEREBRO DEL <span style={{ color: '#fb923c' }}>PROGRAMADOR</span></h2>
      <div className="benefits-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="benefit-card">
          <h4 style={{ color: '#10b981', fontSize: '1.8rem' }}>BOOLEANOS</h4>
          <p style={{ fontSize: '1.2rem' }}>Solo hay dos verdades: <b>True</b> (Verdadero) o <b>False</b> (Falso). Son los cables de la lógica.</p>
        </div>
        <div className="benefit-card">
          <h4 style={{ color: '#0ea5e9', fontSize: '1.8rem' }}>RETURN vs PRINT</h4>
          <p style={{ fontSize: '1.2rem' }}><b>Print</b> solo muestra en pantalla. <b>Return</b> "escupe" el valor hacia afuera para que otra función lo use.</p>
        </div>
        <div className="benefit-card">
          <h4 style={{ color: '#94a3b8', fontSize: '1.8rem' }}>EL 'NONE'</h4>
          <p style={{ fontSize: '1.2rem' }}>Representa "Nada" o "Vacío". Si una función no tiene un <b>return</b>, Python devuelve <b>None</b> por defecto.</p>
        </div>
      </div>
      <div style={{ marginTop: '4rem', textAlign: 'left', borderTop: '1px solid #334155', paddingTop: '3rem' }}>
        <h3 style={{ color: '#ffd43b', fontSize: '2.5rem' }}>El operador += (Acumulador)</h3>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', color: '#cbd5e1' }}>
          Es un atajo de genios. <code>manzanas += 1</code> es exactamente lo mismo que decir <code>manzanas = manzanas + 1</code>. 
          Sirve para llevar cuentas de puntos, frutas o vidas.
        </p>
      </div>
    </div>
  );
};

// --- SECCIÓN DE EXCEPCIONES CON MANZANAS ---
const ExceptionAppleLab = () => {
  return (
    <section className="info-section">
      <h2 style={{ fontSize: '4rem', fontWeight: '900' }}>MANEJO DE <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ef4444, #fb923c)' }}>ERRORES</span></h2>
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p style={{ fontSize: '1.8rem', lineHeight: '1.6', color: '#94a3b8' }}>
            ¿Qué pasa si intentas quitar 10 manzanas de una canasta que solo tiene 5? 
            Python "explota" y detiene el programa. Para evitar que muera, usamos <b>try</b> y <b>except</b>.
          </p>
          <div style={{ marginTop: '3rem', fontSize: '6rem' }}>🍎 🚫 🍐</div>
        </div>
        <div style={{ flex: 1.5 }}>
          <PythonCode 
            title="seguridad_frutas.py"
            code={`manzanas = 5\n\ntry:\n    quitar = 10\n    if quitar > manzanas:\n        raise ValueError("¡No hay suficientes!")\n    manzanas -= quitar\nexcept ValueError as error:\n    print(f"ERROR: {error}")\nfinally:\n    print("Cerrando sistema de frutas...")`}
          />
        </div>
      </div>
      <div className="benefit-card" style={{ marginTop: '3rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', textAlign: 'left', padding: '2rem' }}>
        <p style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
          <b>TRY:</b> Intenta hacer el código peligroso.<br/>
          <b>EXCEPT:</b> Si algo falla, ejecútame a mí para salvar el programa.<br/>
          <b>FINALLY:</b> Se ejecuta siempre, haya error o no. Ideal para cerrar archivos.
        </p>
      </div>
    </section>
  );
};

const MethodAnatomy = ({ method, desc, example }) => (
  <div style={{ textAlign: 'left', margin: '2rem 0', background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', borderLeft: '8px solid #306998' }}>
    <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem' }}>
      <span style={{ color: '#ffd43b' }}>.</span>{method}<span style={{ color: '#306998' }}>()</span>
    </h3>
    <p style={{ fontSize: '1.4rem', color: '#cbd5e1', marginBottom: '1.5rem', fontWeight: '500' }}>{desc}</p>
    <div style={{ background: '#000', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
      <code style={{ fontSize: '1.2rem', color: '#10b981' }}>{example}</code>
    </div>
  </div>
);

const ExerciseCard = ({ id, topic, question, placeholder, answer, onSolved, isSolved }) => {
  const [input, setInput] = useState('');
  const check = () => {
    if (input.trim() === answer && !isSolved) onSolved(id);
  };

  return (
    <div className="benefit-card" style={{ border: `3px solid ${isSolved ? '#10b981' : '#ffd43b'}`, textAlign: 'left', background: isSolved ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 212, 59, 0.05)' }}>
      <span style={{ fontSize: '0.9rem', color: '#ffd43b', fontWeight: '900', letterSpacing: '1.5px' }}>{topic.toUpperCase()}</span>
      <h4 style={{ margin: '1.2rem 0', fontSize: '1.3rem', color: '#ffffff', lineHeight: '1.4' }}>{question}</h4>
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <input 
          type="text" value={isSolved ? answer : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSolved}
          placeholder={placeholder}
          style={{ background: '#000000', border: '1px solid #ffd43b', color: '#ffffff', padding: '14px', borderRadius: '10px', width: '100%', fontFamily: 'Consolas, monospace', fontSize: '1.1rem' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ background: '#ffd43b', color: '#020617', padding: '10px 25px', fontWeight: '900' }}>RUN</button>}
      </div>
    </div>
  );
};

const ProgramacionPython = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '', ans: '', t: '' });
  const [flashInput, setFlashInput] = useState('');

  const generateFlash = () => {
    const bank = [
      { q: 'x = 10', ans: 'variable', t: 'Tipo' },
      { q: 'print("Hola")', ans: 'imprimir', t: 'Acción' },
      { q: 'lista = [1, 2, 3]', ans: 'lista', t: 'Estructura' },
      { q: 'dicc = {"a": 1}', ans: 'diccionario', t: 'Estructura' },
      { q: 'for i in range(5):', ans: 'bucle', t: 'Flujo' },
      { q: 'def suma(a, b):', ans: 'funcion', t: 'Definición' },
      { q: 'tupla = (1, 2)', ans: 'tupla', t: 'Estructura' },
      { q: 'lista.append(x)', ans: 'metodo', t: 'Acción' },
      { q: 'lista.pop()', ans: 'eliminar', t: 'Acción' },
      { q: 'del dict["k"]', ans: 'borrar', t: 'Acción' },
      { q: 'len(lista)', ans: 'tamaño', t: 'Información' },
      { q: 'for f in frutas:', ans: 'bucle', t: 'Flujo' },
      { q: 'if "🍎" in lista:', ans: 'pertenencia', t: 'Lógica' }
    ];
    setFlashQuest(bank[Math.floor(Math.random() * bank.length)]);
    setFlashInput('');
  };

  useEffect(() => { generateFlash(); }, []);

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 10);
    }
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase() === flashQuest.ans) {
      setPoints(prev => prev + 5);
      generateFlash();
    }
  };

  return (
    <div className="home-container" style={{ paddingBottom: '120px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <SenseiPython expression={flashInput === 'err' ? 'sad' : 'happy'} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Python <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ffd43b, #306998)', WebkitBackgroundClip: 'text' }}>Power</span></h1>
            <p className="hero-subtitle" style={{ color: '#ffffff', fontSize: '1.5rem' }}>"Escribe menos, haz más. El lenguaje más amigable del mundo te espera para automatizar el futuro."</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '25px', padding: '20px', marginTop: '50px', border: '1px solid #ffd43b44' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffd43b', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '2px' }}>
            <span>INTELIGENCIA ALGORÍTMICA</span>
            <span>{points} XP</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #ffd43b, #306998)', transition: '1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>
      </section>

      {/* --- PROYECTO MAESTRO: SISTEMA FRUTAL --- */}
      <section className="info-section" style={{ background: 'rgba(255,255,255,0.03)', padding: '6rem', borderRadius: '60px', border: '3px solid #ffd43b', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#fff', textAlign: 'left', marginBottom: '3rem' }}>FRUTERÍA <span style={{ color: '#ffd43b' }}>MASTER_OS</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', textAlign: 'left', marginBottom: '4rem' }}>
          Este código es un sistema real. Maneja contraseñas, menús infinitos y lógica de funciones.
        </p>
        <PythonCode 
          title="fruteria_pro.py"
          code={`def menu():\n    print("\\n1. Ver Stock\\n2. Agregar\\n3. Salir")\n\ndef iniciar_sistema():\n    clave = "admin123"\n    entrada = input("Contraseña: ")\n\n    if entrada != clave:\n        print("Acceso Denegado")\n        return None\n\n    inventario = {"manzanas": 10, "peras": 5}\n    while True:\n        menu()\n        op = input("Opción: ")\n        if op == "1":\n            print(f"Stock Actual: {inventario}")\n        elif op == "2":\n            f = input("Fruta: ")\n            inventario[f] = inventario.get(f, 0) + 1\n        elif op == "3":\n            print("Saliendo...")\n            break\n    return True\n\niniciar_sistema()`} 
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '4rem', textAlign: 'left' }}>
          <div className="benefit-card">
            <h4 style={{ color: '#ffd43b', fontSize: '2rem' }}>Lógica del Menú</h4>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              Usamos <b>while True</b> para que el programa nunca se detenga. Solo el comando <b>break</b> puede romper este bucle.
            </p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#306998', fontSize: '2rem' }}>Seguridad y Retorno</h4>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              Si la clave falla, usamos <b>return None</b>. Esto detiene la función inmediatamente. Es como un botón de pánico.
            </p>
          </div>
        </div>
      </section>

      {/* --- NUEVAS SECCIONES EDUCATIVAS --- */}
      <DictionaryFruitLab />
      <ShapeLoopLab />
      <PureLogicSection />
      <ExceptionAppleLab />

      {/* --- DATA METHODS DEEP DIVE --- */}
      <section className="info-section">
        <h2 className="section-title">Dominando <span className="gradient-text">Métodos</span></h2>
        <p className="section-subtitle" style={{ fontSize: '1.5rem', color: '#fff' }}>Aprende a transformar tus datos con comandos poderosos.</p>
        
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <MethodAnatomy method="append" desc="Agrega un elemento al final de la lista." example='frutas.append("🍎")  # Resultado: [..., "🍎"]' />
          <MethodAnatomy method="pop" desc="Elimina y te entrega el último elemento de la lista." example='ultima = frutas.pop()  # Quita el final' />
          <MethodAnatomy method="remove" desc="Busca un elemento específico y lo elimina." example='frutas.remove("🍐")  # Borra la primera pera' />
          <MethodAnatomy method="keys" desc="Te da una lista con todos los nombres (claves) del diccionario." example='nombres = inventario.keys()' />
        </div>
      </section>

      {/* --- PYTHON ESSENTIALS --- */}
      <section className="info-section">
        <h2 className="section-title">Manual de <span className="gradient-text">Pythonista</span></h2>
        <div className="benefits-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="benefit-card" style={{ background: '#000', border: '2px solid #334155' }}>
            <PythonCode title="script_maestro.py" code={`# Python es legible y potente\nnombre = "Neo"\nnivel = 100\n\ndef saludar(msg):\n    if nivel > 50:\n        print(f"Master {nombre}: {msg}")\n    else:\n        print("Sigue entrenando...")\n\nsaludar("Acceso concedido")`} />
            
            <BigExplanation num="01" title="Tipado Dinámico" text="En Python no tienes que decir qué tipo de dato es. Él es inteligente y lo descubre solo. ¡Simplicidad absoluta!" />
            <BigExplanation num="02" title="La Sangría (Indentation)" text="¡Regla de Oro! En Python, los espacios al inicio mandan. Los 4 espacios indican que el código 'pertenece' al bloque anterior." />
            <BigExplanation num="03" title="Funciones con 'def'" text="Definir una tarea repetible es tan fácil como usar 'def'. Es el bloque de construcción de cualquier programa profesional." />
          </div>
        </div>

        {/* Dragón de Python - Decorativo */}
        <div className="mobile-hide" style={{ position: 'absolute', left: '5%', top: '30vh', animation: 'float 6s ease-in-out infinite' }}>
          <svg width="160" height="160" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 15px #ffd43b)' }}>
            <path d="M20 50 Q 50 10 80 50 T 20 50" fill="none" stroke="#ffd43b" strokeWidth="3" />
            <circle cx="50" cy="50" r="15" fill="#ffd43b" opacity="0.2" />
          </svg>
        </div>
      </section>

      {/* --- ADVANCED LOGIC --- */}
      <section className="info-section">
        <h2 className="section-title">Lógica <span className="gradient-text">Profunda</span></h2>
        <div className="benefits-grid">
          <div style={{ flex: 1 }}><FunctionAnatomy /></div>
          <div style={{ flex: 1 }}><LoopVisualizer /></div>
        </div>
      </section>

      <section className="info-section">
        <PythonFlowchart />
      </section>

      {/* --- DATA STRUCTURES TABLE --- */}
      <section className="info-section">
        <h2 className="section-title">Estructuras de <span className="gradient-text">Datos</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', overflow: 'hidden', border: '2px solid #306998' }}>
            <thead>
              <tr style={{ background: '#306998', color: '#ffffff' }}>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Estructura</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Sintaxis</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>¿Se puede cambiar?</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Uso Pro</th>
              </tr>
            </thead>
            <tbody style={{ color: '#ffffff', textAlign: 'center', fontSize: '1.1rem' }}>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#ffd43b' }}>LISTA</td>
                <td><code>[1, 2, 3]</code></td>
                <td style={{ color: '#10b981' }}>SÍ (Mutables)</td>
                <td>Colecciones ordenadas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#ffd43b' }}>TUPLA</td>
                <td><code>(1, 2, 3)</code></td>
                <td style={{ color: '#ef4444' }}>NO (Inmutables)</td>
                <td>Datos fijos protegidos.</td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#ffd43b' }}>DICCIONARIO</td>
                <td><code>{"{'id': 1}"}</code></td>
                <td style={{ color: '#10b981' }}>SÍ (Mutables)</td>
                <td>Bases de datos Clave-Valor.</td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#ffd43b' }}>SET</td>
                <td><code>{"{1, 2, 3}"}</code></td>
                <td style={{ color: '#10b981' }}>SÍ</td>
                <td>Valores únicos sin duplicados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- CODING LAB --- */}
      <section className="info-section">
        <h2 className="section-title">Python <span className="gradient-text">Laboratory</span></h2>
        <p className="section-subtitle" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Escribe el código exacto. ¡Python no perdona errores!</p>
        <div className="grid-container">
          <ExerciseCard 
            id="p1" topic="Variables" question="Asigna el número 25 a la variable 'edad'" 
            placeholder="edad = ..." answer="edad = 25" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p1')} 
          />
          <ExerciseCard 
            id="p2" topic="Métodos" question="Agrega 'pera' al final de la lista 'L'" 
            placeholder="L.append(...)" answer='L.append("pera")' 
            onSolved={handleSolved} isSolved={solvedIds.includes('p2')} 
          />
          <ExerciseCard 
            id="p3" topic="Diccionarios" question="Borra la clave 'manzana' del dict 'D'" 
            placeholder="del D[...]" answer='del D["manzana"]' 
            onSolved={handleSolved} isSolved={solvedIds.includes('p3')} 
          />
          <ExerciseCard 
            id="p4" topic="Lógica" question="Operador para decir 'Y' lógico" 
            placeholder="..." answer="and" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p4')} 
          />
          <ExerciseCard 
            id="p5" topic="Listas" question="Elimina el último elemento de 'L'" 
            placeholder="L.pop()" answer="L.pop()" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p5')} 
          />
          <ExerciseCard 
            id="p6" topic="Diccionarios" question="Crea un dict vacío llamado 'd'" 
            placeholder="d = ..." answer="d = {}" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p6')} 
          />
          <ExerciseCard 
            id="p7" topic="Strings" question="Obtén la longitud de la variable 's'" 
            placeholder="len(...)" answer="len(s)" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p7')} 
          />
          <ExerciseCard 
            id="p8" topic="Booleans" question="Valor booleano para 'Falso'" 
            placeholder="..." answer="False" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p8')} 
          />
          <ExerciseCard 
            id="p9" topic="Slicing" question="Obtén los primeros 3 elementos de 'lista'" 
            placeholder="lista[...]" answer="lista[:3]" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p9')} 
          />
          <ExerciseCard 
            id="p10" topic="Métodos" question="Elimina el último elemento de una lista 'L'" 
            placeholder="L.pop(...)" answer="L.pop()" 
            onSolved={handleSolved} isSolved={solvedIds.includes('p10')} 
          />
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <button className="btn-login" style={{ background: '#ffd43b', color: '#020617', padding: '15px 40px', fontSize: '1.2rem' }} onClick={() => navigate('/')}>Volver al Mainframe</button>
      </div>
    </div>
  );
};

export default ProgramacionPython;