// Generator functions for different content types
import { generateWithOpenRouter } from "./openrouter";

const adjectives = ["Cool", "Super", "Epic", "Mega", "Ninja", "Cyber", "Shadow", "Thunder", "Phoenix", "Dragon"];
const nouns = ["Wolf", "Hawk", "Tiger", "Bear", "Eagle", "Lion", "Viper", "Storm", "Blaze", "Knight"];
const numbers = () => Math.floor(Math.random() * 9999);

const firstNames = ["Alex", "Jordan", "Sam", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Blake"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

const messages = [
  "Hope you're having a great day!",
  "Just checking in to say hi!",
  "Thinking of you today",
  "Can't wait to catch up soon",
  "You're amazing, never forget that",
  "Hope everything is going well",
  "Sending positive vibes your way",
  "Let's make today awesome!"
];

const cities = ["Tokyo", "Paris", "New York", "London", "Barcelona", "Rome", "Sydney", "Dubai", "Singapore", "Amsterdam"];
const countries = ["Japan", "France", "USA", "UK", "Spain", "Italy", "Australia", "UAE", "Singapore", "Netherlands"];

const excuses = [
  "My alarm didn't go off this morning",
  "There was unexpected traffic",
  "I had a family emergency",
  "My internet connection was down",
  "I wasn't feeling well earlier",
  "I had to take care of something urgent",
  "My phone battery died",
  "I lost track of time working on something important"
];

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a map? I just got lost in your eyes.",
  "Is your name Google? Because you have everything I've been searching for.",
  "Are you a parking ticket? Because you've got FINE written all over you.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a camera? Because every time I look at you, I smile.",
  "If you were a vegetable, you'd be a cute-cumber.",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you."
];

const bioTemplates = [
  "Adventure seeker | Coffee enthusiast | Living life one day at a time",
  "Creative soul | Dream chaser | Making magic happen",
  "Foodie | Travel addict | Capturing moments",
  "Bookworm | Movie buff | Always learning something new",
  "Fitness junkie | Nature lover | Positive vibes only",
  "Tech geek | Problem solver | Innovation enthusiast",
  "Music lover | Artist at heart | Creating my own path",
  "Entrepreneur | Risk taker | Building something amazing"
];

const characterTraits = ["brave", "witty", "mysterious", "charming", "cunning", "loyal", "ambitious", "kind"];
const characterOccupations = ["detective", "scientist", "artist", "warrior", "merchant", "scholar", "explorer", "inventor"];

const teamPrefixes = ["Thunder", "Lightning", "Storm", "Phoenix", "Dragon", "Shadow", "Fire", "Ice", "Golden", "Silver"];
const teamSuffixes = ["Strikers", "Warriors", "Legends", "Champions", "Titans", "Eagles", "Knights", "Wolves", "Panthers", "Hawks"];

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation"
];

const emailSubjects = [
  "Project Update",
  "Quick Question",
  "Follow-up on our Meeting",
  "Regarding Your Request",
  "Important Information",
  "Weekly Summary"
];

const emailBodies = [
  "I hope this email finds you well. I wanted to reach out regarding the recent developments in our project.",
  "Thank you for your time yesterday. Following up on our discussion, I've prepared the materials you requested.",
  "I'm writing to provide you with an update on the progress we've made this week.",
  "I wanted to share some important information that may be relevant to your current work.",
  "As per our last conversation, I've completed the analysis and wanted to share the results with you."
];

// Password generation utilities
const generatePassword = (length: number, includeSymbols: boolean): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  let charset = lowercase + uppercase + numbers;
  if (includeSymbols) charset += symbols;
  
  let password = "";
  // Ensure at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  if (includeSymbols) password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

const calculatePasswordStrength = (password: string): { strength: string; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 3) return { strength: "Weak", score };
  if (score <= 5) return { strength: "Medium", score };
  return { strength: "Strong", score };
};

// Color generation utilities
const generateColor = (): string => {
  const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return `#${hex}`;
};

