import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Experiment, ReactionResult } from '@/types/chemistry'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const experiment: Experiment = await request.json()
    
    if (!experiment.chemicals || experiment.chemicals.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 chemicals are required for a reaction' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY in environment variables.' },
        { status: 503 }
      )
    }

    try {
      // Use Gemini AI for reaction analysis
      // Using the latest Gemini 2.5 Flash model (as of Oct 2025)
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        // Disable thinking to prioritize speed for chemistry analysis
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048,
        }
      })

      // Prepare the prompt for Gemini
      const chemicalsList = experiment.chemicals
        .map(c => `${c.chemical.name} (${c.chemical.formula}): ${c.amount} ${c.unit}`)
        .join('\n')

      const prompt = `You are an expert chemistry assistant analyzing a chemical reaction. 

Chemicals being mixed:
${chemicalsList}

Analyze this chemical reaction and provide a detailed response in the following JSON format:
{
  "color": "describe the final solution color (e.g., 'blue', 'colorless', 'light green')",
  "smell": "describe any smell (e.g., 'pungent', 'sweet', 'none')",
  "precipitate": true or false,
  "precipitateColor": "color of precipitate if any (e.g., 'white', 'blue', 'brown')",
  "products": ["list", "of", "product", "formulas"],
  "balancedEquation": "complete balanced chemical equation with states and arrows",
  "reactionType": "type of reaction (e.g., 'precipitation', 'acid-base', 'redox', 'complexation', 'no reaction')",
  "observations": ["detailed", "observation", "points"],
  "safetyNotes": ["important", "safety", "warnings"],
  "temperature": "increased" or "decreased" or "unchanged",
  "gasEvolution": true or false,
  "confidence": 0.0 to 1.0
}

Provide ONLY the JSON response, no additional text. Ensure all field names match exactly.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse the JSON response
      let reactionResult: ReactionResult
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        reactionResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Invalid JSON response from AI')
      }

      // Validate and ensure all required fields are present
      const validatedResult: ReactionResult = {
        color: reactionResult.color,
        smell: reactionResult.smell ,
        precipitate: reactionResult.precipitate,
        precipitateColor: reactionResult.precipitateColor,
        products: reactionResult.products ,
        balancedEquation: reactionResult.balancedEquation ,
        reactionType: reactionResult.reactionType ,
        observations: reactionResult.observations ,
        safetyNotes: reactionResult.safetyNotes ,
        temperature: reactionResult.temperature ,
        gasEvolution: reactionResult.gasEvolution ,
        confidence: reactionResult.confidence 
      }

      console.log('AI Analysis successful:', validatedResult)
      return NextResponse.json(validatedResult)

    } catch (aiError) {
      console.error('Gemini AI error:', aiError)
      return NextResponse.json(
        { 
          error: 'AI analysis failed. Please check your API key or try again later.',
          details: aiError instanceof Error ? aiError.message : 'Unknown error'
        },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Reaction analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze reaction' },
      { status: 500 }
    )
  }
}