import "@fortawesome/fontawesome-free/js/all";
import "./assets/styles/index.scss";
import "./scripts/Classes/sidebar";
import Controllers from "./scripts/Classes/Controllers";
import AudioPlayerController from "./scripts/Classes/AudioControllers/AudioPlayerController";
import AudioContextController from "./scripts/Classes/AudioControllers/AudioContextController";

let canvas: any, ctx: any, btn: any, audio: any;

//const controllers = new Controllers();
const audioPlayerController = new AudioPlayerController();
const audioContextController = new AudioContextController();

// const createAudioContext = () => {
// 	if (!audioContext) {
// 		audioContext = new AudioContext();
// 		analyzer = audioContext.createAnalyser();
// 		analyzer.fftSize = 8192;
// 		//4096
// 		//8192
// 		let source = audioContext.createMediaElementSource(audio);
// 		source.connect(analyzer);
// 		analyzer.connect(audioContext.destination);
// 	} else {
// 		//console.log("audio context already create")
// 	}
// };

let itemSongs1 = {
	src: "C:/Users/dayme/Downloads/bohemian_rhapsody_12. Queen - Another One Bites The Dust.mp3",
	name: "Another One Bites The Dust",
	artist: "",
};

let itemSongs2 = {
	src: "C:Users/dayme/Downloads/Meduza_Becky_Hill_GOODBOYS_-_Lose_Control_66925984.mp3",
	name: "Lose Control",
	artist: "",
};

let songs: any = [];


songs.push(itemSongs1, itemSongs2);

console.log(songs);

let btnControllers = document.querySelectorAll(".btn-controller");

////initialize Draw Mode

btnControllers.forEach((element) => {
	element.addEventListener("click", () => {
		audioPlayerController.init(drawModeWaves, audio);
      audioContextController.init(audio);
      audioContextController.connectPath();
		audioPlayerController.TrackingEnd(songs);
	});
});


window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight
});

window.addEventListener("load", () => {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	audio = new Audio();

	//controllers.playOrPause(document.querySelector(".playOrPause"), songs, "Enter");

	//controllers.nextTrack(document.querySelector(".next"), songs, "ArrowRight");

	//controllers.prevTrack(document.querySelector(".prev"), songs, "ArrowLeft");
});

window.addEventListener("keyup", (e) => {
	console.log(e.key);
});

document.querySelector(".playOrPause").addEventListener("click", () => {
	audioPlayerController.playOrPause(songs);
});

window.addEventListener("keyup", (e) => {
	if (e.keyCode === 32) {
		e.preventDefault();

		if (!audio.paused) {
			//@ts-ignore
			document.querySelector(".full_inner_screen").pause();
		} else {
			//@ts-ignore
			document.querySelector(".full_inner_screen").play();
		}
	}
});

function drawModeWaves() {
	//console.log(`width:${canvas.width}, height: ${canvas.height}`);
   let analyzer = audioContextController.getAnalyzer;
	requestAnimationFrame(drawModeWaves);
	let data: any = new Uint8Array(analyzer.frequencyBinCount);
	analyzer.getByteFrequencyData(data);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let step = 60;
	let sizeHeightWaves = 4;

	ctx.beginPath();
	ctx.moveTo(0, canvas.height);
	ctx.lineTo(0, canvas.height - data[0]);

	for (let i = 0; i < data.length; i += step) {
		let currPoint = {
			x: i,
			y: canvas.height - data[i] * sizeHeightWaves,
		};

		let nextPoint = {
			x: i + step,
			y: canvas.height - data[i + step] * sizeHeightWaves,
		};

		let xc = (currPoint.x + nextPoint.x) / 2;
		let yc = (currPoint.y + nextPoint.y) / 2;
		ctx.quadraticCurveTo(currPoint.x, currPoint.y, xc, yc);
	}

	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.closePath(); //draw to first point
	ctx.shadowColor = "rgba(178, 0, 0,0.9)";
	ctx.shadowBlur = 20;

	ctx.fill();
}
