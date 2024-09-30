import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

interface QuizComponentProps {
  quiz: Quiz;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ quiz, setQuizzes }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: quiz.id,
          question: quiz.question,
          answer: quiz.answer,
          change: inputValue, // Use the input value as the change
        }),
      });
      const data = await response.json();
      console.log(data.quiz);
      const updatedQuiz = data.quiz;
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q))
      );
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return (
    <div key={quiz.id} className="border border-1 p-4 m-2">
      <h3>
        <span>{quiz.id}. </span>
        {quiz.question}
      </h3>
      <p>Ans :- {quiz.answer}</p>
      <div className="flex gap-3 p-2">
        <Input
          className="w-full"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default QuizComponent;
