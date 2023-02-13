
function initEqualizerElements(){
    const equaliazerSection = document.querySelector<HTMLElement>(".equalizer_section");
    const btnCloseEqualiazer = document.querySelector<HTMLElement>(".close_win_equalizer")
    const btnOpenEqualiazer = document.querySelector<HTMLElement>(".open_equalizer")

    btnOpenEqualiazer.addEventListener("click", () =>{
        equaliazerSection.classList.add("active")
    })
    btnCloseEqualiazer.addEventListener("click", () =>{
        equaliazerSection.classList.remove("active")
    })
}


function equaliazerController(){
    initEqualizerElements();
}

export default equaliazerController;