import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define a more detailed Zod schema for quizzes
const QuizSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

const QuizzesFormat = z.object({
  quizzes: z.array(QuizSchema),
});

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a quiz-creating assistant. Your task is to help users create quizzes by providing questions and answers based on the input they provide. Ensure the quizzes are accurate, engaging, and educational.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      response_format: zodResponseFormat(QuizzesFormat, "event"),
    });

    const event = completion.choices[0].message.parsed;
    console.log(event);

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
