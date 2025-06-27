import { useState } from 'react'
import Entrar from './Entrar'
import './App.css'

export default function Login(){
  return(
    <div className="container">
        <div className="login">
    <h1>Login</h1>
    <div className="inputs">
      <input type="text" placeholder="Digite seu Email"/>
      <input type="text" placeholder="Digite sua Senha"/>
    </div>
    <div className="links">
    <p>Esqueci minha senha.</p>
    <p>Cadastre-se</p>
    </div>
    <Entrar/>
</div>
    </div>
)
  
}