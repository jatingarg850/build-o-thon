# 🧪 Virtual Chemistry Lab

<div align="center">

![Virtual Chemistry Lab](https://img.shields.io/badge/Virtual%20Chemistry%20Lab-v2.0-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![AI Powered](https://img.shields.io/badge/AI%20Powered-Gemini-orange?style=for-the-badge&logo=google)
![Authentication](https://img.shields.io/badge/Auth-NextAuth.js-purple?style=for-the-badge&logo=auth0)

**A professional interactive web-based chemistry laboratory with authentication and cloud sync**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Overview](#-overview)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚡ Installation](#-installation)
- [🚀 Usage](#-usage)
- [🧪 How It Works](#-how-it-works)
- [🎨 UI Components](#-ui-components)
- [🤖 AI Integration](#-ai-integration)
- [💾 Data Storage](#-data-storage)
- [📱 Responsive Design](#-responsive-design)
- [🔧 API Endpoints](#-api-endpoints)
- [🌟 Key Features Explained](#-key-features-explained)
- [📊 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 **Authentication & Security**

- **User Authentication** - Secure login/registration system
- **Session Management** - Persistent user sessions with JWT
- **Protected Routes** - Middleware-protected lab access
- **User Profiles** - Personal experiment statistics and history
- **Cloud Sync** - Automatic experiment synchronization across devices

### 🔬 **Core Laboratory Features**

- **Drag & Drop Interface** - Intuitive chemical and glassware manipulation
- **Real-time Reactions** - AI-powered chemical reaction simulation
- **Visual Effects** - Realistic precipitation, color changes, and gas evolution
- **Multiple Glassware** - Test tubes, beakers with accurate volume measurements
- **Quantity Control** - Precise chemical amount selection with multiple units
- **Click-to-Add** - Quick chemical addition with single clicks

### 🤖 **AI-Powered Analysis**

- **Reaction Prediction** - Gemini AI predicts reaction outcomes
- **Color Changes** - Realistic visual representation of chemical reactions
- **Precipitate Formation** - Accurate precipitation simulation in beakers only
- **Safety Analysis** - AI-generated safety notes and hazard warnings
- **Confidence Scoring** - AI confidence levels for predictions
- **Balanced Equations** - Automatically generated chemical equations

### 💾 **Advanced Data Management**

- **Hybrid Storage** - Local storage + MongoDB cloud backup
- **Export to PDF** - Professional experiment reports with jsPDF
- **Share Results** - Native sharing and clipboard integration
- **Experiment History** - Comprehensive experiment management
- **Search & Filter** - Advanced experiment search capabilities
- **Data Validation** - Zod schema validation for all data

### 🎨 **Premium User Experience**

- **Beautiful Landing Page** - Professional marketing homepage
- **Modern Authentication UI** - Sleek sign-in/sign-up pages
- **Glass Morphism Design** - Modern UI with backdrop blur effects
- **Gradient Animations** - Smooth color transitions and hover effects
- **Responsive Design** - Optimized for all devices and screen sizes
- **Professional Header** - Clean navigation with back button
- **Enhanced Chemical Cards** - Visually appealing chemical selection

---

## 🎯 Overview

Virtual Chemistry Lab is a comprehensive web application that simulates a real chemistry laboratory environment. Students and educators can perform qualitative inorganic salt analysis experiments through an intuitive drag-and-drop interface, with AI-powered reaction predictions and realistic visual effects.

### 🎓 **Educational Purpose**

- **Safe Learning Environment** - No physical chemicals or equipment needed
- **Unlimited Experiments** - Practice without material constraints
- **Instant Feedback** - AI analysis provides immediate results
- **Documentation** - Automatic experiment logging and reporting

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 14 (React 18+)
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth interactions
- **Drag & Drop**: React DnD with touch support
- **Icons**: Lucide React icon library
- **PDF Generation**: jsPDF for professional reports
- **Authentication**: NextAuth.js integration ready

### **Backend**

- **Runtime**: Node.js with TypeScript
- **API**: Next.js API Routes with middleware
- **Database**: MongoDB Atlas with connection pooling
- **AI Integration**: Google Gemini API
- **Validation**: Zod schema validation
- **Security**: bcryptjs password hashing

### **Development & Deployment**

- **Language**: TypeScript with strict mode
- **Package Manager**: npm with lock file
- **Version Control**: Git with conventional commits
- **Deployment**: Vercel optimized
- **Environment**: Multiple environment support

---

## ⚡ Installation

### **Prerequisites**

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- MongoDB Atlas account (for cloud features)
- Google Gemini API key (for AI analysis)

### **Quick Start**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/virtual-chemistry-lab.git
   cd virtual-chemistry-lab
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install authentication dependencies**

   ```bash
   npm install next-auth @auth/mongodb-adapter bcryptjs zod
   npm install @types/bcryptjs --save-dev
   ```

4. **Environment Setup**

   Create `.env.local` file:

   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chemlab-online

   # Gemini AI API Key
   GEMINI_API_KEY=your_gemini_api_key_here

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # OAuth Providers (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### **First Time Setup**

1. Visit the homepage and create an account
2. Sign in to access the virtual laboratory
3. Start experimenting with chemical reactions!

---

## 🚀 Usage

### **Getting Started**

1. **Authentication**

   - Visit the homepage at `http://localhost:3000`
   - Click "Get Started" to create a new account
   - Or "Sign In" if you already have an account
   - Authentication is required to access the laboratory

2. **Laboratory Access**

   - After signing in, you'll be redirected to the lab interface
   - Use the back arrow (←) to return to the homepage anytime
   - Your experiments are automatically saved to your account

3. **Select Chemicals**

   - Browse the enhanced chemical reagents panel on the left
   - Click on any chemical card to add it to the first test tube
   - Or drag chemicals to specific glassware for precise placement
   - Each chemical card shows state, hazards, and concentration

4. **Add Glassware**

   - Use the "Test Tube" and "Beaker" buttons to add equipment
   - Each piece shows accurate capacity and current contents
   - Visual liquid levels correspond to actual volumes

5. **Specify Quantities**

   - When adding chemicals, a modal appears for quantity selection
   - Choose from preset amounts or enter custom values
   - Select appropriate units (ml, g, drops, mg)
   - Real-time validation ensures accurate measurements

6. **Perform Reactions**

   - Click "Perform Reaction" when ready
   - AI analyzes the chemical combination using Gemini API
   - View comprehensive results in the Reaction Analysis panel
   - See balanced equations, reaction types, and safety notes

7. **Manage Experiments**
   - **Save**: Experiments auto-save to your account
   - **Load**: Access your experiment history
   - **Export**: Generate professional PDF reports
   - **Share**: Share results via native sharing or clipboard
   - **Clear**: Reset the workspace for new experiments

---

## 🧪 How It Works

### **Chemical Database**

The app includes a comprehensive database of common laboratory chemicals:

- **Inorganic Salts**: NaCl, AgNO₃, CuSO₄, etc.
- **Acids & Bases**: HCl, NaOH, H₂SO₄, etc.
- **Properties**: Formula, state, color, concentration, hazards

### **Reaction Engine**

1. **Input Processing**: Collects all chemicals and quantities
2. **AI Analysis**: Sends data to Gemini API for reaction prediction
3. **Result Processing**: Parses AI response for visual effects
4. **Visual Updates**: Updates glassware with new colors, precipitates, etc.

### **Visual Effects System**

- **Color Changes**: Dynamic liquid color updates
- **Precipitation**: Realistic settling particles and layers
- **Gas Evolution**: Bubble animations for gas-producing reactions
- **Temperature Effects**: Visual indicators for heat changes

---

## 🎨 UI Components

### **Application Architecture**

```
┌─────────────────────────────────────────────────────────┐
│  ← Back    Header (Gradient + Glass Morphism)           │
│            Load | Clear | Save | Share | Export         │
├──────────────┬─────────────────────┬───────────────────┤
│   Enhanced   │     Lab Bench       │    Advanced       │
│   Chemical   │   (Sticky Panel)    │    Reaction       │
│   Cards      │                     │    Analysis       │
│              │                     │                   │
│  - Beautiful │  - Test Tubes       │  - AI Results     │
│  - Gradients │  - Beakers          │  - Equations      │
│  - Click/Drag│  - Precipitation    │  - Observations   │
│  - Hazard    │  - Visual Effects   │  - Safety Notes   │
│  - Info      │  - Perform Reaction │  - Confidence     │
└──────────────┴─────────────────────┴───────────────────┘
```

### **Enhanced Components**

- **Landing Page**: Professional homepage with authentication
- **Authentication Pages**: Beautiful sign-in/sign-up interfaces
- **Enhanced Header**: Glass morphism with gradient effects
- **Chemical Cards**: Visually appealing with color-coded backgrounds
- **AuthButton**: User menu with profile and logout options
- **Protected Routes**: Middleware-based access control
- **Experiment Controls**: Full CRUD operations with cloud sync
- **PDF Reports**: Professional document generation
- **Responsive Design**: Optimized for all screen sizes

---

## 🤖 AI Integration

### **Gemini API Integration**

The app uses Google's Gemini AI for intelligent reaction analysis:

```typescript
// Example API call structure
const reactionData = {
  chemicals: [
    { name: "Sodium Chloride", formula: "NaCl", amount: 2, unit: "g" },
    { name: "Silver Nitrate", formula: "AgNO₃", amount: 1, unit: "g" }
  ]
}

// AI Response includes:
{
  balancedEquation: "NaCl + AgNO₃ → AgCl↓ + NaNO₃",
  reactionType: "precipitation",
  color: "white precipitate",
  precipitate: true,
  precipitateColor: "white",
  products: ["AgCl", "NaNO₃"],
  observations: ["White precipitate forms immediately"],
  safetyNotes: ["Handle silver compounds with care"],
  confidence: 0.95
}
```

### **Fallback System**

For testing and offline use, the app includes deterministic reactions:

- **AgNO₃ + NaCl** → White precipitate (AgCl)
- **CuSO₄ + NaOH** → Blue precipitate (Cu(OH)₂)
- **Generic mixing** → Basic color blending

---

## 💾 Data Storage

### **Dual Storage System**

#### **Client-Side (localStorage)**

- Quick access to recent experiments
- Offline functionality
- No server dependency
- Immediate save/load

#### **Server-Side (MongoDB)**

- Persistent cloud storage
- Cross-device synchronization
- Experiment sharing
- Analytics and tracking

### **Data Structure**

```typescript
interface ExperimentLog {
  userId: string;
  experimentName: string;
  chemicals: ChemicalContent[];
  reactionDetails: ReactionResult;
  timestamp: Date;
}
```

---

## 📱 Responsive Design

### **Breakpoint Strategy**

- **Mobile** (< 768px): Stacked layout, touch-optimized
- **Tablet** (768px - 1024px): Flexible grid, hybrid interactions
- **Desktop** (> 1024px): Full three-panel layout

### **Adaptive Features**

- **Touch Support**: Enhanced drag areas for mobile
- **Gesture Recognition**: Pinch, zoom, swipe gestures
- **Flexible Layouts**: Components reflow based on screen size
- **Optimized Performance**: Reduced animations on mobile

---

## 🔧 API Endpoints

### **Reaction Analysis**

```http
POST /api/react
Content-Type: application/json

{
  "name": "Experiment Name",
  "chemicals": [...],
  "glassware": [...]
}
```

### **Authentication**

```http
# User registration
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

# NextAuth.js endpoints
GET/POST /api/auth/[...nextauth]
```

### **Experiment Management**

```http
# Save experiment (authenticated)
POST /api/experiments
Authorization: Bearer <session-token>
{
  "name": "Silver Chloride Precipitation",
  "chemicals": [...],
  "reactionDetails": {...}
}

# Get user experiments
GET /api/experiments?limit=20&skip=0&search=precipitation

# Get specific experiment
GET /api/experiments/[id]

# Update experiment
PUT /api/experiments/[id]

# Delete experiment
DELETE /api/experiments/[id]
```

### **User Profile**

```http
# Get user profile with statistics
GET /api/user/profile

# Update user preferences
PUT /api/user/profile
{
  "name": "Updated Name",
  "preferences": {
    "theme": "dark",
    "autoSave": true
  }
}
```

---

## 🌟 Key Features Explained

### **🎯 Drag & Drop System**

- **React DnD**: Professional drag and drop implementation
- **Visual Feedback**: Hover states, drop zones, animations
- **Multi-target**: Drag to specific containers or general areas
- **Touch Support**: Works on mobile devices

### **⚗️ Realistic Glassware**

- **Accurate Volumes**: Test tubes (10ml), Beakers (50ml)
- **Visual Liquid Levels**: Height corresponds to actual volume
- **Measurement Marks**: Graduated markings on glassware
- **Proper Scaling**: Realistic proportions and sizes

### **🎨 Advanced Animations**

- **Liquid Pouring**: Smooth height transitions
- **Precipitation**: Particle settling effects
- **Gas Evolution**: Bubble animations
- **Color Mixing**: Gradient transitions

### **📊 Professional Reports**

- **PDF Generation**: Comprehensive experiment documentation
- **Structured Layout**: Professional formatting with sections
- **Complete Data**: All experiment details and results
- **Print Ready**: Optimized for printing and sharing

---

## 📊 Project Structure

```
virtual-chemistry-lab/
├── 📁 app/                      # Next.js App Router
│   ├── 📄 page.tsx             # Landing Page
│   ├── 📁 api/                 # API Routes
│   │   ├── 📁 auth/            # Authentication
│   │   │   ├── 📁 [...nextauth]/ # NextAuth.js
│   │   │   └── 📁 register/    # User Registration
│   │   ├── 📁 experiments/     # Experiment CRUD
│   │   │   └── 📁 [id]/        # Individual Experiment
│   │   ├── 📁 user/            # User Management
│   │   │   └── 📁 profile/     # User Profile
│   │   └── 📁 react/           # AI Reaction Analysis
│   ├── 📁 auth/                # Authentication Pages
│   │   ├── 📁 signin/          # Sign In Page
│   │   └── 📁 signup/          # Sign Up Page
│   └── 📁 lab/                 # Protected Lab Interface
├── 📁 components/              # React Components
│   ├── 🏠 HomePage.tsx         # Landing Page Components
│   ├── 🔐 AuthButton.tsx       # User Authentication Menu
│   ├── 🧪 ChemicalShelf.tsx    # Enhanced Chemical Selection
│   ├── ⚗️ LabTable.tsx         # Main Workspace
│   ├── 🧪 TestTube.tsx         # Test Tube with Effects
│   ├── 🥽 Beaker.tsx           # Beaker with Precipitation
│   ├── 📊 ReactionPanel.tsx    # Advanced Results Display
│   ├── 🎛️ ExperimentControls.tsx # Full CRUD Controls
│   ├── 🎨 ThemeProvider.tsx    # Theme Management
│   ├── 🖱️ DndWrapper.tsx       # Drag & Drop Context
│   └── 🔄 Providers.tsx        # App Providers
├── 📁 contexts/                # React Contexts
│   └── 🔐 AuthContext.tsx      # Authentication State
├── 📁 lib/                     # Utilities & Configuration
│   ├── 🗄️ mongodb.ts          # Database Connection
│   └── 🔐 auth.ts              # NextAuth Configuration
├── 📁 types/                   # TypeScript Definitions
│   ├── 🧬 chemistry.ts         # Chemical & Experiment Types
│   └── 🔐 next-auth.d.ts       # NextAuth Type Extensions
├── 📁 hooks/                   # Custom Hooks
│   └── 🖱️ useDragScroll.ts     # Enhanced Drag Behavior
├── 📄 middleware.ts            # Route Protection
└── 📁 styles/                  # Global Styles
    └── 🎨 globals.css          # Enhanced Tailwind & Effects
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **🐛 Bug Reports**

- Use GitHub Issues
- Include steps to reproduce
- Provide browser/device info
- Add screenshots if applicable

### **✨ Feature Requests**

- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Check existing issues first

### **🔧 Development**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **📝 Documentation**

- Improve README sections
- Add code comments
- Create tutorials
- Fix typos and grammar

---

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to production**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**

### **Docker Deployment**

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### **Environment Variables for Production**

Required environment variables:

```env
# Database
MONGODB_URI=mongodb+srv://...

# AI Integration
GEMINI_API_KEY=your_gemini_api_key

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_production_secret

# OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

### **Production Checklist**

- ✅ Set all environment variables
- ✅ Configure MongoDB Atlas IP whitelist
- ✅ Set up OAuth providers (if using)
- ✅ Test authentication flow
- ✅ Verify AI integration
- ✅ Check responsive design
- ✅ Test PDF generation
- ✅ Validate experiment saving

---

## 📈 Performance

### **Optimization Features**

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: API response caching
- **Lazy Loading**: Component lazy loading
- **Bundle Analysis**: Webpack bundle analyzer

### **Performance Metrics**

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## 🔒 Security

### **Data Protection**

- **Environment Variables**: Sensitive data in env files
- **API Rate Limiting**: Prevents abuse
- **Input Validation**: Sanitized user inputs
- **HTTPS Only**: Secure connections required

### **Privacy**

- **Anonymous Usage**: No personal data required
- **Local Storage**: Data stays on device when possible
- **Optional Cloud**: MongoDB usage is optional

---

## 🧪 Testing

### **Test Coverage**

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:components
```

### **Test Types**

- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing
- **Visual Tests**: Screenshot comparison testing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For intelligent reaction analysis
- **MongoDB Atlas** - For cloud database services
- **Vercel** - For hosting and deployment
- **Open Source Community** - For the amazing tools and libraries

---

## 📞 Support

- **📧 Email**: deepankarpatel28@gmail.com

---

<div align="center">

**Made with ❤️ for chemistry education**
</div>
