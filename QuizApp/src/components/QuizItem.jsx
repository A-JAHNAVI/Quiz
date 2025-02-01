const QuizItem = ({ question, setAnswers, answers }) => {
    const [showAnswer, setShowAnswer] = useState(false);
  
    const handleOptionClick = (option) => {
      setAnswers((prev) => ({ ...prev, [question.id]: option }));
    };
  
    return (
      <div>
        <h3>{question.question}</h3>
        {question.options.map((option) => (
          <button key={option} onClick={() => handleOptionClick(option)} style={{ backgroundColor: answers[question.id] === option ? (option === question.answer ? "green" : "red") : "white" }}>
            {option}
          </button>
        ))}
        <button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
        {showAnswer && <p>{answers[question.id] === question.answer ? "✅ Correct!" : `❌ Incorrect! The answer is ${question.answer}`}</p>}
      </div>
    );
  };
  
  export default QuizItem;
  