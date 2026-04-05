import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// --- PERSONAJES SVG DE ELITE ---
const Avatar = ({ type, color = "#0ea5e9", size = 120 }) => {
  const icons = {
    ironman: ( // Master en Programación
      <g transform="translate(10,10) scale(0.8)">
        <path d="M50 5 L20 20 L20 60 Q20 90 50 95 Q80 90 80 60 L80 20 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
        <path d="M35 30 L65 30 L70 50 L30 50 Z" fill="#facc15" stroke="#7f1d1d" strokeWidth="1" />
        <rect x="38" y="38" width="8" height="4" rx="2" fill="white" style={{filter: 'drop-shadow(0 0 5px white)'}} />
        <rect x="54" y="38" width="8" height="4" rx="2" fill="white" style={{filter: 'drop-shadow(0 0 5px white)'}} />
        <circle cx="50" cy="75" r="10" fill="white" stroke="#38bdf8" strokeWidth="2" style={{filter: 'drop-shadow(0 0 8px #38bdf8)'}} />
        <path d="M10 40 L0 30 M90 40 L100 30" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
    owl: ( // Maestro de Historia
      <g transform="translate(10,10) scale(0.8)">
        <circle cx="50" cy="60" r="38" fill="#a855f7" />
        <circle cx="35" cy="55" r="14" fill="white" />
        <circle cx="65" cy="55" r="14" fill="white" />
        <circle cx="35" cy="55" r="5" fill="#1e293b" />
        <circle cx="65" cy="55" r="5" fill="#1e293b" />
        <path d="M45 65 L50 78 L55 65" fill="#fb923c" />
        <path d="M20 20 L80 20 L95 40 L5 40 Z" fill="#1e293b" />
        <path d="M95 40 L95 60" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 95 Q50 105 70 95" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
    ),
    robot: ( // Genio de las Matemáticas
      <g transform="translate(10,10) scale(0.8)">
        <rect x="20" y="30" width="60" height="55" rx="15" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
        <rect x="28" y="38" width="44" height="38" rx="10" fill="#020617" />
        <text x="50" y="65" fill="#38bdf8" fontSize="22" textAnchor="middle" fontWeight="900" style={{fontFamily: 'monospace'}}>π</text>
        <circle cx="50" cy="15" r="6" fill="#ef4444" style={{filter: 'drop-shadow(0 0 5px #ef4444)'}} />
        <path d="M50 15 L50 30" stroke="#0ea5e9" strokeWidth="3" />
        <path d="M30 85 L20 100 M70 85 L80 100" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
    explorer: ( // Sabio de Geometría
      <g transform="translate(10,10) scale(0.8)">
        <circle cx="50" cy="60" r="35" fill="#10b981" />
        <path d="M15 50 Q50 10 85 50" fill="#fb923c" />
        <rect x="10" y="50" width="80" height="10" rx="5" fill="#fb923c" />
        <circle cx="38" cy="65" r="4" fill="white" />
        <circle cx="62" cy="65" r="4" fill="white" />
        <path d="M45 82 Q50 88 55 82" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50 10 V30" stroke="#ef4444" strokeWidth="2" />
      </g>
    ),
    hero: ( // Campeón de Inglés
      <g transform="translate(10,10) scale(0.8)">
        <path d="M20 30 Q50 10 80 30 L85 80 Q50 95 15 80 Z" fill="#ec4899" />
        <path d="M30 35 L70 35 L75 55 L25 55 Z" fill="#fdf2f8" opacity="0.3" />
        <circle cx="40" cy="45" r="5" fill="white" />
        <circle cx="60" cy="45" r="5" fill="white" />
        <text x="50" y="80" fill="white" fontSize="24" fontWeight="900" textAnchor="middle">A</text>
        <path d="M10 30 L0 10 M90 30 L100 10" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
    wizard: ( // Mago del DOM
      <g transform="translate(10,10) scale(0.8)">
        <path d="M50 5 L90 85 H10 Z" fill="#38bdf8" />
        <circle cx="50" cy="65" r="25" fill="rgba(2, 6, 23, 0.5)" />
        <path d="M40 60 L60 70 M40 70 L60 60" stroke="#bef264" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 85 Q50 100 90 85" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="35" r="4" fill="#bef264" style={{filter: 'drop-shadow(0 0 5px #bef264)'}} />
      </g>
    ),
    database: ( // Experto en SQL
      <g transform="translate(10,10) scale(0.8)">
        <rect x="15" y="20" width="70" height="22" rx="5" fill="#00ff41" opacity="0.8" />
        <rect x="15" y="45" width="70" height="22" rx="5" fill="#00ff41" opacity="0.8" />
        <rect x="15" y="70" width="70" height="22" rx="5" fill="#00ff41" opacity="0.8" />
        <circle cx="25" cy="31" r="4" fill="white" />
        <circle cx="25" cy="56" r="4" fill="white" />
        <circle cx="25" cy="81" r="4" fill="white" />
        <path d="M60 31 H75 M60 56 H75 M60 81 H75" stroke="black" strokeWidth="3" strokeLinecap="round" />
      </g>
    ),
    anatomy: ( // Experto en Biología
      <g transform="translate(10,10) scale(0.8)">
        <path d="M50 10 Q70 10 70 30 Q70 50 50 50 Q30 50 30 30 Q30 10 50 10" fill="#22d3ee" opacity="0.8" />
        <rect x="45" y="50" width="10" height="40" fill="white" />
        <path d="M30 60 L70 60 M30 80 L70 80" stroke="white" strokeWidth="4" />
        <circle cx="50" cy="30" r="5" fill="white" />
      </g>
    ),
    dragon: ( // Guardián de Algoritmos
      <g transform="translate(10,10) scale(0.8)">
        <path d="M20 80 Q 50 10 80 80 L 50 60 Z" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)" />
        <path d="M30 50 Q 50 20 70 50" fill="none" stroke="#064e3b" strokeWidth="4" />
        <circle cx="40" cy="45" r="3" fill="white" />
        <circle cx="60" cy="45" r="3" fill="white" />
        <path d="M20 80 L10 95 M80 80 L90 95" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
      </g>
    ),
    phoenix: ( // Espíritu de React
      <g transform="translate(10,10) scale(0.8)">
        <path d="M50 20 Q 90 40 50 90 Q 10 40 50 20" fill="url(#grad-fire)" />
        <path d="M30 40 Q 0 60 20 80 M70 40 Q 100 60 80 80" stroke="#f43f5e" strokeWidth="4" fill="none" />
        <circle cx="50" cy="45" r="5" fill="white" />
        <defs>
          <linearGradient id="grad-fire" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#f43f5e', stopOpacity:1}} />
          </linearGradient>
        </defs>
      </g>
    ),
    kraken: ( // Maestro de Datos (SQL)
      <g transform="translate(10,10) scale(0.8)">
        <path d="M30 30 Q 50 10 70 30 L 70 60 Q 50 80 30 60 Z" fill="#0ea5e9" />
        <path d="M30 60 Q 10 90 30 95 M40 65 Q 40 95 50 90 M60 65 Q 60 95 70 90 M70 60 Q 90 90 70 95" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="45" cy="40" r="4" fill="white" />
        <circle cx="55" cy="40" r="4" fill="white" />
      </g>
    ),
    centaur: ( // Arquitecto C++
      <g transform="translate(10,10) scale(0.8)">
        <path d="M30 50 L70 50 L80 90 L20 90 Z" fill="#64748b" />
        <rect x="40" y="20" width="20" height="30" rx="5" fill="#94a3b8" />
        <circle cx="50" cy="25" r="10" fill="#cbd5e1" />
        <path d="M40 35 H60 M70 10 L80 30" stroke="#f43f5e" strokeWidth="4" />
      </g>
    )
  };

  return (
    <div style={{ transition: '0.3s transform ease' }} className="avatar-hover">
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 12px ${color}66)` }}>
        {icons[type] || icons.math}
      </svg>
    </div>
  );
};

// --- NUEVA SECCIÓN DE CATEGORÍA ---
const SubjectShowcase = ({ title, description, image, color, link, type }) => (
  <div className="benefit-card subject-showcase-card" style={{
    display: 'flex', 
    flexDirection: 'column', 
    padding: 0, 
    overflow: 'hidden', 
    border: `1px solid ${color}44`,
    background: 'rgba(2, 6, 23, 0.8)',
    textAlign: 'left'
  }}>
    <div style={{ 
      height: '200px', 
      backgroundImage: `linear-gradient(to bottom, transparent, #020617), url(${image})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '20px'
    }}>
      <Avatar type={type} color={color} size={60} />
    </div>
    <div style={{ padding: '25px' }}>
      <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>{description}</p>
      <Link to={link || "#"} className="btn-login" style={{ 
        background: color, 
        color: '#020617', 
        textDecoration: 'none', 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '10px',
        fontWeight: 'bold'
      }}>
        Empezar Masterclass
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
      </Link>
    </div>
  </div>
);

// --- FOOTER DE ALTO NIVEL ---
const Footer = () => (
  <footer style={{ background: '#000', padding: '80px 10% 40px', borderTop: '1px solid #1e293b', marginTop: '100px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '60px', textAlign: 'left' }}>
      <div>
        <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>EDUNEON</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>La plataforma educativa del futuro. Dominamos la tecnología y la ciencia para potenciar tu mente.</p>
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: '20px' }}>Cursos Top</h4>
        <ul style={{ listStyle: 'none', padding: 0, color: '#94a3b8', lineHeight: '2.5' }}>
          <li><Link to="/python" style={{ color: 'inherit', textDecoration: 'none' }}>Python Avanzado</Link></li>
          <li><Link to="/ingles" style={{ color: 'inherit', textDecoration: 'none' }}>Inglés Nativo</Link></li>
          <li><Link to="/cpp" style={{ color: 'inherit', textDecoration: 'none' }}>Arquitectura C++</Link></li>
          <li><Link to="/algebra" style={{ color: 'inherit', textDecoration: 'none' }}>Álgebra Lineal</Link></li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: '20px' }}>Comunidad</h4>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', background: '#1e293b', borderRadius: '50%' }}></div>
          <div style={{ width: '40px', height: '40px', background: '#1e293b', borderRadius: '50%' }}></div>
          <div style={{ width: '40px', height: '40px', background: '#1e293b', borderRadius: '50%' }}></div>
        </div>
      </div>
    </div>
    <div style={{ pt: '40px', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#475569', fontSize: '0.9rem' }}>
      © 2024 EDUNEON Academy. Todos los derechos reservados.
    </div>
  </footer>
);

const Home = () => {
  return (
    <div className="home-container">
      {/* Luces neón de fondo */}
      <div className="neon-glow-bg" style={{ top: '-15%', left: '15%', background: 'radial-gradient(circle, rgba(0, 210, 255, 0.12) 0%, transparent 70%)' }}></div>
      <div className="neon-glow-bg" style={{ bottom: '-10%', right: '10%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)' }}></div>
      
      <Navbar />

      <div className="scanline"></div>

      <section className="hero-section" style={{ padding: 'clamp(140px, 18vh, 200px) 5% 100px' }}>
        <div className="hero-content">
          <div className="hero-badge" style={{ background: 'rgba(0, 210, 255, 0.1)', border: '1px solid var(--neon-blue)', padding: '8px 20px', borderRadius: '50px', color: 'var(--neon-blue)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            CORE ENGINE V2.0 // ONLINE
          </div>
          <h1 className="hero-title" style={{ position: 'relative' }}>
            Domina el <span className="gradient-text">Futuro Digital</span>
            <div style={{ position: 'absolute', top: '-20px', right: '-40px', opacity: 0.5, transform: 'rotate(15deg)' }} className="mobile-hide">
              <svg width="60" height="60" viewBox="0 0 100 100"><path d="M10 50 L90 50 M50 10 L50 90" stroke="var(--neon-blue)" strokeWidth="2" opacity="0.3" /></svg>
            </div>
          </h1>
          
          <p className="hero-subtitle">
            La convergencia definitiva entre <strong>Ciencia</strong>, <strong>Lógica</strong> y <strong>Código</strong>.<br/>
            Desbloquea tu potencial con interfaces inmersivas y tutores robóticos.
          </p>

          <div className="hero-benefits">
            <span className="benefit-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginRight: '8px'}}><path d="M20 6 9 17l-5-5"/></svg>
              +500 Clases
            </span>
            <span className="benefit-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px'}}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Certificado Pro
            </span>
            <span className="benefit-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px'}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Acceso Vitalicio
            </span>
          </div>

          <div style={{ marginTop: '25px' }}>
            <button className="btn-login" style={{ fontSize: '1.1rem', padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Iniciar Sincronización
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Mascota Flotante Hero */}
        <div className="mobile-hide" style={{ position: 'absolute', right: '8%', top: '22vh', animation: 'float 8s ease-in-out infinite', pointerEvents: 'none' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle, var(--neon-blue-glow) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1 }}></div>
            <Avatar type="robot" size={320} color="var(--neon-blue)" />
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">¿Por qué EDUNEON es diferente?</h2>
        <p className="section-subtitle">Hemos revolucionado la forma de aprender matemáticas e idiomas combinando ciencia cognitiva con tecnología de vanguardia.</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg className="benefit-icon" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--neon-purple)" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.71-2.13s-1.29 0-2.13-.71Z"/><path d="m12 13-4 4.5M12 13c-1.17 1-2.5 2.5-2.5 2.5s-1.5 1.33-2.5 2.5"/><path d="M13 12c.11-1.28.45-2.43 1.02-3.47a11.1 11.1 0 0 1 2.57-3.23 1 1 0 0 1 1.03-.13l1.8.84a1 1 0 0 1 .45 1.31l-1.3 2.72c-.44.92-.72 1.9-.84 2.91a27.1 27.1 0 0 1-.22 3.12 1 1 0 0 1-1.01.93l-2.55-.1a1 1 0 0 1-.95-.91Z"/></svg>
            <h3>Método Acelerado</h3>
            <p>Aprende el doble de rápido con nuestras rutas de aprendizaje optimizadas por IA.</p>
          </div>
          <div className="benefit-card">
            <svg className="benefit-icon" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '1rem'}}>
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.88A2.5 2.5 0 0 1 9.5 2Z"></path>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.88A2.5 2.5 0 0 0 14.5 2Z"></path>
            </svg>
            <h3>Lógica Aplicada</h3>
            <p>No memorices, entiende. Aplicamos lógica de programación a todas nuestras materias.</p>
          </div>
          <div className="benefit-card">
            <svg className="benefit-icon" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <h3>Comunidad Global</h3>
            <p>Resuelve dudas en tiempo real con miles de estudiantes y mentores expertos.</p>
          </div>
        </div>
      </section>

      <section className="certificate-section">
        <div className="cert-text">
          <h2 className="section-title" style={{textAlign: 'left'}}>Certificados Profesionales <span className="gradient-text">Gratis</span></h2>
          <p className="hero-subtitle" style={{textAlign: 'left'}}>Al finalizar cada curso, obtendrás un certificado digital verificable. Dale valor a tu currículum y demuestra tus nuevas habilidades al mundo sin costo adicional.</p>
          <ul style={{listStyle: 'none', padding: 0, color: 'var(--text-secondary)'}}>
            <li style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3" style={{marginRight: '10px'}}><path d="M20 6 9 17l-5-5"/></svg>
              Código QR de verificación
            </li>
            <li style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3" style={{marginRight: '10px'}}><path d="M20 6 9 17l-5-5"/></svg>
              Compatible con LinkedIn
            </li>
            <li style={{display: 'flex', alignItems: 'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" strokeWidth="3" style={{marginRight: '10px'}}><path d="M20 6 9 17l-5-5"/></svg>
              Descarga en alta resolución
            </li>
          </ul>
        </div>
        <div className="cert-preview">
          <div style={{textAlign: 'center', border: '1px solid #e2e8f0', padding: '2rem', position: 'relative', background: 'white'}}>
            <div style={{position: 'absolute', top: '15px', right: '15px', textAlign: 'right'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2"><rect width="5" height="5" x="3" y="3"/><rect width="5" height="5" x="16" y="3"/><rect width="5" height="5" x="3" y="16"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
              <span style={{fontSize: '0.5rem', color: '#64748b', display: 'block'}}>ID: EDN-2024-883</span>
            </div>
            
            <h4 style={{margin: 0, textTransform: 'uppercase', color: '#1e293b', fontSize: '0.9rem', letterSpacing: '2px'}}>Diploma de Excelencia</h4>
            <div style={{width: '50px', height: '2px', background: '#0ea5e9', margin: '10px auto'}}></div>
            
            <p style={{fontSize: '0.7rem', color: '#64748b', margin: '15px 0 5px'}}>Este documento certifica que:</p>
            <h3 style={{fontFamily: 'serif', margin: '5px 0', color: '#0f172a', fontSize: '1.8rem', fontStyle: 'italic'}}>Julian Sterling</h3>
            
            <p style={{fontSize: '0.72rem', color: '#475569', lineHeight: '1.4', margin: '15px 0'}}>
              Ha demostrado maestría absoluta en los fundamentos de <strong>Lógica Computacional, Estructuras Matemáticas Avanzadas</strong> 
              y fluidez técnica en el idioma Inglés, completando satisfactoriamente el programa de formación intensiva.
            </p>

            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <div style={{textAlign: 'left'}}>
                <div style={{fontSize: '0.7rem', borderTop: '1px solid #ccc', paddingTop: '5px', marginTop: '10px'}}>Dr. Aris Thorne</div>
                <div style={{fontSize: '0.5rem', color: '#94a3b8'}}>Director Académico</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '0.7rem', borderTop: '1px solid #ccc', paddingTop: '5px', marginTop: '10px'}}>24 Marzo, 2024</div>
                <div style={{fontSize: '0.5rem', color: '#94a3b8'}}>Fecha de Emisión</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="section-title">Explora las <span className="gradient-text">Dimensiones del Saber</span></h2>
        <p className="section-subtitle">Hemos dividido nuestro universo en sectores especializados para tu crecimiento.</p>
        
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <SubjectShowcase 
            type="dragon" color="#10b981" title="Matemáticas & Álgebra" 
            description="Desde la aritmética básica hasta el cálculo avanzado. Domina la X y resuelve el universo."
            image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600"
            link="/matematicas"
          />
          <SubjectShowcase 
            type="ironman" color="#ffd43b" title="Programación Pro" 
            description="Python, C++ y JavaScript. Construye aplicaciones, videojuegos e Inteligencia Artificial."
            image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600"
            link="/python"
          />
          <SubjectShowcase 
            type="owl" color="#a855f7" title="Historia & Conquistas" 
            description="Viaja al pasado. La caída de Tenochtitlán, la formación de México y las guerras mundiales."
            image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600"
            link="#"
          />
          <SubjectShowcase 
            type="owl" color="#a855f7" title="Geometría & Espacio" 
            description="Ángulos, volúmenes y trigonometría. Entiende las formas que rigen la arquitectura moderna."
            image="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600"
            link="/geometria"
          />
          <SubjectShowcase 
            type="hero" color="#ec4899" title="Inglés Inmersivo" 
            description="Fluidez total. Aprende verbos, gramática y pronunciación con nuestros tutores robóticos."
            image="https://images.unsplash.com/photo-1543167664-40d699fd53b0?q=80&w=600"
            link="/ingles"
          />
          <SubjectShowcase 
            type="phoenix" color="#f43f5e" title="React Engine" 
            description="Domina el framework más potente del mundo. Hooks, Routing y conexión masiva con Firebase."
            image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600"
            link="/react"
          />
          <SubjectShowcase 
            type="kraken" color="#0ea5e9" title="SQL Master" 
            description="Arquitectura de bases de datos. Aprende a manipular millones de registros con el poder de las consultas relacionales."
            image="https://images.unsplash.com/photo-1544383023-53f0c674763c?q=80&w=600"
            link="/sql"
          />
          <SubjectShowcase 
            type="anatomy" color="#22d3ee" title="Bio-Neon Humano" 
            description="Descubre la ingeniería biológica. Sistemas, huesos y órganos explicados con diagramas de alta tecnología."
            image="https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=600"
            link="/cuerpo-humano"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;