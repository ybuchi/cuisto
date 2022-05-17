import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Landing from './Components/LandingPage/LandingPage';
import { UserProvider } from './Components/Contexts/UserContext';
import NavBar from './Components/NavBar/NavBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<UserDashboard/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
