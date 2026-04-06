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
        { to: "/booleanos", label: "Lógica Booleana", icon: "💡" },
        { to: "/bucles", label: "Ciclos y Bucles", icon: "🔁" },
        { to: "/estructuras-datos", label: "Estructuras", icon: "🏗️" },
        { to: "/dom", label: "Dominando DOM", icon: "🕸️" },
      ]
    },
    {
      title: "Programación Avanzada",
      color: "#f43f5e", // Red
      items: [
        { to: "/c", label: "Arquitectura C", icon: "🔴" },
        { to: "/python", label: "Python Power", icon: "🐍" },
        { to: "/cpp", label: "Arquitectura C++", icon: "⚙️" },
        { to: "/react", label: "React Engine", icon: "⚛️" },
        { to: "/flask", label: "Flask Alchemist", icon: "🧪" },
        { to: "/sql", label: "SQL Master", icon: "🗄️" },
        { to: "/editor", label: "God Editor", icon: "💻" },
      ]
    },
    {
      title: "Ciencias Naturales",
      color: "#22d3ee", // Cyan
      items: [
        { to: "/cuerpo-humano", label: "Cuerpo Humano", icon: "🦴" },
      ]
    },
    {
      title: "Idiomas",
      color: "#ec4899", // Pink
      items: [
        { to: "/ingles", label: "English Master", icon: "🗣️" },
      ]
    }
  ];

  return (
    <div className="nav-wrapper">
      <nav className="navbar" onMouseLeave={() => setIsMegaMenuOpen(false)}>
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeAll}>
          <svg className="logo-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
          </svg>
          <span>EDU<span style={{color: 'var(--neon-blue)'}}>NEON</span></span>
        </Link>

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

      </nav>

      {/* --- MENÚ MÓVIL (HAMBURGUESA) --- */}
      <div className={`mobile-overlay ${isMobileNavOpen ? 'active' : ''}`} onClick={closeAll}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <span className="logo" style={{ fontSize: '2.5rem' }}>EDU<span style={{color: 'var(--neon-blue)'}}>NEON</span></span>
          </div>
          <div className="mobile-nav-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '40px' }}>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, var(--neon-blue), transparent)', margin: '10px 0' }}></div>
              {categories.map((cat, idx) => (
                <div key={idx}>
                  <h4 style={{ color: cat.color, marginBottom: '20px', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '3px', fontWeight: '900' }}>{cat.title}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {cat.items.map((item, iIdx) => (
                      <Link key={iIdx} to={item.to} onClick={closeAll} className="drawer-link">
                        <span className="drawer-icon">{item.icon}</span> <span className="drawer-label">{item.label}</span>
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

        .gradient-text {
          background: linear-gradient(90deg, #ffffff, var(--neon-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .drawer-link {
          color: #ffffff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 1.4rem;
          font-weight: 600;
          transition: 0.3s;
          padding: 10px;
          border-radius: 12px;
        }
        .drawer-link:hover {
          background: rgba(255,255,255,0.05);
          padding-left: 20px;
          color: var(--neon-blue);
        }
        .drawer-icon { font-size: 1.8rem; }

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
          gap: 20px; /* Add some gap between elements */
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .nav-links, .hide-mobile { /* These elements are now effectively removed from the main navbar flow */
          display: none; 
        }

        /* Hamburger Animado */
        .hamburger-btn {
          display: block; /* Always show hamburger */
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
          width: 90%;
          max-width: 550px;
          height: 100%;
          background: rgba(2, 6, 23, 0.98);
          backdrop-filter: blur(20px);
          padding: 120px 50px 60px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          border-left: 2px solid var(--neon-blue);
          box-shadow: -20px 0 50px rgba(0,0,0,0.5);
        }
        .mobile-overlay.active .mobile-drawer { transform: translateX(0); }
        .mobile-drawer-header { position: absolute; top: 30px; left: 30px; }

        @media (min-width: 1024px) {
          .mobile-drawer {
            width: 450px;
          }
        }
      `}} />
    </div>
  );
};

export default Navbar;