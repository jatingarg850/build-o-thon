import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function GET(request: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `Generate 5 chemistry reaction quiz questions. For each question:
1. Provide 2 reactants (chemical formulas)
2. Ask what product is formed
3. Provide 4 multiple choice options (one correct)
4. Include a detailed explanation
5. Assign points (10-20 based on difficulty)

Format as JSON array with this structure:
[
  {
    "id": "q1",
    "reactants": ["HCl", "NaOH"],
    "question": "What is the product when Hydrochloric acid reacts with Sodium hydroxide?",
    "options": ["NaCl + H₂O", "Na₂O + HCl", "NaH + ClO", "No reaction"],
    "correctAnswer": 0,
    "explanation": "This is a neutralization reaction...",
    "points": 10
  }
]

Make questions progressively harder. Include:
- Neutralization reactions
- Precipitation reactions
- Displacement reactions
- Oxidation reactions
- Complex reactions

Return ONLY valid JSON, no markdown or extra text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    // Clean up the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    const questions = JSON.parse(text)
    
    return NextResponse.json({ 
      success: true,
      questions,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Quiz generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate quiz',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
