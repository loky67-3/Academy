import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- PALETA DE COLORES TEMPLE OS (CGA 16-COLOR MODERNO) ---
const TOS = {
  bg: '#0000AA',      // Azul Clásico TempleOS
  text: '#FFFF55',    // Amarillo Brillante
  white: '#FFFFFF',
  cyan: '#00AAAA',
  red: '#AA0000',
  magenta: '#AA00AA',
  sidebar: '#1e1e1e', // VS Code Dark
  activeTab: '#0000AA',
  inactiveTab: '#000055',
  error: '#ff5555'
};

// --- VS CODE SVG ICONS ---
const SidebarIcon = ({ type, active }) => {
  const color = active ? '#ffffff' : '#858585';
  const icons = {
    files: <path d="M13.5 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.5L13.5 2zM13 7V3.5L17.5 8H14a1 1 0 0 1-1-1zM4 20V4h8v5a1 1 0 0 0 1 1h5v10H4z" fill={color}/>,
    search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM16.29 16.29l4.42 4.42-1.42 1.42-4.42-4.42 1.42-1.42z" fill={color}/>,
    debug: <path d="M17 11V9h-2V7a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2H3v2h2v2H3v2h2v2a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2h2v-2h-2v-2h2zm-4 6a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2h6v2zm0-4H7v-2h6v2zm0-4H7V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2z" fill={color}/>,
    git: <path d="M18.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-3.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 18.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-3.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-3.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill={color}/>,
    split: <path d="M2 2h20v20H2V2zm18 18V4h-9v16h9z" fill={color}/>,
    play: <path d="M5 3l14 9-14 9V3z" fill="#bef264"/>,
    plus: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color}/>
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{icons[type]}</svg>;
};

