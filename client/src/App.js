import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Landing from './Components/LandingPage/LandingPage';
import { UserProvider } from './Components/Contexts/UserContext';
import NavBar from './Components/NavBar/NavBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import NewRecipePage from './Components/NewRecipePage/NewRecipePage';
import RecipeLibraryPage from './Components/RecipyLibraryPage/RecipeLibraryPage';
import UserPantryPage from './Components/UserPantryPage/UserPantryPage';
import ClubsPage from './Components/ClubsPage/ClubsPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import RecipePage from './Components/RecipePage/RecipePage';
import PantryPage from './Components/PantryPage/PantryPage';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="dashboard" element={<UserDashboard/>}/>
          <Route path="new-recipe" element={<NewRecipePage/>}/>
          <Route path="recipe-library" element={<RecipeLibraryPage/>}/>
          <Route path="/recipe-library/:recipe_id" element={<RecipePage />}/>
          <Route path="pantries" element={<UserPantryPage/>}/>
          <Route path="/pantries/:pantry_id" element={<PantryPage/>}/>
          <Route path="clubs" element={<ClubsPage/>}/>
          <Route path="profile" element={<ProfilePage />}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
