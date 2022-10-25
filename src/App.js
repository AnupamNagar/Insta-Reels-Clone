// import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import {BrowserRouter , Routes ,  Route, } from 'react-router-dom';
import { Authprovider } from './context/Authcontext';
import Feed from './component/Feed';
import PrivateRoute from './component/PrivateRoute';
import Forgotpassword from './component/Forgotpassword'
import Profile from './component/Profile';
// import IntersectionObserverApi from './component/IntersectionObserverApi';




function App() {
  return (
    
    // <Outlet>
      <BrowserRouter>
      <Authprovider>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>}></Route>
          <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        </Routes> 
      </Authprovider>
      </BrowserRouter>  
      // <IntersectionObserverApi></IntersectionObserverApi>
    // </Outlet>
  );
}

export default App;
