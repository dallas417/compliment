import readline from 'readline';

// List of objects containing compliments and their "spice" level
// Level 1: Mildly chaotic
// Level 2: Straight-up roasting them
const compliments = [
  { text: "I hate people, but I hate you the least, ${name}.", level: 1 },
  { text: "You are surprisingly functional for someone who is clearly a chaotic mess on the inside, ${name}.", level: 1 },
  { text: "${name}, listening to you talk is my favorite way to lose brain cells.", level: 1 },
  { text: "You radiate 'villain origin story' energy, ${name}, and I respect the hustle.", level: 1 },
  { text: "I’d trust you to help me bury a body, ${name}. I wouldn't trust you to dig the hole, but definitely with the alibi.", level: 2 },
  { text: "You look great today, ${name}. Who died?", level: 2 },
  { text: "You’re lucky you’re funny, ${name}, otherwise your personality would be a felony.", level: 2 },
  { text: "My therapist hears a lot about you, ${name}. Don't worry, it's mostly complaints.", level: 2 }
];

// Set up the interface to accept command-line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Master algorithm to generate a filtered compliment.
 * Demonstrates iteration, selection, and sequencing.
 */
function masterComplimentGenerator(userName, requestedLevel) {
  // 1. Create a temporary list to hold matches
  const filteredCompliments = [];

  // 2. Iteration: Loop through the entire main list
  for (let i = 0; i < compliments.length; i++) {
    const currentCompliment = compliments[i];

    // 3. Selection: Check if the compliment's level matches the requested level
    if (currentCompliment.level === requestedLevel) filteredCompliments.push(currentCompliment.text);
  }

  // Safety check: In case the filtered list is somehow empty
  if (filteredCompliments.length === 0) return `I have no words for you, ${userName}. Literally.`;


  // 5. Select a random compliment from the FILTERED list
  const randomIndex = Math.floor(Math.random() * filteredCompliments.length);
  const selectedCompliment = filteredCompliments[randomIndex];

  // Replace the placeholder with the user's actual name
  return selectedCompliment.replace('${name}', userName);
}

// Prompt the user for their name
rl.question("What is your name? ", (nameAnswer) => {
  const name = nameAnswer.trim() || "Friend"; 
  
  // Prompt the user for their desired spice level
  rl.question("Choose your spice level (1 for mildly chaotic, 2 for a full roast): ", (levelAnswer) => {
    // Parse the input to an integer. If they type nonsense, default to level 1.
    let level = parseInt(levelAnswer.trim());
    if (level !== 1 && level !== 2) level = 1;
    
    
    // Call the master function with BOTH parameters
    const finalCompliment = masterComplimentGenerator(name, level);
    
    // Output the result and close the input stream
    console.log(`\n${finalCompliment}`);
    rl.close();
  });
});
