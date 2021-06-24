import "../styles/questions.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Questions(props: QuestionProps) {
  return (
    <div className="questionContainer">
      <div className="questionContent">
        <p>{props.content}</p>
      </div>

      <footer className="questionInfo">
        <div className="userQuestionInfo">
          <img src={props.author.avatar} alt="Avatar Usuario" />
          <span>{props.author.name}</span>
        </div>

        <div className="likes"></div>
      </footer>
    </div>
  );
}
