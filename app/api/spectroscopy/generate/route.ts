import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { compound, formula } = await request.json()
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `Generate realistic spectroscopy data for ${compound} (${formula}).

Provide:
1. UV-Vis Spectroscopy data:
   - Wavelength range: 200-800 nm
   - Key absorption peaks with wavelengths
   - Transition types (π→π*, n→π*, etc.)

2. IR Spectroscopy data:
   - Wavenumber range: 400-4000 cm⁻¹
   - Functional group peaks
   - Bond types (C-H, O-H, C=O, etc.)

3. NMR Spectroscopy data:
   - Chemical shift range: 0-10 ppm
   - Peak positions for different hydrogen environments
   - Integration and splitting patterns

Format as JSON:
{
  "compound": "${compound}",
  "formula": "${formula}",
  "uvVis": {
    "peaks": [
      {"wavelength": 280, "label": "π→π*", "intensity": "strong"}
    ],
    "description": "..."
  },
  "ir": {
    "peaks": [
      {"wavenumber": 1715, "label": "C=O stretch", "intensity": "strong"}
    ],
    "description": "..."
  },
  "nmr": {
    "peaks": [
      {"shift": 2.1, "label": "CH₃", "integration": 6, "splitting": "singlet"}
    ],
    "description": "..."
  }
}

Be scientifically accurate. Return ONLY valid JSON.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    // Clean up the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    const data = JSON.parse(text)
    
    return NextResponse.json({ 
      success: true,
      data,
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Spectroscopy generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate spectroscopy data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
