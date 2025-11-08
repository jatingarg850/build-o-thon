# 🤖 AI Integration - Gemini API

## Overview
The Virtual Chemistry Lab now uses Google's Gemini AI API to generate perfect, scientifically accurate data for all features.

## API Key Configuration
```env
GEMINI_API_KEY=AIzaSyAo4nhxv3GtdrOmP6xS-dKmx7Wni_Pc5Uo
```

## AI-Powered Features

### 1. **Daily Reaction Quiz** (`/api/quiz/generate`)
**Endpoint**: `GET /api/quiz/generate`

**What it does**:
- Generates 5 unique chemistry quiz questions
- Progressive difficulty (10-20 points)
- Covers multiple reaction types:
  - Neutralization reactions
  - Precipitation reactions
  - Displacement reactions
  - Oxidation reactions
  - Complex reactions

**Response Format**:
```json
{
  "success": true,
  "questions": [
    {
      "id": "q1",
      "reactants": ["HCl", "NaOH"],
      "question": "What is the product...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 0,
      "explanation": "Detailed explanation...",
      "points": 10
    }
  ],
  "generatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Features**:
- ✅ Auto-loads AI questions on page load
- ✅ "New AI Quiz" button to generate fresh questions
- ✅ Scientifically accurate explanations
- ✅ Balanced difficulty progression

---

### 2. **Molecular Analysis** (`/api/molecules/analyze`)
**Endpoint**: `POST /api/molecules/analyze`

**What it does**:
- Analyzes molecular structure
- Provides IUPAC and common names
- Calculates molecular properties
- Suggests uses and applications
- Safety information

**Request**:
```json
{
  "formula": "H₂O",
  "atoms": [
    { "element": "O", "x": 0, "y": 0, "z": 0 },
    { "element": "H", "x": -1, "y": 1, "z": 0 },
    { "element": "H", "x": 1, "y": 1, "z": 0 }
  ]
}
```

**Response Format**:
```json
{
  "success": true,
  "analysis": {
    "formula": "H₂O",
    "iupacName": "Oxidane",
    "commonName": "Water",
    "molecularWeight": 18.015,
    "properties": {
      "polarity": "polar",
      "geometry": "bent",
      "bondAngles": "104.5°",
      "hybridization": "sp3"
    },
    "chemical": {
      "reactivity": "...",
      "acidity": "neutral",
      "commonReactions": ["..."]
    },
    "uses": ["Solvent", "Essential for life"],
    "safety": "Non-toxic, essential"
  }
}
```

**Features**:
- ✅ "AI Analysis" button in molecule builder
- ✅ Real-time molecular property calculation
- ✅ Geometry and bond angle predictions
- ✅ Practical uses and applications
- ✅ Safety information

---

### 3. **Spectroscopy Data Generation** (`/api/spectroscopy/generate`)
**Endpoint**: `POST /api/spectroscopy/generate`

**What it does**:
- Generates realistic spectroscopy data
- UV-Vis absorption spectra
- IR functional group peaks
- NMR chemical shifts
- Peak identification and labeling

**Request**:
```json
{
  "compound": "Ethanol",
  "formula": "C₂H₅OH"
}
```

**Response Format**:
```json
{
  "success": true,
  "data": {
    "compound": "Ethanol",
    "formula": "C₂H₅OH",
    "uvVis": {
      "peaks": [
        {
          "wavelength": 280,
          "label": "n→π*",
          "intensity": "weak"
        }
      ],
      "description": "..."
    },
    "ir": {
      "peaks": [
        {
          "wavenumber": 3300,
          "label": "O-H stretch",
          "intensity": "strong"
        },
        {
          "wavenumber": 2900,
          "label": "C-H stretch",
          "intensity": "strong"
        },
        {
          "wavenumber": 1050,
          "label": "C-O stretch",
          "intensity": "strong"
        }
      ],
      "description": "..."
    },
    "nmr": {
      "peaks": [
        {
          "shift": 1.2,
          "label": "CH₃",
          "integration": 3,
          "splitting": "triplet"
        },
        {
          "shift": 3.7,
          "label": "CH₂",
          "integration": 2,
          "splitting": "quartet"
        },
        {
          "shift": 5.3,
          "label": "OH",
          "integration": 1,
          "splitting": "singlet"
        }
      ],
      "description": "..."
    }
  }
}
```

**Features**:
- ✅ Custom compound analysis
- ✅ Input any compound name and formula
- ✅ Generate all three spectra types
- ✅ Scientifically accurate peak positions
- ✅ Functional group identification

---

## How It Works

### Quiz Generation Flow:
1. User visits `/quiz` page
2. Page automatically calls `/api/quiz/generate`
3. Gemini AI generates 5 unique questions
4. Questions are displayed with timer
5. User can click "New AI Quiz" for fresh questions

### Molecule Analysis Flow:
1. User builds molecule in `/molecules`
2. Clicks "AI Analysis" button
3. API sends formula and atom data to Gemini
4. AI analyzes structure and properties
5. Results displayed in beautiful card

### Spectroscopy Flow:
1. User selects compound or enters custom
2. Clicks "Generate Spectra" (for custom)
3. API requests spectroscopy data from Gemini
4. AI generates realistic UV-Vis, IR, and NMR data
5. Spectra visualized with peaks labeled

---

## Benefits of AI Integration

✅ **Always Fresh Content**: New quiz questions every time
✅ **Scientifically Accurate**: Gemini trained on chemistry data
✅ **Educational**: Detailed explanations for learning
✅ **Unlimited Compounds**: Analyze any molecule
✅ **Realistic Data**: Professional-grade spectroscopy
✅ **No Manual Data Entry**: AI generates everything
✅ **Scalable**: Can handle any chemistry query

---

## API Rate Limits & Costs

- **Gemini Pro**: Free tier available
- **Rate Limit**: 60 requests per minute
- **Cost**: Free for moderate usage
- **Fallback**: Default data if API fails

---

## Error Handling

All API routes include:
- Try-catch error handling
- Fallback to default data
- Detailed error messages
- JSON parsing validation
- Response cleanup (removes markdown)

---

## Future Enhancements

🔮 **Planned Features**:
- Cache AI responses for common queries
- User-specific quiz difficulty adjustment
- 3D molecular visualization from AI
- Reaction mechanism predictions
- Synthesis pathway suggestions
- Real-time collaboration with AI hints

---

## Testing the AI Features

### Test Quiz Generation:
```bash
curl http://localhost:3000/api/quiz/generate
```

### Test Molecule Analysis:
```bash
curl -X POST http://localhost:3000/api/molecules/analyze \
  -H "Content-Type: application/json" \
  -d '{"formula":"H2O","atoms":[{"element":"O"},{"element":"H"},{"element":"H"}]}'
```

### Test Spectroscopy:
```bash
curl -X POST http://localhost:3000/api/spectroscopy/generate \
  -H "Content-Type: application/json" \
  -d '{"compound":"Benzene","formula":"C6H6"}'
```

---

**All AI features are live and working!** 🚀
