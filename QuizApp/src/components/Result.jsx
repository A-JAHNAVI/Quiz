import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Result = () => {
  const { user } = useContext(AuthContext);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(`https://mangrove-temporal-stop.glitch.me/api/result/${user.userId}`);
      const data = await response.json();
      if (data.success) {
        setResult(data);
      }
    };

    fetchResult();
  }, [user]);

  return (
    <div>
      <h1>Quiz Result</h1>
      {result ? <p>You scored {result.score} out of {result.totalQuestions}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Result;
