
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet,RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
interface RoutesPropsData extends RouteProps{
    role?: string;
}
const PrivateRoutes = ({ role, ...rest }: RoutesPropsData) => {
    const [permissions, setPermissions] = useState([] as string[]);
    useEffect(()=>{
        async function loadRoles() {
            const response = api.get('/users/roles');
            const findRole = (await response).data.some((r: string) => role?.split(',').includes(r));
            setPermissions(findRole)
        }
        loadRoles()
    },[])
    const { userLooged } = useAuth();

    if(!userLooged()){
        return <Navigate to="/" />
    }
    if(!role && userLooged()){
        return <Outlet />
    }

    return permissions ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoutes