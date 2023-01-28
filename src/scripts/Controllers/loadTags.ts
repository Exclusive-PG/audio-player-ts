import { parseFile } from "../requiredLib/requiredLib";

export const loadAudioTags = async (song:string) => {
	console.log(song);
	const metadata = await parseFile(song);
	console.log(metadata.native);
	let dataIMG = metadata.native["ID3v2.3"].filter((item:any)=>item.id === "APIC")[0].value;
	console.log(dataIMG)
	let base64String = "";
	for (let i = 0; i < dataIMG.data.length; i++) {
		base64String += String.fromCharCode(dataIMG.data[i]);
	}
	document.querySelector<HTMLImageElement>("#poster").src = `data:${dataIMG.format};base64,${window.btoa(base64String)}`;
};

