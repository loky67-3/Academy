import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- SENSEI C++ (MASCOTA SVG) ---
const SenseiCPP = ({ expression = 'happy', size = 120 }) => {
  const color = "#f43f5e";
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 15px ${color})` }}>
      <rect x="40" y="40" width="120" height="100" rx="25" fill="rgba(15, 23, 42, 0.8)" stroke={color} strokeWidth="6" />
      <path d="M60 140 L40 180 M140 140 L160 180" stroke={color} strokeWidth="10" strokeLinecap="round" />
      <circle cx="80" cy="80" r="10" fill="white" />
      <circle cx="120" cy="80" r="10" fill="white" />
      {expression === 'happy' ? (
        <path d="M80 110 Q 100 135 120 110" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M85 115 L115 115" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      )}
      <text x="100" y="30" fill={color} fontSize="16" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '2px' }}>CORE++</text>
      <path d="M30 40 L100 5 L170 40 L100 75 Z" fill={color} opacity="0.2" />
    </svg>
  );
};

// --- BLOQUE DE CÓDIGO ESTILIZADO ---
const CPPCode = ({ title, code }) => (
  <div style={{ background: '#000000', borderRadius: '15px', border: '2px solid #f43f5e', margin: '1.5rem 0', overflow: 'hidden', textAlign: 'left', boxShadow: '0 0 20px rgba(244, 63, 94, 0.2)' }}>
    <div style={{ background: '#1e293b', padding: '6px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.8rem', color: '#f43f5e', fontWeight: 'bold', letterSpacing: '1px' }}>{title.toUpperCase()}</span>
      <div style={{ display: 'flex', gap: '5px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e', opacity: 0.5 }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
      </div>
    </div>
    <pre style={{ padding: '25px', margin: 0, color: '#ffffff', fontSize: '1.2rem', fontFamily: 'Courier New, monospace', fontWeight: 'bold', lineHeight: '1.5' }}>
      <code style={{ textShadow: '0 0 2px rgba(255,255,255,0.5)' }}>{code}</code>
    </pre>
  </div>
);

const MemoryVisual = () => (
  <div style={{ background: '#000', padding: '2rem', borderRadius: '25px', border: '2px solid #f43f5e', margin: '2rem 0' }}>
    <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Gestión de <span style={{ color: '#f43f5e' }}>Memoria (Punteros)</span></h3>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ border: '1px solid #fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: '#f43f5e' }}>Dirección: 0x7ffd</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Variable 'hp'</div>
      </div>
      <div style={{ fontSize: '3rem' }}>⬅️</div>
      <div style={{ border: '1px solid #f43f5e', padding: '15px', borderRadius: '10px', textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)' }}>
        <div style={{ fontSize: '0.7rem', color: 'red' }}>Puntero '*ptr'</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f43f5e' }}>0x7ffd</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Apunta a la dirección</div>
      </div>
    </div>
    <p style={{ marginTop: '1.5rem', color: '#fff', fontSize: '1.1rem' }}>C++ te permite tocar el hardware. Un puntero es una variable que guarda la dirección de otra variable.</p>
  </div>
);

const BigExplanation = ({ num, title, text }) => (
  <div style={{ textAlign: 'left', margin: '2rem 0', borderLeft: '5px solid #f43f5e', paddingLeft: '25px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
      <span style={{ fontSize: '3rem', fontWeight: '900', color: '#ffffff', WebkitTextStroke: '1px #f43f5e' }}>{num}</span>
      <h3 style={{ fontSize: '1.8rem', color: '#f43f5e', fontWeight: 'bold', textTransform: 'uppercase' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.3rem', color: '#ffffff', lineHeight: '1.6', fontWeight: '500' }}>{text}</p>
  </div>
);

const LogicFlowchart = () => (
  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '3rem', borderRadius: '30px', border: '2px solid #f43f5e', margin: '3rem 0' }}>
    <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '2rem' }}>Diagrama de <span style={{ color: '#f43f5e' }}>Flujo Maestro</span></h2>
    <svg width="100%" viewBox="0 0 800 400" style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="arrowhead-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
        </marker>
      </defs>
      {/* Inicio */}
      <rect x="350" y="10" width="100" height="40" rx="20" fill="none" stroke="#ffffff" strokeWidth="3" />
      <text x="400" y="35" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">START</text>
      <line x1="400" y1="50" x2="400" y2="90" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowhead-red)" />

      {/* Entrada */}
      <path d="M330 90 L490 90 L470 140 L310 140 Z" fill="none" stroke="#fb923c" strokeWidth="3" />
      <text x="400" y="120" fill="#ffffff" textAnchor="middle" fontSize="12">cin {">>"} variable;</text>
      <line x1="400" y1="140" x2="400" y2="180" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowhead-red)" />

      {/* Decisión */}
      <path d="M400 180 L500 230 L400 280 L300 230 Z" fill="none" stroke="#f43f5e" strokeWidth="3" />
      <text x="400" y="235" fill="#ffffff" textAnchor="middle" fontSize="14">¿SI / NO?</text>
      
      {/* Caminos */}
      <line x1="500" y1="230" x2="600" y2="230" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead-red)" />
      <text x="550" y="220" fill="#10b981" fontWeight="bold">SÍ</text>
      <rect x="600" y="210" width="120" height="40" rx="5" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="660" y="235" fill="#ffffff" textAnchor="middle" fontSize="12">cout {"<<"} "OK";</text>

      <line x1="300" y1="230" x2="200" y2="230" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead-red)" />
      <text x="250" y="220" fill="#ef4444" fontWeight="bold">NO</text>
      <rect x="80" y="210" width="120" height="40" rx="5" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="140" y="235" fill="#ffffff" textAnchor="middle" fontSize="12">Bucle / Repetir</text>

      {/* Fin */}
      <line x1="400" y1="280" x2="400" y2="330" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowhead-red)" />
      <rect x="350" y="330" width="100" height="40" rx="20" fill="none" stroke="#ffffff" strokeWidth="3" />
      <text x="400" y="355" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">EXIT 0</text>
    </svg>
  </div>
);

const ExerciseCard = ({ id, topic, question, placeholder, answer, onSolved, isSolved }) => {
  const [input, setInput] = useState('');
  const check = () => {
    if (input.trim().replace(/\s/g, '') === answer.replace(/\s/g, '') && !isSolved) onSolved(id);
  };

  return (
    <div className="benefit-card" style={{ border: `2px solid ${isSolved ? '#10b981' : '#f43f5e'}`, textAlign: 'left', background: isSolved ? 'rgba(16, 185, 129, 0.05)' : 'rgba(244, 63, 94, 0.05)' }}>
      <span style={{ fontSize: '0.8rem', color: '#f43f5e', fontWeight: '900', letterSpacing: '1px' }}>{topic.toUpperCase()}</span>
      <h4 style={{ margin: '1rem 0', fontSize: '1.2rem', color: '#ffffff' }}>{question}</h4>
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSolved}
          placeholder={placeholder}
          style={{ background: '#000000', border: '1px solid #f43f5e', color: '#ffffff', padding: '12px', borderRadius: '8px', width: '100%', fontFamily: 'monospace', fontSize: '1rem' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ background: '#f43f5e', padding: '10px 20px', fontWeight: 'bold' }}>COMPILAR</button>}
      </div>
    </div>
  );
};

const ProgramacionCPP = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '', ans: '', t: '' });
  const [flashInput, setFlashInput] = useState('');

  const generateFlash = () => {
    const bank = [
      { q: 'int x = 10;', ans: 'variable', t: '¿Qué es?' },
      { q: 'cout << "Hi";', ans: 'imprimir', t: 'Acción' },
      { q: 'vector<int> v;', ans: 'lista', t: 'Estructura' },
      { q: 'map<int, string> m;', ans: 'diccionario', t: 'Estructura' },
      { q: 'while(true){}', ans: 'bucle', t: 'Flujo' },
      { q: 'void function(){}', ans: 'funcion', t: 'Definición' },
      { q: '#include <iostream>', ans: 'libreria', t: 'Cabecera' },
      { q: 'std::cout << x;', ans: 'imprimir', t: 'Acción' },
      { q: 'cin >> edad;', ans: 'entrada', t: 'Acción' },
      { q: 'return 0;', ans: 'finalizar', t: 'Acción' },
      { q: 'int* p = &x;', ans: 'puntero', t: 'Memoria' },
      { q: 'bool ready = true;', ans: 'booleano', t: 'Variable' },
      { q: 'string s = "C++";', ans: 'texto', t: 'Variable' },
      { q: 'if(x == 5)', ans: 'condicional', t: 'Lógica' }
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
    <div className="home-container" style={{ paddingBottom: '100px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <SenseiCPP expression={flashInput === 'err' ? 'sad' : 'happy'} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Engine <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #f43f5e, #fb923c)', WebkitBackgroundClip: 'text' }}>C++</span></h1>
            <p className="hero-subtitle" style={{ color: '#ffffff', fontSize: '1.4rem' }}>"Dominar C++ es dominar la máquina. Menos abstracción, más poder. ¡Bienvenido al núcleo del sistema!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '15px', marginTop: '40px', border: '1px solid #f43f5e33' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '1px' }}>
            <span>COMPILACIÓN DEL CEREBRO</span>
            <span>{points} XP</span>
          </div>
          <div style={{ height: '8px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #f43f5e, #fb923c)', transition: '1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>
      </section>

      {/* --- COMPLETE PROJECT ANATOMY --- */}
      <section className="info-section">
        <h2 className="section-title">Proyecto: <span className="gradient-text">Sistema de Batalla</span></h2>
        <p className="section-subtitle" style={{ color: '#fff', fontSize: '1.3rem' }}>Analiza este código completo. Es la base de un videojuego real.</p>
        <div className="benefits-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="benefit-card" style={{ background: '#000', border: '2px solid #f43f5e' }}>
            <CPPCode title="battle_system.cpp" code={`#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int vida = 100;\n    string player = "Rex";\n\n    cout << "Jugador: " << player << endl;\n\n    if (vida > 0) {\n        cout << "¡Listo para luchar!" << endl;\n    } else {\n        cout << "Derrotado..." << endl;\n    }\n\n    return 0;\n}`} />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <BigExplanation num="01" title="Librerías" text="Con #include <iostream> activamos el cout. Con <string> podemos usar palabras largas." />
              <BigExplanation num="02" title="Namespace" text="using namespace std; nos ahorra escribir 'std::' antes de cada comando. ¡Código más limpio!" />
              <BigExplanation num="03" title="Variables" text="Creamos un 'int' para números y un 'string' para el nombre. C++ reserva espacio en RAM para ellos." />
              <BigExplanation num="04" title="Lógica If" text="Evaluamos la condición (vida > 0). Si es verdad, se ejecuta el primer bloque entre llaves { }." />
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAM SKELETON --- */}
      <section className="info-section">
        <h2 className="section-title">Esqueleto de un <span className="gradient-text">Programa</span></h2>
        <div className="benefits-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="benefit-card" style={{ background: '#000', border: '2px solid #334155' }}>
            <CPPCode title="Hola Mundo Real" code={`#include <iostream>  // 1. Cargar herramientas\nusing namespace std; // 2. Simplificar nombres\n\nint main() {         // 3. El motor de inicio\n  cout << "Hola";    // 4. Salida de datos\n  return 0;          // 5. Apagar motor\n}                    // 6. Fin de bloque`} />
            
            <BigExplanation num="01" title="Librerías (#include)" text="Es como pedir herramientas a la caja. <iostream> nos da el poder de hablar con la pantalla (cout) y escuchar el teclado (cin)." />
            <BigExplanation num="02" title="Función Main" text="Todo código de C++ vive dentro de int main(). Si no está ahí, la computadora no sabe cómo empezar a correr tu programa." />
            <BigExplanation num="03" title="Las Llaves { }" text="Son los muros de tu código. Todo lo que esté entre { y } pertenece a ese bloque. ¡Nunca las olvides!" />
            <BigExplanation num="04" title="C-OUT (Salida)" text="Se lee 'See-Out'. Usa las flechas << para empujar información hacia la pantalla." />
          </div>
        </div>
      </section>

      {/* --- FLOWCHART --- */}
      <section className="info-section">
        <LogicFlowchart />
      </section>

      {/* --- MEMORY SECTION --- */}
      <section className="info-section">
        <MemoryVisual />
      </section>

      {/* --- CORE KNOWLEDGE --- */}
      <section className="info-section">
        <h2 className="section-title">Manual de <span className="gradient-text">Ingeniería</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4 style={{ color: '#f43f5e', fontSize: '1.5rem' }}>Variables</h4>
            <CPPCode title="Memory Slots" code={`int vida = 100;\ndouble pi = 3.1416;\nchar tecla = 'A';\nstring msg = "Run";`} />
            <p style={{ fontSize: '1.1rem', color: '#ffffff' }}>En C++, cada variable tiene un tipo fijo. ¡La memoria es sagrada!</p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#fb923c', fontSize: '1.5rem' }}>Condicionales</h4>
            <CPPCode title="Decisions" code={`if (vida <= 0) {\n  cout << "Game Over";\n} else {\n  cout << "Sigue!";\n}`} />
            <p style={{ fontSize: '1.1rem', color: '#ffffff' }}>Controla el destino de tu programa con bifurcaciones lógicas.</p>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#10b981', fontSize: '1.5rem' }}>Funciones</h4>
            <CPPCode title="Sub-Routines" code={`void disparar() {\n  cout << "¡Pum!";\n}\n\n// Llamada:\ndisparar();`} />
            <p style={{ fontSize: '1.1rem', color: '#ffffff' }}>Encapsula lógica para no repetir código. ¡Orden ante todo!</p>
          </div>
        </div>
      </section>

      {/* --- DATA STRUCTURES --- */}
      <section className="info-section" style={{ background: 'rgba(244, 63, 94, 0.03)', padding: '4rem 0' }}>
        <h2 className="section-title">Estructuras <span className="gradient-text">STL</span></h2>
        <div className="certificate-section" style={{ gap: '30px', background: 'none' }}>
          <div className="benefit-card" style={{ flex: 1 }}>
            <h3 style={{ color: '#f43f5e', marginBottom: '1rem', fontSize: '1.8rem' }}>std::vector (Listas)</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Es un arreglo dinámico. Puede crecer mientras el programa corre.</p>
            <CPPCode title="Vector" code={`vector<string> items;\nitems.push_back("Espada");\nitems.push_back("Escudo");\ncout << items[0]; // Espada`} />
          </div>
          <div className="benefit-card" style={{ flex: 1 }}>
            <h3 style={{ color: '#fb923c', marginBottom: '1rem', fontSize: '1.8rem' }}>std::map (Diccionarios)</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Pares de Clave-Valor. Como una base de datos pequeña en memoria.</p>
            <CPPCode title="Map" code={`map<string, int> stats;\nstats["fuerza"] = 100;\nstats["magia"] = 50;\ncout << stats["fuerza"]; // 100`} />
          </div>
        </div>
      </section>

      {/* --- FLASH CHALLENGE --- */}
      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #f43f5e', background: 'rgba(244, 63, 94, 0.05)', textAlign: 'center', padding: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚡ Compiler Flash</h2>
          <p style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1.2rem' }}>{flashQuest.t}: <code style={{ color: '#f43f5e', fontSize: '1.4rem' }}>{flashQuest.q}</code></p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <input 
              type="text" value={flashInput}
              onChange={(e) => setFlashInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
              placeholder="¿Qué es?"
              style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #f43f5e', color: 'white', padding: '12px', borderRadius: '10px', width: '180px', textAlign: 'center' }}
            />
            <button onClick={checkFlash} className="btn-login" style={{ background: '#f43f5e', color: 'white' }}>VERIFICAR</button>
          </div>
        </div>

        {/* Centauro de Bajo Nivel - Decorativo */}
        <div className="mobile-hide" style={{ position: 'absolute', right: '5%', bottom: '20%', animation: 'float 7s ease-in-out infinite' }}>
          <svg width="150" height="150" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 10px #f43f5e)' }}>
            <rect x="30" y="40" width="40" height="40" fill="#f43f5e" opacity="0.3" />
            <path d="M10 10 L90 90 M90 10 L10 90" stroke="#f43f5e" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* --- CODING LAB --- */}
      <section className="info-section">
        <h2 className="section-title">Logic <span className="gradient-text">Laboratory</span></h2>
        <p className="section-subtitle">Escribe el código exacto para que el compilador no explote.</p>
        <div className="grid-container">
          <ExerciseCard 
            id="c1" topic="Variables" question="Crea un entero 'hp' con valor 100 (incluye ;)" 
            placeholder="int ..." answer="int hp = 100;" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c1')} 
          />
          <ExerciseCard 
            id="c2" topic="Output" question="Imprime 'Hi' en pantalla (solo el comando completo)" 
            placeholder="cout << ..." answer='cout << "Hi";' 
            onSolved={handleSolved} isSolved={solvedIds.includes('c2')} 
          />
          <ExerciseCard 
            id="c3" topic="Estructura" question="¿Cómo se llama la función principal?" 
            placeholder="..." answer="main" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c3')} 
          />
          <ExerciseCard 
            id="c4" topic="Librería" question="Directiva para incluir entrada/salida" 
            placeholder="#include <...>" answer="#include <iostream>" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c4')} 
          />
          <ExerciseCard 
            id="c5" topic="Input" question="Comando para recibir datos del usuario" 
            placeholder="cin >> ..." answer="cin >> variable;" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c5')} 
          />
          <ExerciseCard 
            id="c6" topic="Bucles" question="Bucle FOR para contar de 0 a 4 (encabezado)" 
            placeholder="for(int i=0; ...)" answer="for(int i=0; i<5; i++)" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c6')} 
          />
          <ExerciseCard 
            id="c7" topic="Memoria" question="Símbolo para obtener la dirección de una variable" 
            placeholder="&..." answer="&" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c7')} 
          />
          <ExerciseCard 
            id="c8" topic="Lógica" question="Operador para comparar si dos valores son IGUALES" 
            placeholder="..." answer="==" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c8')} 
          />
          <ExerciseCard 
            id="c9" topic="Tipos" question="Tipo de dato para un solo caracter (ej: 'A')" 
            placeholder="..." answer="char" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c9')} 
          />
          <ExerciseCard 
            id="c10" topic="Final" question="Instrucción para terminar main con éxito" 
            placeholder="return ..." answer="return 0;" 
            onSolved={handleSolved} isSolved={solvedIds.includes('c10')} 
          />
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button className="btn-login" style={{ background: '#f43f5e', color: 'white' }} onClick={() => navigate('/')}>Volver al Mainframe</button>
      </div>
    </div>
  );
};

export default ProgramacionCPP;