// --- BASE DE DATOS DE ARCHIVOS ---
const INITIAL_FILES = [
  { 
    id: 'js', name: 'bank_system.js', lang: 'js', icon: '📜', 
    code: `/** \n * MASTER BANKING KERNEL - JS VERSION\n * Lógica de gestión de activos y usuarios\n */\n\nclass BankManager {\n  constructor() {\n    this.accounts = [];\n    this.transactions = [];\n    this.fraudAlerts = 0;\n  }\n\n  addAccount(user, initialDeposit) {\n    if (initialDeposit < 0) throw new Error("Divine Law: No negative money");\n    const newAccount = {\n      id: Math.random().toString(36).substr(2, 9),\n      user,\n      balance: initialDeposit,\n      active: true\n    };\n    this.accounts.push(newAccount);\n    console.log(\`User \${user} added to the system.\`);\n  }\n\n  deleteAccount(accountId) {\n    this.accounts = this.accounts.filter(acc => acc.id !== accountId);\n    console.log("Account purged.");\n  }\n\n  processTransfer(fromId, toId, amount) {\n    const fromAcc = this.accounts.find(a => a.id === fromId);\n    const toAcc = this.accounts.find(a => a.id === toId);\n\n    if (!fromAcc || !toAcc) return "ERROR: Source/Dest not found";\n    if (fromAcc.balance < amount) return "ERROR: Insufficient funds";\n\n    fromAcc.balance -= amount;\n    toAcc.balance += amount;\n\n    this.transactions.push({ fromId, toId, amount, date: new Date() });\n    this.detectFraud();\n  }\n\n  detectFraud() {\n    // Bucle intensivo de análisis de patrones\n    for (let i = 0; i < this.transactions.length; i++) {\n      for (let j = i + 1; j < this.transactions.length; j++) {\n        if (this.transactions[i].amount === this.transactions[j].amount && \n            this.transactions[i].fromId === this.transactions[j].fromId) {\n          this.fraudAlerts++;\n          console.warn("FRAUD PATTERN DETECTED!");\n        }\n      }\n    }\n  }\n\n  calculateTotalCapital() {\n    return this.accounts.reduce((sum, acc) => sum + acc.balance, 0);\n  }\n}\n\nconst core = new BankManager();\ncore.addAccount("Terry Davis", 1000000);\ncore.addAccount("User_01", 500);` 
  },
  { 
    id: 'py', name: 'finance.py', lang: 'py', icon: '🐍', 
    code: `''' \n  PYTHON HOLY BANKING LOGIC\n  Clean, readable and powerful\n'''\n\nclass FinanceCore:\n    def __init__(self):\n        self.ledger = {}\n        self.user_base = []\n\n    def register_client(self, name, deposit):\n        if name not in self.user_base:\n            self.user_base.append(name)\n            self.ledger[name] = deposit\n            print(f"Client {name} successfully indexed.")\n\n    def remove_client(self, name):\n        if name in self.ledger:\n            del self.ledger[name]\n            self.user_base.remove(name)\n\n    def run_interest_cycle(self, rate):\n        # Bucle de actualización masiva\n        print("Iterating through Divine Interests...")\n        for user in self.user_base:\n            current = self.ledger[user]\n            bonus = current * (rate / 100)\n            self.ledger[user] += bonus\n\n    def batch_audit(self):\n        total = 0\n        for user, balance in self.ledger.items():\n            if balance > 10000:\n                print(f"VIP Found: {user}")\n            total += balance\n        return total\n\nif __name__ == "__main__":\n    bank = FinanceCore()\n    bank.register_client("God", 99999999)\n    bank.register_client("Prophet", 100)\n    bank.run_interest_cycle(5.5)` 
  },
  { 
    id: 'cpp', name: 'core_engine.cpp', lang: 'cpp', icon: '⚙️', 
    code: `#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\n\nusing namespace std;\n\nstruct Account {\n    int id;\n    string owner;\n    double balance;\n};\n\nclass BankingEngine {\nprivate:\n    vector<Account> accounts;\n    int nextId = 100;\n\npublic:\n    void createAccount(string name, double initial) {\n        Account newAcc = {nextId++, name, initial};\n        accounts.push_back(newAcc);\n        cout << "CRITICAL: Account initialized at ID " << newAcc.id << endl;\n    }\n\n    void purgeAccount(int id) {\n        for (auto it = accounts.begin(); it != accounts.end(); ++it) {\n            if (it->id == id) {\n                accounts.erase(it);\n                break;\n            }\n        }\n    }\n\n    void secureTransfer(int from, int to, double val) {\n        Account* src = nullptr;\n        Account* dst = nullptr;\n\n        for (auto& acc : accounts) {\n            if (acc.id == from) src = &acc;\n            if (acc.id == to) dst = &acc;\n        }\n\n        if (src && dst && src->balance >= val) {\n            src->balance -= val;\n            dst->balance += val;\n            cout << "TRANSACTION_COMPLETE" << endl;\n        }\n    }\n\n    void auditSystem() {\n        // Bucle de alto rendimiento\n        for (const auto& acc : accounts) {\n            cout << "AUDIT >> " << acc.owner << ": $" << acc.balance << endl;\n        }\n    }\n};\n\nint main() {\n    BankingEngine engine;\n    engine.createAccount("Terry", 5000.0);\n    engine.auditSystem();\n    return 0;\n}` 
  }
];

const SUGGESTIONS = {
  js: ['console.log', 'BankManager', 'accounts', 'processTransfer', 'detectFraud', 'function', 'const', 'async', 'await'],
  py: ['FinanceCore', 'register_client', 'run_interest_cycle', 'print', 'def', 'import', 'class'],
  cpp: ['BankingEngine', 'createAccount', 'secureTransfer', 'vector', 'std::cout', 'std::endl', 'int main()']
};

