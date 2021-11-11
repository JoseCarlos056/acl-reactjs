import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './styles.css'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth()
  const handleSubmit = useCallback(async (event)=> {
    event.preventDefault()
    console.log(username,password)
    await signIn({
      username,
      password
    })
    navigate('/dashboard')
  },[username,password])
  return (
    <form  className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Usuario</label>
        <input type='txt' onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input type='password' onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit">Enviar</button>

    </form>
  )
}
export { Login }