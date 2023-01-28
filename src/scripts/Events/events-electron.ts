import { ipcRenderer } from "electron";

function initEventsElectron() {
	document.querySelector(".add_playlist_btn").addEventListener("click", () => {
		ipcRenderer.send("upload_files");
	});
	ipcRenderer.on("upload_files", (event, arg) => {
		console.log(arg);
	});
}

initEventsElectron();