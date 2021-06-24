import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth()

  return (
    <div className="" id="pageAuth">
      <aside>
        <img
          src={IllustrationImg}
          alt="Ilustrção simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo real.</p>
      </aside>

      <main>
        <div className="mainContent">
          <img src={logoImg} alt="Letmeask" />
          <h2>{user?.name}, Crie uma nova sala!</h2>
          <form action="">
            <input type="text" placeholder="Nome da sala." />

            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
