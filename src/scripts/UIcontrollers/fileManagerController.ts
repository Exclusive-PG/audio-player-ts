//import { IPlaylistItem } from "./../../types/types";
import Swiper, { Navigation, Pagination } from "swiper";
import PlaylistManager from "./../Classes/Playlist/PlaylistManager";
import Playlist from "../Classes/Playlist/Playlist";
import { ITrackItem } from "./../../types/types";
import { audioPlayerController } from "./../../renderer";
import PaginationData from "../Classes/Pagination/Pagination";
import { playlistManager } from "./../../renderer";

const paginationData = new PaginationData(10);
paginationData.setOutputPageStatus(document.querySelector(".current_and_total_pages_playlist"), true);

const initVariablesFileManagerController = (playlistManager: PlaylistManager) => {
	const renderArea = document.querySelector<HTMLElement>(".render_exists_playlists");
	const fileManagerSection = document.querySelector<HTMLElement>(".file_manager");
	const btnOpenFileManager = document.querySelector<HTMLElement>(".show_file_manager");
	const btnCloseFileManager = document.querySelector<HTMLElement>(".close_win_file_manager");
	const dataAboutPlaylistZone = document.querySelector<HTMLElement>(".data_about_playlists");
	btnOpenFileManager.addEventListener("click", () => {
		fileManagerSection.classList.add("active");
	});
	btnCloseFileManager.addEventListener("click", () => {
		fileManagerSection.classList.remove("active");
	});
	renderPlaylists(playlistManager, renderArea, dataAboutPlaylistZone);
	audioPlayerController.audioElement.addEventListener("ended", () => {
		showCurrentPlayingVideo(document.querySelectorAll(".content_item"));
	});
};

export function renderPlaylists(playlistManager: PlaylistManager, outerData: HTMLElement, dataAboutPlaylistZone: HTMLElement) {
	const playlistPlayingName = document.querySelector<HTMLElement>(".playing-playlist-name");
	outerData.innerHTML = "";
	dataAboutPlaylistZone.innerHTML = "";
	let renderString = "";

	console.log("Data:", playlistManager.getCustomPlaylists);
	playlistManager.getCustomPlaylists.forEach(({ getData }) => {
		renderString += `
            <div class="playlist_item" playlist-id="${getData.id}">     
                <span class="wrapper_playlist_item">
                    <div class="icon_playlist closeFolder"><i class="fa-solid fa-folder fa-5x"></i></div>
					<div class="icon_playlist openFolder"><i class="fa-regular fa-folder-open fa-5x "></i></div>
                    <div class="data_playlist_item">${getData.name.toUpperCase()}</div>
                   <div class="count_content">${getData.tracks.length}</div>
                </span>
            </div>
        `;
	});

	outerData.innerHTML = renderString;
	dataAboutPlaylistZone.innerHTML = `Playlists ${playlistManager.getCustomPlaylists.length} / Tracks ${playlistManager.getAllCountTracks()}`;

	document.querySelectorAll(".playlist_item").forEach((item: HTMLElement) => {

		item.addEventListener("click", () => {
			let dataAttrID = "playlist-id";
			if (!item.hasAttribute(dataAttrID)) return;

			let currentPlaylist = playlistManager.getPlaylistbyId(item.getAttribute(dataAttrID));

			if (audioPlayerController.getCurrentPlaylistID !== currentPlaylist.getData.id.toString()) {
				audioPlayerController.formattedTracksList(currentPlaylist.getData.tracks).then((data) => {
					let sortedData = data.sort(playlistManager.dynamicSort("currentIndex"));
					paginationData.refreshDataPage();
					audioPlayerController.setCurrentListTracks = sortedData;
					audioPlayerController.setCurrentIndexTrack = -1;
					audioPlayerController.setCurrentPlaylistID = currentPlaylist.getData.id.toString();
					renderAvailableContent(paginationData.renderPagination(sortedData), playlistManager, document.querySelector<HTMLElement>(".content_current_playlist_render"));
					playlistPlayingName.children[0].textContent = currentPlaylist.getData.name;
					console.log("render new", audioPlayerController.getCurrentPlaylistID);
				});
			}
			swiper.slideTo(1);
		});

	});
}

