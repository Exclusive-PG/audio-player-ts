
import Controllers from "../Classes/Controllers";
import { loadAudioTags } from "../Controllers/loadTags";
import AudioPlayerController from "./../Classes/AudioControllers/AudioPlayerController";
import { updateVolumeLine } from "./MainControllerAudio";

const controllers = new Controllers();

export function keysControllersInit(audioPlayerController: AudioPlayerController) {
	controllers.addController(
		document.querySelector(".shuffle_mode"),
		() => {
			audioPlayerController.setShuffleMode = !audioPlayerController.getModsStates.isShuffle;
		},
		null,
	);
	controllers.addController(
		document.querySelector(".repeat_mode"),
		() => {
			audioPlayerController.setRepeatOne = !audioPlayerController.getModsStates.isRepeatOne;
		},
		null,
	);
	controllers.addController(document.querySelector(".play_pause"), () => audioPlayerController.playOrPause(), "");
	controllers.addController(
		document.querySelector(".next_right"),
		() => {
			audioPlayerController.nextTrack();
			loadAudioTags(audioPlayerController.activeSong);
		},
		"ArrowRight",
	);
	controllers.addController(document.querySelector(".prev_left"), () => audioPlayerController.prevTrack(), "ArrowLeft");
	controllers.addController(document.querySelector(".stop_track"), () => audioPlayerController.stopTrack(), "");
	controllers.addController(
		null,
		() => {
			audioPlayerController.getVolume().addVolume(0.1);
            updateVolumeLine(audioPlayerController.volume,document.querySelector(".volume-container"))
		},
		"ArrowUp",
	);
	controllers.addController(null, () => {
        audioPlayerController.getVolume().addVolume(-0.1)
        updateVolumeLine(audioPlayerController.volume,document.querySelector(".volume-container"))
    }, "ArrowDown");
}
