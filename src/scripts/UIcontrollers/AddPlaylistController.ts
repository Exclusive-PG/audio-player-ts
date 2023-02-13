import { ipcRenderer } from "electron";
import Playlist from "../Classes/Playlist/Playlist";
import { uuidv4 } from "../requiredLib/requiredLib";
import PlaylistManager, { playlistManager } from "../Classes/Playlist/PlaylistManager";
import { renderPlaylists } from "./fileManagerController";
import { ITrackItem } from "./../../types/types";

export const addPlaylistUIController = (playlistManager: PlaylistManager) => {
	const btnAddPlaylist = document.querySelector<HTMLElement>(".add_playlist_btn");
	const sectionAddPlaylist = document.querySelector<HTMLElement>(".add_playlist");
	const btnCloseSection = document.querySelector<HTMLElement>(".close_win_add_playlist");
	const btnAttachFiles = document.querySelector<HTMLElement>(".btn_attach_files");
	const outputCountFiles = document.querySelector<HTMLElement>(".count_attached_files");
	const btnCreatePlaylist = document.querySelector<HTMLElement>(".btn_create_playlist");
	const inputNamePlaylist = document.querySelector<HTMLInputElement>(".input_name_playlist");
	const renderArea = document.querySelector<HTMLElement>(".render_exists_playlists");
	const dataAboutPlaylistZone = document.querySelector<HTMLElement>(".data_about_playlists");
	outputCountFiles.innerHTML = "";
	let tracks: any[] | string[] = [];
	btnAddPlaylist.addEventListener("click", () => {
		sectionAddPlaylist.classList.add("active");
	});
	btnCloseSection.addEventListener("click", () => {
		sectionAddPlaylist.classList.remove("active");
	});
	btnAttachFiles.addEventListener("click", () => {
		ipcRenderer.send("upload_files");
	});
	ipcRenderer.on("upload_files", (event, arg) => {
		tracks = arg.filePath.filePaths;
		outputCountFiles.innerHTML = `${tracks.length} file(s) selected`;
		console.log(tracks);
	});
	btnCreatePlaylist.addEventListener("click", () => {
		let namePlaylist = inputNamePlaylist.value;

		if (namePlaylist === "" || tracks.length === 0) return;

		
		let playlist = new Playlist({ dateCreated: new Date().toLocaleString(), id: uuidv4(), name: namePlaylist,tracks:[...new Set(tracks)] });
		playlistManager.addPlaylist(playlist);
		playlistManager.saveData();
		console.log(playlistManager.getCustomPlaylists);
		renderPlaylists(playlistManager,renderArea,dataAboutPlaylistZone);
	});
};

// function formattedTracksList(data:Array<string>){
// 	let formattedList:Array<ITrackItem> = []

// 	data.forEach((item,index)=>{
// 		formattedList:
// 	})
// }


addPlaylistUIController(playlistManager);
