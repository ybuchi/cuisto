import './App.css';
import { useContext } from "react";
import { UserContext } from './Components/Contexts/UserContext';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Landing from './Components/LandingPage/LandingPage';
import { UserProvider } from './Components/Contexts/UserContext';
import useLoginState from './Components/CustomHooks/useLoginState';
import NavBar from './Components/NavBar/NavBar';
import GeneralNavBar from './Components/GeneralNavBar/GeneralNavBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import NewRecipePage from './Components/NewRecipePage/NewRecipePage';
import RecipeLibraryPage from './Components/RecipyLibraryPage/RecipeLibraryPage';
import UserPantryPage from './Components/UserPantryPage/UserPantryPage';
import ClubsPage from './Components/ClubsPage/ClubsPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import RecipePage from './Components/RecipePage/RecipePage';
import PantryPage from './Components/PantryPage/PantryPage';
import CookingSessionPage from './Components/CookingSessionPage/CookingSessionPage';
import PublicRecipesPage from './Components/PublicRecipesPage/PublicRecipesPage';
import EditRecipePage from './Components/EditRecipePage/EditRecipePage';
import Footer from './Components/Footer/Footer';
import IngredientDash from './Components/IngredientDash/IngredientDash';

function App() {
  useLoginState();
  const { isLoggedIn } = useContext(UserContext);
  console.log("Loggin Status:", isLoggedIn)

  return (
    <div className="App">
      <UserProvider>
        {isLoggedIn ? <NavBar/> : <GeneralNavBar/>}
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/browse-recipes" element={<PublicRecipesPage/>}/>
          <Route path="/browse-recipes/:recipe_id" element={<RecipePage />}/>
          <Route path="/browse-recipes/:recipe_id/edit" element={<EditRecipePage />}/>
          <Route path="new-recipe" element={<NewRecipePage/>}/>
          <Route path="recipe-library" element={<RecipeLibraryPage/>}/>
          <Route path="/recipe-library/:recipe_id" element={<RecipePage />}/>
          <Route path="/recipe-library/:recipe_id/edit" element={<EditRecipePage/>}/>
          <Route path="/recipe-library/cooking-session/:recipe_id" element={<CookingSessionPage/>}/>

          <Route path="home" element={<IngredientDash/>}>
            <Route index element={<UserDashboard/>}/>
            <Route path="pantries" element={<UserPantryPage/>}/>
            <Route path="pantries/:pantry_id" element={<PantryPage/>}/>
            <Route path="library" element={<RecipeLibraryPage/>}/>
            <Route path="library/:recipe_id" element={<RecipePage />}/>
            <Route path="browse-recipes" element={<PublicRecipesPage/>}/>
            <Route path="browse-recipes/:recipe_id" element={<RecipePage/>}/>
          </Route>

          <Route path="clubs" element={<ClubsPage/>}/>
          <Route path="profile" element={<ProfilePage />}/>
        </Routes>
        <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;