const renderAvailableContent = (arrayCurrentPlaylist: Array<ITrackItem>, playlistManager: PlaylistManager, outResult: HTMLElement) => {
	outResult.innerHTML = "";

	try {
		arrayCurrentPlaylist?.forEach(({ currentIndex, src, time }, index) => {
			outResult.innerHTML += `
		<div class="content_item" current-index=${currentIndex} full-path="${src}">
		<div class="data_name_content_item">${+currentIndex + 1}. ${src.split(/[\\/]/).pop()} </div>
		<div class="ext_content_item">${time}</div>
		<div class="play_current_content" ><i class="fa-solid fa-play fa-2x"></i></div>
		<div class="add_track_to_saved_list">${playlistManager.isSaved(src) ? `<i class="fa-solid fa-heart fa-2x btn_remove_track" full-path="${src}"></i>`: `<i class="fa-regular fa-heart fa-2x btn_save_track" full-path="${src}"></i>`}</div>
		</div>
		`;
		});
	} catch {
		console.log("not full page");
	}
	const playBtns = document.querySelectorAll(".content_item");
	playBtns.forEach((item: HTMLElement) => {
		item.addEventListener("click", (e: any) => {
	
			if (e.target.classList.contains("btn_save_track")) {
				let srcElement = e.target.getAttribute("full-path");
				playlistManager.addTrackToSavedPlaylist(srcElement)
				e.target.innerHTML = `<i class="fa-solid fa-heart fa-2x btn_remove_track" full-path="${e.currentTarget.getAttribute("full-path")}"></i>`
				console.log("add",srcElement)
				return;
			}
		
			if (e.target.parentElement.classList.contains("btn_remove_track")) {
				let srcElement = e.target.parentElement.getAttribute("full-path");
				console.log("remove",srcElement)
				playlistManager.removeTrackFromSaved(srcElement)
				e.target.parentElement.innerHTML = `<i class="fa-regular fa-heart fa-2x btn_save_track" full-path="${e.currentTarget.getAttribute("full-path")}"></i>`;
				return;
			}
			let _itemCurrentIndex = parseInt(item.getAttribute("current-index"));
			
			if (audioPlayerController.getCurrentIndexTrack !== _itemCurrentIndex) {
				audioPlayerController.setCurrentIndexTrack = +_itemCurrentIndex;
				audioPlayerController.play(true);
			} else {
				audioPlayerController.isPlaying() ? audioPlayerController.pause() : audioPlayerController.play();
			}

			console.log(_itemCurrentIndex);
			showCurrentPlayingVideo(document.querySelectorAll(".content_item"));
		});
	});
};


export const showCurrentPlayingVideo = (HTMLList:any) => {
	let contentItems = HTMLList;

	//console.log(contentItems)
	contentItems.forEach((item: HTMLElement) => {
		if (!item.hasAttribute("current-index")) return;

		if (parseInt(item.getAttribute("current-index")) === audioPlayerController.getCurrentIndexTrack) {
			item.classList.add("playing-track");
			item.children[2].innerHTML = audioPlayerController.isPlaying() ? `<i class="fa-solid fa-pause fa-2x"></i>` : `<i class="fa-solid fa-play fa-2x"></i>`;
		} else {
			item.classList.remove("playing-track");
			item.children[2].innerHTML = `<i class="fa-solid fa-play fa-2x"></i>`;
		}
	});

	//current-index=${index}
};
///connect Swiper
Swiper.use([Navigation, Pagination]);

// config Swiper
const swiper = new Swiper(".swiper_playlist_or_content", {
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	//allowTouchMove:false
});

//controls pagination
document.querySelector(".next-playlist-page").addEventListener("click", () => {
	let data = audioPlayerController.getCurrentListTracks;
	paginationData.NextPage(data);
	renderAvailableContent(paginationData.renderPagination(data), playlistManager, document.querySelector<HTMLElement>(".content_current_playlist_render"));
	showCurrentPlayingVideo(document.querySelectorAll(".content_item"));
});

document.querySelector(".prev-playlist-page").addEventListener("click", () => {
	let data = audioPlayerController.getCurrentListTracks;
	paginationData.PreviousPage();
	renderAvailableContent(paginationData.renderPagination(data), playlistManager, document.querySelector<HTMLElement>(".content_current_playlist_render"));
	showCurrentPlayingVideo(document.querySelectorAll(".content_item"));
});

const fileManagerController = (playlistManager: PlaylistManager) => {
	initVariablesFileManagerController(playlistManager);
};

export default fileManagerController;
