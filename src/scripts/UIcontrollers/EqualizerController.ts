
import AudioContextController from './../Classes/AudioControllers/AudioContextController';

function initEqualizerElements(audioContextController:AudioContextController){
    const equaliazerSection = document.querySelector<HTMLElement>(".equalizer_section");
    const btnCloseEqualiazer = document.querySelector<HTMLElement>(".close_win_equalizer")
    const btnOpenEqualiazer = document.querySelector<HTMLElement>(".open_equalizer")
    const sliders = document.querySelectorAll(".slider_param");
    const checkBoxGainMode = document.querySelector<HTMLInputElement>(".gain_mode");
    const checkBoxPannerMode = document.querySelector<HTMLInputElement>(".panner_mode")
    btnOpenEqualiazer.addEventListener("click", () =>{
        equaliazerSection.classList.add("active")
    })
    btnCloseEqualiazer.addEventListener("click", () =>{
        equaliazerSection.classList.remove("active")
    })

    sliders.forEach((item:HTMLInputElement)=>{
        item.addEventListener("input",()=>{
            audioContextController.setFilterValue(item.dataset.filter,item.dataset.param,+item.value)
        })
    })
    
    checkBoxGainMode.addEventListener("change",()=>{
        checkBoxGainMode.checked ?
            audioContextController.GainNodeConnect() : audioContextController.GainNodeDisconnect();
        
    })
}


function equaliazerController(audioContextController:AudioContextController){
    initEqualizerElements(audioContextController);
}

export default equaliazerController;