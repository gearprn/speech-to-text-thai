const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

const words = ['หน้า', 'ผ้าไหม', 'วัด', 'มะลิ', 'สีแดง']
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${words.join(
  ' | '
)};`

const recognition = new SpeechRecognition()

try {
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  recognition.grammars = speechRecognitionList
} catch (error) {
  console.warn(`SpeechGrammarList is not supported on browser: ${error}`)
}

recognition.continuous = false
recognition.lang = 'th-TH'
recognition.interimResults = true
recognition.maxAlternatives = 1

const startBtn = document.getElementById('start-btn')
const diagnostic = document.querySelector('.output')
const confidence = document.querySelector('.confidence')

startBtn.onclick = () => {
  recognition.start()
  console.log('Ready to receive a word.')
}

recognition.onresult = (event) => {
  const word = event.results[0][0].transcript
  diagnostic.textContent = `Result received: ${word}.`
  confidence.textContent = `Confidence: ${event.results[0][0].confidence}.`
  recognition.stop()
}

recognition.onspeechend = () => {
  recognition.stop()
  console.log('Stop.')
}

recognition.onnomatch = (event) => {
  diagnostic.textContent = `I didn't recognize that word.`
  console.log(`I didn't recognize that word.`)
}

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`
  console.log(`Error occurred in recognition: ${event.error}`)
}

recognition.onsoundstart = (event) => {
  console.log(event)
}

recognition.onaudioend = (event) => {
  console.log(event)
}
