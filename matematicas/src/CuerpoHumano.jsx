import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- PERSONAJE BIO-BOT ---
const BioBot = ({ size = 150 }) => {
  const color = "#22d3ee"; // Cian médico
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 15px ${color})` }}>
      <circle cx="100" cy="100" r="80" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="4" />
      <path d="M60 100 Q 100 150 140 100" fill="none" stroke={color} strokeWidth="3" opacity="0.5" />
      {/* Cruz médica neón */}
      <path d="M100 60 V100 M80 80 H120" stroke={color} strokeWidth="8" strokeLinecap="round" />
      <circle cx="80" cy="110" r="5" fill="white" />
      <circle cx="120" cy="110" r="5" fill="white" />
      <text x="100" y="40" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle">ANATOMY-AI</text>
    </svg>
  );
};

// --- ESQUEMA HUMANO NEÓN ---
const NeonSkeleton = () => (
  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '30px', border: '2px solid #f43f5e', position: 'relative', width: '100%', maxWidth: '400px' }}>
    <svg width="100%" height="auto" viewBox="0 0 200 400" style={{ display: 'block', margin: '0 auto' }}>
      <g stroke="#ffffff" strokeWidth="2" fill="none">
        {/* Cabeza */}
        <circle cx="100" cy="40" r="25" stroke="#22d3ee" strokeWidth="3" />
        {/* Columna */}
        <line x1="100" y1="65" x2="100" y2="180" stroke="#f43f5e" />
        {/* Costillas */}
        <path d="M70 80 Q 100 70 130 80 M65 100 Q 100 90 135 100 M65 120 Q 100 110 135 120" stroke="#22d3ee" opacity="0.6" />
        {/* Brazos */}
        <path d="M100 80 L40 130 L30 200" stroke="#ffffff" />
        <path d="M100 80 L160 130 L170 200" stroke="#ffffff" />
        {/* Pelvis */}
        <path d="M70 180 H130 L115 210 H85 Z" stroke="#f43f5e" strokeWidth="3" />
        {/* Piernas */}
        <path d="M85 210 L70 300 L75 380" stroke="#ffffff" />
        <path d="M115 210 L130 300 L125 380" stroke="#ffffff" />
      </g>
      {/* Etiquetas Flotantes */}
      <g fontSize="10" fontWeight="bold" fill="#22d3ee">
        <text x="140" y="40">CRÁNEO (Protección)</text>
        <text x="10" y="100">HÚMERO</text>
        <text x="140" y="195">PELVIS (Soporte)</text>
        <text x="10" y="320">FÉMUR (Más largo)</text>
      </g>
    </svg>
    <div style={{ position: 'absolute', top: '20px', left: '20px', textAlign: 'left' }}>
      <h4 style={{ color: '#f43f5e', fontSize: '2rem', margin: 0 }}>206</h4>
      <p style={{ color: '#fff', fontSize: '0.8rem' }}>HUESOS TOTALES</p>
    </div>
  </div>
);

const CuerpoHumano = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ background: '#000', color: '#fff' }}>
      <Navbar />

      <section className="hero-section" style={{ padding: '180px 10% 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <BioBot />
          <div style={{ textAlign: 'left', maxWidth: '700px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>Anatomía <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #22d3ee, #f43f5e)', WebkitBackgroundClip: 'text' }}>Neon</span></h1>
            <p className="hero-subtitle" style={{ color: '#94a3b8', fontSize: '1.6rem' }}>"Explora la máquina más perfecta jamás creada. Desde el calcio de tus huesos hasta el pulso de tus neuronas."</p>
          </div>
        </div>
      </section>

      {/* --- INFO CARDS --- */}
      <section className="info-section">
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="benefit-card" style={{ borderTop: '4px solid #22d3ee' }}>
            <h2 style={{ fontSize: '3rem', color: '#22d3ee' }}>206</h2>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Estructura Ósea</h4>
            <p style={{ color: '#94a3b8' }}>El esqueleto adulto tiene 206 huesos. Al nacer tenemos cerca de 300, pero se fusionan al crecer.</p>
          </div>
          <div className="benefit-card" style={{ borderTop: '4px solid #f43f5e' }}>
            <h2 style={{ fontSize: '3rem', color: '#f43f5e' }}>600+</h2>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Músculos</h4>
            <p style={{ color: '#94a3b8' }}>Responsables de cada movimiento, desde parpadear hasta correr una maratón.</p>
          </div>
          <div className="benefit-card" style={{ borderTop: '4px solid #bef264' }}>
            <h2 style={{ fontSize: '3rem', color: '#bef264' }}>5L</h2>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Sangre Vital</h4>
            <p style={{ color: '#94a3b8' }}>Un adulto promedio tiene 5 litros de sangre circulando constantemente por el sistema.</p>
          </div>
        </div>
      </section>

      {/* --- VISUALIZADOR CENTRAL --- */}
      <section className="info-section">
        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <NeonSkeleton />
          <div style={{ flex: 1, textAlign: 'left', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#22d3ee', marginBottom: '2rem' }}>Sistemas <span style={{ color: '#f43f5e' }}>Maestros</span></h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1.4rem' }}>🔹 Sistema Nervioso</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>El procesador central. El cerebro envía señales eléctricas a 400 km/h a través de los nervios.</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: '#fff', fontSize: '1.4rem' }}>🔹 Sistema Respiratorio</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Intercambio de gases. Respiramos unas 20,000 veces al día para oxigenar cada célula.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px dashed #22d3ee' }}>
              <p style={{ color: '#22d3ee', fontWeight: 'bold' }}>¿Sabías que...?</p>
              <p style={{ color: '#fff' }}>El hueso más pequeño es el estribo, ubicado en el oído, y mide apenas 3 milímetros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TABLA DE ÓRGANOS --- */}
      <section className="info-section">
        <h2 className="section-title">El Cuadro de <span className="gradient-text">Mando</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0a0a0a', border: '1px solid #333' }}>
            <thead>
              <tr style={{ background: '#22d3ee', color: '#000' }}>
                <th style={{ padding: '20px', textAlign: 'left' }}>ÓRGANO</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>FUNCIÓN CRÍTICA</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>ESTADÍSTICA</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#22d3ee' }}>CEREBRO</td>
                <td>Control total del sistema y pensamiento.</td>
                <td>86 mil millones de neuronas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#22d3ee' }}>CORAZÓN</td>
                <td>Bomba de presión para nutrientes.</td>
                <td>100,000 latidos por día.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#22d3ee' }}>PULMONES</td>
                <td>Filtrado de aire y absorción de O2.</td>
                <td>Superficie de una cancha de tenis.</td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontWeight: 'bold', color: '#22d3ee' }}>PIEL</td>
                <td>Protección térmica y sensorial.</td>
                <td>El órgano más grande del cuerpo.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '60px 0 100px' }}>
        <button className="btn-login" onClick={() => navigate('/')} style={{ background: '#22d3ee', color: '#000', padding: '1.5rem 4rem', fontWeight: '900' }}>
          VOLVER AL MAINFRAME
        </button>
      </div>
    </div>
  );
};

export default CuerpoHumano;