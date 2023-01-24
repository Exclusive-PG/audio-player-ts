import "@fortawesome/fontawesome-free/js/all";
import "./assets/styles/index.scss";
import Controllers from "./scripts/Classes/Controllers";
import AudioPlayerController from "./scripts/Classes/AudioControllers/AudioPlayerController";
import AudioContextController from "./scripts/Classes/AudioControllers/AudioContextController";

let canvas: any, ctx: any, audio: any;

const audioPlayerController = new AudioPlayerController();
const audioContextController = new AudioContextController();
const controllers = new Controllers();

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

let itemSongs3 = {
   src:"C:/Users/dayme/Downloads/Неизвестен_Атака_Титанов_5_Опенинг_holidaymp3_ru.mp3"
}
let item4={
	src:"https://mdn.github.io/webaudio-examples/stereo-panner-node/viper.mp3"
}
let songs: any = [];

songs.push(itemSongs1, itemSongs2,itemSongs3,item4);

console.log(songs);



window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight
});

window.addEventListener("load", () => {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
	audio = new Audio();
	audioPlayerController.init(drawModeWaves, audio, songs);
	audioContextController.init(audio);
	audioContextController.connectNodes();
	audioPlayerController.TrackingEnd();

	controllers.addController(document.querySelector(".playOrPause"), () => audioPlayerController.playOrPause(), "");
	controllers.addController(document.querySelector(".next"), () => audioPlayerController.nextTrack(), "ArrowRight");
	controllers.addController(document.querySelector(".prev"), () => audioPlayerController.prevTrack(), "ArrowLeft");
});

window.addEventListener("keyup", (e) => {
	console.log(e.key);
});
document.querySelector(".panning-control").addEventListener("input",()=>{
	audioContextController.setStereoNode = parseInt((document.querySelector(".panning-control") as HTMLInputElement).value)
})

function drawModeWaves() {
	//console.log(`width:${canvas.width}, height: ${canvas.height}`);
	let analyzer = audioContextController.getAnalyzer;
	requestAnimationFrame(drawModeWaves);
	let data: any = new Uint8Array(analyzer.frequencyBinCount);
	analyzer.getByteFrequencyData(data);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let step = 40;
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
