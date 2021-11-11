import React from 'react';
import PermissionComponent from '../../components/PermissionComponent';
import './styles.css'
const Dashboard = () => {
 
  return (
   <div>
     <h3>Menu</h3>
     <ul>
       <li>
         Perfil
       </li>
       <PermissionComponent role='ROLE_ADMIN,ROLE_USER'>
        <li>
          Produtos
        </li>
       </PermissionComponent>

     </ul>
   </div>
  )
}
export { Dashboard }