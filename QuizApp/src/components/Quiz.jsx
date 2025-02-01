import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import QuizItem from "./QuizItem";

const Quiz = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://mangrove-temporal-stop.glitch.me/api/questions");
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Questions:", data); 

        if (data.success && data.questions) {
          setQuestions(data.questions);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://mangrove-temporal-stop.glitch.me/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId, answers }),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/result");
      } else {
        setError("Failed to submit quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {loading && <p>Loading questions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {questions.length > 0 ? (
        questions.map((q) => <QuizItem key={q.id} question={q} setAnswers={setAnswers} answers={answers} />)
      ) : (
        !loading && <p>No questions available</p>
      )}
      <button onClick={handleSubmit} disabled={loading || !questions.length}>Submit Quiz</button>
    </div>
  );
};

export default Quiz;
