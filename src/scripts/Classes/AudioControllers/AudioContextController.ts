export default class AudioContextController {
	private audioContext: AudioContext;
	private analyzer: AnalyserNode;
	private source: MediaElementAudioSourceNode;
    private gainNode :  GainNode;
	public init(audio: HTMLAudioElement) {
		if (!this.audioContext) {
			this.audioContext = new AudioContext();
			this.analyzer = this.audioContext.createAnalyser();
			this.analyzer.fftSize = 8192;
			this.source = this.audioContext.createMediaElementSource(audio);
			this.gainNode = this.audioContext.createGain();
			this.gainNode.gain.value = 0.1; 
			console.log("AudioContextController created");
		} else {
			console.log("AudioContextController already create");
		}
	}
	public connectPath() {
		this.source.connect(this.analyzer);
        this.source.connect(this.gainNode);
		this.analyzer.connect(this.audioContext.destination);
        this.gainNode.connect(this.audioContext.destination);
	}
	get getAnalyzer(): AnalyserNode {
		return this.analyzer;
	}
	set setFftSize(value: number) {
		this.analyzer.fftSize = value;
	}
}
