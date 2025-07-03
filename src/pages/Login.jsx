import Entrar from '../Entrar'
import '../App.css'
import imagem from '../assets/telalogin.png'

export default function Login(){
  return(
    <div className="container">
      <div className='loginblock'>
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
          <Entrar />
      </div>
      </div>
      <div className='imagem'>
        <img src= {imagem} alt="" />
      </div>
        


    </div>
)
  
}