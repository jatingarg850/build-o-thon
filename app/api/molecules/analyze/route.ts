import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { formula, atoms } = await request.json()
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      }
    })
    
    const atomList = atoms.map((a: any) => a.element).join(', ')
    
    const prompt = `Analyze the molecule with formula ${formula} containing atoms: ${atomList}

Provide:
1. IUPAC name (if applicable)
2. Common name
3. Molecular properties:
   - Molecular weight
   - Polarity
   - Bond angles
   - Geometry (linear, bent, tetrahedral, etc.)
4. Chemical properties:
   - Reactivity
   - Acidity/Basicity
   - Common reactions
5. Uses and applications
6. Safety information

Format as JSON:
{
  "formula": "${formula}",
  "iupacName": "...",
  "commonName": "...",
  "molecularWeight": 18.015,
  "properties": {
    "polarity": "polar/nonpolar",
    "geometry": "bent",
    "bondAngles": "104.5°",
    "hybridization": "sp3"
  },
  "chemical": {
    "reactivity": "...",
    "acidity": "neutral/acidic/basic",
    "commonReactions": ["..."]
  },
  "uses": ["..."],
  "safety": "..."
}

Be scientifically accurate. Return ONLY valid JSON.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    // Clean up the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    const analysis = JSON.parse(text)
    
    return NextResponse.json({ 
      success: true,
      analysis,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Molecule analysis error:', error)
    return NextResponse.json({ 
      error: 'Failed to analyze molecule',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
