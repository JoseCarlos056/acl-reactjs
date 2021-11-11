import {
  Routes,
  Route
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const RoutesComponent = () =>{
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route  path='/dashboard' element={<PrivateRoutes  role='ROLE_USER,ROLE_ADMIN' />}>
            <Route  path='/dashboard' element={<Dashboard/>}/>
          </Route>
    </Routes>
  )
}

export default RoutesComponent