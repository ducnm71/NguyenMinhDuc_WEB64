import Homepage from './pages/Homepage/Homepage';
import About from './pages/About/About';

import { Routes, Route} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/index' element={<Homepage/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
