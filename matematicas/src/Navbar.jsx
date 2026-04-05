import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
    setIsMobileNavOpen(false);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    setIsMegaMenuOpen(false);
  };

  const closeAll = () => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
  };

  // --- ORGANIZACIÓN MAESTRA DE CATEGORÍAS ---
  const categories = [
    {
      title: "Números y Aritmética",
      color: "#0ea5e9", // Blue
      items: [
        { to: "/matematicas", label: "Suma Básica", icon: "➕" },
        { to: "/restas", label: "Resta Pro", icon: "➖" },
        { to: "/multiplicaciones", label: "Multiplicación", icon: "✖️" },
        { to: "/divisiones", label: "División Exacta", icon: "➗" },
        { to: "/fracciones", label: "Fracciones", icon: "🍕" },
        { to: "/decimales", label: "Punto Decimal", icon: "🎯" },
        { to: "/porcentajes", label: "Porcentajes", icon: "📈" },
      ]
    },
    {
      title: "Álgebra y Funciones",
      color: "#bef264", // Lime
      items: [
        { to: "/algebra", label: "Fundamentos X", icon: "📦" },
        { to: "/ecuaciones", label: "Ecuaciones", icon: "⚖️" },
        { to: "/factorizacion", label: "Factorización", icon: "🧩" },
        { to: "/cuadraticas", label: "Cuadráticas", icon: "🎢" },
        { to: "/funciones", label: "Funciones", icon: "🔄" },
        { to: "/potencias", label: "Potencias", icon: "⚡" },
        { to: "/raiz-cuadrada", label: "Raíces", icon: "🌱" },
      ]
    },
    {
      title: "Geometría y Cálculo",
      color: "#fbbf24", // Amber
      items: [
        { to: "/geometria", label: "Figuras y Área", icon: "📐" },
        { to: "/plano-cartesiano", label: "Coordenadas", icon: "📍" },
        { to: "/trigonometria", label: "Triángulos", icon: "🔻" },
        { to: "/calculo", label: "Cálculo Infinito", icon: "🌊" },
      ]
    },
    {
      title: "Lógica y Desarrollo",
      color: "#a855f7", // Purple
      items: [ 
        { to: "/pensamiento-logico", label: "Pensamiento Lógico Avanzado", icon: "🧠" },
        { to: "/tablas-verdad", label: "Tablas de Verdad", icon: "📋" },
        { to: "/bucles", label: "Ciclos y Bucles", icon: "🔁" },
        { to: "/estructuras-datos", label: "Estructuras", icon: "🏗️" },
        { to: "/react", label: "React Engine", icon: "⚛️" },
        { to: "/flask", label: "Flask Alchemist", icon: "🧪" },
        { to: "/sql", label: "SQL Master", icon: "🗄️" },
        { to: "/editor", label: "God Editor", icon: "💻" },
        { to: "/python", label: "Python Power", icon: "🐍" },
        { to: "/cpp", label: "Arquitectura C++", icon: "⚙️" },
      ]
    },
    {
      title: "Ciencias Naturales",
      color: "#22d3ee",
      items: [
        { to: "/cuerpo-humano", label: "Cuerpo Humano", icon: "🦴" },
      ]
    }
  ];

  const NavLinksContent = () => (
    <>
      <div className="nav-link" onClick={toggleMegaMenu} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: isMegaMenuOpen ? 'var(--neon-blue)' : 'inherit', fontSize: '1.1rem', fontWeight: 'bold' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9h18M3 15h18M3 3h18M3 21h18"/></svg>
        Explorar Academias
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: isMegaMenuOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <Link to="/ingles" className="nav-link" onClick={closeAll}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="m5 8 6 6 6-6"/><path d="m4 14 8 8 8-8"/></svg>
        English Master
      </Link>
      <Link to="/react" className="nav-link" onClick={closeAll}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><circle cx="12" cy="12" r="2"/><path d="M12 19c-4.4 0-8-1.6-8-3.5s3.6-3.5 8-3.5 8 1.6 8 3.5-3.6 3.5-8 3.5z"/><path d="M12 8c-4.4 0-8-1.6-8-3.5S7.6 1 12 1s8 1.6 8 3.5S16.4 8 12 8z"/></svg>
        Web Dev
      </Link>
      <Link to="/sql" className="nav-link" onClick={closeAll}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="7" y1="10" x2="7" y2="19"/><line x1="17" y1="10" x2="17" y2="19"/></svg>
        SQL Master
      </Link>
    </>
  );

  return (
    <div className="nav-wrapper">
      <nav className="navbar" onMouseLeave={() => setIsMegaMenuOpen(false)}>
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeAll}>
          <svg className="logo-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
          </svg>
          <span>EDU<span style={{color: 'var(--neon-blue)'}}>NEON</span></span>
        </Link>
        
        <div className="nav-links">
          <NavLinksContent />
        </div>

        <div className="nav-actions">
          <button className="btn-login hide-mobile">
            Acceso Alumno
          </button>
          <button className={`hamburger-btn ${isMobileNavOpen ? 'open' : ''}`} onClick={toggleMobileNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* --- MEGA MENÚ: PANEL DESPLEGABLE --- */}
        <div className={`mega-menu-dropdown ${isMegaMenuOpen ? 'active' : ''}`}>
          <div className="mega-menu-header-box">
            <h2 className="gradient-text mega-title">Explora el Futuro</h2>
            <p className="mega-subtitle">Selecciona tu ruta de aprendizaje y domina la materia.</p>
          </div>
          <div className="mega-menu-grid-styled">
            {categories.map((cat, idx) => (
              <div key={idx} className="cat-section">
                <h3 style={{ color: cat.color }}>{cat.title}</h3>
                <div className="items-container">
                  {cat.items.map((item, iIdx) => (
                    <Link key={iIdx} to={item.to} onClick={closeAll} className="mega-item">
                      <span className="icon-box" style={{ background: `${cat.color}15`, color: cat.color }}>{item.icon}</span>
                      <span className="label">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MENÚ MÓVIL (HAMBURGUESA) --- */}
      <div className={`mobile-overlay ${isMobileNavOpen ? 'active' : ''}`} onClick={closeAll}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <span className="logo">EDU<span style={{color: 'var(--neon-blue)'}}>NEON</span></span>
          </div>
          <div className="mobile-nav-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <NavLinksContent />
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              {categories.map((cat, idx) => (
                <div key={idx}>
                  <h4 style={{ color: cat.color, marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>{cat.title}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {cat.items.map((item, iIdx) => (
                      <Link key={iIdx} to={item.to} onClick={closeAll} style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-wrapper {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #ffffff, var(--neon-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .mega-menu-header-box {
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 2rem;
          text-align: left;
        }

        .mega-title {
          font-size: 4rem;
          letter-spacing: -2px;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .mega-subtitle {
          color: #94a3b8;
          font-size: 1.5rem;
          font-weight: 400;
        }

        .mega-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(2, 6, 23, 0.98);
          backdrop-filter: blur(25px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 3.5rem 8%;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-20px);
          max-height: 85vh;
          overflow-y: auto;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          z-index: -1;
        }

        .mega-menu-dropdown.active {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }

        /* Scrollbar Personalizado Neón para Desktop */
        .mega-menu-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        
        .mega-menu-dropdown::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .mega-menu-dropdown::-webkit-scrollbar-thumb {
          background: var(--neon-blue);
          border-radius: 10px;
        }

        .mega-menu-grid-styled {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          padding-bottom: 4rem; /* Espacio extra para que respire al final */
        }

        @media (max-width: 768px) {
          .mega-menu-grid-styled {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .cat-section h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 10px;
          font-weight: 800;
        }

        .mega-item {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #94a3b8;
        }

        .mega-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white !important;
          transform: translateX(10px);
        }

        .icon-box {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 1.2rem;
          transition: 0.3s;
        }

        .mega-item:hover .icon-box {
          transform: scale(1.1);
          box-shadow: 0 0 15px currentColor;
        }

        .mega-item .label {
          font-size: 1rem;
          font-weight: 500;
          transition: 0.3s;
        }

        .mega-item:hover .label {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .mobile-menu-btn { display: none; }
        
        @media (max-width: 1200px) {
          .mega-menu-grid-styled { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 1024px) {
          .nav-links, .hide-mobile { display: none; }
          .mobile-menu-btn { display: block; }
          .mega-menu-dropdown { display: none; }
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 5%;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          position: relative;
          z-index: 10;
        }
        
        .nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .nav-link { color: #94a3b8; text-decoration: none; font-weight: 600; transition: 0.3s; white-space: nowrap; }
        .nav-link:hover { color: white; }

        /* Hamburger Animado */
        .hamburger-btn {
          display: none;
          width: 30px;
          height: 22px;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 4000;
        }
        .hamburger-btn span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: white;
          border-radius: 9px;
          transition: .25s ease-in-out;
        }
        .hamburger-btn span:nth-child(1) { top: 0px; }
        .hamburger-btn span:nth-child(2) { top: 10px; }
        .hamburger-btn span:nth-child(3) { top: 20px; }
        .hamburger-btn.open span:nth-child(1) { top: 10px; transform: rotate(135deg); background: var(--neon-blue); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; left: -60px; }
        .hamburger-btn.open span:nth-child(3) { top: 10px; transform: rotate(-135deg); background: var(--neon-blue); }

        /* Overlay y Drawer del Menú Móvil */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0);
          backdrop-filter: blur(0px);
          visibility: hidden;
          z-index: 3000;
          transition: all 0.4s ease;
          display: flex;
          justify-content: flex-end;
        }
        .mobile-overlay.active {
          visibility: visible;
          background: rgba(0,0,0,0.9);
          backdrop-filter: blur(10px);
        }
        .mobile-drawer {
          width: 85%;
          max-width: 400px;
          height: 100%;
          background: #020617;
          padding: 100px 30px 40px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-overlay.active .mobile-drawer { transform: translateX(0); }
        .mobile-drawer-header { position: absolute; top: 30px; left: 30px; }

        @media (max-width: 1024px) {
          .hamburger-btn { display: block; }
          .nav-links, .hide-mobile { display: none; }
        }
      `}} />
    </div>
  );
};

export default Navbar;