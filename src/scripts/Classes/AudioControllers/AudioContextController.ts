export default class AudioContextController {
	private audioContext: AudioContext;
	private analyzer: AnalyserNode;
	private source: MediaElementAudioSourceNode;
	private gainNode: GainNode;
	private stereoNode : StereoPannerNode;

	public init(audio: HTMLAudioElement) {
		if (!this.audioContext) {
			this.audioContext = new AudioContext();
			this.analyzer = this.audioContext.createAnalyser();
			this.analyzer.fftSize = 8192;
			this.source = this.audioContext.createMediaElementSource(audio);
			this.gainNode = this.audioContext.createGain();
			this.stereoNode = new StereoPannerNode(this.audioContext)
			this.setGainNode = 1
			this.setStereoNode = 0
			
			console.log("AudioContextController created");
		} else {
			console.log("AudioContextController already create");
		}
	}
	public connectNodes() {
		this.source.connect(this.analyzer);
		this.analyzer.connect(this.audioContext.destination);
		//this.GainNodeConnect();
		//this.GainNodeDisconnect();
		this.StereoNodeConnect();
		
		
		//this.GainNodeDisconnect();
		
	}
	//GAIN SECTION
	public GainNodeConnect(){
		this.source.connect(this.gainNode).connect(this.audioContext.destination);
	}
	public GainNodeDisconnect(){
		this.gainNode.disconnect();
	}
	set setGainNode(gain:number){
		this.gainNode.gain.value = gain;
	}
	// STEREO SECTION
	public StereoNodeConnect(){
		this.source.connect(this.stereoNode).connect(this.audioContext.destination);
	}
	public StereoNodeDisconnect(){
		this.gainNode.disconnect();
	}
	set setStereoNode(stereoValue:number){
		this.stereoNode.pan.value = stereoValue;
	}

	get getAnalyzer(): AnalyserNode {
		return this.analyzer;
	}
	set setFftSize(value: number) {
		this.analyzer.fftSize = value;
	}
}
