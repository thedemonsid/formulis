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

export async function POST(request: NextRequest) {
  try {
    let input = await request.json();
    input = JSON.stringify(input);
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a quiz-creating assistant. Your task is to help users create quizzes by providing questions and answers based on the input they provide. Ensure the quizzes are accurate, engaging, and educational. You are given a question and its answer with user's changes they want to implement in that question. Give them what they want.",
        },
        {
          role: "user",
          content: input, // Ensure this is a string
        },
      ],
      response_format: zodResponseFormat(QuizSchema, "event"),
    });

    const event = completion.choices[0].message.parsed;
    console.log(event);

    return NextResponse.json({ quiz: event });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
