import React,{ ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface PermissionComponentProps{
  role:string;
  children: ReactNode; 
}
const PermissionComponent = ({role, children} : PermissionComponentProps) =>{
  const [permissions, setPermissions] = useState([] as string[]);
  useEffect(()=>{
      async function loadRoles() {
          const response = api.get('/users/roles');
          const findRole = (await response).data.some((r: string) => role?.split(',').includes(r));
          setPermissions(findRole)
      }
      loadRoles()
  },[role])
  return <>
  {
    permissions && children
  }
  </>
} 

export default PermissionComponent