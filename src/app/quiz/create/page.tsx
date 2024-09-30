"use client";
import { ChatInputComponent } from "@/components/chat-input";
import { useState } from "react";
import QuizComponent from "./_components/QuizComponent";

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

const CreateQuiz = () => {
  const [input, setInput] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

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
      console.log(data);

      setQuizzes(data.event.quizzes);
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
          <QuizComponent key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
        ))}
      </div>
    </div>
  );
};

export default CreateQuiz;
