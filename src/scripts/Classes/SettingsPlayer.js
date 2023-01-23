export default class SettingsPlayer {
     
    setTitleName = (obj, text) =>  text === "" || null ? obj.textContent = "Uknown" : (obj.textContent = text);

    setTitleArtist = (obj, text) =>  text === "" || null ? obj.textContent = "Uknown" : (obj.textContent = text);



}