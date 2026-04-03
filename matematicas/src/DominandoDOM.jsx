import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- COMPONENTE CERTIFICADO MODAL ---
const CertificateModal = ({ isOpen, onClose, userName = "Estudiante Estrella" }) => {
  if (!isOpen) return null;

  const downloadCertificate = () => {
    window.print(); // Método sencillo para que el usuario pueda guardarlo como PDF
  };

  return (
    <div className="mega-menu-overlay" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div id="certificate-print-area" style={{ 
        background: '#020617', 
        width: '100%', 
        maxWidth: '900px', 
        aspectRatio: '1.414/1', // Formato A4 Horizontal
        border: '10px solid #bef264', 
        borderRadius: '20px', 
        position: 'relative', 
        padding: '60px',
        boxShadow: '0 0 50px rgba(190, 242, 100, 0.3)',
        overflow: 'hidden',
        color: 'white',
        textAlign: 'center',
        borderImage: 'linear-gradient(45deg, #bef264, #fbbf24) 1'
      }}>
        {/* Fondo decorativo con rejilla neón */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(190, 242, 100, 0.1) 1px, transparent 0)', backgroundSize: '24px 24px', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ color: '#bef264', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '20px' }}>Certificado de Maestría Técnica</h4>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '20px 0', textShadow: '0 0 20px #bef264' }}>DIPLOMA</h1>
          
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Otorgado con honores a:</p>
          <h2 style={{ fontSize: '3rem', fontFamily: 'serif', fontStyle: 'italic', margin: '20px 0', borderBottom: '2px solid rgba(255,255,255,0.1)', display: 'inline-block', paddingBottom: '10px' }}>{userName}</h2>
          
          <p style={{ maxWidth: '600px', margin: '30px auto', lineHeight: '1.8', fontSize: '1.1rem' }}>
            Por haber dominado con éxito el <strong>Curso de Matemáticas Básicas y Manipulación del DOM</strong>. 
            Demostrando habilidades excepcionales en lógica computacional, estructuras de datos y desarrollo web interactivo.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '50px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ width: '150px', height: '1px', background: 'white', marginBottom: '10px' }}></div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>DIRECTOR ACADÉMICO</p>
              <p style={{ color: '#bef264', fontWeight: 'bold' }}>EDUNEON Academy</p>
            </div>

            {/* QR CODE DINÁMICO */}
            <div style={{ background: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="black">
                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm10 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-2h2v2h-2v-2zm0-4h2v2h-2v-2zm2 0h2v2h-2v-2zm-4-2h2v2h-2v-2zm2 4h2v2h-2v-2z" />
              </svg>
              <p style={{ color: 'black', fontSize: '0.5rem', fontWeight: 'bold', marginTop: '5px' }}>VERIFICAR<br/>CURSO</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ width: '150px', height: '1px', background: 'white', marginBottom: '10px' }}></div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>FECHA DE EMISIÓN</p>
              <p style={{ color: 'white' }}>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Sello de agua / Decoración lateral */}
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.1 }}>
          <svg width="200" height="200" viewBox="0 0 24 24" fill="#bef264">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={downloadCertificate} 
          className="btn-login" 
          style={{ background: '#bef264', color: '#020617', padding: '15px 40px', fontSize: '1.1rem' }}
        >
          Descargar Certificado (PDF)
        </button>
        <button 
          onClick={onClose} 
          className="btn-card" 
          style={{ border: '1px solid white', color: 'white' }}
        >
          Cerrar
        </button>
      </div>

      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        ¡Felicidades! Comparte este logro con tus amigos para que ellos también dominen el mundo digital.
      </p>
    </div>
  );
};

// --- ICONOS SVG PRO ---
const DomIcon = ({ type, color = "#bef264" }) => {
  const icons = {
    create: <path d="M12 5v14M5 12h14" />,
    "delete": <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
    click: <path d="m5 14 7-3 7 3-7 3-7-3zm7-10v4m0 12v4M5 7l3 2m8 0 3-2M5 17l3-2m8 0 3 2" />,
    form: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8" />,
    window: <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></React.Fragment>,
    clock: <React.Fragment><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></React.Fragment>
  };
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      {icons[type]}
    </svg>
  );
};

