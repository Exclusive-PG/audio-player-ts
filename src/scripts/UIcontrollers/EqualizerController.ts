
import AudioContextController from "./../Classes/AudioControllers/AudioContextController";


function initEqualizerElements(audioContextController: AudioContextController) {
	const equaliazerSection = document.querySelector<HTMLElement>(".equalizer_section");
	const btnCloseEqualiazer = document.querySelector<HTMLElement>(".close_win_equalizer");
	const btnOpenEqualiazer = document.querySelector<HTMLElement>(".open_equalizer");
	const sliders = document.querySelectorAll(".slider_param");
	const checkBoxGainMode = document.querySelector<HTMLInputElement>(".gain_mode");
	const checkBoxPannerMode = document.querySelector<HTMLInputElement>(".panner_mode");
	const inputGainMode = document.querySelector<HTMLInputElement>(".gain_input_value");
	const inputPannerMode = document.querySelector<HTMLInputElement>(".panner_input_value");
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
}

function equaliazerController(audioContextController: AudioContextController) {
	initEqualizerElements(audioContextController);
}

export default equaliazerController;
