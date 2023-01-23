export default class AudioContextController {
	private audioContext: AudioContext;
	private analyzer: AnalyserNode;
	private source: MediaElementAudioSourceNode;

	public init(audio: HTMLAudioElement) {
		if (!this.audioContext) {
			this.audioContext = new AudioContext();
			this.analyzer = this.audioContext.createAnalyser();
			this.analyzer.fftSize = 8192;
			this.source = this.audioContext.createMediaElementSource(audio);
            console.log("audio context created");
		} else {
			console.log("audio context already create");
		}
	}
    public connectPath(){
        this.source.connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);
    }
	get getAnalyzer(): AnalyserNode {
		return this.analyzer;
	}
}
