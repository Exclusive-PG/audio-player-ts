
import AudioPlayerController from "../Classes/AudioControllers/AudioPlayerController";
import AudioContextController from "./../Classes/AudioControllers/AudioContextController";


function initEqualizerElements(audioContextController: AudioContextController,audioPlayerController:AudioPlayerController) {
	const equaliazerSection = document.querySelector<HTMLElement>(".equalizer_section");
	const btnCloseEqualiazer = document.querySelector<HTMLElement>(".close_win_equalizer");
	const btnOpenEqualiazer = document.querySelector<HTMLElement>(".open_equalizer");
	const sliders = document.querySelectorAll(".slider_param");
	const checkBoxGainMode = document.querySelector<HTMLInputElement>(".gain_mode");
	const checkBoxPannerMode = document.querySelector<HTMLInputElement>(".panner_mode");
	const inputGainMode = document.querySelector<HTMLInputElement>(".gain_input_value");
	const inputPannerMode = document.querySelector<HTMLInputElement>(".panner_input_value");
	const btnChangePlaybackRates = document.querySelector<HTMLElement>(".btn_for_change_playback_value")
	const currentPlaybackMod = document.querySelector<HTMLElement>(".current_playback_rates_mod")
	const btnResetSliders = document.querySelector<HTMLElement>(".reset_sliders_eq")
	let indexPlaybackRates = 1;
	btnOpenEqualiazer.addEventListener("click", () => {
		equaliazerSection.classList.add("active");
	});
	btnCloseEqualiazer.addEventListener("click", () => {
		equaliazerSection.classList.remove("active");
	});

	sliders.forEach((item: HTMLInputElement) => {
		item.addEventListener("input", () => {
			audioContextController.setFilterValue(item.dataset.filter, item.dataset.param, +item.value);
		});
	});
	defaultInputParametrs();
	checkBoxGainMode.addEventListener("change", () => {
		checkBoxGainMode.checked ? audioContextController.GainNodeConnect() : audioContextController.GainNodeDisconnect();
	});
	checkBoxPannerMode.addEventListener("change", () => {
		checkBoxPannerMode.checked ? audioContextController.StereoNodeConnect() : audioContextController.StereoNodeDisconnect();
	});
	inputGainMode.addEventListener("input", () => {
		audioContextController.setGainNode = +inputGainMode.value;
	});
	inputPannerMode.addEventListener("input", () => {
		audioContextController.setStereoNode = +inputPannerMode.value;
	});
	btnChangePlaybackRates.addEventListener("click",()=>{
		let playbackModes = audioPlayerController.getPlaybackRateMods;
		indexPlaybackRates = (indexPlaybackRates === playbackModes.length-1) ? 0 : ++indexPlaybackRates
		console.log("Active",audioPlayerController.getPlaybackRateMods[indexPlaybackRates])
		audioPlayerController.playbackRateAudio(indexPlaybackRates)
		btnChangePlaybackRates.textContent = `x${playbackModes[indexPlaybackRates].value}`
		currentPlaybackMod.textContent = `${playbackModes[indexPlaybackRates].key}`
	})
	btnResetSliders.addEventListener("click",()=>{
		defaultInputParametrs();
		audioContextController.setDefaultValuesForFilters();
	})
}
function defaultInputParametrs(){
	document.querySelector<HTMLInputElement>(".HS_F").value = `4700`;
	document.querySelector<HTMLInputElement>(".HS_G").value = `50`;
	document.querySelector<HTMLInputElement>(".LS_F").value = `35`;
	document.querySelector<HTMLInputElement>(".LS_G").value = `50`;
	document.querySelector<HTMLInputElement>(".HP_F").value = `800`;
	document.querySelector<HTMLInputElement>(".HP_Q").value = `0.7`;
	document.querySelector<HTMLInputElement>(".LP_F").value = `880`;
	document.querySelector<HTMLInputElement>(".LP_Q").value = `0.7`;
}
function equaliazerController(audioContextController: AudioContextController,audioPlayerController:AudioPlayerController) {
	initEqualizerElements(audioContextController,audioPlayerController);
}

export default equaliazerController;
