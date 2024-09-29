import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();
    console.log("input : ", input);

    // Dummy response
    const quizzes = [
      { id: 1, question: "What is 2 + 2?", answer: "4" },
      { id: 2, question: "What is the capital of France?", answer: "Paris" },
    ];

    return NextResponse.json({ quizzes });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
