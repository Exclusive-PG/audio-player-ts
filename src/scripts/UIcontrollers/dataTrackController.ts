import { ipcRenderer } from "electron";
import { parseFile } from "../requiredLib/requiredLib";
import defaultPoster from "./../../assets/images/default-poster.jpg";
import AudioPlayerController from './../Classes/AudioControllers/AudioPlayerController';

const posterEl = document.querySelector<HTMLImageElement>(".img_data_about_track");
const mainPosterEl = document.querySelector<HTMLImageElement>("#poster");
const artistEl = document.querySelector<HTMLElement>(".artist_about_track");
const titleEl = document.querySelector<HTMLElement>(".title_about_track");
const timeEl = document.querySelector<HTMLElement>(".time_about_track");

async function initDataTrackController(audioController:AudioPlayerController) {
	posterEl.src = defaultPoster;
	mainPosterEl.src = defaultPoster;
    audioController.audioElement.addEventListener("timeupdate",()=>{
            const percent = audioController.audioElement.currentTime / audioController.audioElement.duration;
            let audioDuration = audioController.durationVideo(audioController.audioElement.duration);
            let audioCurrentTIme =  audioController.durationVideo(audioController.audioElement.currentTime);
        
            timeEl.textContent = `${audioCurrentTIme}/${audioDuration}`
            //console.log("PERCENT:", percent*100)
            ipcRenderer.send("set_progress_song",[percent,audioController.isPlaying()]);
            ipcRenderer.on("set_progress_song", (event, arg) => {
               
            });
    })
    audioController.audioElement.addEventListener("ended",()=>{
        setDataForTrack(audioController)
    })
}

export async function setDataForTrack(audioController:AudioPlayerController) {
	const metadata = await parseFile(audioController.activeSong);
	console.log(metadata);
	let dataIMG: any = "",
	base64String: string = "";
 
	try {
		dataIMG = metadata.native["ID3v2.3"].filter((item: any) => item.id === "APIC")[0].value;
		for (let i = 0; i < dataIMG.data.length; i++) {
			base64String += String.fromCharCode(dataIMG.data[i]);
		}
		mainPosterEl.src = `data:${dataIMG.format};base64,${window.btoa(base64String)}`;
        posterEl.src = `data:${dataIMG.format};base64,${window.btoa(base64String)}`;
	} catch (e) {
		console.log("poster track not found");
        posterEl.src = defaultPoster;
        mainPosterEl.src = defaultPoster;
    
	}
    console.log(metadata)
	artistEl.textContent = (metadata.common.artist === null || metadata.common.artist === undefined) ? "Uknown" : metadata.common.artist;
    titleEl.textContent =  (metadata.common.title === null || metadata.common.title === undefined) ? audioController.activeSong.split(/[\\/]/).pop() : metadata.common.title
}

export default function dataTrackController(audioController:AudioPlayerController) {
	initDataTrackController(audioController);
}
