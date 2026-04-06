import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- TUTOR: CYBER-DUO (RED EDITION) ---
const CyberDuo = ({ expression = 'happy', size = 160 }) => {
  const red = "#ef4444";
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 20px ${red}66)` }}>
      <circle cx="100" cy="100" r="80" fill="rgba(15, 23, 42, 0.95)" stroke={red} strokeWidth="6" />
      {/* Ojos estilo Duo pero robóticos */}
      <circle cx="70" cy="85" r="20" fill="white" />
      <circle cx="130" cy="85" r="20" fill="white" />
      <circle cx="70" cy="85" r="8" fill="#000" />
      <circle cx="130" cy="85" r="8" fill="#000" />
      {/* Pico/Boca */}
      {expression === 'happy' ? (
        <path d="M85 130 Q 100 155 115 130" stroke={red} strokeWidth="6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M85 140 L115 140" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      )}
      {/* Antenas de Hardware */}
      <path d="M60 30 L80 50 M140 30 L120 50" stroke={red} strokeWidth="4" />
      <text x="100" y="30" fill="white" fontSize="12" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '3px' }}>C-OS 1.0</text>
    </svg>
  );
};

// --- COMPARATIVA DE VARIABLES ---
const VariableComparison = () => {
  const red = "#ef4444";
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: `1px solid ${red}44`, margin: '4rem 0' }}>
      <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: '900' }}>¿LET O VAR? <span style={{ color: red }}>¡AQUÍ NO!</span></h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: '#000', padding: '25px', borderRadius: '20px', border: '1px solid #334155' }}>
          <h4 style={{ color: '#0ea5e9', marginBottom: '15px' }}>En JavaScript / Python</h4>
          <code style={{ color: '#94a3b8', fontSize: '1.1rem' }}>let x = 10;<br/>x = "Hola"; // OK</code>
          <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>El lenguaje es flexible pero consume más RAM porque no sabe qué es 'x'.</p>
        </div>
        <div style={{ background: '#000', padding: '25px', borderRadius: '20px', border: `1px solid ${red}` }}>
          <h4 style={{ color: red, marginBottom: '15px' }}>En C (Tipado Estricto)</h4>
          <code style={{ color: '#fff', fontSize: '1.1rem' }}>int x = 10;<br/>x = "Hola"; // ERROR CRÍTICO</code>
          <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>Debes reservar el espacio exacto. Esto hace que C sea el más rápido.</p>
        </div>
      </div>
    </div>
  );
};

// --- SECCIÓN DE ESTRUCTURAS DE DATOS ---
const DataStructuresC = () => {
  const red = "#ef4444";
  return (
    <div style={{ margin: '4rem 0' }}>
      <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', textAlign: 'left', marginBottom: '3rem' }}>ORGANIZANDO <span style={{ color: red }}>DATOS</span></h2>
      <div className="benefits-grid">
        <div className="benefit-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: red }}>ARRAYS (Listas)</h4>
          <p>Colecciones del mismo tipo con tamaño fijo en memoria.</p>
          <pre style={{ color: '#bef264', fontSize: '0.9rem', marginTop: '10px' }}>int notas[5] = {'{10, 9, 8, 10, 7}'};</pre>
        </div>
        <div className="benefit-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: red }}>STRUCTS (Tuplas/Objetos)</h4>
          <p>Para agrupar datos de distintos tipos en una sola entidad.</p>
          <pre style={{ color: '#bef264', fontSize: '0.9rem', marginTop: '10px' }}>struct Usuario {'{ int id; char nick[20]; }'};</pre>
        </div>
        <div className="benefit-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: red }}>ENUMS (Diccionarios)</h4>
          <p>Asigna nombres legibles a números constantes.</p>
          <pre style={{ color: '#bef264', fontSize: '0.9rem', marginTop: '10px' }}>enum Estado {'{ OFF, ON, ERROR }'};</pre>
        </div>
      </div>
    </div>
  );
};

// --- EXPLICACIÓN DE OPERADORES BITWISE ---
const OperatorLab = () => {
  const red = "#ef4444";
  return (
    <div style={{ background: '#000', padding: '4rem', borderRadius: '40px', border: `2px solid #334155`, margin: '4rem 0' }}>
      <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>EL LABORATORIO DE <span style={{ color: red }}>BITS</span></h3>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h4 style={{ color: red, fontSize: '1.5rem' }}>Operador {"<<"} y {">>"}</h4>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6' }}>
            En C, estos no son para imprimir (como en C++). Son para <b>desplazar bits</b>. 
            Mover un bit a la izquierda ({"<<"}) es lo mismo que multiplicar por 2 de forma ultrarrápida.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
            <code style={{ color: '#fff' }}>5 {"<<"} 1 = 10; // 0101 se vuelve 1010</code>
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h4 style={{ color: red, fontSize: '1.5rem' }}>Operador & y *</h4>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6' }}>
            <b>& (Dirección):</b> "¿Dónde vives?".<br/>
            <b>* (Puntero):</b> "Ve a esa dirección y tráeme el valor".
          </p>
        </div>
      </div>
    </div>
  );
};

