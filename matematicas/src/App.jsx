import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Matematicas from './Matematicas';
import Algebra from './Algebra';
import Booleanos from './Booleanos';
import Bucles from './Bucles';
import Calculo from './Calculo';
import Condicionales from './Condicionales';
import Cuadraticas from './Cuadraticas';
import Decimales from './Decimales';
import Divisiones from './Divisiones';
import DominandoDOM from './DominandoDOM';
import Ecuaciones from './Ecuaciones';
import EstructurasDatos from './EstructurasDatos';
import Factorizacion from './Factorizacion';
import Fracciones from './Fracciones';
import Funciones from './Funciones';
import Geometria from './Geometria';
import LogicaMatematica from './LogicaMatematica';
import Multiplicaciones from './Multiplicaciones';
import PensamientoLogico from './PensamientoLogico';
import PlanoCartesiano from './PlanoCartesiano';
import Porcentajes from './Porcentajes';
import Potencias from './Potencias';
import RaizCuadrada from './RaizCuadrada';
import Restas from './Restas';
import TablasVerdad from './TablasVerdad';
import Trigonometria from './Trigonometria';
import ProgramacionCPP from './ProgramacionCPP';
import ProgramacionPython from './ProgramacionPython';
import AprendeIngles from './AprendeIngles';
import ProgramacionSQL from './ProgramacionSQL';
import ProgramacionReact from './ProgramacionReact';
import ProgramacionFlask from './ProgramacionFlask';
import EditorPro from './EditorPro';
import CuerpoHumano from './CuerpoHumano';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matematicas" element={<Matematicas />} />
        <Route path="/multiplicaciones" element={<Multiplicaciones />} />
        <Route path="/restas" element={<Restas />} />
        <Route path="/divisiones" element={<Divisiones />} />
        <Route path="/fracciones" element={<Fracciones />} />
        <Route path="/porcentajes" element={<Porcentajes />} />
        <Route path="/decimales" element={<Decimales />} />
        <Route path="/potencias" element={<Potencias />} />
        <Route path="/raiz-cuadrada" element={<RaizCuadrada />} />
        <Route path="/algebra" element={<Algebra />} />
        <Route path="/ecuaciones" element={<Ecuaciones />} />
        <Route path="/geometria" element={<Geometria />} />
        <Route path="/plano-cartesiano" element={<PlanoCartesiano />} />
        <Route path="/factorizacion" element={<Factorizacion />} />
        <Route path="/cuadraticas" element={<Cuadraticas />} />
        <Route path="/funciones" element={<Funciones />} />
        <Route path="/trigonometria" element={<Trigonometria />} />
        <Route path="/calculo" element={<Calculo />} />
        <Route path="/logica" element={<LogicaMatematica />} />
        <Route path="/booleanos" element={<Booleanos />} />
        <Route path="/tablas-verdad" element={<TablasVerdad />} />
        <Route path="/condicionales" element={<Condicionales />} />
        <Route path="/pensamiento-logico" element={<PensamientoLogico />} /> {/* Keep existing route */}
        <Route path="/bucles" element={<Bucles />} />
        <Route path="/estructuras-datos" element={<EstructurasDatos />} />
        <Route path="/dom" element={<DominandoDOM />} />
        <Route path="/cpp" element={<ProgramacionCPP />} />
        <Route path="/python" element={<ProgramacionPython />} />
        <Route path="/ingles" element={<AprendeIngles />} />
        <Route path="/sql" element={<ProgramacionSQL />} />
        <Route path="/react" element={<ProgramacionReact />} />
        <Route path="/flask" element={<ProgramacionFlask />} />
        <Route path="/editor" element={<EditorPro />} />
        <Route path="/cuerpo-humano" element={<CuerpoHumano />} />
      </Routes>
    </Router>
  );
}

export default App;