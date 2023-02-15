import "@fortawesome/fontawesome-free/js/all";
import "./assets/styles/index.scss";
import AudioPlayerController from "./scripts/Classes/AudioControllers/AudioPlayerController";
import AudioContextController from "./scripts/Classes/AudioControllers/AudioContextController";
import "./scripts/UIcontrollers/sidebarController";
import "./scripts/UIcontrollers/MainControllerAudio";
import "./scripts/UIcontrollers/AddPlaylistController";
import "./scripts/Events/events-electron";
import { ControllerAudio } from "./scripts/UIcontrollers/MainControllerAudio";
import { keysControllersInit } from "./scripts/UIcontrollers/keyController";
import "./scripts/Classes/Playlist/PlaylistManager";
import PlaylistManager from "./scripts/Classes/Playlist/PlaylistManager";

import fileManagerController, { showCurrentPlayingAudio } from "./scripts/UIcontrollers/fileManagerController";
import equaliazerController from './scripts/UIcontrollers/EqualizerController';
import SavedTracksController from "./scripts/UIcontrollers/savedTracksController";
import dataTrackController from "./scripts/UIcontrollers/dataTrackController";
import { addPlaylistUIController } from "./scripts/UIcontrollers/AddPlaylistController";


export let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, audio: HTMLAudioElement;
export const audioPlayerController = new AudioPlayerController();
export const playlistManager = new PlaylistManager();

audio = new Audio();
const audioContextController = new AudioContextController();


window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

window.addEventListener("load", () => {
	canvas = document.querySelector("#canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");

	audioPlayerController.init(drawModeWaves, audio, []);
	audioContextController.init(audio);
	audioContextController.connectNodes();
	audioPlayerController.TrackingEnd();
	ControllerAudio(audio);
	keysControllersInit(audioPlayerController);
	fileManagerController(playlistManager);
	equaliazerController(audioContextController,audioPlayerController);
	SavedTracksController();
	dataTrackController(audioPlayerController);
	addPlaylistUIController(playlistManager);
});

window.addEventListener("keyup", (e) => {
	console.log(e.key);
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
	//ctx.shadowColor = "rgba(178, 0, 0,0.9)";
	ctx.shadowColor = "rgba(254,74,73,0.9)";
	//ctx.shadowColor = "rgba(0,159,183,0.8)"
	ctx.shadowBlur = 20;

	ctx.fill();
}
