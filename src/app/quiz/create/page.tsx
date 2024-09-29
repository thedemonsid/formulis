"use client";
import { ChatInputComponent } from "@/components/chat-input";
import { useState } from "react";
interface Quiz {
  id: number;
  question: string;
  answer: string;
}
const CreateQuiz = () => {
  const [input, setInput] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  //   console.log(quizzes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      console.log(data.quizzes);

      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="font-bold text-2xl">Create Quiz</h1>
      <ChatInputComponent
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <div className="mt-4">
        {quizzes.map((quiz: Quiz) => (
          <div key={quiz.id}>
            <h3>
              <span>{quiz.id}. </span>
              {quiz.question}
            </h3>
            <p>{quiz.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateQuiz;
