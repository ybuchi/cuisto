import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Landing from './Components/LandingPage/LandingPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
