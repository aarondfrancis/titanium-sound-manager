var STOPPED = 0
var PLAYING = 1;
var PAUSED = 2

var SoundManager = {
	audioStack: [],
	prefix: Titanium.Filesystem.resourcesDirectory + 'app/audio/',
	suffix: '.wav',
	push: function(obj){
		if(typeof obj === 'string'){
			obj = {
				url: obj
			};
		}
		this.audioStack.push({
			url: this.prefix + obj.url + this.suffix,
			sound: null,
			onPlay: obj.onPlay,
			onComplete: obj.onComplete
		})
	},
	preload: function(index){
		if(index < this.audioStack.length && !this.audioStack[index].sound) this.audioStack[index].sound = Ti.Media.createSound({
			url: Titanium.Filesystem.getFile(this.audioStack[index].url)
		})
	},
	play: function(){
		__state = PLAYING;
		this.preload(__pointer)
		__play(); 
	},
	stop: function(){
		__state = STOPPED;
		__pointer = 0;
	},
	pause: function(){
		__state = PAUSED;
	},
	reset: function(){
		this.audioStack = [];
	}
}



var __state = PLAYING;
var __pointer = 0;

var __play = function(){
	if(__state !== PLAYING){		
		return;
	}
	if(__pointer == SoundManager.audioStack.length){
		__pointer = 0;
		return;
	}
	SoundManager.preload(__pointer + 1);
	var currentObj = SoundManager.audioStack[__pointer];
	var currentSound = currentObj.sound;
	currentSound.play();
	if(currentObj.onPlay) currentObj.onPlay()
	var __fnCompleteCallback = function(){
		currentSound.removeEventListener('complete',__fnCompleteCallback);
		if(currentObj.onComplete) currentObj.onComplete()
		if(__state !== STOPPED){
			__pointer++;
			__play();
		}
	}
	currentSound.addEventListener('complete',__fnCompleteCallback)
};
exports = SoundManager;