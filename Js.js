const quotes = [
	"Life is like a box of chocolates. You never know what you're gonna get.",
	"May the Force be with you.",
	"I'll be back.",
	"You talking to me?",
	"Here's Johnny!",
	"Keep your friends close, but your enemies closer.",
	"Greed, for lack of a better word, is good.",
	"Show me the money!",
	"You can't handle the truth!",
	"Say hello to my little friend!"
];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");
const mistakeElement = document.getElementById("mistake");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const robotElement = document.getElementById("robot");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

let quote, startTime, score, timerInterval;

function start() {
	quote = quotes[Math.floor(Math.random() * quotes.length)];
	quoteElement.innerText = quote;
	inputElement.value = "";
	resultElement.innerText = "";
	mistakeElement.innerText = "";
	score = 0;
	scoreElement.innerText = score;
	startTime = Date.now();
	clearInterval(timerInterval);
	timerInterval = setInterval(updateTime, 1000);
}

function check() {
	const input = inputElement.value;
	if (quote === input) {
		resultElement.innerText = "正解！";
		resultElement.classList.add("correct");
		score += Math.round(quote.length / (Date.now() - startTime) * 1000);
		scoreElement.innerText = score;
		correctSound.play();
		setTimeout(() => {
			resultElement.classList.remove("correct");
			start();
		}, 1000);
	} else {
		resultElement.innerText = "間違い。もう一度試してください。";
		resultElement.classList.add("incorrect");
		incorrectSound.play();
		setTimeout(() => {
			resultElement.classList.remove("incorrect");
		}, 1000);
		const mistakeIndex = getMistakeIndex(input);
		mistakeElement.innerText = quote.charAt(mistakeIndex);
		inputElement.setSelectionRange(mistakeIndex, mistakeIndex + 1);
		inputElement.focus();
	}
}

function getMistakeIndex(input) {
	for (let i = 0; i < input.length; i++) {
		if (quote.charAt(i) !== input.charAt(i)) {
			return i;
		}
	}
	return input.length;
}

function updateTime() {
	const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
	timeElement.innerText = elapsedTime;
	moveRobot(elapsedTime);
}

function moveRobot(time) {
	const position = Math.min(time * 20, window.innerWidth + 200);
	robotElement.style.left = `${position}px`;
}

start();