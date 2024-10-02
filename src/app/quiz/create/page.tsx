"use client";
import { ChatInputComponent } from "@/components/chat-input";
import { useState } from "react";
import QuizComponent from "./_components/QuizComponent";
import Loading from "@/app/loading";

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

const CreateQuiz = () => {
  const [input, setInput] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
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
        {!loading ? (
          quizzes.map((quiz: Quiz) => (
            <QuizComponent key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
          ))
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
