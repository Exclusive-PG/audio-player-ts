import { IAudioFilters } from "./../../../types/types";

export default class AudioContextController {
	private audioContext: AudioContext;
	private analyzer: AnalyserNode;
	private source: MediaElementAudioSourceNode;
	private gainNode: GainNode;
	private stereoNode: StereoPannerNode;
	private filters: IAudioFilters;
	public init(audio: HTMLAudioElement) {
		if (!this.audioContext) {
			this.audioContext = new AudioContext();
			this.analyzer = this.audioContext.createAnalyser();
			this.analyzer.fftSize = 8192;
			this.source = this.audioContext.createMediaElementSource(audio);
			this.gainNode = this.audioContext.createGain();
			this.stereoNode = new StereoPannerNode(this.audioContext);
			this.setGainNode = 1;
			this.setStereoNode = 0;
			this.initFilters();
			this.connectFilters();
			this.setDefaultValuesForFilters();
			console.log("AudioContextController created");
		} else {
			console.log("AudioContextController already create");
		}
	}
	public connectNodes() {
		this.source.connect(this.analyzer);
		this.analyzer.connect(this.audioContext.destination);
		//this.StereoNodeConnect();
	}
	//GAIN SECTION
	public GainNodeConnect() {
		this.source.connect(this.gainNode).connect(this.audioContext.destination);
	}
	public GainNodeDisconnect() {
		this.gainNode.disconnect();
	}
	set setGainNode(gain: number) {
		this.gainNode.gain.value = gain;
	}
	// STEREO SECTION
	public StereoNodeConnect() {
		this.source.connect(this.stereoNode).connect(this.audioContext.destination);
	}
	public StereoNodeDisconnect() {
		this.stereoNode.disconnect();
	}
	public initFilters() {
		this.filters = {
			highShelf: this.audioContext.createBiquadFilter(),
			lowShelf: this.audioContext.createBiquadFilter(),
			highPass: this.audioContext.createBiquadFilter(),
			lowPass: this.audioContext.createBiquadFilter(),
		};
	}
	public connectFilters() {
		this.source.connect(this.filters.highShelf);
		this.filters.highShelf.connect(this.filters.lowShelf);
		this.filters.lowShelf.connect(this.filters.highPass);
		this.filters.highPass.connect(this.filters.lowPass);
		this.filters.lowPass.connect(this.audioContext.destination);
	}
	public setDefaultValuesForFilters() {
		this.filters.highShelf.type = "highshelf";
		this.filters.highShelf.frequency.value = 4700;
		this.filters.highShelf.gain.value = 50;

		this.filters.lowShelf.type = "lowshelf";
		this.filters.lowShelf.frequency.value = 35;
		this.filters.lowShelf.gain.value = 50;

		this.filters.highPass.type = "highpass";
		this.filters.highPass.frequency.value = 800;
		this.filters.highPass.Q.value = 0.7;

		this.filters.lowPass.type = "lowpass";
		this.filters.lowPass.frequency.value = 880;
		this.filters.lowPass.Q.value = 0.7;


	}
	public setFilterValue(type: string,param:string, value: number){
		//@ts-ignore
		this.filters[type][param].value = value;
	}
	set setStereoNode(stereoValue: number) {
		this.stereoNode.pan.value = stereoValue;
	}
	get getAnalyzer(): AnalyserNode {
		return this.analyzer;
	}
	set setFftSize(value: number) {
		this.analyzer.fftSize = value;
	}
}
