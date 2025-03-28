# Ting Xie (听写练习)
A web-based tool for practicing Chinese dictation (听写). Users can input words manually or upload an image containing Chinese text. The app can randomize word order, cover and uncover words to simulate testing and checking answers, and use text-to-speech with adjustable speed and break time for dictation.

You can try the live version of the Pinyin Converter here: [Ting Xie Live](https://beatrixvv.github.io/ting-xie/).


## Features
* Input Options:\
Manually enter words or upload an image for OCR text extraction. Each word is separated by a **new line**.

* Random Word Selection:\
Randomizes the inputted words.

* Cover Mode:\
Hides words to simulate a test condition and allows uncovering them to check the answer.

* Text-to-Speech (TTS):\
Play, pause, and stop the dictation.

* Adjustable Speed & Break Time:\
Customize speech speed and the pause between words.

* Clear List:\
Remove all entered words at once.


## Technologies Used
* HTML/CSS/JavaScript:\
Core structure, styling, and interactivity.

* Tesseract.js:\
OCR engine for extracting Chinese characters from images.

* Web Speech API:\
Provides text-to-speech functionality.

* Google Fonts:\
Custom font styling for enhanced readability.


## Installation
1. Clone the repository:
```bash
git clone https://github.com/beatrixvv/ting-xie.git
```

2. Navigate to the project directory:
```bash
cd ting-xie
```

3. Open `index.html` in your browser


## Usage
* Enter words manually in the text box or upload an image to extract words via OCR.

* Click "Add" or press "Enter" to store words in the list.

* Use "Random" to randomize words for dictation practice.

* Enable "Cover" mode to hide words for testing and uncover them to check the answer.

* Click "Play" to hear the words, with adjustable speed and break time.

* Use "Pause" or "Stop" to control playback.

* Delete a word by hovering over it and clicking the "×" button.

* Click "Clear" to reset the list.


## Contributing
Feel free to fork the repository and submit pull requests. Contributions are always welcome!
