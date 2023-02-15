import { audioMods, IplaybackRate } from "../../../types/types";
import { ITrackItem } from "./../../../types/types";

export default class AudioPlayerController {
	private _currentIndexTrack = -1;
	private _currentPlaybackRateMode = 1;
	private _modePlay: Function = null;
	private _audio: HTMLAudioElement = null;
	private currentListTracks: Array<ITrackItem> = [];
	private currentPlaylistID: string;
	private MAX_VALUE_VOLUME = 1;
	private MIN_VALUE_VOLUME = 0;
	private playbackRateModes: Array<IplaybackRate> = [];
	private mods: audioMods;
	private leadingZeroFormatter: Intl.NumberFormat;

	public init(modePlay: Function, audio: HTMLAudioElement, currentListTracks: Array<ITrackItem>) {
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
		this.playbackRateAudioDefault(this.playbackRateModes[this._currentPlaybackRateMode]);
		this.leadingZeroFormatter = new Intl.NumberFormat(undefined, {
			minimumIntegerDigits: 2,
		});
		this.currentPlaylistID = "";
	}
	public play(skipSrc:boolean = false) {
		if(skipSrc) this._audio.src = this.currentListTracks[this._currentIndexTrack].src;
		
		this.PlayAll();
	}
	public pause() {
		this._audio.pause();
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
	public playbackRateAudioDefault(obj: IplaybackRate) {
		console.log("Current playbackRate:", obj);
		this._audio.defaultPlaybackRate = obj.value;
	}
	public playbackRateAudio(index: number){
		this._audio.playbackRate = this.playbackRateModes[index].value;
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
	public stopTrack() {
		this._audio.currentTime = 0;
		if (this._audio.played) this._audio.pause();
	}

	public durationVideo(time: number) {
		const seconds = Math.floor(time % 60);
		const minutes = Math.floor(time / 60) % 60;
		const hour = Math.floor(time / 3600);

		if (isNaN(seconds)) return `00:00`;

		if (hour === 0) {
			return `${minutes}:${this.leadingZeroFormatter.format(seconds)}`;
		} else {
			return `${hour}:${this.leadingZeroFormatter.format(minutes)}:${this.leadingZeroFormatter.format(seconds)}`;
		}
	}

	public isPlaying(): boolean {
		return !this._audio.paused;
	}


	async  formattedTracksList(data: Array<string>): Promise<ITrackItem[]> {
		let formattedList: Array<ITrackItem> = [];
		await Promise.all(
			data.map(async (item, index) => {
				await this.getDuration(item).then((duration: number) => {
					formattedList.push({ src: item, currentIndex: index, time: this.durationVideo(duration) });
				});
			}),
		);
		return formattedList;
	}
	async  getDuration(src: any) {
		return await new Promise(function (resolve) {
			let audio = new Audio(src);
			audio.addEventListener("loadedmetadata", function () {
				resolve(audio.duration);
			});
		});
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
	set setCurrentListTracks(tracks: Array<ITrackItem>) {
		this.currentListTracks = tracks;
	}
	set setCurrentIndexTrack(indexTrack: number) {
		this._currentIndexTrack = indexTrack;
	}
	set setCurrentPlaylistID(id: string) {
		this.currentPlaylistID = id;
	}
	get getCurrentPlaylistID() {
		return this.currentPlaylistID;
	}
	get getCurrentIndexTrack() {
		return this._currentIndexTrack;
	}
	get getCurrentListTracks() {
		return this.currentListTracks;
	}
	get getModsStates() {
		return this.mods;
	}
	get volume() {
		return this._audio.volume;
	}
	get audioElement(){
		return this._audio;
	}
	get getPlaybackRateMods(){
		return this.playbackRateModes;
	}
	public getVolume() {
		console.log(this._audio.volume);
		return this;
	}
	public addVolume(value: number) {
		if (this._audio.volume + value >= this.MAX_VALUE_VOLUME) {
			this._audio.volume = this.MAX_VALUE_VOLUME;
			return;
		}
		if (this._audio.volume + value <= this.MIN_VALUE_VOLUME) {
			this._audio.volume = this.MIN_VALUE_VOLUME;
			return;
		}
		this._audio.volume += value;
		console.log(this._audio.volume);
		return this;
	}

	private PlayAll() {
		this._audio.play();
		this._modePlay();
	}
	get activeSong() {
		return this.currentListTracks[this._currentIndexTrack].src;
	}
}
