import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Error from "./pages/errors/Error"
import NotFound from "./pages/errors/NotFound"
import Profile from './pages/users/Profile';
import IsPrivate from './components/auth/IsPrivate';
import List from './pages/players/List';
import Details from "./pages/players/Details";

function App() {
  return (
    <div className="App">
 
    <Navbar />

    <Routes>

    <Route path="/" element={ <Home /> } />
    <Route path="/auth/signup" element={ <Signup /> } />
    <Route path="/auth/login" element={ <Login /> } />
    <Route path="/user/profile/" element={ <IsPrivate> <Profile /> </IsPrivate> } />
    <Route path="/players/list" element={ <IsPrivate> <List /> </IsPrivate> } />
    <Route path="/players/:playerId/details" element={ <IsPrivate> <Details /> </IsPrivate> } />
    {/* <Route path="/players/:playerId/like" element={ <IsPrivate> <Details /> </IsPrivate> } />
    <Route path="/players/:playerId/unLike" element={ <IsPrivate> <Details /> </IsPrivate> } /> */}



    {/* error handlers */}

    <Route  path="/error" element={ <Error /> }/>
    <Route  path="*" element={ <NotFound /> }/>

    </Routes>

    </div>
  );
}

export default App;
