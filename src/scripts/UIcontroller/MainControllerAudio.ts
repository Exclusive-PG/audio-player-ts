import { audio } from "./../../renderer";

export const ControllerAudio = (audio: HTMLAudioElement) => {
	const timeLineContainer = document.querySelector<HTMLDivElement>(".timeline-container");

	let isScrubbing = false;

	function toggleScrubbing(e: MouseEvent) {
		const rect = timeLineContainer.getBoundingClientRect();
		const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
		console.log("toggleScrubbing", percent);
		console.log("isScrubbing", isScrubbing, percent);
		isScrubbing = (e.buttons & 1) === 1;
		if (isScrubbing) {
			audio.pause();
		} else {
			audio.currentTime = percent * audio.duration;
			audio.play();
		}
		handeTimeLineUpdate(e);
	}

	function handeTimeLineUpdate(e: MouseEvent) {
		const rect = timeLineContainer.getBoundingClientRect();
		const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
		timeLineContainer.style.setProperty("--preview-position", percent.toString());

		if (isScrubbing) {
			e.preventDefault();
			timeLineContainer.style.setProperty("--progress-position", percent.toString());
		}
	}

	const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
		minimumIntegerDigits: 2,
	});

	function durationVideo(time: number) {
		const seconds = Math.floor(time % 60);
		const minutes = Math.floor(time / 60) % 60;
		const hour = Math.floor(time / 3600);

		if (hour === 0) {
			return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
		} else {
			return `${hour}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
		}
	}

	timeLineContainer.addEventListener("mousedown", toggleScrubbing);
	timeLineContainer.addEventListener("mousemove", handeTimeLineUpdate);
	document.addEventListener("mouseup", (e) => {
		if (isScrubbing) {
			toggleScrubbing(e);
		}
	});

	audio.addEventListener("timeupdate", () => {
		const percent = audio.currentTime / audio.duration;
		audio.textContent = durationVideo(audio.duration);
		audio.textContent = durationVideo(audio.currentTime);
		timeLineContainer.style.setProperty("--progress-position", percent.toString());
	});
};


window.addEventListener("load", () => {
	ControllerAudio(audio);
});
