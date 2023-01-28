import { audioMods, IplaybackRate } from "../../../types/types";

export default class AudioPlayerController {
	private _currentIndexTrack = 0;
	private _currentPlaybackRateMode = 1;
	private _modePlay: Function = null;
	private _audio: HTMLAudioElement = null;
	private currentListTracks: Array<HTMLAudioElement> = [];
	private MAX_VALUE_VOLUME = 1;
	private MIN_VALUE_VOLUME = 0;
	private playbackRateModes: Array<IplaybackRate> = [];
	private mods: audioMods;

	public init(modePlay: Function, audio: HTMLAudioElement, currentListTracks: Array<HTMLAudioElement>) {
		this._audio = audio;
		this._audio.volume = 0.5;
		this.currentListTracks = currentListTracks;
		modePlay !== null && (this._modePlay = modePlay);
		this.playbackRateModes = [
			{ key: "halfSpeed", value: 0.5 },
			{ key: "normalSpeed", value: 1 },
			{ key: "doubleSpeed", value: 2 },
			{ key: "tripleSpeed", value: 3 },
		];
		this.mods = {
			isShuffle: false,
			isRepeatOne: false,
		};
		this.playbackRateAudio(this.playbackRateModes[this._currentPlaybackRateMode]);
	}

	public playOrPause() {
		if (this._audio === null) return;
		try {
			console.log(this._audio);
			console.log(typeof this._audio.src);

			if (this._audio.paused) {
				//Fixed bug of play or pause song //repeats from the beginning
				(this._audio.src === "" || null) && (this._audio.src = this.currentListTracks[this._currentIndexTrack].src);
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
		if (!this.mods.isShuffle && !this.mods.isRepeatOne) {
			this.withoutMods(false);
		} else this.Mods();
		this._audio.src = this.currentListTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack + 1}/${this.currentListTracks.length}`);
	}

	public prevTrack() {
		if (!this.mods.isShuffle && !this.mods.isRepeatOne) {
			this.withoutMods(true);
		} else this.Mods();
		this._audio.src = this.currentListTracks[this._currentIndexTrack].src;
		this.PlayAll();
		console.log(`${this._currentIndexTrack + 1}/${this.currentListTracks.length}`);
	}
	public TrackingEnd() {
		this._audio.addEventListener("ended", () => {
			console.log("The audio has ended.");
			this.nextTrack();
		});
	}
	public playbackRateAudio(obj: IplaybackRate) {
		console.log("Current playbackRate:", obj);
		this._audio.defaultPlaybackRate = obj.value;
	}
	public Mods() {
		this.shuffleMode();
		this.repeatOneTrack();
		console.log(this.mods);
	}
	public shuffleMode() {
		if (!this.mods.isShuffle || this.mods.isRepeatOne) return;
		let tempIndex = this._currentIndexTrack;
		console.log("PREV INDEX:", this._currentIndexTrack + 1);

		while (tempIndex === this._currentIndexTrack) {
			tempIndex = Math.floor(Math.random() * this.currentListTracks.length);
		}
		this._currentIndexTrack = tempIndex;
		console.log("NOW INDEX:", this._currentIndexTrack + 1);
		console.log(this.currentListTracks[this._currentIndexTrack]);
	}
	public repeatOneTrack() {
		if (!this.mods.isRepeatOne) return;
	}
	public withoutMods(reverse: boolean) {
		if (!reverse) {
			this._currentIndexTrack++;
			this._currentIndexTrack = this._currentIndexTrack === this.currentListTracks.length ? (this._currentIndexTrack = 0) : this._currentIndexTrack;
		} else {
			this._currentIndexTrack--;
			this._currentIndexTrack = this._currentIndexTrack < 0 ? (this._currentIndexTrack = this.currentListTracks.length - 1) : this._currentIndexTrack;
		}
	}
	set setShuffleMode(isShuffle: boolean) {
		this.mods.isShuffle = isShuffle;
		this.mods.isShuffle && this.shuffleMode();
	}
	set setRepeatOne(isRepeatOne: boolean) {
		this.mods.isRepeatOne = isRepeatOne;
	}
	set setVolume(value: number) {
		if (value > this.MAX_VALUE_VOLUME || value < this.MIN_VALUE_VOLUME) return;
		this._audio.volume = value;
	}
	get getModsStates() {
		return this.mods;
	}

	private PlayAll() {
		this._audio.play();
		this._modePlay();
	}
	get activeSong(){
		return this.currentListTracks[this._currentIndexTrack].src;
	}
}
