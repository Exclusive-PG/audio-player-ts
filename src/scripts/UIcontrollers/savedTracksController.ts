

function initSavedTracksDependencies(){
    const savedSection = document.querySelector<HTMLElement>(".saved_section")
    const btnCloseSection = document.querySelector<HTMLElement>(".close_win_save_tracks")
    const btnOpenSection = document.querySelector<HTMLElement>(".show_saved_tracks")

    btnOpenSection.addEventListener("click",()=>{
        savedSection.classList.add("active")
    })
    btnCloseSection.addEventListener("click",()=>{
        savedSection.classList.remove("active")
    })
}

export default function SavedTracksController(){
    initSavedTracksDependencies();
}