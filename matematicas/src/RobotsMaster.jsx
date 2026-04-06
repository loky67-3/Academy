import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- PALETA DE COLORES ROBÓTICA ---
const ROBOT_UI = {
  primary: '#00f2ff', // Cyan Neón (Blueprints)
  secondary: '#7000ff', // Púrpura (Ultron Core)
  danger: '#ff003c', // Rojo (Terminator Eye)
  warning: '#f3ff00', // Amarillo (Industrial)
  bg: '#020617'
};

// --- COMPONENTE: DASHBOARD INDUSTRIAL DE AGUACATES ---
const IndustrialAvocadoDashboard = () => {
  const [status, setStatus] = useState('active'); // active, paused, error
  const [processed, setProcessed] = useState(1240);
  const [palletLoad, setPalletLoad] = useState(65);
  const [alert, setAlert] = useState(null);

  // Simulación de datos en vivo
  useEffect(() => {
    if (status !== 'active') return;
    const interval = setInterval(() => {
      setProcessed(p => p + 1);
      setPalletLoad(l => (l >= 100 ? 0 : l + 0.5));
      
      // Simular alerta aleatoria
      if (Math.random() > 0.95) {
        setAlert("CAJA MAL POSICIONADA - SENSOR 04");
        setTimeout(() => setAlert(null), 3000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="industrial-dashboard" style={{
      background: '#0a0a0a',
      borderRadius: '2rem',
      border: `1px solid ${status === 'error' ? ROBOT_UI.danger : '#22c55e44'}`,
      padding: '2rem',
      boxShadow: `0 0 40px ${status === 'active' ? '#22c55e22' : 'rgba(0,0,0,0.5)'}`,
      color: '#fff',
      margin: '4rem 0',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* HEADER / ALERTS - Sustitución de Lucide por Emojis */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#22c55e', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🧠</span> AVOCADO_KERNEL_V2.4
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>LOCATION: SECTOR_7_URUPAN</p>
        </div>
        {alert && (
          <div 
            className="alert-pop"
            style={{ background: ROBOT_UI.danger, padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: `0 0 15px ${ROBOT_UI.danger}66` }}
          >
            <span>⚠️</span> {alert}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', minHeight: '400px' }}>
        
        {/* PANEL IZQUIERDO: ESTADO */}
        <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #ffffff11' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>System Status</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: status === 'active' ? '#22c55e' : (status === 'paused' ? ROBOT_UI.warning : ROBOT_UI.danger), boxShadow: `0 0 10px ${status === 'active' ? '#22c55e' : ROBOT_UI.danger}` }}>
              {status === 'active' && <div className="pulse-indicator" style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e' }} />}
            </div>
            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{status}</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '8px', color: '#94a3b8' }}>
              <span>EFFICIENCY</span>
              <span>94%</span>
            </div>
            <div style={{ height: '6px', background: '#1e293b', borderRadius: '10px' }}>
              <div style={{ height: '100%', background: '#22c55e', borderRadius: '10px', boxShadow: '0 0 10px #22c55e44', width: '94%', transition: 'width 1s ease' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ background: '#000', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '0.9rem' }}>⚡</span> <span style={{ fontSize: '0.7rem' }}>POWER: 4.2kW</span>
            </div>
            <div style={{ background: '#000', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#00f2ff', fontSize: '0.9rem' }}>📈</span> <span style={{ fontSize: '0.7rem' }}>LATENCY: 12ms</span>
            </div>
          </div>
        </div>

        {/* PANEL CENTRAL: VISUALIZACIÓN DEL ROBOT */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle, #111 0%, #000 100%)', borderRadius: '1.5rem', border: '1px solid #ffffff05' }}>
          {/* Grid de fondo */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            {/* Banda Transportadora */}
            <rect x="50" y="240" width="300" height="10" fill="#1e293b" />
            <line 
              x1="50" y1="245" x2="350" y2="245" 
              stroke="#22c55e" strokeWidth="2" strokeDasharray="10,10" 
              style={{ animation: status === 'active' ? 'conveyorFlow 1s linear infinite' : 'none' }} 
            />

            {/* Cajas en la banda */}
            {status === 'active' && [0, 1, 2].map(i => (
              <g key={i} style={{ animation: 'boxMove 4s linear infinite', animationDelay: `${i * 1.5}s` }}>
                <rect x="0" y="210" width="30" height="30" fill="rgba(190, 242, 100, 0.2)" stroke="#bef264" />
                <text x="15" y="230" fill="#bef264" fontSize="6" textAnchor="middle">AVO</text>
              </g>
            ))}

            {/* BRAZO ROBÓTICO NEÓN */}
            <g transform="translate(200, 240)">
              <rect x="-30" y="0" width="60" height="20" fill="#1e293b" />
              
              <g style={{ 
                transformOrigin: '0 0', 
                animation: status === 'active' ? 'armSwing 3s ease-in-out infinite' : 'none' 
              }}>
                <rect x="-5" y="-100" width="10" height="100" fill={ROBOT_UI.primary} />
                <path d="M5 -80 Q 30 -50 5 0" fill="none" stroke={ROBOT_UI.primary} strokeWidth="1" strokeDasharray="4,2" style={{ animation: 'hoseFlow 0.5s linear infinite' }} opacity="0.5" />
                
                <g transform="translate(0, -100)">
                  <circle r="12" fill="#000" stroke={ROBOT_UI.warning} strokeWidth="2" />
                  <g style={{ 
                    transformOrigin: '0 0', 
                    animation: status === 'active' ? 'jointSwing 3s ease-in-out infinite' : 'none' 
                  }}>
                    <rect x="-4" y="-80" width="8" height="80" fill={ROBOT_UI.primary} />
                    
                    <g transform="translate(0, -80)">
                      <path d="M-15 0 L15 0 M-15 0 L-10 15 M15 0 L10 15" stroke={ROBOT_UI.danger} strokeWidth="3" />
                      <line x1="0" y1="0" x2="0" y2="100" stroke={ROBOT_UI.primary} strokeWidth="1" style={{ animation: 'laserFlicker 0.2s infinite' }} />
                    </g>
                  </g>
                </g>
              </g>
            </g>

            {/* Tarima (Pallet) */}
            <g transform="translate(300, 240)">
              <rect x="0" y="0" width="60" height="10" fill="#475569" />
              {/* Cajas apiladas */}
              <rect x="5" y="-20" width="20" height="20" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" />
              <rect x="30" y="-20" width="20" height="20" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" />
              {palletLoad > 50 && <rect x="15" y="-40" width="20" height="20" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" />}
            </g>
          </svg>

          {/* Overlay de Datos en el visual */}
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.6rem', color: ROBOT_UI.primary, fontFamily: 'monospace' }}>
            AUTO_SCAN: ENABLED <br/>
            TORQUE_LIMIT: 45Nm
          </div>
        </div>

        {/* PANEL DERECHO: REAL TIME DATA */}
        <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #ffffff11' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Metrics</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', marginBottom: '5px' }}>
              <span>📦</span> <span style={{ fontSize: '0.7rem' }}>PROCESSED</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>{processed.toLocaleString()}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
            <div style={{ background: '#000', padding: '10px', borderRadius: '10px' }}>
              <div style={{ color: '#00f2ff', fontSize: '0.8rem' }}>⏱️</div>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>SPEED</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>42 c/m</div>
            </div>
            <div style={{ background: '#000', padding: '10px', borderRadius: '10px' }}>
              <div style={{ color: ROBOT_UI.danger, fontSize: '0.8rem' }}>🌡️</div>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>TEMP</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>38.4°C</div>
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '8px' }}>
              <span>PALLET CAPACITY</span>
              <span style={{ color: '#22c55e' }}>{Math.round(palletLoad)}%</span>
            </div>
            <div style={{ height: '15px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', display: 'flex', gap: '2px', padding: '2px' }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{ flex: 1, background: (i * 10) < palletLoad ? '#22c55e' : '#0f172a', borderRadius: '1px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PANEL INFERIOR: CONTROLES */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setStatus('active')}
          className={`control-btn ${status === 'active' ? 'active' : ''}`}
          style={{ background: '#22c55e', color: '#000' }}
        >
          <span style={{ fontSize: '1.1rem' }}>▶️</span> START SYSTEM
        </button>
        <button 
          onClick={() => setStatus('paused')}
          className={`control-btn ${status === 'paused' ? 'active' : ''}`}
          style={{ border: '1px solid #ffffff22', color: '#fff' }}
        >
          <span style={{ fontSize: '1.1rem' }}>⏸️</span> PAUSE
        </button>
        <button 
          onClick={() => { setProcessed(0); setPalletLoad(0); setStatus('paused'); }}
          className="control-btn"
          style={{ border: '1px solid #ffffff22', color: '#94a3b8' }}
        >
          <span style={{ fontSize: '1.1rem' }}>🔄</span> RESET
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .control-btn {
          padding: 0.8rem 2rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: 0.3s;
          background: transparent;
        }
        .control-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(34, 197, 94, 0.2); }
        .control-btn.active { box-shadow: 0 0 20px #22c55e66; }
      `}} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes alert-pop {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .alert-pop { animation: alert-pop 0.3s ease-out; }

        @keyframes pulse-indicator {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .pulse-indicator { animation: pulse-indicator 2s infinite; }

        @keyframes conveyorFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }

        @keyframes boxMove {
          from { transform: translateX(-50px); }
          to { transform: translateX(450px); }
        }

        @keyframes armSwing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }

        @keyframes jointSwing {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(90deg); }
        }

        @keyframes hoseFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 10; } }
        @keyframes laserFlicker { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } }
      `}} />
    </div>
  );
};

// --- COMPONENTE: BRAZO AGUACATERO (AVOCADO MASTER) ---
const AvocadoArmSVG = () => (
  <svg width="400" height="350" viewBox="0 0 400 350" style={{ filter: `drop-shadow(0 0 15px ${ROBOT_UI.primary}66)` }}>
    {/* Base Rotatoria */}
    <rect x="150" y="300" width="100" height="30" rx="5" fill="none" stroke={ROBOT_UI.primary} strokeWidth="4" />
    {/* Eje Principal */}
    <path d="M200 300 L200 200" stroke={ROBOT_UI.primary} strokeWidth="12" strokeLinecap="round" />
    {/* Articulación Hidráulica */}
    <circle cx="200" cy="200" r="15" fill={ROBOT_UI.bg} stroke={ROBOT_UI.warning} strokeWidth="4" />
    
    {/* Brazo Extensor */}
    <g transform="rotate(-30, 200, 200)">
      <rect x="190" y="50" width="20" height="150" rx="10" fill="none" stroke={ROBOT_UI.primary} strokeWidth="4" />
      {/* Pinza Especial (Gripper de Cajas) */}
      <path d="M180 50 L220 50 M180 50 L170 20 M220 50 L230 20" stroke={ROBOT_UI.danger} strokeWidth="6" strokeLinecap="round" />
      {/* Caja de Aguacates (Representación) */}
      <rect x="160" y="-30" width="80" height="40" fill="rgba(190, 242, 100, 0.2)" stroke="#bef264" strokeWidth="2" />
      <text x="200" y="-5" fill="#bef264" fontSize="10" textAnchor="middle" fontWeight="bold">FRUIT_BOX</text>
    </g>

    {/* Líneas de Escaneo de Carga */}
    <line x1="50" y1="100" x2="350" y2="100" stroke={ROBOT_UI.primary} strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
    <text x="50" y="90" fill={ROBOT_UI.primary} fontSize="10" fontFamily="monospace">LOAD_SENSOR: ACTIVE</text>
  </svg>
);

// --- COMPONENTE: PLACA CONTROLADORA (ESP32 NEON) ---
const ControllerBoardSVG = () => (
  <svg width="300" height="200" viewBox="0 0 300 200">
    <rect x="50" y="20" width="200" height="160" rx="10" fill="#1e293b" stroke={ROBOT_UI.primary} strokeWidth="3" />
    {/* Microprocesador */}
    <rect x="110" y="60" width="80" height="80" fill="#020617" stroke={ROBOT_UI.warning} strokeWidth="2" />
    <text x="150" y="105" fill={ROBOT_UI.warning} fontSize="14" textAnchor="middle" fontWeight="bold">ESP32-D32</text>
    {/* Pines de Conexión */}
    {[0, 1, 2, 3, 4, 5].map(i => (
      <React.Fragment key={i}>
        <rect x="35" y={40 + i*25} width="15" height="10" fill={ROBOT_UI.primary} />
        <rect x="250" y="40 + i*25" width="15" height="10" fill={ROBOT_UI.primary} />
      </React.Fragment>
    ))}
    <text x="150" y="170" fill={ROBOT_UI.primary} fontSize="10" textAnchor="middle">DUAL-CORE RTOS ENGINE</text>
  </svg>
);

// --- SECCIÓN DE AGRO-BOTICA ---
const AvocadoMasterSection = () => (
  <section className="info-section" style={{ background: 'rgba(0, 242, 255, 0.03)', padding: '5rem 10%', borderRadius: '60px', border: `2px solid ${ROBOT_UI.primary}33`, marginTop: '4rem' }}>
    <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#fff', textAlign: 'left', marginBottom: '1rem' }}>
      AVOCADO MASTER <span style={{ color: '#bef264' }}>3000</span>
    </h2>
    <p style={{ fontSize: '1.5rem', color: '#94a3b8', textAlign: 'left', marginBottom: '4rem' }}>
      Diseñado para la industria agrícola. Este brazo utiliza <b>soft-robotics</b> para vaciar cajas sin dañar la maduración del fruto.
    </p>

    <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <AvocadoArmSVG />
        <div className="benefit-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h4 style={{ color: ROBOT_UI.warning }}>HARDWARE DE CONTROL</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <b>Placa Principal:</b> ESP32 WROOM (Dual Core).<br/>
            <b>Actuadores:</b> Servos Industriales con feedback de torque.<br/>
            <b>Sensores:</b> Celda de carga (para peso) y cámara TOF (para distancia).
          </p>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <ControllerBoardSVG />
          </div>
        </div>
      </div>

      <div style={{ flex: 1.5, minWidth: '350px' }}>
        <h3 style={{ color: ROBOT_UI.primary, fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'left' }}>Programación Estructurada (C++)</h3>
        <div style={{ background: '#000', borderRadius: '25px', border: `3px solid ${ROBOT_UI.primary}`, padding: '30px', textAlign: 'left' }}>
          <pre style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'monospace', lineHeight: '1.6', margin: 0 }}>
            <code>{`class BrazoAcuacatero {
  public:
    void inicializar() {
      Serial.begin(115200);
      motorX.attach(PIN_1);
      sensorPeso.begin();
    }

    void vaciarCaja() {
      if(detectarCaja()) {
        sujetarConSuavidad();
        inclinarLento(45); // Ángulo de descarga
        esperarVaciado();
        regresarABase();
      }
    }
};`}</code>
          </pre>
        </div>
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'left' }}>
          <h4 style={{ color: ROBOT_UI.primary }}>Lógica de Métodos:</h4>
          <ul style={{ color: '#94a3b8', lineHeight: '2' }}>
            <li>🔹 <b>sujetarConSuavidad():</b> Controla el PWM para no aplastar la caja.</li>
            <li>🔹 <b>inclinarLento():</b> Usa una curva de aceleración (S-Curve) para evitar caídas bruscas.</li>
            <li>🔹 <b>DualCore:</b> El núcleo 0 maneja los motores, el núcleo 1 procesa los aguacates.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE: PLANO TÉCNICO (BLUEPRINT) ---
const BlueprintSVG = ({ type }) => {
  const color = type === 'terminator' ? ROBOT_UI.danger : ROBOT_UI.primary;
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

    <div className="benefit-card" style={{ flex: 1, minWidth: '300px', border: `2px solid ${ROBOT_UI.primary}` }}>
      <h4 style={{ color: ROBOT_UI.primary }}>ROBÓTICA (Avis-Drone)</h4>
      <svg width="200" height="150" viewBox="0 0 200 150">
        <path d="M20 80 L60 60 L140 60 L180 80" fill="none" stroke={ROBOT_UI.primary} strokeWidth="3" />
        <circle cx="100" cy="60" r="10" fill="none" stroke={ROBOT_UI.primary} />
        <text x="100" y="130" fill="white" textAnchor="middle" fontSize="12">Fibra de Carbono + Motores</text>
      </svg>
      <p style={{ fontSize: '0.9rem' }}>Usa micro-ajustes por milisegundo para mantener el equilibrio. La aerodinámica es activa.</p>
    </div>
  </div>
);

// --- COMPONENTE: ROBOT CARD ---
const RobotCard = ({ name, type, complexity, description, logic }) => (
  <div className="benefit-card" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: `1px solid ${ROBOT_UI.primary}44`, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px 20px', background: ROBOT_UI.primary, color: '#000', fontWeight: 'bold', fontSize: '0.8rem' }}>
      COMPLEXITY: {complexity}
    </div>
    <h3 style={{ fontSize: '2rem', color: ROBOT_UI.primary, marginBottom: '1rem' }}>{name}</h3>
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
    <div className="home-container" style={{ background: ROBOT_UI.bg, color: '#fff', paddingBottom: '100px' }}>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ padding: '180px 10% 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <svg width="180" height="180" viewBox="0 0 200 200">
            <rect x="40" y="40" width="120" height="120" rx="20" fill="none" stroke={ROBOT_UI.primary} strokeWidth="8" />
            <circle cx="75" cy="85" r="10" fill={ROBOT_UI.primary} />
            <circle cx="125" cy="85" r="10" fill={ROBOT_UI.primary} />
            <path d="M70 130 H130" stroke={ROBOT_UI.primary} strokeWidth="5" strokeLinecap="round" />
            <path d="M100 20 V40 M40 100 H20 M160 100 H180" stroke={ROBOT_UI.primary} strokeWidth="4" />
          </svg>
          <div style={{ textAlign: 'left', maxWidth: '800px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>ROBOTIC <span style={{ color: ROBOT_UI.primary }}>GENESIS</span></h1>
            <p className="hero-subtitle" style={{ color: '#94a3b8', fontSize: '1.8rem' }}>"Donde la biología se rinde ante el silicio. Explora los planos de los sistemas más avanzados."</p>
          </div>
        </div>
      </section>

      {/* --- LIVE INDUSTRIAL DASHBOARD --- */}
      <IndustrialAvocadoDashboard />

      {/* --- NUEVA SECCIÓN: INDUSTRIAL AVOCADO ARM --- */}
      <AvocadoMasterSection />

      {/* --- BLUEPRINT SECTION --- */}
      <section className="info-section">
        <h2 className="section-title">Technical <span style={{ color: ROBOT_UI.primary }}>Blueprints</span></h2>
        <p className="section-subtitle">Planos de construcción de unidades clase Élite.</p>
        
        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'left', flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '2.5rem', color: ROBOT_UI.primary }}>Anatomía Sintética</h3>
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
        <h2 className="section-title">The <span style={{ color: ROBOT_UI.danger }}>Top 5</span> Architectures</h2>
        <p className="section-subtitle">Los sistemas más complejos jamás programados en la historia de la ciencia ficción y la realidad.</p>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginTop: '3rem' }}>
          {topRobots.map((robot, i) => (
            <RobotCard key={i} {...robot} />
          ))}
        </div>
      </section>

      {/* --- TERMINATOR SPECIAL SECTION --- */}
      <section className="info-section">
        <div className="certificate-section" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 60, 0.1), transparent)', border: `1px solid ${ROBOT_UI.danger}` }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <BlueprintSVG type="terminator" />
          </div>
          <div className="cert-text" style={{ flex: 1.5 }}>
            <h2 className="section-title" style={{ textAlign: 'left', color: ROBOT_UI.danger }}>Infiltración: <span style={{ color: '#fff' }}>T-800 Unit</span></h2>
            <p style={{ fontSize: '1.3rem', color: '#94a3b8', lineHeight: '1.6' }}>
              El epítome de la durabilidad. A diferencia de Jarvis, que es puro procesamiento, el T-800 es ingeniería física pura. 
              Su esqueleto puede resistir temperaturas de hasta 1000°C y su batería dura 120 años.
            </p>
            <div style={{ marginTop: '3rem', padding: '20px', background: '#000', border: `1px dashed ${ROBOT_UI.danger}`, color: ROBOT_UI.danger, fontFamily: 'monospace' }}>
              CRITICAL ERROR: SYSTEM_OVERRIDE_DETECTED <br/>
              SEARCHING_FOR_JOHN_CONNOR...
            </div>
          </div>
        </div>
      </section>

      {/* --- ROBOTIC LOGIC TABLE --- */}
      <section className="info-section">
        <h2 className="section-title">Hardware <span style={{ color: ROBOT_UI.warning }}>Specifications</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0a0a0a', border: '1px solid #333' }}>
            <thead>
              <tr style={{ background: ROBOT_UI.warning, color: '#000' }}>
                <th style={{ padding: '20px', textAlign: 'left' }}>COMPONENT</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>BIOLOGICAL COUNTERPART</th>
                <th style={{ padding: '20px', textAlign: 'left' }}>DATA TRANSFER</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: ROBOT_UI.warning }}>Micro-Processors</td>
                <td>Human Brain (Neurons)</td>
                <td>4.2 GHz / Core</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: ROBOT_UI.warning }}>Servos / Actuators</td>
                <td>Muscles / Tendons</td>
                <td>500 ms Latency</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '20px', fontWeight: 'bold', color: ROBOT_UI.warning }}>Solid State Drive</td>
                <td>Memory (Hippocampus)</td>
                <td>10 TB / Sec</td>
              </tr>
              <tr>
                <td style={{ padding: '20px', fontWeight: 'bold', color: ROBOT_UI.warning }}>Global Positioning</td>
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
          style={{ background: ROBOT_UI.primary, color: '#000', padding: '1.5rem 4rem', fontSize: '1.3rem', fontWeight: '900', border: 'none', borderRadius: '15px', cursor: 'pointer' }}
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