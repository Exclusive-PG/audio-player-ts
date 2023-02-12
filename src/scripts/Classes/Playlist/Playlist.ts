import { IPlaylistItem } from "./../../../types/types";

export default class Playlist {
	private data: IPlaylistItem;

	constructor(data: IPlaylistItem) {
		this.data = data;
	}
	public addTrack(src:string){
		console.log(this.data)
		this.data.tracks.push(src)
		
	}
	get getData() {
		return this.data;
	}
}
