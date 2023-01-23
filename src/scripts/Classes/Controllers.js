import AudioPlayerController from "./AudioControllers/AudioPlayerController";

export default class Controllers {
	playOrPause(btn, listTracks, key = null) {
		btn.addEventListener("click", () => {
			console.log("click");

			this.#powerOff();

			super.playOrPause(btn, listTracks);
		});
		if (key !== null) {
			window.addEventListener("keyup", (e) => {
				if (e.key.trim() === key && this.#checkModePlay()) {
					super.playOrPause(btn, listTracks);
				}
			});
		}
	}

	nextTrack(btn, listTracks, key = null) {
		if (btn === null) return;
		btn.addEventListener("click", () => {
			console.log("click next Song");
			super.nextTrack(listTracks);
		});

		if (key !== null) {
			window.addEventListener("keyup", (e) => {
				if (e.key.trim() === key && this.#checkModePlay()) {
					super.nextTrack(listTracks);
				}
			});
		}
	}

	prevTrack(btn, listTracks, key = null) {
		btn.addEventListener("click", () => {
			console.log("click prev Song");

			super.prevTrack(listTracks);
		});

		if (key !== null) {
			window.addEventListener("keyup", (e) => {
				if (e.key.trim() === key && this.#checkModePlay()) {
					super.prevTrack(listTracks);
				}
			});
		}
	}

	#checkModePlay = () => !!this._modePlay;

	#powerOff = () => {
		let btnControllers = document.querySelectorAll(".btn-controller");

		btnControllers.forEach((e) => {
			e.classList.contains("off") && e.classList.remove("off");

			e.classList.contains("right") && e.classList.add("on-rightSide");

			e.classList.contains("left") && e.classList.add("on-leftSide");
		});
	};

	get audioStream() {
		return this._audioStream;
	}

	get currentTrack() {
		return this._currentIndexTrack;
	}
}
