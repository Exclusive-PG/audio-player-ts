import { fs, uuidv4 } from "./../../../scripts/requiredLib/requiredLib";
import FileSystem from "../FileSystem/FileSystem";
import Playlist from "./Playlist";

export interface IdataPlaylistManager {
	customPlaylists: Array<Playlist>;
	savedPlaylist: Playlist ;
}
export default class PlaylistManager {
	private data: IdataPlaylistManager;

	constructor() {
		this.data = {
			customPlaylists: [],
			savedPlaylist: new Playlist({name:"Saved",dateCreated:new Date().toLocaleString(),id:"1111-1111-1111-1111",tracks:[]}),
		};
		if (!fs.existsSync(FileSystem.PATHS.playlist)) return;

		FileSystem.loadData(FileSystem.PATHS.playlist).forEach((item: any) => {
			console.log(item)
			this.addPlaylist(new Playlist({
				dateCreated:item.data.dateCreated,
				id:item.data.id,
				name:item.data.name,
				//@ts-ignore
				tracks:[...new Set(item.data.tracks)]
			}));
		});
		if (!fs.existsSync(FileSystem.PATHS.saved)) {
			FileSystem.createJSONData(this.getSavedPlaylist, FileSystem.PATHS.saved);
			return
		};
		 this.data.savedPlaylist = new Playlist(FileSystem.loadData(FileSystem.PATHS.saved).data);
		 console.log(this.data)
	}
	public addPlaylist(playlist: Playlist) {
		this.data.customPlaylists.push(playlist);
		return this;
	}
	public addTrackToSavedPlaylist(src:string){
		this.data.savedPlaylist.addTrack(src)
		FileSystem.createJSONData(this.getSavedPlaylist, FileSystem.PATHS.saved);
		console.log(this.data)
	}
	public getAllCountTracks() {
		let totalTracks = this.data.customPlaylists.reduce((acc, item) => {
			return acc + item.getData.tracks.length;
		}, 0);
		return totalTracks;
	}
	public saveData() {
		FileSystem.createJSONData(this.getCustomPlaylists, FileSystem.PATHS.playlist);
		FileSystem.createJSONData(this.getSavedPlaylist, FileSystem.PATHS.saved);
		return this;
	}
	public getPlaylistbyId(id: string): Playlist {
		return this.getCustomPlaylists.filter((item) => item.getData.id === id)[0];
	}
	get getCustomPlaylists() {
		return this.data.customPlaylists;
	}
	get getSavedPlaylist() {
		return this.data.savedPlaylist;
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

export const playlistManager = new PlaylistManager(); //.addPlaylist(playlist).addPlaylist(playlist2);
console.log(playlistManager.getCustomPlaylists);
