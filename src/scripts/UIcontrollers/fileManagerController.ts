import Swiper, { Navigation, Pagination } from "swiper";
import PlaylistManager from "./../Classes/Playlist/PlaylistManager";

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
};

export function renderPlaylists(playlistManager: PlaylistManager, outerData: HTMLElement, dataAboutPlaylistZone: HTMLElement) {
	outerData.innerHTML = "";
	dataAboutPlaylistZone.innerHTML = "";
	let renderString = "";

	console.log("Data:", playlistManager.getPlaylists);
	playlistManager.getPlaylists.forEach(({ getData }) => {
		renderString += `
            <div class="playlist_item" playlist-id="${getData.id}">     
                <span class="wrapper_playlist_item">
                    <div class="icon_playlist"><i class="fa-solid fa-folder fa-5x"></i></div>
                    <div class="data_playlist_item">${getData.name.toUpperCase()}</div>
                    <div class="count_content">${getData.tracks.length}</div>
                </span>
            </div>
        `;
	});
	
    outerData.innerHTML = renderString;
    dataAboutPlaylistZone.innerHTML = `Playlists ${playlistManager.getPlaylists.length} / Tracks ${playlistManager.getAllCountTracks()}`
	
    document.querySelectorAll(".playlist_item").forEach((item: HTMLElement) => {
		let timeout: NodeJS.Timeout;
		clearTimeout(timeout);
		item.addEventListener("mouseenter", () => {
			clearTimeout(timeout);
			item.children[0].children[0].innerHTML = `<i class="fa-regular fa-folder-open fa-5x"></i>`;
		});
		item.addEventListener("mouseleave", () => {
			timeout = setTimeout(() => {
				item.children[0].children[0].innerHTML = `<i class="fa-solid fa-folder fa-5x"></i>`;
			}, 250);
		});
	});
}

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



const fileManagerController = (playlistManager: PlaylistManager) =>{
    initVariablesFileManagerController(playlistManager);

}



export default fileManagerController;
