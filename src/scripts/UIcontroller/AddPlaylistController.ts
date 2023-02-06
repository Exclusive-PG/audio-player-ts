

export const addPlaylistUIController = () => {
    const btnAddPlaylist = document.querySelector<HTMLElement>(".add_playlist_btn")
    const sectionAddPlaylist = document.querySelector<HTMLElement>(".add_playlist");
	const btnCloseSection = document.querySelector<HTMLElement>(".close_win_add_playlist");
	btnAddPlaylist.addEventListener("click", () => {
		sectionAddPlaylist.classList.add("active")
	});
	btnCloseSection.addEventListener("click",()=>{
		sectionAddPlaylist.classList.remove("active")
	})
};

addPlaylistUIController();