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
// import Top11 from './top11/Top11';
import Top11Players from './pages/top11players/Top11Players';
import CreatePlayer from './pages/players/CreatePlayer';
import Footer from './components/Footer';
import DeletePlayer from './pages/players/DeletePlayer';
import EditPlayer from './pages/players/EditPlayer';
import Stadiums from "../src/components/Stadiums"
import EditProfile from './pages/users/EditProfile';
import HallOfFame from './components/HallOfFame';

function App() {
  return (
    <div className="App">
 
    <Navbar />
    <div className='container-main-div'>
    <Routes>

    <Route path="/" element={ <Home /> } />
    <Route path="/auth/signup" element={ <Signup /> } />
    <Route path="/auth/login" element={ <Login /> } />
    <Route path="/user/profile" element={ <IsPrivate> <Profile /> </IsPrivate> } />
    <Route path="/user/profile/edit" element={ <IsPrivate> <EditProfile /> </IsPrivate> } />
    <Route path="/players/list" element={ <IsPrivate> <List /> </IsPrivate> } />
    <Route path="/top11/createTop11" element={ <IsPrivate> <Top11Players /> </IsPrivate> } />
    <Route path="/players/new-player" element={ <IsPrivate> <CreatePlayer /> </IsPrivate> } />
    <Route path="/players/:playerId/details" element={ <IsPrivate> <Details /> </IsPrivate> } />
    <Route path="/players/:playerId/delete" element={ <IsPrivate> <DeletePlayer /> </IsPrivate> } />
    <Route path="/players/:playerId/edit" element={ <IsPrivate> <EditPlayer /> </IsPrivate> } />
    <Route path="/top11/createTop11" element={ <IsPrivate> <Top11Players /> </IsPrivate> } />
    <Route path="/stadiums" element={ <IsPrivate> <Stadiums /> </IsPrivate> } />
    <Route path="/hallOfFame" element={ <IsPrivate> <HallOfFame /> </IsPrivate> } />
    {/* <Route path="/players/:playerId/like" element={ <IsPrivate> <Details /> </IsPrivate> } />
    <Route path="/players/:playerId/unLike" element={ <IsPrivate> <Details /> </IsPrivate> } /> */}



    {/* error handlers */}

    <Route  path="/error" element={ <Error /> }/>
    <Route  path="*" element={ <NotFound /> }/>

    </Routes>

    </div>

    <Footer/>

    </div>
  );
}

export default App;
