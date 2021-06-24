import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";

import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImgIcon from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === ''){
      return;
    }

    // procurando no banco se a sala existe
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // verificando se existe
    if(!roomRef.exists()) {
      alert('A sala não existe.');
      return;
    }

    // redirecionando para a sala
    history.push(`rooms/${roomCode}`)
  }

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
          <button className="createRoom" onClick={handleCreateRoom}>
            <img src={googleImgIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o codigo da Sala." 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
