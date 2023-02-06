import { IPlaylistItem } from "./../../../types/types";

export default class Playlist {
	private data: IPlaylistItem;

	constructor(data: IPlaylistItem) {
		this.data = data;
	}
	get getData() {
		return this.data;
	}
}
