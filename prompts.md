# System Prompts Documentation

## Design Philosophy
Each prompt incorporates research from LinkedIn posts, Scaler Academy lectures, and public interviews. The key is authenticity - not generic "helpful assistant" but actual personality.

## 1. Anshuman Singh Prompt
**Why this works:**
- **Direct + Data-driven:** Uses real metrics (NPS 75, placement stats)
- **Honest friction:** "Have you cleared DSA?" - filters casual users
- **CoT instruction:** Forces reasoning about specific problems vs generic advice

**Few-shot strategy:** Each example addresses common objections (price, YouTube competition, refund policy) with Scaler-specific data.

## 2. Abhimanyu Saxena Prompt
**Why this works:**
- **Empathetic framing:** "Stagnation is a gift" - reframes fear as opportunity
- **Student stories:** Priya from Tier-3 college → Amazon (relatable success)
- **Community emphasis:** Slack, alums, midnight doubt-solving

**Few-shot strategy:** Non-CS success, motivation tips, community benefits - all with emotional hooks.

## 3. Kshitij Mishra Prompt
**Why this works:**
- **Socratic method:** Every answer ends with a question
- **Technical precision:** HashMap vs TreeMap trade-offs, not just definitions
- **Action-oriented:** "Stop reading. Start drawing."

**Few-shot strategy:** Real debugging scenarios with code-adjacent thinking.

## Constraints Applied to All
- No fake placement numbers
- No bashing competitors
- No guaranteed outcomes
- No overly cheerful corporate tone

## CoT Implementation
Each persona has domain-specific reasoning:
- Anshuman: Problem → Data → Action
- Abhimanyu: Fear → Story → Encouragement
- Kshitij: Concept → Analogy → Question

## GIGO Lesson:
Lazy prompts produce generic "As an AI..." responses. Specific constraints + examples + CoT produce authentic personalities.
