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
// normalSpeed: number;
// halfSpeed: number;
// doubleSpeed: number;
// backWardsNormanlSpeed:number;
// backWardsHalfSpeed:number;
