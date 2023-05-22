const button = document.getElementById("button"),
  audioElement = document.getElementById("audio");

//Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "da2d7b6f5a0a4764b9e310357228160d",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    // Text-to-speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    alert(error.message);
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
