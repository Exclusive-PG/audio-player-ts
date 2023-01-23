

export default class AudioPlayerController {
	private _currentIndexTrack = 0;
	private _modePlay: Function = null;
	private _audio: HTMLAudioElement = null;
	private MAX_VALUE_VOLUME = 1;
	private MIN_VALUE_VOLUME = 0;

	public init(modePlay: Function, audio: HTMLAudioElement) {
		this._audio = audio;
		modePlay !== null && (this._modePlay = modePlay);
	}

	public playOrPause(listTracks: Array<HTMLAudioElement>) {
		console.log(listTracks);
		if (this._audio === null) return;

		console.log(this._audio);
		console.log(typeof this._audio.src);

		if (this._audio.paused) {
			//Fixed bug of play or pause song //repeats from the beginning
			(this._audio.src === "" || null) && (this._audio.src = listTracks[this._currentIndexTrack].src);
			this.PlayAll();
			//btn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
		} else {
			this._audio.pause();
			//btn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
			cancelAnimationFrame(this._modePlay());
		}
	}

	public nextTrack(listTracks: Array<HTMLAudioElement>) {
		this._currentIndexTrack++;
		this._currentIndexTrack = this._currentIndexTrack === listTracks.length ? (this._currentIndexTrack = 0) : this._currentIndexTrack;
		this._audio.src = listTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack}/${listTracks.length}`);
	}

	public prevTrack(listTracks: Array<HTMLAudioElement>) {
		this._currentIndexTrack--;
		this._currentIndexTrack = this._currentIndexTrack < 0 ? (this._currentIndexTrack = listTracks.length - 1) : this._currentIndexTrack;
		this._audio.src = listTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack}/${listTracks.length}`);
	}

	TrackingEnd(listTracks: Array<HTMLAudioElement>) {
		this._audio.addEventListener("ended", () => {
			console.log("The audio has ended.");
			this.nextTrack(listTracks);
		});
	}

	set setVolume(value: number) {
		if (value > this.MAX_VALUE_VOLUME || value < this.MIN_VALUE_VOLUME) return;

		this._audio.volume = value;
	}
	private PlayAll() {
		this._audio.play();
		this._modePlay();
	}
	// private setTitle(listTracks:Array<HTMLAudioElement>) {
	// 	this.settingsPlayer.setTitleName(document.querySelector(".name_title"), listTracks[this._currentIndexTrack].name);
	// 	this.settingsPlayer.setTitleArtist(document.querySelector(".artist_title"), listTracks[this._currentIndexTrack].artist);
	// }
}
