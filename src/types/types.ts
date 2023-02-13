export interface IplaybackRate {
	key: string;
	value: number;
}

export interface audioMods {
	isShuffle: boolean;
	isRepeatOne: boolean;
}
export interface IPlaylistItem {
	name: string;
	id: string | number;
	tracks: Array<string>;
	dateCreated: string | Date;
}
export interface ITrackItem {
	src: string;
	currentIndex: string | number;
	time: string | number;
}

export interface IAudioFilters {
	highShelf: BiquadFilterNode;
	lowShelf: BiquadFilterNode;
	highPass: BiquadFilterNode;
	lowPass: BiquadFilterNode;
}
