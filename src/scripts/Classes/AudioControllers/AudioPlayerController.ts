export default class AudioPlayerController {
	private _currentIndexTrack = 0;
	private _modePlay: Function = null;
	private _audio: HTMLAudioElement = null;
	private listTracks: Array<HTMLAudioElement> = [];
	private MAX_VALUE_VOLUME = 1;
	private MIN_VALUE_VOLUME = 0;

	public init(modePlay: Function, audio: HTMLAudioElement, listTracks: Array<HTMLAudioElement>) {
		this._audio = audio;
		this.listTracks = listTracks;
		modePlay !== null && (this._modePlay = modePlay);
		setInterval(() => {
			console.log(this._currentIndexTrack);
		}, 100);
	}

	public playOrPause() {
		if (this._audio === null) return;
		try {
			console.log(this._audio);
			console.log(typeof this._audio.src);

			if (this._audio.paused) {
				//Fixed bug of play or pause song //repeats from the beginning
				(this._audio.src === "" || null) && (this._audio.src = this.listTracks[this._currentIndexTrack].src);
				this.PlayAll();
			} else {
				this._audio.pause();

				cancelAnimationFrame(this._modePlay());
			}
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public nextTrack() {
		this._currentIndexTrack++;
		this._currentIndexTrack = this._currentIndexTrack === this.listTracks.length ? (this._currentIndexTrack = 0) : this._currentIndexTrack;
		this._audio.src = this.listTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack}/${this.listTracks.length}`);
	}

	public prevTrack() {
		this._currentIndexTrack--;
		this._currentIndexTrack = this._currentIndexTrack < 0 ? (this._currentIndexTrack = this.listTracks.length - 1) : this._currentIndexTrack;
		this._audio.src = this.listTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack}/${this.listTracks.length}`);
	}

	TrackingEnd() {
		this._audio.addEventListener("ended", () => {
			console.log("The audio has ended.");
			this.nextTrack();
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
				//btn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
				//btn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';