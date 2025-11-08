# 🔧 Daily Quiz - Fixed Duplicate Questions

## Problem
The quiz was showing the same questions repeatedly because:
1. It was using hardcoded `DAILY_QUESTIONS` array
2. The `handleAnswer` and `handleNext` functions referenced the wrong array
3. No cache-busting mechanism
4. AI wasn't instructed to generate unique questions

## Solution

### 1. Fixed State References
**Changed**: `handleAnswer` and `handleNext` now use `questions` state instead of `DAILY_QUESTIONS`

```typescript
// Before
const question = DAILY_QUESTIONS[currentQuestion]
if (currentQuestion < DAILY_QUESTIONS.length - 1) {

// After
const question = questions[currentQuestion]
if (currentQuestion < questions.length - 1) {
```

### 2. Added Cache Busting
**Added**: Timestamp to API request to prevent browser caching

```typescript
const response = await fetch(`/api/quiz/generate?t=${Date.now()}`)
```

### 3. Improved Fallback
**Added**: Shuffle default questions when AI fails

```typescript
const shuffled = [...DAILY_QUESTIONS].sort(() => Math.random() - 0.5)
setQuestions(shuffled)
```

### 4. Enhanced AI Prompt
**Updated**: API prompt to generate unique questions

```typescript
const randomSeed = Math.random()
const prompt = `Generate 5 UNIQUE chemistry reaction quiz questions (seed: ${randomSeed}). 
Make them different from typical textbook examples...`
```

## How It Works Now

### First Load:
1. Page loads → Shows loading spinner
2. Calls `/api/quiz/generate?t=1234567890`
3. AI generates 5 unique questions
4. Questions displayed

### Click "New AI Quiz":
1. Shows "Generating..." button
2. Calls API with new timestamp
3. AI generates 5 NEW unique questions
4. Quiz resets with fresh questions

### If AI Fails (Rate Limit):
1. Falls back to default questions
2. **BUT** shuffles them randomly
3. So even fallback questions vary

## Testing

### Test Fresh Questions:
1. Visit `/quiz`
2. Complete the quiz
3. Click "New AI Quiz"
4. Verify questions are different

### Test Multiple Times:
1. Click "New AI Quiz" 3-4 times
2. Each time should show different questions
3. Even if rate limited, order changes

## Expected Behavior

### ✅ With AI Working:
- Every "New AI Quiz" = completely new questions
- Different reactants, products, explanations
- Varied difficulty levels

### ✅ With Rate Limiting:
- Falls back to default 5 questions
- But shuffles them randomly
- So order changes each time

## Rate Limit Handling

If you see same questions:
1. **Wait 60 seconds** (API rate limit resets)
2. Click "New AI Quiz" again
3. Should get fresh AI-generated questions

Or:
1. Refresh the page
2. Wait a moment
3. Try again

## Technical Details

### Files Changed:
- `app/quiz/page.tsx` - Fixed state references, added shuffling
- `app/api/quiz/generate/route.ts` - Enhanced prompt with random seed

### Key Improvements:
1. ✅ Uses dynamic `questions` state
2. ✅ Cache-busting with timestamps
3. ✅ Random seed in AI prompt
4. ✅ Shuffled fallback questions
5. ✅ Better error handling

## Summary

**Before**: Same 5 questions every time
**After**: Fresh questions each time (AI) or shuffled order (fallback)

The quiz now provides a varied experience whether AI is working or rate-limited! 🎉
