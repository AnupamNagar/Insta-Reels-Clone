import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext'
// import {Route} from 'react-router-dom';

// function PrivateRoute ({component: Component , ...rest}) {

//   const {user} = useContext(Authcontext);

//   return (
//     <Route {...rest} render = {props =>{
//       return user? <Component {...props} /> : <Navigate  to='/login'></Navigate>
//     }}></Route>
//   )
// }

const PrivateRoute = ({ children }) =>{
  const {user} = useContext(Authcontext);

  return user ? children : <Navigate to ='/login' replace />
}

export default PrivateRoute