// --- SECCIÓN DE ESTADÍSTICAS DEL LENGUAJE ---
const CStatsSection = () => {
  const red = "#ef4444";
  return (
    <section className="info-section" style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(239, 68, 68, 0.03)', padding: '4rem', borderRadius: '40px', border: '1px solid #ef444433', margin: '4rem 0' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" 
          alt="Hardware Circuit" 
          style={{ width: '100%', borderRadius: '25px', border: `3px solid ${red}`, boxShadow: `0 0 30px ${red}44` }} 
        />
      </div>
      <div style={{ flex: 1.5, textAlign: 'left' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', marginBottom: '2rem' }}>ESTADÍSTICAS DEL <span style={{ color: red }}>LENGUAJE</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 10px ${red})` }}>🛠️</div>
            <div>
              <h4 style={{ color: red, fontSize: '1.6rem', marginBottom: '5px' }}>¿Para qué se utiliza?</h4>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.5' }}>
                Es el estándar para crear <b>Sistemas Operativos</b> (Linux, Windows), <b>Controladores de Hardware</b> (Drivers), 
                <b>Sistemas Embebidos</b> (microondas, satélites, motores) y motores de videojuegos de alto rendimiento.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 10px ${red})` }}>🧗</div>
            <div>
              <h4 style={{ color: red, fontSize: '1.6rem', marginBottom: '5px' }}>¿Qué tan difícil es?</h4>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.5' }}>
                <b>Dificultad: Alta / Élite.</b> A diferencia de lenguajes modernos, C no tiene "red de seguridad". Tú eres el responsable de gestionar la memoria y los recursos. Es un reto que te convierte en un ingeniero de verdad.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '3rem', filter: `drop-shadow(0 0 10px ${red})` }}>⏳</div>
            <div>
              <h4 style={{ color: red, fontSize: '1.6rem', marginBottom: '5px' }}>Tiempo de Dominio</h4>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.5' }}>
                Aprender la sintaxis toma <b>1 mes</b>. Entender la gestión de memoria y punteros toma unos <b>4 a 6 meses</b>. 
                Dominarlo para proyectos industriales es un camino de <b>años</b> de práctica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- VISUALIZADOR DE HARDWARE (MICROCONTROLADOR) ---
const MicroSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <rect x="40" y="40" width="120" height="120" fill="#1e293b" stroke="#ef4444" strokeWidth="4" />
    <text x="100" y="105" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="bold">ATMEL / ARM</text>
    {/* Pines */}
    {[0, 1, 2, 3].map(i => (
      <React.Fragment key={i}>
        <rect x={20} y={60 + i*25} width="20" height="10" fill="#ef4444" />
        <rect x={160} y={60 + i*25} width="20" height="10" fill="#ef4444" />
        <rect x={60 + i*25} y={20} width="10" height="20" fill="#ef4444" />
        <rect x={60 + i*25} y={160} width="10" height="20" fill="#ef4444" />
      </React.Fragment>
    ))}
  </svg>
);

// --- VISUAL DE CONTROL ROBÓTICO ---
const RobotControlSVG = () => (
  <svg width="250" height="200" viewBox="0 0 250 200">
    {/* Circuit Board */}
    <rect x="20" y="50" width="210" height="120" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="3" />
    {/* Microcontroller */}
    <rect x="80" y="70" width="90" height="80" fill="#020617" stroke="#fbbf24" strokeWidth="2" />
    <text x="125" y="115" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">CPU</text>
    {/* GPIO Pins */}
    <circle cx="70" cy="80" r="5" fill="#10b981" />
    <circle cx="70" cy="100" r="5" fill="#10b981" />
    <circle cx="70" cy="120" r="5" fill="#10b981" />
    <circle cx="180" cy="80" r="5" fill="#10b981" />
    <circle cx="180" cy="100" r="5" fill="#10b981" />
    {/* Robot Icon */}
    <path d="M125 30 L115 40 L135 40 Z M110 40 L100 50 L140 50 L130 40 Z" fill="#0ea5e9" />
    <circle cx="120" cy="25" r="10" fill="#0ea5e9" />
    <text x="125" y="185" fill="#fff" fontSize="14" textAnchor="middle">CÓDIGO → ACCIÓN</text>
  </svg>
);

// --- VISUAL DE MEMORIA Y PUNTEROS ---
const PointersVisual = () => {
  const red = "#ef4444";
  return (
    <div style={{ background: '#000', padding: '4rem', borderRadius: '40px', border: `2px solid ${red}`, margin: '4rem 0', textAlign: 'center' }}>
      <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '3rem', fontWeight: '900' }}>PUNTEROS: EL <span style={{ color: red }}>ADN DE C</span></h3>
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ border: '2px solid #fff', padding: '30px', borderRadius: '20px', textAlign: 'center', width: '200px' }}>
          <div style={{ fontSize: '0.9rem', color: red, fontWeight: 'bold' }}>VARIABLE 'X'</div>
          <div style={{ fontSize: '3.5rem', fontWeight: '900', margin: '10px 0' }}>100</div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>ADDR: 0x7FFD</div>
        </div>
        <div style={{ fontSize: '4rem', color: red }} className="mobile-hide">⬅️</div>
        <div style={{ border: `2px solid ${red}`, padding: '30px', borderRadius: '20px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', width: '200px' }}>
          <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>PUNTERO '*ptr'</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: red, margin: '20px 0' }}>0x7FFD</div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Guarda la dirección</div>
        </div>
      </div>
      <p style={{ marginTop: '3rem', fontSize: '1.4rem', color: '#94a3b8', maxWidth: '900px', margin: '3rem auto 0', lineHeight: '1.6' }}>
        Un puntero es una variable mágica: no guarda un número, guarda <b>dónde</b> vive otro número en la memoria RAM. Esto permite que C sea el lenguaje más rápido del mundo.
      </p>
    </div>
  );
};

// --- VISUAL DE MONITOR DE HARDWARE ---
const HardwareDisplaySVG = () => (
  <svg width="220" height="140" viewBox="0 0 220 140">
    <rect x="10" y="10" width="200" height="120" rx="10" fill="#000" stroke="#ef4444" strokeWidth="4" />
    <path d="M30 70 Q 60 30 90 70 T 150 70" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5">
      <animate attributeName="stroke-dasharray" from="0, 200" to="200, 0" dur="3s" repeatCount="indefinite" />
    </path>
    <text x="110" y="110" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">TEMP: 45.2 C</text>
  </svg>
);

// --- DIAGRAMA DE FLUJO: PROGRAMA C BÁSICO ---
const CProgramFlowSVG = ({ color = "#ef4444" }) => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '40px', border: `2px solid ${color}`, textAlign: 'center', margin: '2rem 0' }}>
    <h3 style={{ color: color, fontSize: '1.8rem', marginBottom: '2rem' }}>FLUJO DE UN PROGRAMA C</h3>
    <svg width="100%" height="450" viewBox="0 0 300 450">
      <rect x="100" y="10" width="100" height="40" rx="20" fill="none" stroke="white" strokeWidth="3" />
      <text x="150" y="35" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">INICIO</text>
      <path d="M150 50 L150 80" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />
      <path d="M120 80 L180 80 L200 120 L100 120 Z" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <text x="150" y="105" fill="white" fontSize="12" textAnchor="middle">scanf("...");</text>
      <path d="M150 120 L150 150" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />
      <path d="M150 150 L220 190 L150 230 L80 190 Z" fill="none" stroke={color} strokeWidth="3" />
      <text x="150" y="195" fill="white" fontSize="12" textAnchor="middle">¿CONDICIÓN?</text>
      <path d="M220 190 L250 190 L250 260" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowC)" />
      <text x="235" y="180" fill="#10b981" fontSize="12">SÍ</text>
      <rect x="200" y="260" width="100" height="40" fill="none" stroke="#10b981" strokeWidth="3" />
      <text x="250" y="285" fill="white" fontSize="12" textAnchor="middle">printf("VERDAD");</text>
      <path d="M80 190 L50 190 L50 260" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowC)" />
      <text x="65" y="180" fill="#fbbf24" fontSize="12">NO</text>
      <rect x="0" y="260" width="100" height="40" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <text x="50" y="285" fill="white" fontSize="12" textAnchor="middle">printf("FALSO");</text>
      <path d="M250 300 L250 330 L150 330 L150 360" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />
      <path d="M50 300 L50 330 L150 330" stroke={color} strokeWidth="3" />
      <rect x="100" y="360" width="100" height="40" rx="20" fill="none" stroke="white" strokeWidth="3" />
      <text x="150" y="385" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">FIN</text>
      <defs>
        <marker id="arrowC" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </marker>
      </defs>
    </svg>
    <p style={{ color: color, fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>DIAGRAMA DE FLUJO BÁSICO</p>
  </div>
);

// --- DIAGRAMA DE FLUJO: BUCLE WHILE NEÓN ---
const LoopFlowSVG = ({ color = "#ef4444" }) => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '30px', border: `2px solid ${color}`, textAlign: 'center' }}>
    <svg width="200" height="250" viewBox="0 0 200 250">
      <rect x="60" y="10" width="80" height="30" rx="15" fill="none" stroke="white" strokeWidth="2" />
      <text x="100" y="30" fill="white" fontSize="10" textAnchor="middle">INICIO</text>
      
      <path d="M100 40 L100 70" stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Rombo de decisión */}
      <path d="M100 70 L140 100 L100 130 L60 100 Z" fill="none" stroke={color} strokeWidth="3" />
      <text x="100" y="105" fill="white" fontSize="9" textAnchor="middle">¿CONDICIÓN?</text>

      {/* Ruta SÍ */}
      <path d="M100 130 L100 170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="110" y="150" fill="#10b981" fontSize="10">SÍ</text>
      <rect x="60" y="170" width="80" height="30" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="100" y="190" fill="white" fontSize="9" textAnchor="middle">EJECUTAR</text>

      {/* Retorno */}
      <path d="M60 185 L30 185 L30 100 L60 100" stroke={color} strokeWidth="2" fill="none" strokeDasharray="4" markerEnd="url(#arrow)" />

      {/* Ruta NO */}
      <path d="M140 100 L170 100 L170 220 L100 220" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      <text x="155" y="90" fill="#ef4444" fontSize="10">NO</text>
      <rect x="60" y="210" width="80" height="25" rx="12" fill="none" stroke="white" strokeWidth="2" />
      <text x="100" y="227" fill="white" fontSize="10" textAnchor="middle">FIN</text>
      
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
    </svg>
    <p style={{ color: color, fontSize: '0.9rem', fontWeight: 'bold', marginTop: '10px' }}>LÓGICA DE ITERACIÓN</p>
  </div>
);

// --- DIAGRAMA DE FLUJO: BUCLE FOR DETALLADO ---
const ComplexCFlowchartSVG = ({ color = "#ef4444" }) => (
  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '40px', border: `2px solid ${color}`, textAlign: 'center', margin: '2rem 0' }}>
    <h3 style={{ color: color, fontSize: '1.8rem', marginBottom: '2rem' }}>BUCLE FOR DETALLADO</h3>
    <svg width="100%" height="400" viewBox="0 0 300 400">
      {/* INICIO */}
      <rect x="100" y="10" width="100" height="40" rx="20" fill="none" stroke="white" strokeWidth="3" />
      <text x="150" y="35" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">INICIO</text>
      <path d="M150 50 L150 80" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />

      {/* Inicialización (for) */}
      <rect x="100" y="80" width="100" height="40" fill="none" stroke="#0ea5e9" strokeWidth="3" />
      <text x="150" y="105" fill="white" fontSize="12" textAnchor="middle">i = 0</text>
      <path d="M150 120 L150 150" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />

      {/* Condición Bucle (for) */}
      <path d="M150 150 L220 190 L150 230 L80 190 Z" fill="none" stroke={color} strokeWidth="3" />
      <text x="150" y="195" fill="white" fontSize="12" textAnchor="middle">¿i &lt; N?</text>

      {/* Ruta SÍ (Bucle) */}
      <path d="M150 230 L150 260" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowC)" />
      <text x="165" y="245" fill="#10b981" fontSize="12">SÍ</text>

      {/* Cuerpo del Bucle (Proceso) */}
      <rect x="100" y="260" width="100" height="40" fill="none" stroke="#10b981" strokeWidth="3" />
      <text x="150" y="285" fill="white" fontSize="12" textAnchor="middle">Hacer Tarea</text>
      <path d="M150 300 L150 330" stroke={color} strokeWidth="3" markerEnd="url(#arrowC)" />

      {/* Actualización (for) */}
      <rect x="100" y="330" width="100" height="40" fill="none" stroke="#a855f7" strokeWidth="3" />
      <text x="150" y="355" fill="white" fontSize="12" textAnchor="middle">i++</text>

      {/* Retorno al Bucle */}
      <path d="M200 350 L230 350 L230 190 L220 190" stroke={color} strokeWidth="2" fill="none" strokeDasharray="4" markerEnd="url(#arrowC)" />

      {/* Ruta NO (Bucle) */}
      <path d="M80 190 L50 190 L50 380 L100 380" stroke="#ef4444" strokeWidth="3" fill="none" markerEnd="url(#arrowC)" />
      <text x="65" y="180" fill="#ef4444" fontSize="12">NO</text>
      <rect x="100" y="380" width="100" height="40" rx="20" fill="none" stroke="white" strokeWidth="3" />
      <text x="150" y="405" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">FIN</text>
      
      <defs>
        <marker id="arrowC" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </marker>
      </defs>
    </svg>
    <p style={{ color: color, fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>BUCLE FOR DETALLADO</p>
  </div>
);

// --- DISEÑO MAESTRO: BRAZO ROBÓTICO JARVIS-STYLE ---
const JarvisArmSVG = () => {
  const red = "#ef4444";
  return (
    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '5rem', borderRadius: '60px', border: `3px solid ${red}`, boxShadow: `0 0 50px ${red}55`, marginTop: '6rem' }}>
      <h3 style={{ color: red, fontSize: '2rem', marginBottom: '2rem', letterSpacing: '5px', fontWeight: '900' }}>[ HARDWARE UNIT: ARM_DEPOLOYED ]</h3>
      <svg width="100%" height="650" viewBox="0 0 800 650" style={{ filter: `drop-shadow(0 0 20px ${red})` }}>
        {/* Base Principal */}
        <path d="M150 600 H650 L680 640 H120 Z" fill="none" stroke={red} strokeWidth="8" strokeLinejoin="round" />
        <path d="M200 570 H600 L620 600 H180 Z" fill="none" stroke={red} strokeWidth="6" />
        {/* Tornillos en la base */}
        <circle cx="250" cy="615" r="8" fill={red} />
        <circle cx="550" cy="615" r="8" fill={red} />
        <circle cx="170" cy="585" r="6" fill={red} />
        <circle cx="630" cy="585" r="6" fill={red} />
        
        {/* Pistones Hidráulicos */}
        <rect x="300" y="450" width="25" height="100" fill="none" stroke={red} strokeWidth="6" />
        <rect x="475" y="450" width="25" height="100" fill="none" stroke={red} strokeWidth="6" />
        <line x1="312" y1="450" x2="312" y2="350" stroke={red} strokeWidth="10" />
        <line x1="487" y1="450" x2="487" y2="350" stroke={red} strokeWidth="10" />
        {/* Tornillos en pistones */}
        <circle cx="312" cy="440" r="5" fill="white" />
        <circle cx="312" cy="360" r="5" fill="white" />
        <circle cx="487" cy="440" r="5" fill="white" />
        <circle cx="487" cy="360" r="5" fill="white" />

        {/* Mangueras y Tubos Enredados */}
        <path d="M250 580 Q 180 500 280 380" fill="none" stroke={red} strokeWidth="3" strokeDasharray="8,8">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M550 580 Q 620 500 520 380" fill="none" stroke={red} strokeWidth="3" strokeDasharray="12,6" />
        <path d="M400 570 C 450 480 350 400 400 300" fill="none" stroke={red} strokeWidth="2" opacity="0.7" />
        <path d="M350 500 Q 300 450 380 400" fill="none" stroke={red} strokeWidth="2.5" strokeDasharray="6,3" />
        <path d="M450 500 Q 500 450 420 400" fill="none" stroke={red} strokeWidth="2.5" strokeDasharray="6,3" />

        {/* Gran Tuerca Circular Joint */}
        <circle cx="400" cy="320" r="80" fill="none" stroke={red} strokeWidth="12" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <circle key={i} cx={400 + 65 * Math.cos(deg * Math.PI / 180)} cy={320 + 65 * Math.sin(deg * Math.PI / 180)} r="10" fill={red} />
        ))}
        <circle cx="400" cy="320" r="30" fill="none" stroke={red} strokeWidth="6" />
        <path d="M370 320 L430 320 M400 290 L400 350" stroke={red} strokeWidth="3" />
        {/* Tornillos en el joint */}
        <circle cx="400" cy="320" r="15" fill="white" />
        <path d="M390 310 L410 330 M390 330 L410 310" stroke="#000" strokeWidth="2" />

        {/* Brazo Metálico Grueso (Doble Fierro) */}
        <g transform="rotate(-20, 400, 320)"> {/* Rotación para darle más dinamismo */}
          <rect x="100" y="290" width="280" height="20" fill="none" stroke={red} strokeWidth="8" rx="8" />
          <rect x="100" y="330" width="280" height="20" fill="none" stroke={red} strokeWidth="8" rx="8" />
          {/* Placa de conexión */}
          <rect x="70" y="280" width="50" height="80" fill="none" stroke={red} strokeWidth="6" rx="8" />
          {/* Tornillos en la placa */}
          <circle cx="95" cy="300" r="6" fill="white" />
          <circle cx="95" cy="340" r="6" fill="white" />
          {/* Detalles internos del brazo */}
          <line x1="120" y1="300" x2="360" y2="300" stroke={red} strokeWidth="2" strokeDasharray="4,4" />
          <line x1="120" y1="340" x2="360" y2="340" stroke={red} strokeWidth="2" strokeDasharray="4,4" />
          
          {/* Mano Robótica 3 Dedos */}
          <g transform="translate(60, 320)"> {/* Ajuste de posición de la mano */}
            {/* Dedo Superior */}
            <path d="M0 -30 L-50 -60 L-90 -50" fill="none" stroke={red} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="rotate" values="0; -5; 0" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Dedo Medio */}
            <path d="M0 0 L-70 0 L-110 10" fill="none" stroke={red} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dedo Inferior */}
            <path d="M0 30 L-50 60 L-90 50" fill="none" stroke={red} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="rotate" values="0; 5; 0" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Articulaciones de los dedos */}
            <circle cx="-30" cy="-20" r="6" fill="white" />
            <circle cx="-30" cy="20" r="6" fill="white" />
            <circle cx="-60" cy="0" r="6" fill="white" />
          </g>
        </g>
      </svg>
      <p style={{ color: red, marginTop: '2rem', fontSize: '1.2rem', fontFamily: 'monospace', fontWeight: 'bold' }}>ESTADO: ACTIVO // BRAZO_SERIAL_099</p>
    </div>
  );
};

// --- BLOQUE DE CÓDIGO CON FLECHAS NEÓN ---
const CCode = ({ title, code, annotations = [] }) => (
  <div style={{ background: '#000', borderRadius: '25px', border: '3px solid #ef4444', margin: '3rem 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ background: '#ef4444', padding: '10px 25px', color: '#000', fontWeight: '900', display: 'flex', justifyContent: 'space-between' }}>
      <span>{title}</span>
      <span>KERNEL_C</span>
    </div>
    <div style={{ padding: '40px', position: 'relative' }}>
      <pre style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem', fontFamily: 'monospace', lineHeight: '1.7' }}>
        <code>{code}</code>
      </pre>
      {annotations.map((ann, i) => (
        <div key={i} style={{ position: 'absolute', left: '105%', top: ann.top, width: '300px', display: 'flex', alignItems: 'center', gap: '15px' }} className="mobile-hide">
          <svg width="40" height="20"><path d="M40 10 L10 10 M15 5 L5 10 L15 15" stroke="#ef4444" strokeWidth="3" fill="none" /></svg>
          <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>{ann.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const BigExplanation = ({ num, title, text }) => (
  <div style={{ textAlign: 'left', margin: '4rem 0', borderLeft: '8px solid #ef4444', paddingLeft: '40px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '15px' }}>
      <span style={{ fontSize: '5rem', fontWeight: '900', color: '#fff', opacity: 0.2 }}>{num}</span>
      <h3 style={{ fontSize: '3rem', color: '#ef4444', fontWeight: '900', textTransform: 'uppercase' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.8rem', color: '#fff', lineHeight: '1.4' }}>{text}</p>
  </div>
);

const ExerciseCard = ({ id, topic, question, answer, onSolved, isSolved }) => {
  const [input, setInput] = useState('');
  const check = () => { if (input.trim() === answer && !isSolved) onSolved(id); };
  return (
    <div className="benefit-card" style={{ border: `3px solid ${isSolved ? '#10b981' : '#ef4444'}`, textAlign: 'left', background: 'rgba(239, 68, 68, 0.05)', padding: '2rem' }}>
      <span style={{ color: '#ef4444', fontWeight: '900', letterSpacing: '2px' }}>{topic}</span>
      <h4 style={{ margin: '1.5rem 0', fontSize: '1.5rem', color: '#fff' }}>{question}</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" value={isSolved ? answer : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSolved}
          style={{ background: '#000', border: '1px solid #ef4444', color: '#fff', padding: '15px', borderRadius: '10px', width: '100%', fontSize: '1.2rem', fontFamily: 'monospace' }}
        />
        {!isSolved && <button onClick={check} className="btn-login" style={{ background: '#ef4444', color: '#000', fontWeight: 'bold' }}>RUN</button>}
      </div>
    </div>
  );
};

const ProgramacionC = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [botStatus, setBotStatus] = useState('happy');

  const handleSolved = (id) => {
    if (!solvedIds.includes(id)) {
      setSolvedIds([...solvedIds, id]);
      setPoints(prev => prev + 10);
      setBotStatus('happy');
    }
  };

  return (
    <div className="home-container" style={{ paddingBottom: '120px', paddingLeft: '8%', paddingRight: '5%' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '180px 0 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <CyberDuo expression={botStatus} />
          <div style={{ textAlign: 'left', maxWidth: '800px' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: '900', lineHeight: '0.8', margin: 0 }}>
              Arquitectura <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text' }}>C</span>
            </h1>
            <p style={{ fontSize: '2rem', color: '#94a3b8', marginTop: '30px' }}>
              "El lenguaje de los dioses. Si quieres hablar con el hardware, debes hablar en C."
            </p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', marginTop: '60px', padding: '25px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '30px', border: '2px solid #ef4444' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>
            <span>KERNEL SYNC</span>
            <span>{points}%</span>
          </div>
          <div style={{ height: '20px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${points}%`, height: '100%', background: '#ef4444', boxShadow: '0 0 20px #ef4444', transition: '1s' }}></div>
          </div>
        </div>
      </section>

      {/* --- COMPARATIVA DE VARIABLES --- */}
      <VariableComparison />

      {/* --- NEW STATS SECTION --- */}
      <CStatsSection />

      {/* --- HARDWARE CONNECTION --- */}
      <section className="info-section">
        <div style={{ display: 'flex', gap: '100px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', textAlign: 'left' }}>DOMINA LA <span style={{ color: '#ef4444' }}>MÁQUINA</span></h2>
            <p style={{ fontSize: '1.5rem', textAlign: 'left', lineHeight: '1.6', color: '#94a3b8' }}>
              C no tiene "magia". Lo que ves es lo que hay. Es el lenguaje detrás de los microcontroladores de un robot, el motor de un coche y el sistema operativo que estás usando ahora mismo.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
              <MicroSVG />
            </div>
          </div>
        </div>
      </section>

      {/* --- HARDWARE INTERFACE SECTION --- */}
      <section className="info-section">
        <div style={{ display: 'flex', gap: '50px', background: 'rgba(239, 68, 68, 0.02)', padding: '3rem', borderRadius: '40px', border: '1px dashed #ef4444', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>INTERFAZ DE <span style={{ color: '#ef4444' }}>SALIDA</span></h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.6' }}>
              En C, no solo imprimes texto. Controlas registros de memoria que encienden píxeles en una pantalla o mueven servomotores. Todo es una corriente de datos binarios.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <HardwareDisplaySVG />
          </div>
        </div>
      </section>

      {/* --- C Y EL CONTROL DE HARDWARE --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '4.5rem', fontWeight: '900', textAlign: 'left', marginTop: '6rem' }}>C: El Lenguaje del <span style={{ color: '#ef4444' }}>Control Físico</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', textAlign: 'left', marginBottom: '4rem' }}>
          Tu código se convierte en movimiento, luz y sonido. C es la voz directa del procesador.
        </p>
        
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.5, textAlign: 'left' }}>
            <h3 style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Manipulación Directa</h3>
            <p style={{ fontSize: '1.5rem', color: '#fff', lineHeight: '1.6' }}>
              Con C, no hay capas de abstracción. Puedes acceder directamente a los registros de memoria de un microcontrolador,
              encendiendo LEDs, leyendo sensores o moviendo motores con precisión milimétrica.
            </p>
            <ul style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '2', marginTop: '2rem' }}>
              <li>⚙️ **Acceso Directo:** Control total sobre el hardware.</li>
              <li>⚡ **Velocidad:** Ejecución ultrarrápida, crucial para sistemas en tiempo real.</li>
              <li>💡 **Eficiencia:** Optimización de recursos, ideal para dispositivos con poca memoria.</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <RobotControlSVG />
          </div>
        </div>
        <CCode 
          title="control_led.c"
          code={`#define LED_PIN 13\n\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT); // Configura el pin como salida\n}\n\nvoid loop() {\n  digitalWrite(LED_PIN, HIGH); // Enciende el LED\n  delay(1000);                 // Espera 1 segundo\n  digitalWrite(LED_PIN, LOW);  // Apaga el LED\n  delay(1000);                 // Espera 1 segundo\n}`}
          annotations={[{ top: '20px', text: 'Define el pin del LED' }, { top: '55px', text: 'Función de configuración inicial' }, { top: '100px', text: 'Bucle principal: se repite infinitamente' }, { top: '135px', text: 'Enciende el LED (HIGH = 1)' }, { top: '170px', text: 'Retraso en milisegundos' }]}
        />
      </section>

      {/* --- MÉTODO DE FLUJO --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '4.5rem', fontWeight: '900', textAlign: 'left', marginTop: '6rem' }}>EL MÉTODO DE <span style={{ color: '#ef4444' }}>FLUJO</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', textAlign: 'left', marginBottom: '4rem' }}>
          Antes de escribir una sola línea de código C, visualiza el camino que tomará tu programa.
        </p>
        
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.5, textAlign: 'left' }}>
            <h3 style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Qué es un Diagrama de Flujo?</h3>
            <p style={{ fontSize: '1.5rem', color: '#fff', lineHeight: '1.6' }}>
              Es un mapa visual que representa la secuencia de pasos, decisiones y operaciones que tu programa C realizará.
              Es tu plano de ingeniería antes de construir el circuito.
            </p>
            <ul style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '2', marginTop: '2rem' }}>
              <li>✅ **Claridad:** Entiende la lógica de un vistazo.</li>
              <li>🐛 **Debugging:** Encuentra errores antes de compilar.</li>
              <li>🤝 **Comunicación:** Explica tu código a otros ingenieros.</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <CProgramFlowSVG />
          </div>
        </div>

        <div style={{ marginTop: '5rem' }}>
          <h3 style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'left' }}>Símbolos Clave en C</h3>
          <div className="benefits-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div className="benefit-card" style={{ textAlign: 'left', border: '2px solid #fff' }}>
              <h4 style={{ color: '#fff', fontSize: '1.8rem' }}>INICIO / FIN</h4>
              <p style={{ color: '#94a3b8' }}>Óvalos. Marcan el principio y el final de `main()`.</p>
            </div>
            <div className="benefit-card" style={{ textAlign: 'left', border: '2px solid #fbbf24' }}>
              <h4 style={{ color: '#fbbf24', fontSize: '1.8rem' }}>ENTRADA / SALIDA</h4>
              <p style={{ color: '#94a3b8' }}>Paralelogramos. Para `scanf()` (leer) y `printf()` (mostrar).</p>
            </div>
            <div className="benefit-card" style={{ textAlign: 'left', border: '2px solid #ef4444' }}>
              <h4 style={{ color: '#ef4444', fontSize: '1.8rem' }}>DECISIÓN</h4>
              <p style={{ color: '#94a3b8' }}>Rombos. Para `if`, `else if`, `else` y `switch`.</p>
            </div>
            <div className="benefit-card" style={{ textAlign: 'left', border: '2px solid #10b981' }}>
              <h4 style={{ color: '#10b981', fontSize: '1.8rem' }}>PROCESO</h4>
              <p style={{ color: '#94a3b8' }}>Rectángulos. Cualquier cálculo o asignación de variable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VARIABLES --- */}
      <section className="info-section">
        <BigExplanation 
          num="01" title="Variables & Tipos" 
          text="En C, debes decirle a la memoria EXACTAMENTE qué vas a guardar. Un 'int' guarda números enteros, un 'float' decimales y un 'char' un solo carácter." 
        />
        <CCode 
          title="declaracion.c"
          code={`int vida = 100;\nfloat energia = 95.5;\nchar letra = 'A';\n\nprintf("Vida: %d", vida);`}
          annotations={[
            { top: '40px', text: 'Entero (4 bytes)' },
            { top: '75px', text: 'Decimal (4 bytes)' },
            { top: '110px', text: 'Carácter (1 byte)' },
            { top: '175px', text: 'Salida de datos formateada' }
          ]}
        />
      </section>

      {/* --- ESTRUCTURAS Y OPERADORES --- */}
      <DataStructuresC />
      <OperatorLab />

      {/* --- NEW POINTERS VISUAL --- */}
      <PointersVisual />

      <JarvisArmSVG />

      {/* --- CONTROL DE FLUJO --- */}
      <section className="info-section" style={{ background: '#000', padding: '5rem', borderRadius: '50px', border: '2px solid #334155' }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '4rem', textAlign: 'left' }}>FLUJO DE <span style={{ color: '#ef4444' }}>CONTROL</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '60px' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ color: '#ef4444', fontSize: '2rem', textAlign: 'left' }}>IF / ELSE</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '1rem' }}>La bifurcación fundamental. El cerebro elige un camino basado en un sensor.</p>
            <CCode 
              title="decision.c"
              code={`if (sensor > 50) {\n    mover_robot();\n} else {\n    detener();\n}`}
              annotations={[
                { top: '25px', text: 'Evalúa la condición' },
                { top: '75px', text: 'Acción si es VERDAD' }
              ]}
            />
          </div>
          <div>
            <h3 style={{ color: '#ef4444', fontSize: '2rem', textAlign: 'left' }}>WHILE LOOP</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '1rem' }}>Repetición infinita o controlada. Ideal para mantener el motor encendido.</p>
            <CCode 
              title="bucle.c"
              code={`while (energia > 0) {\n    trabajar();\n    energia--;\n}`}
              annotations={[
                { top: '25px', text: 'Repite mientras sea cierto' },
                { top: '75px', text: '¡Evita bucles infinitos!' }
              ]}
            />
          </div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <LoopFlowSVG />
        </div>
      </section>

      {/* --- PROYECTO: CALCULADORA --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '4rem', fontWeight: '900', textAlign: 'left' }}>PROYECTO: <span style={{ color: '#ef4444' }}>NEON_CALC.C</span></h2>
        <CCode 
          title="calculadora.c"
          code={`#include <stdio.h>\n\nint main() {\n    char op;\n    float n1, n2;\n    printf("Operación (+, -, *, /): ");\n    scanf("%c", &op);\n    printf("Números: ");\n    scanf("%f %f", &n1, &n2);\n\n    if(op == '+') printf("%.2f", n1 + n2);\n    else if(op == '/') printf("%.2f", n1 / n2);\n    return 0;\n}`}
          annotations={[
            { top: '20px', text: 'Entrada/Salida Estándar' },
            { top: '75px', text: 'Lee un carácter (el símbolo)' },
            { top: '90px', text: 'Lee dos decimales a la vez' },
            { top: '125px', text: 'Lógica de decisión simple' }
          ]}
        />
      </section>

      {/* --- FUNCTIONS --- */}
      <section className="info-section">
        <BigExplanation 
          num="02" title="Anatomía de una Función" 
          text="No repitas código. Una función es una 'sub-máquina' que recibe datos, los procesa y devuelve un resultado al sistema central." 
        />
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#ef4444' }}>Tipo de Retorno</h4>
            <p>Define qué sale: <b>int</b> (número), <b>void</b> (nada), <b>float</b> (decimal).</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#ef4444' }}>Parámetros</h4>
            <p>Los datos que la función necesita para trabajar. Se definen entre paréntesis.</p>
          </div>
          <div className="benefit-card" style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#ef4444' }}>Cuerpo {'{ }'}</h4>
            <p>El código encerrado entre llaves que realiza la magia.</p>
          </div>
        </div>

        <CCode 
          title="main.c"
          code={`#include <stdio.h>\n\nvoid saludar() {\n    printf("¡Hola, Mundo!");\n}\n\nint main() {\n    saludar();\n    return 0;\n}`}
          annotations={[
            { top: '20px', text: 'Librería estándar' },
            { top: '55px', text: 'No devuelve nada (void)' },
            { top: '125px', text: 'Punto de entrada vital' }
          ]}
        />
      </section>

      {/* --- PROYECTO MAESTRO: BANK KERNEL --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '4rem', fontWeight: '900', textAlign: 'left', marginBottom: '3rem' }}>SISTEMA BANCARIO <span style={{ color: '#ef4444' }}>DE ÉLITE</span></h2>
        <p style={{ fontSize: '1.5rem', color: '#94a3b8', textAlign: 'left', marginBottom: '3rem' }}>
          Este código simula la lógica de una bóveda real. Analiza cómo gestionamos múltiples cuentas con estructuras.
        </p>
        <CCode 
          title="bank_core.c"
          code={`#include <stdio.h>\n#include <string.h>\n\nstruct Cuenta {\n    int id;\n    char nombre[50];\n    double saldo;\n};\n\nvoid depositar(struct Cuenta *c, double monto) {\n    c->saldo += monto;\n    printf("Depósito exitoso en cuenta %d\\n", c->id);\n}\n\nint main() {\n    struct Cuenta miBoveda = {101, "Admin_Neon", 5000.0};\n    \n    printf("Saldo Inicial: $%.2f\\n", miBoveda.saldo);\n    depositar(&miBoveda, 1500.50);\n    printf("Nuevo Saldo: $%.2f\\n", miBoveda.saldo);\n    \n    return 0;\n}`}
          annotations={[
            { top: '55px', text: 'Define una "Tupla" personalizada' },
            { top: '110px', text: 'Puntero: Modifica el saldo real' },
            { top: '125px', text: 'Acceso a miembro mediante flecha' },
            { top: '175px', text: 'Inicialización masiva de datos' },
            { top: '215px', text: 'Pasamos la DIRECCIÓN (&) para editar' }
          ]}
        />
        <div className="benefit-card" style={{ marginTop: '3rem', border: '1px dashed #ef4444', textAlign: 'left' }}>
          <h4 style={{ color: '#ef4444' }}>¿Qué está pasando aquí?</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            1. Usamos <b>struct</b> para crear un objeto "Cuenta".<br/>
            2. La función <b>depositar</b> usa un puntero <code>*c</code>. Esto es vital: si no usamos punteros, C crearía una copia de la cuenta y el dinero ¡nunca llegaría al saldo original!<br/>
            3. El operador <code>-></code> es el que C usa para entrar a las propiedades de un puntero.
          </p>
        </div>
      </section>

      {/* --- ESTRUCTURA DE ARCHIVO --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', textAlign: 'left' }}>JERARQUÍA DEL <span style={{ color: '#ef4444' }}>ARCHIVO</span></h2>
        <div className="benefit-card" style={{ background: '#000', textAlign: 'left', border: '1px solid #334155' }}>
          <pre style={{ fontSize: '1.5rem', color: '#ef4444', lineHeight: '1.8' }}>
            {`1. #include <stdio.h>   // BIBLIOTECAS\n2. #define MAX 100       // MACROS\n3. int global_var;       // VARIABLES GLOBALES\n4. void func();          // PROTOTIPOS\n5. int main() { ... }    // PUNTO DE ENTRADA`}
          </pre>
        </div>
      </section>

      {/* --- FLUJO DE CONTROL AVANZADO: BUCLE FOR --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '4.5rem', fontWeight: '900', textAlign: 'left', marginTop: '6rem' }}>FLUJO DE CONTROL <span style={{ color: '#ef4444' }}>AVANZADO: BUCLE FOR</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', textAlign: 'left', marginBottom: '4rem' }}>
          Cuando necesitas repetir una acción un número específico de veces, el bucle `for` es tu mejor aliado.
        </p>
        
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.5, textAlign: 'left' }}>
            <h3 style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '1.5rem' }}>La Estructura FOR</h3>
            <p style={{ fontSize: '1.5rem', color: '#fff', lineHeight: '1.6' }}>
              El bucle `for` condensa la inicialización, la condición y la actualización en una sola línea,
              haciéndolo muy eficiente para iterar sobre colecciones o realizar tareas repetitivas.
            </p>
            <ul style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '2', marginTop: '2rem' }}>
              <li>🔄 **Inicialización:** `int i = 0;` (Dónde empieza el contador).</li>
              <li>❓ **Condición:** `i  10;` (Mientras sea verdad, el bucle continúa).</li>
              <li>📈 **Actualización:** `i++` (Cómo cambia el contador en cada vuelta).</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <ComplexCFlowchartSVG />
          </div>
        </div>
        <CCode 
          title="bucle_for.c"
          code={`for (int i = 0; i < 5; i++) {\n    printf("Iteración: %d\\n", i);\n    if (i == 2) {\n        printf("¡Mitad del camino!\\n");\n    }\n}`}
          annotations={[{ top: '20px', text: 'Inicialización, Condición, Actualización' }, { top: '55px', text: 'Cuerpo del bucle: se repite 5 veces' }, { top: '90px', text: 'Decisión interna: ¿es la iteración 2?' }]}
        />
      </section>

      {/* --- EXERCISE LAB --- */}
      <section className="info-section">
        <h2 style={{ fontSize: '5rem', fontWeight: '900', marginBottom: '1rem' }}>C <span style={{ color: '#ef4444' }}>LABORATORY</span></h2>
        <p style={{ fontSize: '1.8rem', color: '#94a3b8', marginBottom: '4rem' }}>De 0 a 10: Demuestra que ya no eres un novato.</p>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <ExerciseCard 
            id="c1" topic="VARIABLES" question="Tipo de dato para números enteros:" 
            answer="int" onSolved={handleSolved} isSolved={solvedIds.includes('c1')} 
          />
          <ExerciseCard 
            id="c2" topic="SINTAXIS" question="¿Con qué símbolo termina cada línea?" 
            answer=";" onSolved={handleSolved} isSolved={solvedIds.includes('c2')} 
          />
          <ExerciseCard 
            id="c3" topic="SALIDA" question="Función para imprimir en pantalla:" 
            answer="printf" onSolved={handleSolved} isSolved={solvedIds.includes('c3')} 
          />
          <ExerciseCard 
            id="c4" topic="LIBRERÍA" question="¿Cómo se llama stdio.h? (#include <___>)" 
            answer="stdio.h" onSolved={handleSolved} isSolved={solvedIds.includes('c4')} 
          />
          <ExerciseCard 
            id="c5" topic="BUCLES" question="Bucle que se repite 'mientras' sea cierto:" 
            answer="while" onSolved={handleSolved} isSolved={solvedIds.includes('c5')} 
          />
          <ExerciseCard 
            id="c6" topic="ENTRADA" question="Función para LEER datos del teclado:" 
            answer="scanf" onSolved={handleSolved} isSolved={solvedIds.includes('c6')} 
          />
          <ExerciseCard 
            id="c7" topic="MEMORIA" question="¿Cuántos bytes ocupa un 'char'?" 
            answer="1" onSolved={handleSolved} isSolved={solvedIds.includes('c7')} 
          />
          <ExerciseCard 
            id="c8" topic="LOGICA" question="Operador para comparar igualdad (A ___ B):" 
            answer="==" onSolved={handleSolved} isSolved={solvedIds.includes('c8')} 
          />
          <ExerciseCard 
            id="c9" topic="FUNCIONES" question="¿Cómo se llama la función principal?" 
            answer="main" onSolved={handleSolved} isSolved={solvedIds.includes('c9')} 
          />
          <ExerciseCard 
            id="c10" topic="SISTEMA" question="¿Qué valor devuelve main al terminar bien?" 
            answer="0" onSolved={handleSolved} isSolved={solvedIds.includes('c10')} 
          />
        </div>
      </section>

      {/* --- CONGRATS --- */}
      {solvedIds.length === 10 && (
        <section className="info-section" style={{ marginTop: '5rem' }}>
          <div className="benefit-card" style={{ background: 'linear-gradient(45deg, #ef4444, #991b1b)', padding: '5rem', borderRadius: '40px', boxShadow: '0 0 100px rgba(239, 68, 68, 0.4)' }}>
            <h2 style={{ fontSize: '4rem', color: '#fff', fontWeight: '900', marginBottom: '20px' }}>¡FELICIDADES, ARQUITECTO DE BAJO NIVEL!</h2>
            <p style={{ fontSize: '2rem', color: '#fff' }}>
              Has cruzado el umbral. De novato a conocedor del núcleo. Cyber-Duo está orgulloso de tu sincronización con el hardware.
            </p>
            <p style={{ fontSize: '1.2rem', marginTop: '30px', fontWeight: 'bold', color: '#000' }}>
              El equipo de EDUNEON te felicita. ¡Has dominado el lenguaje que mueve el mundo!
            </p>
          </div>
        </section>
      )}


      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <button className="btn-login" style={{ background: '#fff', color: '#000', padding: '20px 60px', fontSize: '1.5rem', fontWeight: '900' }} onClick={() => navigate('/')}>VOLVER AL MAINFRAME</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-hide { display: block; }
        @media (max-width: 1200px) { .mobile-hide { display: none; } }
        
        .gradient-text {
          -webkit-text-fill-color: transparent;
        }

        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
        }

        .benefit-card:hover {
          animation: pulse-red 2s infinite;
        }
      `}} />
    </div>
  );
};

export default ProgramacionC;