export const generators = {
  username: (aiMode: boolean) => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = numbers();
    return aiMode ? `${adj}${noun}_${num}` : `${adj}${noun}${num}`;
  },
  username: async (aiMode: boolean): Promise<string> => {
    if (aiMode) {
      return await generateWithOpenRouter("Generate a creative username suitable for social media.");
    }
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = numbers();
    return `${adj}${noun}${num}`;
  },

  identity: (aiMode: boolean) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 50) + 18;
    const id = `ID${Math.floor(Math.random() * 1000000)}`;
    return aiMode 
      ? `${firstName} ${lastName} | Age: ${age} | ID: ${id} | Status: Active`
      : `${firstName} ${lastName}, Age ${age}, ${id}`;
  },
  identity: async (aiMode: boolean): Promise<string> => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 50) + 18;
    const id = `ID${Math.floor(Math.random() * 1000000)}`;
    return aiMode 
      ? `${firstName} ${lastName} | Age: ${age} | ID: ${id} | Status: Active`
      : `${firstName} ${lastName}, Age ${age}, ${id}`;
  },

  message: (aiMode: boolean) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return aiMode ? `Hey! ${msg} 😊` : msg;
  },
  message: async (aiMode: boolean): Promise<string> => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return aiMode ? `Hey! ${msg} 😊` : msg;
  },

  place: (aiMode: boolean) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    return aiMode ? `${city}, ${country} - A wonderful destination!` : `${city}, ${country}`;
  },
  place: async (aiMode: boolean): Promise<string> => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    return aiMode ? `${city}, ${country} - A wonderful destination!` : `${city}, ${country}`;
  },

  excuse: (aiMode: boolean) => {
    const excuse = excuses[Math.floor(Math.random() * excuses.length)];
    return aiMode ? `${excuse}. I sincerely apologize for any inconvenience.` : excuse;
  },
  excuse: async (aiMode: boolean): Promise<string> => {
    const excuse = excuses[Math.floor(Math.random() * excuses.length)];
    return aiMode ? `${excuse}. I sincerely apologize for any inconvenience.` : excuse;
  },

  pickupLine: (aiMode: boolean) => {
    const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    return aiMode ? `${line} 😏` : line;
  },
  pickupLine: async (aiMode: boolean): Promise<string> => {
    const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    return aiMode ? `${line} 😏` : line;
  },

  bio: (aiMode: boolean) => {
    const bio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
    const emoji = aiMode ? " ✨" : "";
    return `${bio}${emoji}`;
  },
  bio: async (aiMode: boolean): Promise<string> => {
    const bio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
    const emoji = aiMode ? " ✨" : "";
    return `${bio}${emoji}`;
  },

  character: (aiMode: boolean) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const trait = characterTraits[Math.floor(Math.random() * characterTraits.length)];
    const occupation = characterOccupations[Math.floor(Math.random() * characterOccupations.length)];
    return aiMode 
      ? `${firstName} - A ${trait} ${occupation} with a mysterious past and a heart of gold`
      : `${firstName}, the ${trait} ${occupation}`;
  },
  character: async (aiMode: boolean): Promise<string> => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const trait = characterTraits[Math.floor(Math.random() * characterTraits.length)];
    const occupation = characterOccupations[Math.floor(Math.random() * characterOccupations.length)];
    return aiMode 
      ? `${firstName} - A ${trait} ${occupation} with a mysterious past and a heart of gold`
      : `${firstName}, the ${trait} ${occupation}`;
  },

  password: (aiMode: boolean) => {
    const length = aiMode ? 16 : 12;
    const includeSymbols = aiMode;
    const password = generatePassword(length, includeSymbols);
    const { strength, score } = calculatePasswordStrength(password);
    return `${password} | Strength: ${strength} (${score}/7)`;
  },
  password: async (aiMode: boolean): Promise<string> => {
    const length = aiMode ? 16 : 12;
    const includeSymbols = aiMode;
    const password = generatePassword(length, includeSymbols);
    const { strength, score } = calculatePasswordStrength(password);
    return `${password} | Strength: ${strength} (${score}/7)`;
  },

  lorem: (aiMode: boolean) => {
    const sentenceCount = aiMode ? 3 : 2;
    let text = "";
    
    for (let s = 0; s < sentenceCount; s++) {
      const wordCount = Math.floor(Math.random() * 8) + 8;
      let sentence = [];
      
      for (let i = 0; i < wordCount; i++) {
        sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      
      text += sentence.join(" ").charAt(0).toUpperCase() + sentence.join(" ").slice(1) + ". ";
    }
    
    return text.trim();
  },
  lorem: async (aiMode: boolean): Promise<string> => {
    const sentenceCount = aiMode ? 3 : 2;
    let text = "";
    
    for (let s = 0; s < sentenceCount; s++) {
      const wordCount = Math.floor(Math.random() * 8) + 8;
      let sentence = [];
      
      for (let i = 0; i < wordCount; i++) {
        sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      
      text += sentence.join(" ").charAt(0).toUpperCase() + sentence.join(" ").slice(1) + ". ";
    }
    
    return text.trim();
  },

  colorPalette: (aiMode: boolean) => {
    const colorCount = aiMode ? 5 : 3;
    const colors = [];
    
    for (let i = 0; i < colorCount; i++) {
      colors.push(generateColor());
    }
    
    return colors.join(" • ");
  },
  colorPalette: async (aiMode: boolean): Promise<string> => {
    const colorCount = aiMode ? 5 : 3;
    const colors = [];
    
    for (let i = 0; i < colorCount; i++) {
      colors.push(generateColor());
    }
    
    return colors.join(" • ");
  },

  teamName: (aiMode: boolean) => {
    const prefix = teamPrefixes[Math.floor(Math.random() * teamPrefixes.length)];
    const suffix = teamSuffixes[Math.floor(Math.random() * teamSuffixes.length)];
    return aiMode 
      ? `The ${prefix} ${suffix} - "Victory Through Unity"`
      : `${prefix} ${suffix}`;
  },
  teamName: async (aiMode: boolean): Promise<string> => {
    const prefix = teamPrefixes[Math.floor(Math.random() * teamPrefixes.length)];
    const suffix = teamSuffixes[Math.floor(Math.random() * teamSuffixes.length)];
    return aiMode 
      ? `The ${prefix} ${suffix} - "Victory Through Unity"`
      : `${prefix} ${suffix}`;
  },

  // Removed duplicate emailTemplate function
  emailTemplate: async (aiMode: boolean): Promise<string> => {
    const subject = emailSubjects[Math.floor(Math.random() * emailSubjects.length)];
    const body = emailBodies[Math.floor(Math.random() * emailBodies.length)];
    
    if (aiMode) {
      return `Subject: ${subject}\n\nDear [Name],\n\n${body}\n\nBest regards,\n[Your Name]`;
    }
    return `Subject: ${subject}\n\n${body}`;
  }
};
