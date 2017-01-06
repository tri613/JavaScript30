(function() {
	let playing = false;
	const player = document.querySelector("video.viewer");
	const toggleBtn = document.querySelector(".toggle");
	const volumneInput = document.querySelector("[name='volume']");
	const playbackRateInput = document.querySelector("[name='playbackRate']");
	const skipButtons = document.querySelectorAll("[data-skip]");
	const progressBar = document.querySelector(".progress");

	function init() {
		player.duration;
	}

	function togglePlay(e) {
		if (playing) {
			player.pause();
			this.innerText = '►';
		} else {
			player.play();
			this.innerText = '❚ ❚';
		}
		playing = !playing;
		updateProgressBar();
	}

	function setVolume(e) {
		player.volume = this.value;
	}

	function setPlaybackRate(e) {
		player.playbackRate  = this.value;
	}

	function skipToTime(e) {
		let newTime = player.currentTime + parseInt(this.dataset.skip);
		newTime = newTime < 0 ? 0 : newTime;
		player.currentTime = newTime;
	}

	function progressHandler(e) {
		const percentage = (e.offsetX / progressBar.offsetWidth);
		progressBar.children[0].style.setProperty('flex-basis', `${percentage * 100}%`);
		player.currentTime = player.duration * percentage;
	}

	function updateProgressBar() {
		progressBar.children[0].style.setProperty('flex-basis', `${player.currentTime / player.duration * 100}%`);
	}

	player.addEventListener('click', togglePlay);
	toggleBtn.addEventListener('click', togglePlay);
	volumneInput.addEventListener('change', setVolume);
	volumneInput.addEventListener('mousemove', setVolume);
	playbackRateInput.addEventListener('change', setPlaybackRate);
	playbackRateInput.addEventListener('mousemove', setPlaybackRate);
	skipButtons.forEach(btn => btn.addEventListener('click', skipToTime));
	player.addEventListener('timeupdate', updateProgressBar);
	
	let dragging = false;
	progressBar.addEventListener('mousedown', (e) => dragging = true);
	progressBar.addEventListener('mousemove', (e) => { dragging && progressHandler(e)});
	progressBar.addEventListener('mouseup', (e) => {
		if (dragging) { progressHandler(e); }
		dragging = false;
	});

})();