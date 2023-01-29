
import { audio, audioPlayerController } from "./../../renderer";


const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
	minimumIntegerDigits: 2,
});

export const ControllerAudio = (audio: HTMLAudioElement) => {
	const timeLineContainer = document.querySelector<HTMLDivElement>(".timeline-container");
	const volumeLineContainer = document.querySelector<HTMLDivElement>(".volume-container");
	const volumeIndicator = document.querySelector<HTMLDivElement>(".volume_indicator");
	let isScrubbingTimeLine = false;
	let isScrubbingVolumeLine = false;
	updateVolumeLine(audioPlayerController.volume,volumeLineContainer);	

	function toggleScrubbing(e: MouseEvent) {
		const rect = timeLineContainer.getBoundingClientRect();
		const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
		isScrubbingTimeLine = (e.buttons & 1) === 1;
		isScrubbingVolumeLine = (e.buttons & 1) === 1;
		if (isScrubbingTimeLine) {
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

		if (isScrubbingTimeLine) {
			e.preventDefault();
			timeLineContainer.style.setProperty("--progress-position", percent.toString());
		}
	}
	function handeVolumeLineUpdate(e: MouseEvent) {
		const rect = volumeLineContainer.getBoundingClientRect();
		const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
		if (isScrubbingVolumeLine) {
			e.preventDefault();
			volumeLineContainer.style.setProperty("--progress-position", percent.toString());
			showUIIconVolume(percent, volumeIndicator);
			audioPlayerController.setVolume = percent;
		}
	}
	function scrubbingVolume(e: MouseEvent) {
		isScrubbingVolumeLine = (e.buttons & 1) === 1;
		handeVolumeLineUpdate(e);
	}
	timeLineContainer.addEventListener("mousedown", toggleScrubbing);
	timeLineContainer.addEventListener("mousemove", handeTimeLineUpdate);
	volumeLineContainer.addEventListener("mousemove", handeVolumeLineUpdate);
	volumeLineContainer.addEventListener("mousedown", scrubbingVolume);
	document.addEventListener("mouseup", (e) => {
		if (isScrubbingTimeLine) {
			toggleScrubbing(e);
		}
		if (isScrubbingVolumeLine) {
			scrubbingVolume(e);
		}
	});

	audio.addEventListener("timeupdate", () => {
		const percent = audio.currentTime / audio.duration;
		audio.textContent = durationVideo(audio.duration);
		audio.textContent = durationVideo(audio.currentTime);
		timeLineContainer.style.setProperty("--progress-position", percent.toString());
	});
};

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


function showUIIconVolume(percent: number, element: HTMLElement) {
	if (percent <= 1 && percent >= 0.5) {
		element.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
	} else if (percent < 0.5 && percent !== 0) {
		element.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
	} else {
		element.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
	}
}

export function updateVolumeLine(percent:number,htmlElement:HTMLElement){
	htmlElement.style.setProperty("--progress-position", audioPlayerController.volume.toString());
}