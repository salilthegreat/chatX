import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Messenger from './pages/Messenger';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/messenger' element={<Messenger/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
