import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {FormEvent, useState} from 'react'
import { database } from "../services/firebase";

import IllustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    
    if(newRoom.trim() === '') {
      return;
    }

    // referencia para um registro dentro do banco.
    const roomRef = database.ref('rooms');

    // inserindo os dados para criar uma nova sala
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);


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
          <h2>{user?.name}, Crie uma nova sala!</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala." 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

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
