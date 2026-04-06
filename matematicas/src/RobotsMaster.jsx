import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- PALETA DE COLORES ROBÓTICA ---
const R-UI = {
  primary: '#00f2ff', // Cyan Neón (Blueprints)
  secondary: '#7000ff', // Púrpura (Ultron Core)
  danger: '#ff003c', // Rojo (Terminator Eye)
  warning: '#f3ff00', // Amarillo (Industrial)
  bg: '#020617'
};

// --- COMPONENTE: PLANO TÉCNICO (BLUEPRINT) ---
const BlueprintSVG = ({ type }) => {
  const color = type === 'terminator' ? R-UI.danger : R-UI.primary;
  return (
    <svg width="400" height="500" viewBox="0 0 400 500" style={{ filter: `drop-shadow(0 0 10px ${color}44)` }}>
      <rect width="400" height="500" fill="rgba(0, 242, 255, 0.02)" stroke={color} strokeWidth="1" strokeDasharray="5,5" />
      
      {/* Cráneo Robótico */}
      <path d="M120 150 Q 200 80 280 150 L 280 250 Q 200 300 120 250 Z" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="160" cy="180" r="15" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="240" cy="180" r="15" fill="none" stroke={color} strokeWidth="2" />
      {type === 'terminator' && <circle cx="240" cy="180" r="5" fill={color} />}
      
      {/* Circuitos Internos */}
      <path d="M200 100 V150 M150 150 H250 M120 200 H280" stroke={color} strokeWidth="1" opacity="0.5" />
      <rect x="180" y="260" width="40" height="60" fill="none" stroke={color} strokeWidth="2" />
      
      {/* Etiquetas Técnicas */}
      <g fontSize="10" fontFamily="monospace" fill={color}>
        <text x="290" y="140">MODEL: {type === 'terminator' ? 'T-800' : 'SENTINEL-01'}</text>
        <text x="290" y="160">CPU: NEURAL_NET_V4</text>
        <text x="290" y="180">ARMOR: TITANIUM_ALLOY</text>
        <line x1="280" y1="150" x2="290" y2="140" stroke={color} />
      </g>
      
      {/* Animación de escaneo */}
      <line x1="0" y1="0" x2="400" y2="0" stroke={color} strokeWidth="2" opacity="0.8">
        <animate attributeName="y1" values="0;500;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="0;500;0" dur="4s" repeatCount="indefinite" />
      </line>
    </svg>
  );
};

// --- COMPONENTE: COMPARATIVA BIOMIMÉTICA ---
const BiomimeticComparison = () => (
  <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', margin: '4rem 0' }}>
    <div className="benefit-card" style={{ flex: 1, minWidth: '300px', border: `2px solid #bef264` }}>
      <h4 style={{ color: '#bef264' }}>NATURALEZA (Halcón)</h4>
      <svg width="200" height="150" viewBox="0 0 200 150">
        <path d="M20 80 Q 100 20 180 80" fill="none" stroke="#bef264" strokeWidth="3" />
        <path d="M40 80 Q 100 100 160 80" fill="none" stroke="#bef264" strokeWidth="1" opacity="0.5" />
        <text x="100" y="130" fill="white" textAnchor="middle" fontSize="12">Estructura Ósea Ligera</text>
      </svg>
      <p style={{ fontSize: '0.9rem' }}>Los huesos huecos permiten el vuelo. La aerodinámica es pasiva y perfecta.</p>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem' }}>VS</div>

    <div className="benefit-card" style={{ flex: 1, minWidth: '300px', border: `2px solid ${R-UI.primary}` }}>
      <h4 style={{ color: R-UI.primary }}>ROBÓTICA (Avis-Drone)</h4>
      <svg width="200" height="150" viewBox="0 0 200 150">
        <path d="M20 80 L60 60 L140 60 L180 80" fill="none" stroke={R-UI.primary} strokeWidth="3" />
        <circle cx="100" cy="60" r="10" fill="none" stroke={R-UI.primary} />
        <text x="100" y="130" fill="white" textAnchor="middle" fontSize="12">Fibra de Carbono + Motores</text>
      </svg>
      <p style={{ fontSize: '0.9rem' }}>Usa micro-ajustes por milisegundo para mantener el equilibrio. La aerodinámica es activa.</p>
    </div>
  </div>
);

