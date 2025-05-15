const inputEl = document.getElementById("input"); // Get the input box where the user types a word
const infoTextEl = document.getElementById("info-text"); // Get the element that shows info messages (like "Searching...")
const meaningContainerEl = document.getElementById("meaning-container"); // Get the container that will show the meaning and audio
const titleEl = document.getElementById("title"); // Get the element where the word (title) will be displayed
const meaningEl = document.getElementById("meaning"); // Get the element where the meaning will be displayed
const audioEl = document.getElementById("audio"); // Get the audio element to play pronunciation

async function fetchApi(word) { // Define an async function to fetch the meaning of a word from an API
  try {
    infoTextEl.style.display = "block"; // Show the info message while searching
    meaningContainerEl.style.display = "none"; // Hide the meaning container while searching
    infoTextEl.innerText = `Searching the meaning of "${word}"`; // Show a message saying which word is being searched
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; // Prepare the API URL with the word
    const result = await fetch(url).then((res) => res.json()); // Fetch the data from the API and convert it to JSON
    console.log(result); // Log the result to the console for debugging

    if (result.title) { // If the API returns an error (like word not found)
      meaningContainerEl.style.display = "block"; // Show the meaning container
      infoTextEl.style.display = "none"; // Hide the info message
      titleEl.innerText = word; // Show the word as the title
      meaningEl.innerText = "N/A"; // Show "N/A" as the meaning since it wasn't found
      audioEl.style.display = "none"; // Hide the audio element since there's no pronunciation
    } else {
      infoTextEl.style.display = "none"; // Hide the info message
      meaningContainerEl.style.display = "block"; // Show the meaning container
      titleEl.innerText = result[0].word; // Show the actual word as the title
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition; // Show the first definition found for the word

      const phonetics = result[0].phonetics; // Get the phonetics array (for pronunciation audio)
      first = phonetics[1]?.audio || ""; // Try to get the audio link from the second phonetic, or empty if not found
      second = phonetics[0]?.audio || ""; // Try to get the audio link from the first phonetic, or empty if not found

      audioEl.style.display = "inline-flex"; // Show the audio element
      audioEl.src = first !== "" ? first : second; // Set the audio source to the first available audio link
      if (!audioEl.src) { // If there is no audio link
        audioEl.style.display = "none"; // Hide the audio element
      }
    }
  } catch (error) {
    console.log(error); // If something goes wrong (like network error), log it
    infoTextEl.innerText = `An error occurred, try again later`; // Show an error message
  }
}

inputEl.addEventListener("keyup", (e) => { // Listen for when the user presses a key in the input box
  if (e.target.value && e.key === "Enter") { // If the input is not empty and the Enter key was pressed
    fetchApi(e.target.value); // Call the function to fetch the meaning of the entered word
  }
});
