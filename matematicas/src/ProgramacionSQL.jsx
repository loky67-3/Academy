import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- PERSONAJE SQL-BOT (THE ARCHITECT) ---
const SQLBot = ({ expression = 'happy', size = 150 }) => {
  const sqlColor = "#00ff41"; // Matrix Green
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 20px ${sqlColor})` }}>
      {/* Cuerpo de Servidor (Rack) */}
      <rect x="50" y="40" width="100" height="120" rx="10" fill="rgba(15, 23, 42, 0.95)" stroke={sqlColor} strokeWidth="6" />
      <line x1="50" y1="80" x2="150" y2="80" stroke={sqlColor} strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="120" x2="150" y2="120" stroke={sqlColor} strokeWidth="2" opacity="0.5" />
      
      {/* Luces de Actividad */}
      <circle cx="65" cy="55" r="4" fill={sqlColor}>
        <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="55" r="4" fill={sqlColor} opacity="0.6" />
      
      {/* Pantalla de Datos */}
      <rect x="70" y="90" width="60" height="40" rx="5" fill="#000" stroke={sqlColor} strokeWidth="2" />
      {expression === 'happy' ? (
        <path d="M85 110 Q 100 120 115 110" stroke={sqlColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M85 115 L115 115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      )}
      <text x="100" y="30" fill="white" fontSize="12" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '2px' }}>DB-ADMIN</text>
      <text x="100" y="105" fill={sqlColor} fontSize="10" fontWeight="bold" textAnchor="middle">SQL</text>
    </svg>
  );
};

// --- VISUALIZADOR DE ESQUEMA (RELACIONES NEÓN) ---
const SQLSchemaSVG = () => (
  <div style={{ background: 'rgba(0,0,0,0.6)', padding: '3rem', borderRadius: '40px', border: '2px solid #00ff41', margin: '3rem 0', overflow: 'hidden' }}>
    <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Arquitectura de <span style={{ color: '#00ff41' }}>Relaciones (FK)</span></h2>
    <svg width="100%" viewBox="0 0 800 300" style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}>
      {/* Tabla Clientes */}
      <rect x="50" y="50" width="180" height="150" rx="10" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="50" y="50" width="180" height="35" rx="10" fill="#00ff41" opacity="0.2" />
      <text x="140" y="75" fill="#00ff41" textAnchor="middle" fontSize="14" fontWeight="bold">TABLE: users</text>
      <text x="70" y="110" fill="#fff" fontSize="12">🔑 id: INT (PK)</text>
      <text x="70" y="135" fill="#94a3b8" fontSize="12">👤 username: VARCHAR</text>
      <text x="70" y="160" fill="#94a3b8" fontSize="12">📧 email: VARCHAR</text>

      {/* Línea de Relación Neón */}
      <path d="M230 110 L400 110 L400 75 L570 75" fill="none" stroke="#00ff41" strokeWidth="3" strokeDasharray="10,5">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="400" cy="110" r="5" fill="#00ff41" style={{ filter: 'drop-shadow(0 0 8px #00ff41)' }} />

      {/* Tabla Pedidos */}
      <rect x="570" y="50" width="180" height="150" rx="10" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="570" y="50" width="180" height="35" rx="10" fill="#00ff41" opacity="0.2" />
      <text x="660" y="75" fill="#00ff41" textAnchor="middle" fontSize="14" fontWeight="bold">TABLE: orders</text>
      <text x="590" y="110" fill="#fff" fontSize="12">🔑 id: INT (PK)</text>
      <text x="590" y="135" fill="#00ff41" fontSize="12">🔗 user_id: INT (FK)</text>
      <text x="590" y="160" fill="#94a3b8" fontSize="12">💰 total: DECIMAL</text>
    </svg>
    <p style={{ color: '#94a3b8', marginTop: '20px', fontSize: '1rem' }}>Las <b>Foreign Keys (FK)</b> son los cables neón que unen la lógica de tu base de datos.</p>
  </div>
);

// --- COMPONENTE DE FLUJO DE CONSULTA GIGANTE ---
const QueryFlowSVG = () => (
  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '3rem', borderRadius: '35px', border: '2px solid #00ff41', margin: '3rem 0' }}>
    <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '2.5rem', textAlign: 'center' }}>Flujo de Ejecución <span style={{ color: '#00ff41' }}>SQL Engine</span></h2>
    <svg width="100%" viewBox="0 0 800 400" style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}>
      <defs>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#00ff41" />
        </marker>
      </defs>
      
      {/* Proceso */}
      <rect x="50" y="170" width="140" height="60" rx="10" fill="none" stroke="#fff" strokeWidth="3" />
      <text x="120" y="205" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">QUERY (SELECT)</text>
      <line x1="190" y1="200" x2="250" y2="200" stroke="#00ff41" strokeWidth="4" markerEnd="url(#arrow-green)" />

      <rect x="250" y="170" width="140" height="60" rx="10" fill="none" stroke="#00ff41" strokeWidth="3" />
      <text x="320" y="205" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">PARSER / OPTIMIZER</text>
      <line x1="390" y1="200" x2="450" y2="200" stroke="#00ff41" strokeWidth="4" markerEnd="url(#arrow-green)" />

      <rect x="450" y="170" width="140" height="60" rx="10" fill="none" stroke="#fff" strokeWidth="3" />
      <text x="520" y="205" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">STORAGE ENGINE</text>
      <line x1="590" y1="200" x2="650" y2="200" stroke="#00ff41" strokeWidth="4" markerEnd="url(#arrow-green)" />

      <path d="M650 150 L780 150 L780 250 L650 250 Z" fill="rgba(0,255,65,0.1)" stroke="#00ff41" strokeWidth="3" />
      <text x="715" y="205" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold">RESULTS SET</text>
    </svg>
  </div>
);

const SQLCodeBlock = ({ title, code, explain }) => (
  <div className="sql-code-card">
    <div className="sql-header">
      <span>{title}</span>
      <span className="sql-tag">DATABASE MASTER</span>
    </div>
    <div style={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
      <pre className="sql-pre"><code>{code}</code></pre>
      <div className="sql-explanation-box">
        <div className="neon-arrow-right">➜</div>
        <p>{explain}</p>
      </div>
    </div>
  </div>
);

const ProgramacionSQL = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [solved, setSolved] = useState([]);
  const [botStatus, setBotStatus] = useState('happy');
  const [varcharQuest, setVarcharQuest] = useState({ length: 10, text: "Admin", fits: true });
  const [varcharSolved, setVarcharSolved] = useState(0);

  const generateVarcharQuest = () => {
    const len = Math.floor(Math.random() * 15) + 5;
    const sampleTexts = ["Database", "SQL_Master", "Hacker_Elite", "Neon_System", "Architecture", "MasterCode"];
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setVarcharQuest({ length: len, text, fits: text.length <= len });
    setBotStatus('happy');
  };

  const triggerError = () => {
    setBotStatus('sad');
    setTimeout(() => setBotStatus('happy'), 2000);
  };

  useEffect(() => {
    generateVarcharQuest();
  }, []);

  const handleSolved = (id) => {
    if (!solved.includes(id)) {
      setSolved([...solved, id]);
      setXp(prev => prev + 20);
      setBotStatus('happy');
    }
  };

  const checkVarchar = (userFits) => {
    if (userFits === varcharQuest.fits) {
      setXp(prev => prev + 10);
      setVarcharSolved(prev => prev + 1);
      generateVarcharQuest();
    } else {
      triggerError();
    }
  };

  return (
    <div className="sql-master-page">
      <Navbar />
      
      <section className="hero-section" style={{ padding: '180px 10% 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <SQLBot expression={botStatus} />
          <div style={{ textAlign: 'left', maxWidth: '700px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#fff' }}>SQL <span style={{ color: '#00ff41' }}>Master</span></h1>
            <p className="hero-subtitle" style={{ color: '#94a3b8', fontSize: '1.6rem' }}>"Los datos son el nuevo petróleo. Aprende a extraerlos, refinarlos y dominarlos con el lenguaje de las bases de datos."</p>
          </div>
        </div>
        
        <div className="xp-bar-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00ff41', fontSize: '1rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span>QUERY PERFORMANCE</span>
            <span>{xp} XP</span>
          </div>
          <div className="xp-track">
            <div className="xp-fill" style={{ width: `${Math.min(xp, 100)}%` }}></div>
          </div>
        </div>
      </section>

      {/* --- VARCHAR LAB --- */}
      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '700px', margin: '0 auto', border: '3px solid #00ff41', background: 'rgba(0, 255, 65, 0.05)', textAlign: 'center', padding: '3.5rem' }}>
          <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1.5rem' }}>⚡ Validador de <span style={{ color: '#00ff41' }}>VARCHAR(n)</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '2rem' }}>
            ¿El texto <span style={{ color: '#fff', fontWeight: 'bold' }}>"{varcharQuest.text}"</span> cabe en un campo <span style={{ color: '#00ff41', fontWeight: 'bold' }}>VARCHAR({varcharQuest.length})</span>?
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={() => checkVarchar(true)} className="btn-login" style={{ background: '#00ff41', color: '#000' }}>SÍ (Fits)</button>
            <button onClick={() => checkVarchar(false)} className="btn-login" style={{ background: '#ef4444', color: '#fff' }}>NO (Overflow)</button>
          </div>
          <p style={{ marginTop: '20px', color: '#00ff41' }}>Racha: {varcharSolved} consultas validadas</p>
        </div>
      </section>

      {/* --- MASTER DATA TYPES TABLE --- */}
      <section className="info-section">
        <h2 className="section-title">Diccionario de <span style={{ color: '#00ff41' }}>Tipos y Atributos</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table className="sql-table-viz" style={{ border: '2px solid #fff' }}>
            <thead>
              <tr style={{ background: '#fff', color: '#000' }}>
                <th>TIPO / MÉTODO</th>
                <th>DESCRIPCIÓN TÉCNICA</th>
                <th>EJEMPLO DE USO</th>
              </tr>
            </thead>
            <tbody style={{ color: '#fff', fontSize: '1.1rem' }}>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#00ff41', fontWeight: 'bold' }}>VARCHAR(n)</td>
                <td>Texto de longitud variable hasta <b>n</b> caracteres.</td>
                <td><code>nombre VARCHAR(255)</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#00ff41', fontWeight: 'bold' }}>INT</td>
                <td>Números enteros (sin decimales).</td>
                <td><code>edad INT</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#00ff41', fontWeight: 'bold' }}>DECIMAL(p,s)</td>
                <td>Números con precisión exacta (ideal para dinero).</td>
                <td><code>precio DECIMAL(10,2)</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#00ff41', fontWeight: 'bold' }}>BOOLEAN</td>
                <td>Valores lógicos (True/1 o False/0).</td>
                <td><code>es_admin BOOLEAN</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#00ff41', fontWeight: 'bold' }}>DATE</td>
                <td>Almacena fechas (Formato: YYYY-MM-DD).</td>
                <td><code>fecha_nac DATE</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ color: '#fb923c', fontWeight: 'bold' }}>PRIMARY KEY</td>
                <td>Identificador único. No puede repetirse ni ser nulo.</td>
                <td><code>id INT PRIMARY KEY</code></td>
              </tr>
              <tr>
                <td style={{ color: '#fb923c', fontWeight: 'bold' }}>NOT NULL</td>
                <td>Obliga a que el campo siempre tenga un valor.</td>
                <td><code>email VARCHAR(50) NOT NULL</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-section">
        <SQLSchemaSVG />
      </section>

      <section className="info-section">
        <h2 className="section-title">Manual de <span style={{ color: '#00ff41' }}>Consultas Pro</span></h2>
        
        <SQLCodeBlock 
          title="1. Creación de Estructura (DDL)"
          code={`CREATE TABLE usuarios (\n  id INT PRIMARY KEY,\n  nombre VARCHAR(50),\n  email VARCHAR(100) UNIQUE,\n  nivel INT DEFAULT 1\n);`}
          explain="Definimos el esquema. PRIMARY KEY asegura que no haya duplicados. UNIQUE protege el email. DEFAULT automatiza valores iniciales."
        />

        <SQLCodeBlock 
          title="2. Manipulación de Datos (DML)"
          code={`INSERT INTO usuarios (id, nombre, email)\nVALUES (1, 'Neo', 'neo@matrix.com');\n\nUPDATE usuarios \nSET nivel = 10 \nWHERE id = 1;`}
          explain="Insertamos registros y los actualizamos. ¡CUIDADO! Nunca olvides el WHERE en un UPDATE o borrarás/actualizarás a todos."
        />

        <SQLCodeBlock 
          title="3. El Poder del SELECT"
          code={`SELECT nombre, nivel \nFROM usuarios \nWHERE nivel > 5 \nORDER BY nivel DESC;`}
          explain="Filtramos y ordenamos. Es la herramienta principal del programador para obtener información específica de millones de registros."
        />
      </section>

      <section className="info-section">
        <QueryFlowSVG />
      </section>

      <section className="info-section">
        <h2 className="section-title">Estructura de <span style={{ color: '#00ff41' }}>Tablas</span></h2>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table className="sql-table-viz">
            <thead>
              <tr>
                <th>PK (ID)</th>
                <th>NOMBRE</th>
                <th>ESTADO</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Admin_Root</td><td style={{color: '#00ff41'}}>ONLINE</td><td>9999</td></tr>
              <tr><td>2</td><td>User_Dev</td><td style={{color: '#00ff41'}}>ONLINE</td><td>450</td></tr>
              <tr><td>3</td><td>Guest_01</td><td style={{color: '#ef4444'}}>OFFLINE</td><td>10</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '20px', color: '#94a3b8' }}>Las tablas organizan la información en Filas (registros) y Columnas (atributos).</p>
      </section>

      {/* --- EXERCISE LAB --- */}
      <section className="info-section">
        <h2 className="section-title">SQL <span style={{ color: '#00ff41' }}>Laboratory</span></h2>
        <p className="section-subtitle">Escribe la palabra clave correcta para completar la consulta.</p>
        <div className="grid-container">
          <div className="benefit-card" style={{ borderLeft: '4px solid #00ff41', textAlign: 'left' }}>
            <h4 style={{ color: '#00ff41' }}>ELIMINAR DATOS</h4>
            <p>Comando para borrar un registro:</p>
            <div className="sql-input-group">
              <code>{'___ FROM usuarios WHERE id = 1;'}</code>
              <input 
                type="text" 
                placeholder="Comando?" 
                disabled={solved.includes('s1')}
                onChange={(e) => e.target.value.toLowerCase() === 'delete' ? handleSolved('s1') : (e.target.value.length >= 6 && triggerError())} 
              />
            </div>
          </div>
          
          <div className="benefit-card" style={{ borderLeft: '4px solid #00ff41', textAlign: 'left' }}>
            <h4 style={{ color: '#00ff41' }}>UNIR TABLAS</h4>
            <p>Palabra para combinar dos tablas:</p>
            <div className="sql-input-group">
              <code>{'SELECT * FROM t1 ___ JOIN t2;'}</code>
              <input 
                type="text" 
                placeholder="Acción?" 
                disabled={solved.includes('s2')}
                onChange={(e) => e.target.value.toLowerCase() === 'inner' ? handleSolved('s2') : (e.target.value.length >= 5 && triggerError())} 
              />
            </div>
          </div>

          <div className="benefit-card" style={{ borderLeft: '4px solid #00ff41', textAlign: 'left' }}>
            <h4 style={{ color: '#00ff41' }}>FILTRAR GRUPOS</h4>
            <p>Cláusula para filtrar después de un GROUP BY:</p>
            <div className="sql-input-group">
              <code>{'GROUP BY ciudad ___ COUNT(*) > 5;'}</code>
              <input 
                type="text" 
                placeholder="Condición?" 
                disabled={solved.includes('s3')}
                onChange={(e) => e.target.value.toLowerCase() === 'having' ? handleSolved('s3') : (e.target.value.length >= 6 && triggerError())} 
              />
            </div>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '80px' }}>
        <button className="btn-login" style={{ background: '#00ff41', color: '#000', padding: '1.5rem 4rem', fontSize: '1.2rem', fontWeight: '900' }} onClick={() => navigate('/')}>VOLVER AL SISTEMA</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sql-master-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }
        .xp-bar-container {
          width: 100%;
          max-width: 900px;
          margin: 50px auto 0;
          padding: 20px;
          background: rgba(0, 255, 65, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(0, 255, 65, 0.2);
        }
        .xp-track { height: 15px; background: #1e293b; borderRadius: 10px; overflow: hidden; }
        .xp-fill { height: 100%; background: #00ff41; transition: 1.5s ease; box-shadow: 0 0 20px #00ff41; }
        
        .sql-code-card {
          background: #000;
          border: 2px solid #00ff41;
          border-radius: 20px;
          margin: 2rem 0;
          overflow: hidden;
          text-align: left;
        }
        .sql-header {
          background: #00ff41;
          color: #000;
          padding: 10px 20px;
          font-weight: 900;
          display: flex;
          justify-content: space-between;
        }
        .sql-tag { font-size: 0.7rem; opacity: 0.8; }
        .sql-pre {
          flex: 1;
          min-width: 300px;
          padding: 20px;
          margin: 0;
          color: #ffffff;
          font-size: 1.2rem;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
        }
        .sql-explanation-box {
          flex: 1;
          min-width: 300px;
          border-left: 1px solid rgba(0, 255, 65, 0.3);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .neon-arrow-right { color: #00ff41; font-size: 2rem; text-shadow: 0 0 10px #00ff41; }
        
        .sql-table-viz {
          width: 100%;
          border-collapse: collapse;
          background: #0a0a0a;
          border: 1px solid #333;
        }
        .sql-table-viz th { background: #111; color: #00ff41; padding: 15px; text-align: left; border: 1px solid #333; }
        .sql-table-viz td { padding: 15px; border: 1px solid #333; }

        .sql-input-group {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sql-input-group input {
          background: #000;
          border: 1px solid #00ff41;
          color: #fff;
          padding: 10px;
          border-radius: 5px;
          outline: none;
        }
        .sql-input-group input:focus { box-shadow: 0 0 10px #00ff41; }
      `}} />
    </div>
  );
};

export default ProgramacionSQL;