const EditorPro = () => {
  const navigate = useNavigate();
  const [allFiles, setAllFiles] = useState(INITIAL_FILES);
  const [openFiles, setOpenFiles] = useState([allFiles[0]]);
  const [leftFileId, setLeftFileId] = useState('js');
  const [rightFileId, setRightFileId] = useState('py'); // Solo para split view
  const [isSplitView, setIsSplitView] = useState(false);
  const [errors, setErrors] = useState([]);
  const [terminalOutput, setTerminalOutput] = useState(['Master system initialized...']);
  const [activeTerminalTab, setActiveTerminalTab] = useState('problems');
  const [hints, setHints] = useState([]);
  const textareaRef = useRef(null);
  
  const activeFile = openFiles.find(f => f.id === leftFileId) || openFiles[0];

  // --- FUNCIONES DE PESTAÑAS ---
  const openFile = (file) => {
    if (!openFiles.find(f => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }
    setLeftFileId(file.id);
  };

  const closeFile = (e, id) => {
    e.stopPropagation();
    if (openFiles.length === 1) return; // No cerrar el último
    const filtered = openFiles.filter(f => f.id !== id);
    setOpenFiles(filtered);
    if (leftFileId === id) setLeftFileId(filtered[0].id);
    if (rightFileId === id) setRightFileId(filtered[0].id);
  };

  // --- COMPILADOR SIMULADO ---
  const checkSyntax = (val, language) => {
    let errs = [];
    const lines = val.split('\n');
    if (language === 'cpp' || language === 'js') {
      lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('#') && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
          errs.push(`Line ${i + 1}: Missing semicolon (;)`);
        }
      });
    }
    if (language === 'py' && val.includes('{')) {
      errs.push(`Python Error: Use indentation, not curly braces {}.`);
    }
    setErrors(errs);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    const updatedFiles = openFiles.map(f => f.id === leftFileId ? { ...f, code: newCode } : f);
    setOpenFiles(updatedFiles);
    checkSyntax(newCode, activeFile.lang);

    // IntelliSense Simple
    const words = newCode.split(/[\s()]+/);
    const lastWord = words[words.length - 1];
    if (lastWord.length > 1) {
      const matches = SUGGESTIONS[activeFile.lang].filter(s => s.startsWith(lastWord));
      setHints(matches);
    } else {
      setHints([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (hints.length > 0) {
        const words = activeFile.code.split(/[\s()]+/);
        const lastWord = words[words.length - 1];
        const completion = hints[0];
        const newCode = activeFile.code.slice(0, activeFile.code.length - lastWord.length) + completion;
        const updatedFiles = openFiles.map(f => f.id === leftFileId ? { ...f, code: newCode } : f);
        setOpenFiles(updatedFiles);
        setHints([]);
      }
    }
  };

  return (
    <div className="tos-shell">
      {/* --- SIDEBAR ACTIVITY BAR (VS CODE STYLE) --- */}
      <div className="tos-activity-bar">
        <div className="icon-btn active"><SidebarIcon type="files" active /></div>
        <div className="icon-btn"><SidebarIcon type="search" /></div>
        <div className="icon-btn"><SidebarIcon type="git" /></div>
        <div className="icon-btn"><SidebarIcon type="debug" /></div>
        <div className="spacer"></div>
        <div className="icon-btn" onClick={() => navigate('/')}>🚪</div>
      </div>

      {/* --- FILE EXPLORER --- */}
      <div className="tos-explorer">
        <div className="explorer-header">EXPLORER</div>
        <div className="explorer-section">
          <div className="folder-label">▼ PROJECT_HOLY_C</div>
          {INITIAL_FILES.map(file => (
            <div 
              key={file.id} 
              className={`file-row ${leftFileId === file.id ? 'active' : ''}`}
              onClick={() => openFile(file)}
            >
              <span className="file-icon">{file.icon}</span> {file.name}
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN EDITOR AREA --- */}
      <div className="tos-editor-container">
        {/* Tab System */}
        <div className="tos-tabs">
          {openFiles.map(file => (
            <div 
              key={file.id} 
              className={`tos-tab ${leftFileId === file.id ? 'active' : ''}`}
              onClick={() => setLeftFileId(file.id)}
            >
              {file.name}
              <span className="close-x" onClick={(e) => closeFile(e, file.id)}>×</span>
            </div>
          ))}
        </div>

        {/* Editor Body */}
        <div className="tos-editor-body">
          <div className="tos-line-numbers">
            {activeFile.code.split('\n').map((_, i) => (
              <div key={i} className="line-num">{i + 1}</div>
            ))}
          </div>
          <div className="textarea-wrapper">
            <textarea
              ref={textareaRef}
              value={activeFile.code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoFocus
            />
            {/* Autocomplete Popup */}
            {hints.length > 0 && (
              <div className="tos-hints">
                {hints.map((h, i) => (
                  <div key={i} className="hint-item">
                    <span style={{color: TOS.cyan}}>◆</span> {h} 
                    <span className="tab-key">TAB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Output / Console Panel */}
        <div className="tos-console">
          <div className="console-tabs">
            <span className="c-tab active">PROBLEMS {errors.length}</span>
            <span className="c-tab">OUTPUT</span>
            <span className="c-tab">TERMINAL</span>
          </div>
          <div className="console-content">
            {errors.length > 0 ? (
              errors.map((err, i) => <div key={i} className="tos-err-line">!! ERROR: {err}</div>)
            ) : (
              <div className="tos-success-line">SYSTEM STATUS: Divine (No problems detected)</div>
            )}
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="tos-status-bar">
          <div className="status-left">
            <span>master*</span>
            <span>God-Mode: Enabled</span>
          </div>
          <div className="status-right">
            <span>UTF-8</span>
            <span>Spaces: 4</span>
            <span>{activeFile.lang.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tos-shell {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: #000;
          color: ${TOS.text};
          font-family: 'Courier New', Courier, monospace;
          overflow: hidden;
        }

        /* Sidebar Icons */
        .tos-activity-bar {
          width: 50px;
          background: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 0;
          gap: 20px;
        }
        .icon-btn { cursor: pointer; opacity: 0.5; transition: 0.2s; }
        .icon-btn.active { opacity: 1; border-left: 2px solid white; width: 100%; display: flex; justify-content: center; }
        .spacer { flex: 1; }

        /* File Explorer */
        .tos-explorer {
          width: 240px;
          background: #252526;
          border-right: 1px solid #333;
          text-align: left;
          font-size: 0.8rem;
        }
        .explorer-header { padding: 10px 20px; color: #858585; font-weight: bold; }
        .explorer-section { padding: 10px 0; }
        .folder-label { padding: 5px 20px; color: #ccc; font-weight: bold; }
        .file-row { padding: 4px 35px; cursor: pointer; color: #94a3b8; transition: 0.2s; }
        .file-row:hover { background: #2a2d2e; color: white; }
        .file-row.active { background: #37373d; color: white; }

        /* Main Editor Section */
        .tos-editor-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: ${TOS.bg};
        }

        /* Tabs */
        .tos-tabs {
          display: flex;
          background: #252526;
          height: 35px;
        }
        .tos-tab {
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: ${TOS.inactiveTab};
          border-right: 1px solid #1e1e1e;
          font-size: 0.75rem;
          color: #969696;
          cursor: pointer;
          min-width: 120px;
        }
        .tos-tab.active { background: ${TOS.bg}; color: white; border-top: 1px solid ${TOS.text}; }
        .close-x { opacity: 0; transition: 0.2s; }
        .tos-tab:hover .close-x { opacity: 1; }
        .close-x:hover { color: #ff5555; }

        /* Editor Area */
        .tos-editor-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }
        .tos-line-numbers {
          width: 60px;
          background: ${TOS.bg};
          border-right: 1px solid ${TOS.inactiveTab};
          padding: 20px 0;
          text-align: right;
          color: ${TOS.white};
          font-weight: 900;
          font-size: 1.2rem;
          padding-right: 15px;
          user-select: none;
        }
        .textarea-wrapper { flex: 1; position: relative; }
        textarea {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: ${TOS.text}; /* Amarillo TempleOS */
          font-family: inherit;
          font-size: 1.5rem; /* Letra grande */
          font-weight: 900;
          padding: 20px;
          line-height: 1.5;
        }

        /* IntelliSense */
        .tos-hints {
          position: absolute;
          top: 60px;
          left: 40px;
          background: #252526;
          border: 1px solid ${TOS.text};
          box-shadow: 10px 10px 0px black;
          z-index: 100;
          min-width: 200px;
        }
        .hint-item { 
          padding: 8px 15px; 
          color: white; 
          display: flex; 
          justify-content: space-between; 
          font-size: 0.9rem;
        }
        .hint-item:hover { background: #0000AA; color: ${TOS.text}; cursor: pointer; }
        .tab-key { font-size: 0.6rem; border: 1px solid #555; padding: 2px 4px; }

        /* Console Panel */
        .tos-console {
          height: 180px;
          background: #000;
          border-top: 2px solid ${TOS.text};
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .console-tabs {
          display: flex;
          gap: 20px;
          padding: 0 25px;
          background: #1e1e1e;
          font-size: 0.7rem;
          font-weight: bold;
        }
        .c-tab { padding: 8px 0; color: #858585; cursor: pointer; }
        .c-tab.active { color: white; border-bottom: 1px solid white; }
        .console-content { padding: 15px 25px; flex: 1; overflow-y: auto; }
        .tos-err-line { color: ${TOS.error}; margin-bottom: 4px; font-weight: bold; }
        .tos-success-line { color: ${TOS.text}; opacity: 0.8; }

        /* Status Bar */
        .tos-status-bar {
          height: 22px;
          background: ${TOS.magenta};
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          font-size: 0.75rem;
        }
        .status-left, .status-right { display: flex; gap: 20px; }
      `}} />
    </div>
  );
};

export default EditorPro;