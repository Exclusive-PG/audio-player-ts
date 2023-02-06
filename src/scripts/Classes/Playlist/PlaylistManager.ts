import { fs, uuidv4 } from "./../../../scripts/requiredLib/requiredLib";
import FileSystem from "../FileSystem/FileSystem";
import Playlist from "./Playlist";

export default class PlaylistManager {
	private data: Array<Playlist>;
	constructor() {
		this.data = [];

		if (!fs.existsSync(FileSystem.PATHS.playlist)) return;

		FileSystem.loadData(FileSystem.PATHS.playlist).forEach((item: any) => {
			this.addPlaylist(new Playlist(item.data));
		});
	}
	public addPlaylist(playlist: Playlist) {
		this.data.push(playlist);
		return this;
	}

	public saveData() {
		FileSystem.createJSONData(this.data, FileSystem.PATHS.playlist);
		return this;
	}
	get getPlaylists() {
		return this.data;
	}
}

const playlist = new Playlist({
	id: uuidv4(),
	name: "Retro",
	tracks: ["C:/Users/dayme/Downloads/Meduza_Becky_Hill_GOODBOYS_-_Lose_Control_66925984.mp3"],
	dateCreated: new Date().toLocaleString(),
});
const playlist2 = new Playlist({
	id: uuidv4(),
	name: "PopMusic",
	tracks: ["C:/Users/dayme/Downloads/Meduza_Becky_Hill_GOODBOYS_-_Lose_Control_66925984.mp3", "C:/Users/dayme/Downloads/Fountains_of_Wayne_-_Too_Cool_For_School_67674894.mp3"],
	dateCreated: new Date().toLocaleString(),
});

export const playlistManager = new PlaylistManager();//.addPlaylist(playlist).addPlaylist(playlist2);
console.log(playlistManager.getPlaylists);