// --- PROYECTO: CALCULADORA NEON (Funcional) ---
const NeonCalculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (val) => setDisplay(prev => prev + val);
  const clear = () => { setDisplay(''); setResult(''); };
  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const res = eval(display);
      setResult(res.toString());
    } catch {
      setResult('Error');
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

  return (
    <div style={{ background: '#020617', padding: '20px', borderRadius: '20px', border: '2px solid #bef264', width: '280px', boxShadow: '0 0 25px rgba(190, 242, 100, 0.2)' }}>
      <div style={{ background: '#1e293b', padding: '15px', borderRadius: '10px', marginBottom: '15px', textAlign: 'right', minHeight: '70px' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.8rem', overflow: 'hidden' }}>{display || '0'}</div>
        <div style={{ color: '#bef264', fontSize: '1.6rem', fontWeight: 'bold' }}>{result || '...'}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        <button onClick={clear} style={{ gridColumn: 'span 4', padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>C</button>
        {buttons.map(btn => (
          <button 
            key={btn} 
            onClick={() => btn === '=' ? calculate() : handleClick(btn)}
            style={{ padding: '15px', background: btn === '=' ? '#bef264' : '#1e293b', color: btn === '=' ? '#020617' : 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- PROYECTO: RELOJ EN VIVO (Lógica de Tiempo) ---
const LiveClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: '#020617', padding: '20px', borderRadius: '20px', border: '2px solid #0ea5e9', textAlign: 'center', boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)' }}>
      <h4 style={{ color: '#0ea5e9', marginBottom: '10px' }}>DOM + setInterval()</h4>
      <div style={{ fontSize: '3rem', fontWeight: '900', color: 'white', fontFamily: 'monospace', textShadow: '0 0 10px #0ea5e9' }}>
        {time}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>Actualizando el nodo de texto cada 1000ms</p>
    </div>
  );
};

// --- PROYECTO: VISUALIZADOR DE ARRAYS (Listas) ---
const ArrayVisualizer = () => {
  const [list, setList] = useState(['🍎', '🍌', '🥝']);

  const pushItem = () => setList([...list, '🍍']);
  const popItem = () => setList(list.slice(0, -1));
  const shiftItem = () => setList(list.slice(1));
  const unshiftItem = () => setList(['🍓', ...list]);

  return (
    <div style={{ background: '#020617', padding: '20px', borderRadius: '20px', border: '2px solid #a855f7', width: '100%' }}>
      <h4 style={{ color: '#a855f7', marginBottom: '15px' }}>Manipulación de Listas (Arrays)</h4>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', minHeight: '60px', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
        {list.map((item, i) => (
          <div key={i} style={{ fontSize: '2rem', animation: 'popIn 0.3s ease' }}>{item}</div>
        ))}
        {list.length === 0 && <span style={{ color: '#475569' }}>Lista vacía</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button onClick={pushItem} className="btn-login" style={{ background: '#a855f7', fontSize: '0.7rem' }}>.push('🍍')</button>
        <button onClick={popItem} className="btn-login" style={{ background: '#ef4444', fontSize: '0.7rem' }}>.pop()</button>
        <button onClick={unshiftItem} className="btn-login" style={{ background: '#10b981', fontSize: '0.7rem' }}>.unshift('🍓')</button>
        <button onClick={shiftItem} className="btn-login" style={{ background: '#f59e0b', fontSize: '0.7rem' }}>.shift()</button>
      </div>
      <div style={{ marginTop: '15px', padding: '10px', background: '#1e293b', borderRadius: '8px' }}>
        <code style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
          const lista = [{list.map(i => `"${i}"`).join(', ')}];
        </code>
      </div>
    </div>
  );
};

// --- RETO DE LÓGICA: COMPLETAR CÓDIGO ---
const LogicChallenge = ({ id, task, codeSnippet, answer, onSolved, isSolved }) => {
  const [input, setInput] = useState('');

  const check = () => {
    if (input.trim() === answer) {
      onSolved(id);
    }
  };

  return (
    <div className="benefit-card" style={{ textAlign: 'left', borderLeft: `4px solid ${isSolved ? '#10b981' : '#fbbf24'}` }}>
      <h4 style={{ color: '#bef264', marginBottom: '10px' }}>Reto: {task}</h4>
      <div style={{ background: '#020617', padding: '15px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6' }}>
        {codeSnippet.split('___').map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < codeSnippet.split('___').length - 1 && (
              <input 
                type="text" 
                value={isSolved ? answer : input} 
                onChange={(e) => setInput(e.target.value)}
                disabled={isSolved}
                style={{ background: '#1e293b', border: '1px solid #bef264', color: '#bef264', width: '130px', padding: '2px 5px', borderRadius: '4px', outline: 'none', margin: '0 5px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {!isSolved && <button onClick={check} className="btn-card" style={{ marginTop: '15px', padding: '8px 15px' }}>Verificar Lógica</button>}
    </div>
  );
};

const DominandoDOM = () => {
  const navigate = useNavigate();
  const [solvedIds, setSolvedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [items, setItems] = useState(['Aprender querySelector', 'Dominar Eventos']);
  const [points, setPoints] = useState(0);

  const challenges = [
    { 
      id: 'L1', 
      task: 'Seleccionar el botón por su ID', 
      codeSnippet: 'const $btn = document.___("miBoton");', 
      answer: 'getElementById' 
    },
    { 
      id: 'L2', 
      task: 'Cambiar el color de fondo con JS', 
      codeSnippet: 'elemento.style.___ = "red";', 
      answer: 'backgroundColor' 
    },
    { 
      id: 'L3', 
      task: 'Escuchar el envío de un formulario', 
      codeSnippet: '$form.___("submit", (e) => { e.preventDefault(); });', 
      answer: 'addEventListener' 
    },
    { 
      id: 'L4', 
      task: 'Crear un nuevo párrafo', 
      codeSnippet: 'const $p = document.___("p");', 
      answer: 'createElement' 
    }
    ,
    { 
      id: 'L5', 
      task: 'Seleccionar todos los elementos con clase "item"', 
      codeSnippet: 'const $lista = document.___(".item");', 
      answer: 'querySelectorAll' 
    },
    { 
      id: 'L6', 
      task: 'Alternar una clase (Prender/Apagar)', 
      codeSnippet: 'elemento.classList.___("dark-mode");', 
      answer: 'toggle' 
    },
    { 
      id: 'L7', 
      task: 'Obtener el valor de un atributo "src"', 
      codeSnippet: 'const imagen = $img.___("src");', 
      answer: 'getAttribute' 
    },
    { 
      id: 'L8', 
      task: 'Ir al elemento padre', 
      codeSnippet: 'const $padre = $hijo.___;', 
      answer: 'parentElement' 
    }
    ,
    { 
      id: 'L9', 
      task: 'Eliminar el ÚLTIMO elemento de una lista', 
      codeSnippet: 'miLista.___();', 
      answer: 'pop' 
    },
    { 
      id: 'L10', 
      task: 'Ejecutar código cada segundo', 
      codeSnippet: '___(() => { ... }, 1000);', 
      answer: 'setInterval' 
    },
    { 
      id: 'L11', 
      task: 'Seleccionar por Nombre de Clase', 
      codeSnippet: 'document.___("contenedor");', 
      answer: 'getElementsByClassName' 
    }
  ];

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      const newSolvedCount = solvedIds.length + 1;
      setPoints((newSolvedCount / challenges.length) * 100);
    }
  };

  const addItem = () => setItems([...items, `Nuevo Elemento ${items.length + 1}`]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
    <div className="home-container" style={{ paddingBottom: '80px' }}>
      <Navbar />

      {/* MODAL DEL CERTIFICADO */}
      <CertificateModal isOpen={showCertificate} onClose={() => setShowCertificate(false)} />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '5rem' }}>🧙‍♂️</div>
            <div style={{ position: 'absolute', top: -10, right: -10, background: '#bef264', borderRadius: '50%', padding: '8px', color: '#020617', fontWeight: 'bold' }}>DOM</div>
          </div>
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Maestría del <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #bef264, #fbbf24)', WebkitBackgroundClip: 'text' }}>DOM</span></h1>
            <p className="hero-subtitle">Conviértete en un arquitecto web. Aprende a crear, modificar y destruir elementos en tiempo real.</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#bef264', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
            <span>DOM XP: {Math.round(points)} / 100</span>
            <span>{Math.round(points)}%</span>
          </div>
          <div style={{ height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.round(points)}%`, height: '100%', background: '#bef264', transition: '0.8s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 0 10px #bef264' }}></div>
          </div>
          
          {/* BOTÓN DE DESBLOQUEO */}
          {Math.round(points) >= 100 && (
            <button 
              onClick={() => setShowCertificate(true)}
              className="btn-login" 
              style={{ marginTop: '20px', width: '100%', background: 'linear-gradient(90deg, #bef264, #fbbf24)', color: '#020617', animation: 'pulse 2s infinite' }}
            >
              🏆 ¡RECLAMAR MI CERTIFICADO AHORA! 🏆
            </button>
          )}
        </div>
      </section>

      {/* MÉTODOS QUE DEBES MEMORIZAR (LA BIBLIA DEL DOM) */}
      <section className="info-section">
        <h2 className="section-title">Métodos de <span className="gradient-text">Supervivencia</span></h2>
        <p className="section-subtitle">Estas son las herramientas que usarás el 99% del tiempo.</p>
        <div style={{ overflowX: 'auto', marginTop: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
            <thead>
              <tr style={{ background: 'rgba(190, 242, 100, 0.2)', color: '#bef264' }}>
                <th style={{ padding: '15px' }}>Acción</th>
                <th style={{ padding: '15px' }}>Método / Propiedad</th>
                <th style={{ padding: '15px' }}>Para qué sirve</th>
              </tr>
            </thead>
            <tbody style={{ color: 'white' }}>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎯 Seleccionar</td>
                <td><code>querySelector('.clase')</code></td>
                <td>Busca un elemento como lo haces en CSS.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎯 Por ID antiguo</td>
                <td><code>getElementById('id')</code></td>
                <td>El más rápido para buscar un ID único.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎯 Por Clase</td>
                <td><code>getElementsByClassName('clase')</code></td>
                <td>Devuelve una colección viva de elementos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎯 Seleccionar Muchos</td>
                <td><code>querySelectorAll('.items')</code></td>
                <td>Devuelve una lista de todos los que coincidan.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>✍️ Modificar Texto</td>
                <td><code>textContent</code></td>
                <td>Cambia el texto de forma segura (ignora HTML).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎨 Estilos / Clases</td>
                <td><code>classList.add('active')</code></td>
                <td>Añade una clase CSS dinámicamente.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🎨 Alternar Estado</td>
                <td><code>classList.toggle('off')</code></td>
                <td>Si la clase está, la quita; si no está, la pone.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>➕ Crear Vida</td>
                <td><code>createElement('div')</code></td>
                <td>Crea una etiqueta nueva en la memoria.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td>🔗 Atributos</td>
                <td><code>setAttribute('id', 'valor')</code></td>
                <td>Cambia cualquier atributo (src, href, id).</td>
              </tr>
              <tr>
                <td>🗑️ Eliminar</td>
                <td><code>remove()</code></td>
                <td>Borra el elemento del documento para siempre.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TABLA DE ARRAYS (LISTAS) */}
      <section className="info-section">
        <h2 className="section-title">Métodos de <span className="gradient-text">Listas (Arrays)</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
            <thead>
              <tr style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                <th style={{ padding: '15px' }}>Método</th>
                <th style={{ padding: '15px' }}>Acción</th>
                <th style={{ padding: '15px' }}>Ubicación</th>
              </tr>
            </thead>
            <tbody style={{ color: 'white' }}>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td><code>push(item)</code></td>
                <td>Añade un elemento</td>
                <td>Al FINAL 🏁</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td><code>pop()</code></td>
                <td>Elimina el último</td>
                <td>Al FINAL 🏁</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td><code>unshift(item)</code></td>
                <td>Añade un elemento</td>
                <td>Al INICIO 🏠</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td><code>shift()</code></td>
                <td>Elimina el primero</td>
                <td>Al INICIO 🏠</td>
              </tr>
              <tr>
                <td><code>splice(index, 1)</code></td>
                <td>Corta o elimina</td>
                <td>Cualquier posición ✂️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* EXPLICACIÓN TÉCNICA CLAVE */}
      <section className="info-section">
        <h2 className="section-title">La Batalla: <span className="gradient-text">textContent vs innerHTML</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card" style={{ textAlign: 'left', border: '1px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8' }}>textContent</h4>
            <p style={{ fontSize: '0.85rem' }}><strong>Seguridad Total:</strong> Solo inserta texto plano. Si pones <code>&lt;b&gt;Hola&lt;/b&gt;</code>, el usuario verá las etiquetas escritas. Úsalo para nombres de usuario o datos externos.</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left', border: '1px solid #f43f5e' }}>
            <h4 style={{ color: '#f43f5e' }}>innerHTML</h4>
            <p style={{ fontSize: '0.85rem' }}><strong>Poder Peligroso:</strong> Renderiza HTML real. Si pones <code>&lt;b&gt;Hola&lt;/b&gt;</code>, el usuario verá la palabra en **negrita**. ¡Cuidado con ataques XSS!</p>
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN (TRAVERSING) */}
      <section className="info-section">
        <h2 className="section-title">Navegando el Árbol <span className="gradient-text">(Traversing)</span></h2>
        <div className="benefit-card" style={{ background: 'rgba(0,0,0,0.3)', textAlign: 'left' }}>
          <p style={{ marginBottom: '15px', color: '#94a3b8' }}>A veces no tienes un ID, pero sabes que el elemento está "al lado" o "arriba" de otro:</p>
          <code style={{ color: '#bef264', display: 'block', lineHeight: '1.8' }}>
            const $papa = $hijo.<strong>parentElement</strong>; // Sube un nivel <br/>
            const $hermano = $este.<strong>nextElementSibling</strong>; // El siguiente vecino <br/>
            const $primerHijo = $papa.<strong>children[0]</strong>; // El primer hijo real
          </code>
        </div>
      </section>

      {/* SECCIÓN DE TIEMPO Y LISTAS INTERACTIVAS */}
      <section className="info-section">
        <h2 className="section-title">Lógica Dinámica <span className="gradient-text">Pro</span></h2>
        <div className="benefits-grid">
          <div style={{ flex: 1 }}>
            <LiveClock />
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '15px', textAlign: 'left' }}>El <strong>reloj</strong> usa <code>setInterval</code> para ejecutar una función de actualización cada 1000 milisegundos.</p>
          </div>
          <div style={{ flex: 1 }}>
            <ArrayVisualizer />
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '15px', textAlign: 'left' }}>Los <strong>Arrays</strong> son el alma de las listas en el DOM. Dominar <code>push</code> y <code>pop</code> es vital para carritos de compra y galerías.</p>
          </div>
        </div>
      </section>

      {/* PROYECTO CALCULADORA */}
      <section className="info-section">
        <h2 className="section-title">Proyecto: <span className="gradient-text">Calculadora de Eventos</span></h2>
        <div className="certificate-section" style={{ gap: '50px', background: 'rgba(15, 23, 42, 0.5)', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <NeonCalculator />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h3 style={{ color: '#bef264', marginBottom: '1.5rem' }}>¿Cómo funciona el DOM aquí?</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '1.1rem' }}>
              1. <strong>Escucha:</strong> Cada botón tiene un <code>onClick</code> que detecta el dedo del usuario.<br/>
              2. <strong>Modifica:</strong> Usamos el estado para actualizar el <code>textContent</code> de la pantalla.<br/>
              3. <strong>Calcula:</strong> Al presionar "=", JavaScript procesa la cadena y muestra el resultado final.
            </p>
            <div style={{ background: '#020617', padding: '15px', borderRadius: '10px', marginTop: '20px', border: '1px solid #1e293b' }}>
               <code style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                 // Capturando el valor:<br/>
                 const val = e.target.textContent;
               </code>
            </div>
          </div>
        </div>
      </section>

      {/* RETOS DE LÓGICA INCOMPLETOS */}
      <section className="info-section">
        <h2 className="section-title">Laboratorio de <span className="gradient-text">Código Vivo</span></h2>
        <p className="section-subtitle">Completa los espacios en blanco para dominar la sintaxis real.</p>
        <div className="grid-container">
          {challenges.map(c => (
            <LogicChallenge 
              key={c.id} 
              {...c} 
              onSolved={handleSolved} 
              isSolved={solvedIds.includes(c.id)} 
            />
          ))}
        </div>
      </section>

      {/* DEMOS INTERACTIVAS (ELIMINAR / AGREGAR / FORM / POPUP) */}
      <section className="info-section">
        <h2 className="section-title">El Campo de <span className="gradient-text">Batalla Real</span></h2>
        <div className="benefits-grid">
          
          {/* Lista Dinámica */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <DomIcon type="create" />
            <h4 style={{ margin: '15px 0' }}>Listas Dinámicas</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>Usa <code>appendChild</code> y <code>remove</code> para gestionar datos.</p>
            <div style={{ maxHeight: '120px', overflowY: 'auto', marginBottom: '15px', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontSize: '0.8rem' }}>{item}</span>
                  <button onClick={() => removeItem(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✖</button>
                </div>
              ))}
            </div>
            <button onClick={addItem} className="btn-login" style={{ width: '100%', padding: '8px', fontSize: '0.8rem', background: '#bef264', color: '#020617' }}>Añadir Nodo</button>
          </div>

          {/* Formulario */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <DomIcon type="form" color="#38bdf8" />
            <h4 style={{ margin: '15px 0' }}>Validación de Formularios</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>Captura el <code>value</code> de los inputs antes de enviar.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('¡DOM validado!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="Escribe algo..." required style={{ background: '#020617', border: '1px solid #38bdf8', color: 'white', padding: '8px', borderRadius: '5px' }} />
              <button className="btn-login" style={{ background: '#38bdf8', color: '#020617', padding: '8px' }}>Enviar Datos</button>
            </form>
          </div>

          {/* Ventanas Emergentes */}
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <DomIcon type="window" color="#fbbf24" />
            <h4 style={{ margin: '15px 0' }}>Modales (Popups)</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>Manipula la propiedad <code>display</code> o <code>opacity</code>.</p>
            <button onClick={() => setShowModal(true)} className="btn-login" style={{ width: '100%', background: '#fbbf24', color: '#020617', padding: '8px' }}>Abrir Modal</button>
            
            {showModal && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '2px solid #fbbf24', textAlign: 'center' }}>
                  <h3 style={{ color: 'white' }}>¡Ventana del DOM!</h3>
                  <p style={{ margin: '15px 0', color: '#94a3b8' }}>Estás viendo un elemento creado condicionalmente.</p>
                  <button onClick={() => setShowModal(false)} className="btn-card">Cerrar Nodo</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* PLAYGROUND FINAL */}
      <section className="info-section">
        <h2 className="section-title">Tu <span className="gradient-text">Patio de Juegos</span></h2>
        <p className="section-subtitle">Escribe tu propio HTML y mira cómo el DOM lo renderiza.</p>
        <div className="benefit-card" style={{ padding: '20px', border: '1px dashed #bef264' }}>
          <textarea 
            defaultValue="<h1>Soy un título dinámico</h1><p>Edítame...</p>" 
            onChange={(e) => document.getElementById('preview-box').innerHTML = e.target.value}
            style={{ width: '100%', height: '100px', background: '#020617', color: '#bef264', border: '1px solid #1e293b', borderRadius: '10px', padding: '15px', fontFamily: 'monospace' }}
          />
          <div id="preview-box" style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '10px', color: '#020617', minHeight: '100px' }}>
            <h1>Soy un título dinámico</h1><p>Edítame...</p>
          </div>
        </div>
      </section>

      {/* BOTÓN PARA EL DUEÑO (DEMO) */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button 
          onClick={() => setShowCertificate(true)} 
          style={{ background: 'transparent', border: '1px dashed #bef264', color: '#bef264', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem' }}>
          [ADMIN] Ver Certificado Demo Gratis
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-login" style={{ background: '#bef264', color: '#020617' }} onClick={() => navigate('/')}>Volver al Cuartel General</button>
      </div>
    </div>
  );
};

export default DominandoDOM;