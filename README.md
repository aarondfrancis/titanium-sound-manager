##Titanium Sound Manager
A simple sound fx manager for Titanium. I wrote it when I was writing a fake IVR Response script. I needed to be able to push different sounds in based on other actions in the app.

###Include
Require in the standard way you do for a CommonJS module

    var SM = require('SoundManager') 


###Change the prefix and suffix 
In SoundManager.js, there are two attributes called prefix and suffix. These will be appended to any file you push onto the audioStack. All of my files are in the `app/audio` folder under the `Resources` directory, hence my prefix. All my files are `.wav`, so `.wav` will be attached to all files. Change them as you see fit.

    ...	
    prefix: Titanium.Filesystem.resourcesDirectory + 'app/audio/',
    suffix: '.wav',
    ...
    

###Add sounds
To add a sound, simply call `push` with the file name ast the parameter

    SM.push('dial-tone');
    => pushes Titanium.Filesystem.resourcesDirectory + 'app/audio/' + 'dial-tone' + '.wav' onto the stack. (add prefix and suffix)

####Callbacks
You can add callbacks for both `onPlay` and `onComplete`

	SM.push({
		url: 'welcome_hi', 
        onPlay: function(){
		  Ti.API.info('Starting to Play')
        },
		onComplete: function(){
		  Ti.API.info('Done')
		}
	});


###Pausing, Stopping
To pause, call `SM.pause()`. `SM.play()` will pick up right where you left off. Note: this only pauses _in between_ sounds. It does not pause the currently playing sound. Same for `SM.stop()`.

To stop, call `SM.stop()`. `SM.play()` will start at the beginning of the stack.


###Resetting
`SM.reset()`


###Example

Here is a very stripped down (logic-less) example of what I ended up doing to fake a phone call into an intelligent booking system.

	var SM = require('app/controllers/soundmanager');
	SM.push('tone')
	SM.push('empty')
	SM.push('empty')
	SM.push('empty')
	SM.push('tone')
	SM.push('empty')
	SM.push('empty')
	SM.push('empty')
	SM.push({
		url: 'welcome_hi', 
		onComplete: function(){
			SM.pause();
			setTimeout(function(){
				SM.play();
			},4000)
		}
	});
	SM.push('welcome_lets_get_started')
	SM.push('current_reservation_business_class');
	SM.push('current_reservation_departure_friday');
	
	SM.play();


(The empty files are 500ms long, I didn't want to do a callback function for each one so I just pushed the empty sound files onto the stack.)


