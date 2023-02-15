import Controllers from "../Classes/Controllers";

import AudioPlayerController from "../Classes/AudioControllers/AudioPlayerController";
import { updateVolumeLine } from "./MainControllerAudio";
import { setDataForTrack } from "./dataTrackController";
import { showCurrentPlayingAudio } from "./fileManagerController";
import { playlistManager } from "./../../renderer";


const controllers = new Controllers();

export function keysControllersInit(audioPlayerController: AudioPlayerController) {
	controllers.addController(
		document.querySelector(".shuffle_mode"),
		() => {
			audioPlayerController.setShuffleMode = !audioPlayerController.getModsStates.isShuffle;
			document.querySelector(".shuffle_mode").classList.toggle("active")
		},
		null,
	);
	controllers.addController(
		document.querySelector(".repeat_mode"),
		() => {
			audioPlayerController.setRepeatOne = !audioPlayerController.getModsStates.isRepeatOne;
			document.querySelector(".repeat_mode").classList.toggle("active")
		},
		null,
	);
	controllers.addController(
		document.querySelector(".play_pause"),
		() => {
			audioPlayerController.playOrPause();
			setDataForTrack(audioPlayerController);
			document.querySelector(".play_pause").innerHTML = audioPlayerController.isPlaying() ? `<i class="fa-solid fa-pause fa-2x"></i>` : `<i class="fa-solid fa-play fa-2x"></i>`
		},
		"",
	);
	controllers.addController(
		document.querySelector(".next_right"),
		() => {
			audioPlayerController.nextTrack();
			console.log(audioPlayerController.getCurrentListTracks)
			setDataForTrack(audioPlayerController);
			if(audioPlayerController.getCurrentPlaylistID === playlistManager.getSavedPlaylist.getData.id){
				showCurrentPlayingAudio(document.querySelectorAll(".content_item_saved"));
			}else{
				showCurrentPlayingAudio(document.querySelectorAll(".content_item"));
			}
			
		},
		"ArrowRight",
	);
	controllers.addController(
		document.querySelector(".prev_left"),
		() => {
			audioPlayerController.prevTrack();
			setDataForTrack(audioPlayerController);
			showCurrentPlayingAudio(document.querySelectorAll(".content_item"));
		},
		"ArrowLeft",
	);
	controllers.addController(document.querySelector(".stop_track"), () => audioPlayerController.stopTrack(), null);
	controllers.addController(
		null,
		() => {
			audioPlayerController.getVolume().addVolume(0.1);
			updateVolumeLine(audioPlayerController.volume, document.querySelector(".volume-container"));
		},
		"ArrowUp",
	);
	controllers.addController(
		null,
		() => {
			audioPlayerController.getVolume().addVolume(-0.1);
			updateVolumeLine(audioPlayerController.volume, document.querySelector(".volume-container"));
		},
		"ArrowDown",
	);
}