// --- COMPONENTE: ROBOT CARD ---
const RobotCard = ({ name, type, complexity, description, logic }) => (
  <div className="benefit-card" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: `1px solid ${R-UI.primary}44`, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px 20px', background: R-UI.primary, color: '#000', fontWeight: 'bold', fontSize: '0.8rem' }}>
      COMPLEXITY: {complexity}
    </div>
    <h3 style={{ fontSize: '2rem', color: R-UI.primary, marginBottom: '1rem' }}>{name}</h3>
    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{description}</p>
    <div style={{ background: '#000', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
      <code style={{ fontSize: '0.9rem', color: '#10b981' }}>// Kernel Logic:<br/>{logic}</code>
    </div>
  </div>
);

const RobotsMaster = () => {
  const navigate = useNavigate();

  const topRobots = [
    {
      name: "Sentience v1.0 (Jarvis Mode)",
      complexity: "9.8/10",
      description: "Sistema de procesamiento distribuido capaz de gestionar una armadura entera y una casa inteligente simultáneamente.",
      logic: "if (threat_detected) deploy_flares();"
    },
    {
      name: "Ultron-Prime Integration",
      complexity: "10/10",
      description: "Mente colmena basada en vibranium. Cada unidad es un nodo de una sola conciencia global.",
      logic: "all_units.sync_consciousness(target_earth);"
    },
    {
      name: "T-800 Cyberdyne",
      complexity: "8.5/10",
      description: "Endoesqueleto de combate con CPU de aprendizaje. Diseñado para infiltración y durabilidad extrema.",
      logic: "target.track(); while(target.alive) search();"
    },
    {
      name: "Atlas Humanoid (Dynamics)",
      complexity: "9.2/10",
      description: "El rey del equilibrio. 28 articulaciones hidráulicas para realizar parkour y rescate en zonas de desastre.",
      logic: "gyro.stabilize(); adjust_torque(joint_4);"
    },
    {
      name: "Bionic Bird Drone",
      complexity: "7.9/10",
      description: "Robótica suave que imita el aleteo real. El futuro del espionaje y la observación ambiental.",
      logic: "wing.flap(frequency=20Hz); sensor.read();"
    }
  ];

  return (
    <div className="home-container" style={{ background: R-UI.bg, color: '#fff', paddingBottom: '100px' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ padding: '180px 10% 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 200 200">
            <rect x="40" y="40" width="120" height="120" rx="20" fill="none" stroke={R-UI.primary} strokeWidth="8" />
            <circle cx="75" cy="85" r="10" fill={R-UI.primary} />
            <circle cx="125" cy="85" r="10" fill={R-UI.primary} />
            <path d="M70 130 H130" stroke={R-UI.primary} strokeWidth="5" strokeLinecap="round" />
            <path d="M100 20 V40 M40 100 H20 M160 100 H180" stroke={R-UI.primary} strokeWidth="4" />
          </svg>
          <div style={{ textAlign: 'left', maxWidth: '800px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>ROBOTIC <span style={{ color: R-UI.primary }}>GENESIS</span></h1>
            <p className="hero-subtitle" style={{ color: '#94a3b8', fontSize: '1.8rem' }}>"Donde la biología se rinde ante el silicio. Explora los planos de los sistemas más avanzados."</p>
          </div>
        </div>
      </section>

      {/* --- BLUEPRINT SECTION --- */}
      <section className="info-section">
        <h2 className="section-title">Technical <span style={{ color: R-UI.primary }}>Blueprints</span></h2>
        <p className="section-subtitle">Planos de construcción de unidades clase Élite.</p>
        
        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'left', flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '2.5rem', color: R-UI.primary }}>Anatomía Sintética</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#94a3b8' }}>
              Cada robot es una sinfonía de sensores, actuadores y lógica computacional. 
              Mientras que los humanos usamos impulsos químicos, las unidades <b>EDUNEON</b> usan fibra óptica y núcleos de procesamiento cuántico.
            </p>
            <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0, lineHeight: '2.5', fontSize: '1.1rem' }}>
              <li>🔹 <b>Chasis:</b> Aleación de Titanio y Cerámica.</li>
              <li>🔹 <b>Sensores:</b> LiDAR, Visión Térmica y Ultrasónico.</li>
              <li>🔹 <b>IA:</b> Red Neuronal de Aprendizaje Profundo.</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <BlueprintSVG type="sentinel" />
          </div>
        </div>
      </section>

      {/* --- BIOMIMETICS SECTION --- */}
      <section className="info-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '6rem 10%', borderRadius: '60px' }}>
        <h2 className="section-title">Biomimética: <span style={{ color: '#bef264' }}>Machine vs Nature</span></h2>
        <p className="section-subtitle">Copiando la perfección de la naturaleza para crear el robot definitivo.</p>
        <BiomimeticComparison />
      </section>

      {/* --- TOP 5 ROBOTS SECTION --- */}
      <section className="info-section">
        <h2 className="section-title">The <span style={{ color: R-UI.danger }}>Top 5</span> Architectures</h2>
        <p className="section-subtitle">Los sistemas más complejos jamás programados en la historia de la ciencia ficción y la realidad.</p>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginTop: '3rem' }}>
          {topRobots.map((robot, i) => (
            <RobotCard key={i} {...robot} />
          ))}
        </div>
      </section>

      {/* --- TERMINATOR SPECIAL SECTION --- */}
      <section className="info-section">
        <div className="certificate-section" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 60, 0.1), transparent)', border: `1px solid ${R-UI.danger}` }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <BlueprintSVG type="terminator" />
          </div>
          <div className="cert-text" style={{ flex: 1.5 }}>
            <h2 className="section-title" style={{ textAlign: 'left', color: R-UI.danger }}>Infiltración: <span style={{ color: '#fff' }}>T-800 Unit</span></h2>
            <p style={{ fontSize: '1.3rem', color: '#94a3b8', lineHeight: '1.6' }}>
              El epítome de la durabilidad. A diferencia de Jarvis, que es puro procesamiento, el T-800 es ingeniería física pura. 
              Su esqueleto puede resistir temperaturas de hasta 1000°C y su batería dura 120 años.
            </p>
            <div style={{ marginTop: '3rem', padding: '20px', background: '#000', border: `1px dashed ${R-UI.danger}`, color: R-UI.danger, fontFamily: 'monospace' }}>
              CRITICAL ERROR: SYSTEM_OVERRIDE_DETECTED <br/>
              SEARCHING_FOR_JOHN_CONNOR...
            </div>
          </div>
        </div>
      </section>

      {/* --- ROBOTIC LOGIC TABLE --- */}
      <section className="info-section">
        <h2 className="section-title">Hardware <span style={{ color: R-UI.warning }}>Specifications</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0a0a0a', border: '1px solid #333' }}>
            <thead>
              <tr style={{ background: R-UI.warning, color: '#000' }}>
                <th style={{ padding: '20px', textAlign: 'left' }}>COMPONENT</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>BIOLOGICAL COUNTERPART</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>DATA TRANSFER</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: R-UI.warning }}>Micro-Processors</td>
                <td>Human Brain (Neurons)</td>
                <td>4.2 GHz / Core</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: R-UI.warning }}>Servos / Actuators</td>
                <td>Muscles / Tendons</td>
                <td>500 ms Latency</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: R-UI.warning }}>Solid State Drive</td>
                <td>Memory (Hippocampus)</td>
                <td>10 TB / Sec</td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontWeight: 'bold', color: R-UI.warning }}>Global Positioning</td>
                <td>Spatial Awareness</td>
                <td>0.01m Precision</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '60px 0 100px' }}>
        <button 
          className="btn-login" 
          style={{ background: R-UI.primary, color: '#000', padding: '1.5rem 4rem', fontSize: '1.3rem', fontWeight: '900', border: 'none', borderRadius: '15px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          BACK TO MAINFRAME
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-container {
          background-image: 
            linear-gradient(rgba(0, 242, 255, 0.05) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(0, 242, 255, 0.05) 1.5px, transparent 1.5px);
          background-size: 50px 50px;
        }
        
        code {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .benefit-card {
          transition: 0.3s;
        }
        .benefit-card:hover {
          background: rgba(0, 242, 255, 0.05);
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.1);
        }
      `}} />
    </div>
  );
};

export default RobotsMaster;