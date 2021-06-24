import copyImg from "../assets/images/copy.svg";
import "../styles/roomCode.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="roomCode" onClick={copyCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copiar Codigo da Sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
