const input = document.getElementById("input-text");
const output = document.getElementById("output-text");
const addButton = document.getElementById("add-button");
const randomButton = document.getElementById("random-button");
const coverButton = document.getElementById("cover-button");
const clearButton = document.getElementById("clear-button");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const speedTime = document.getElementById("speed");
const breakTime = document.getElementById("break");

let outputArr = [];
let pause = false;

// OCR feature
["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
  input.addEventListener(event, (e) => e.preventDefault());
});

// Highlight on dragover
input.addEventListener("dragover", () => {
  input.classList.add("dragover");
});
input.addEventListener("dragleave", () => {
  input.classList.remove("dragover");
});

// Drop event
input.addEventListener("drop", (e) => {
  input.classList.remove("dragover");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];

    if (file.type.startsWith("image/")) {
      // OCR
      (async () => {
        const worker = await Tesseract.createWorker("chi_sim");
        const ret = await worker.recognize(file.name);
        input.textContent = ret.data.text;
        await worker.terminate();
      })();
    }
  }
});

addButton.addEventListener("click", (e) => {
  addOutput();
});

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    // Prevents adding a newline
    e.preventDefault();
    // Move input to the output area
    addOutput();
  }
});

randomButton.addEventListener("click", (e) => {
  let words = Array.from(document.getElementsByClassName("words-container"));
  const shuffledWords = shuffleArr(words);

  // Clear current output
  clearOutput();
  // Enter the new order of output
  for (let i = 0; i < shuffledWords.length; i++) {
    output.appendChild(shuffledWords[i]);
  }
});

coverButton.addEventListener("click", (e) => {
  // Hide the words
  let words = document.getElementsByClassName("words-container");
  for (let i = 0; i < words.length; i++) {
    words[i].classList.toggle("cover");
  }
  // Show cover wallpaper
  output.classList.toggle("cover");
});

clearButton.addEventListener("click", (e) => {
  clearOutput();
});

playButton.addEventListener("click", (e) => {
  if (pause) {
    window.speechSynthesis.resume();
    pause = false;
  } else {
    // Avoid playing many times
    if (!window.speechSynthesis.speaking) {
      // Get the words
      let words = document.getElementsByClassName("words");
      let wordsArr = [];
      for (let i = 0; i < words.length; i++) {
        wordsArr.push(words[i].textContent);
      }

      // TTS
      let index = 0;
      const speakNextWord = () => {
        // Remove highlight
        if (index != 0) {
          words[index - 1].parentElement.classList.remove("highlight");
        }
        if (index < wordsArr.length) {
          const speech = new SpeechSynthesisUtterance(wordsArr[index]);
          speech.lang = "zh-CN";

          speech.onend = function () {
            index++;
            setTimeout(speakNextWord, breakTime.value * 1000);
          };
          window.speechSynthesis.speak(speech);
          // Highlight the text
          words[index].parentElement.classList.add("highlight");
        }
      };
      speakNextWord();
    }
  }
});

pauseButton.addEventListener("click", (e) => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    pause = true;
  }
});

stopButton.addEventListener("click", (e) => {
  window.speechSynthesis.cancel();
});

function clearInput() {
  input.value = "";
}

function clearOutput() {
  output.innerHTML = "";
}

function addOutput() {
  const splitFunct = (str) => str.split(/\r?\n/);
  const inputText = input.value.trim();
  const inputArr = splitFunct(inputText);

  inputArr.forEach((input) => {
    if (input) {
      // Create close button
      let button = document.createElement("button");
      button.className = "close";
      button.textContent = "x";

      // Create word span
      let word = document.createElement("span");
      word.className = "words";
      word.textContent = input;

      // Create word div
      let div = document.createElement("div");
      div.className = "words-container";
      div.appendChild(word);
      div.appendChild(button);

      // Append new div
      output.appendChild(div);

      // Add close button functionality
      button.addEventListener("click", (e) => {
        e.target.offsetParent.remove();
      });
    }
  });
  clearInput();
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
