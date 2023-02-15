
import PaginationData from "../Classes/Pagination/Pagination";
import PlaylistManager from "../Classes/Playlist/PlaylistManager";
import { ITrackItem } from "./../../types/types";
import AudioPlayerController from "./../Classes/AudioControllers/AudioPlayerController";
import { playlistManager,audioPlayerController } from './../../renderer';
import { showCurrentPlayingVideo } from "./fileManagerController";


const paginationData = new PaginationData(10);

paginationData.setOutputPageStatus(document.querySelector(".current_and_total_pages_saved_tracks"), true);

function initSavedTracksDependencies(audioPlayerController: AudioPlayerController, playlistManager: PlaylistManager) {
	const savedSection = document.querySelector<HTMLElement>(".saved_section");
	const btnCloseSection = document.querySelector<HTMLElement>(".close_win_save_tracks");
	const btnOpenSection = document.querySelector<HTMLElement>(".show_saved_tracks");

	btnOpenSection.addEventListener("click", () => {
		savedSection.classList.add("active");
	});
	btnCloseSection.addEventListener("click", () => {
		savedSection.classList.remove("active");
	});
    Load(audioPlayerController,playlistManager);
    audioPlayerController.audioElement.addEventListener("ended", () => {
		showCurrentPlayingVideo(document.querySelectorAll(".content_item_saved"));
	});
}   

function Load(audioPlayerController: AudioPlayerController, playlistManager: PlaylistManager){
    audioPlayerController.formattedTracksList(playlistManager.getSavedPlaylist.getData.tracks).then((data) => {
        let sortedData = data.sort(playlistManager.dynamicSort("currentIndex"));
        paginationData.refreshDataPage();
        audioPlayerController.setCurrentListTracks = sortedData;
        audioPlayerController.setCurrentIndexTrack = -1;
        audioPlayerController.setCurrentPlaylistID = playlistManager.getSavedPlaylist.getData.id.toString();
        renderSavedTracks(paginationData.renderPagination(sortedData),playlistManager,audioPlayerController,document.querySelector(".render_saved_tracks"))	
        showCurrentPlayingVideo(document.querySelectorAll(".content_item_saved"))	
    });
}


const renderSavedTracks = (arrayCurrentPlaylist: Array<ITrackItem>, playlistManager: PlaylistManager, audioPlayerController: AudioPlayerController, outResult: HTMLElement) => {
	outResult.innerHTML = "";

	try {
		arrayCurrentPlaylist?.forEach(({ currentIndex, src, time }, index) => {
			outResult.innerHTML += `
		<div class="content_item_saved" current-index=${currentIndex} full-path="${src}">
		<div class="data_name_content_item_saved">${+currentIndex + 1}. ${src.split(/[\\/]/).pop()} </div>
		<div class="ext_content_item_saved">${time}</div>
		<div class="play_current_content_saved"><i class="fa-solid fa-play fa-2x"></i></div>
		    <div class="saved_manipulation">
                <i class="fa-solid fa-trash fa-2x remove_saved_track" full-path="${src}"></i>
            </div>
		</div>
		`;
		});
	} catch {
		console.log("not full page");
	}
	const playBtns = document.querySelectorAll(".content_item_saved");	playBtns.forEach((item: HTMLElement) => {
		item.addEventListener("click", (e: any) => {

			if (e.target.parentElement.classList.contains("remove_saved_track")) {
				let srcElement = e.target.parentElement.getAttribute("full-path");
				playlistManager.removeTrackFromSaved(srcElement)
                Load(audioPlayerController,playlistManager);
				console.log("remove",srcElement)
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
			showCurrentPlayingVideo(document.querySelectorAll(".content_item_saved"));
		});
	});
};

//controls pagination
document.querySelector(".next-saved-page").addEventListener("click", () => {
	let data = audioPlayerController.getCurrentListTracks;
	paginationData.NextPage(data);
    renderSavedTracks(paginationData.renderPagination(data),playlistManager,audioPlayerController,document.querySelector(".render_saved_tracks"))	
	showCurrentPlayingVideo(document.querySelectorAll(".content_item_saved"));
});

document.querySelector(".prev-saved-page").addEventListener("click", () => {
	let data = audioPlayerController.getCurrentListTracks;
	paginationData.PreviousPage();
	renderSavedTracks(paginationData.renderPagination(data),playlistManager,audioPlayerController,document.querySelector(".render_saved_tracks"))	
	showCurrentPlayingVideo(document.querySelectorAll(".content_item_saved"));
});

export default function SavedTracksController() {
	initSavedTracksDependencies(audioPlayerController,playlistManager);
}
