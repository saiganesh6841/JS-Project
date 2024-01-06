

const playBtn = document.querySelector("#mainPlayBtn");//
const audio = document.querySelector("#audio");
const btnPrev = document.getElementById("btnprev");//
const btnNext = document.getElementById("btnNext");//
const trackTitle = document.querySelector(".track-title");
const artistName = document.querySelector(".artist-name");
const cover = document.querySelector(".cover");
const slider = document.querySelector(".slider");
const thumb = document.querySelector(".slider-thumb");
const progress = document.querySelector(".progress");
const time = document.querySelector(".time");
const fullTime = document.querySelector(".fulltime");
const volumeSlider = document.querySelector(".volume-slider .slider");//
const volumeProgress = document.querySelector(".volume-slider .progress");
const volumeIcon = document.querySelector(".volume-icon");//

// Global variables
let trackPlaying = false;
let volumeMuted = false;
let trackId = 0;

// Track data
// Track data
const tracks = ["Ordinary-Person", "Shape-of-You", "Sooreede"];
const artist = ["Anirudh", "Edsheren", "Ravi Basur"];
const covers = ["op pic", "sou", "salaarpic"];


// Event listeners
playBtn.addEventListener("click", playPauseToggle);
btnPrev.addEventListener("click", prevTrack);
btnNext.addEventListener("click", nextTrack);
volumeSlider.addEventListener("input", updateVolume);
volumeIcon.addEventListener("click", toggleMute);

// Play/pause toggle function
function playPauseToggle() {
  if (trackPlaying === false) {

    //start playing the audio
    audio.play();
    playBtn.innerHTML = `<span class="material-symbols-outlined">pause</span>`;

    trackPlaying = true;//it set trackplay is true
    
   // Apply rotation animation to the cover image
   cover.style.animation = "rotate 4s linear infinite"; // Adjust the duration as needed

  } else {
    audio.pause();
    playBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
    trackPlaying = false;

    // Remove rotation animation when paused
    cover.style.animation = "none";
  }
}
// // Switching tracks function
// function switchTrack() {
//   // Check  track is  playing
//   if (trackPlaying === true) {
//     // If playing, resume playing the audio
//     audio.play();
//   }
// }

// // Load track function
function loadTrack() {
  trackTitle.textContent = tracks[trackId];
  artistName.textContent = artist[trackId];
  cover.src = `./Media/${covers[trackId]}.jpg`;
  audio.src = `./Media/${tracks[trackId]}.mp3`;
}
debugger;

// // Next track function
function nextTrack() {
  trackId = (trackId + 1) % tracks.length;
  loadTrack();
  playPauseToggle();
  playAudio(); //start playing the audio
  // Reapply rotation animation to the cover image
  cover.style.animation = "rotate 4s linear infinite"; // Adjust the duration as needed
}


// // Previous track function
function prevTrack() {
  trackId = (trackId - 1 + tracks.length) % tracks.length;
  loadTrack();
  playPauseToggle();
  playAudio(); //start playing the audio
  // Reapply rotation animation to the cover image
  cover.style.animation = "rotate 4s linear infinite"; // Adjust the duration as needed
}

// Function to play the audio
function playAudio() {
  audio.play();
  playBtn.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
  trackPlaying = true;
}
//when audio ended swithc to next track
audio.addEventListener("ended",nextTrack)


// // Volume control functions
function updateVolume() {
  const volume = volumeSlider.value;
  audio.volume = volume / 100;
  volumeProgress.style.width = `${volume}%`;
  if (volume == 0) {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_off</span>`;
  } else if (volume < 50) {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_down</span>`;
  } else {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_up</span>`;
  }
}

function toggleMute() {
  if (volumeMuted) {
    audio.volume = volumeSlider.value / 100;
    volumeMuted = false;
  } else {
    audio.volume = 0;
    volumeMuted = true;
  }
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (volumeMuted) {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_off</span>`;
  } else if (audio.volume < 0.5) {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_down</span>`;
  } else {
    volumeIcon.innerHTML = `<span class="material-symbols-outlined">volume_up</span>`;
  }
}

//format the time
function setTime(output,input){
  //calculates minutes for input
  const minutes=Math.floor(input/60);
  //calculates seconds for input
  const seconds=Math.floor(input%60);

  //if seconds are under 10
  if(seconds<10){
    output.innerHTML=minutes+ ":0"+seconds;
  }
  else{
    //ouput the time without a zero
    output.innerHTML=minutes+ ":"+seconds;
  }
}

//output the audio track duration
setTime(fullTime,audio.duration);

//when time changes on the audio track
audio.addEventListener("timeupdate",()=>{
  //get the current audio time
  const currentAudioTime=Math.floor(audio.currentTime);

  //get the percentage
  const timePercentage = (currentAudioTime / audio.duration)*100 +"%";
  //output the current audio time
  setTime(time,currentAudioTime);
  //set the slider progress to the percentage
  progress.style.width=timePercentage;
  thumb.style.left=timePercentage;
});

//function for slider 
function customSlider(){
  //get the percentage
  const val=(slider.value / audio.duration)*100+"%";
  //set thumb and progerss to current value
  progress.style.width=val;
  thumb.style.left=`calc(${val}-17em)`;
  //output the audio current time
  setTime(time,slider.value);
  //set audio current time to slider value
  audio.currentTime=slider.value;


  //output the audio track duration
  audio.addEventListener("loadedmetadata",()=>{
    //set the total duration once the metadata is loaded
    setTime(fullTime,audio.duration)
  })
}
//when time changes on the audio track
// audio.addEventListener("timeupdate", () => {
//   //get the current audio time
//   const currentAudioTime = Math.floor(audio.currentTime);
//   //get the percentage
//   const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
//   //output the current audio time
//   setTime(time, currentAudioTime);
//   //output the audio track duration dynamically
//   setTime(fullTime, audio.duration);
//   //set the slider progress to the percentage
//   progress.style.width = timePercentage;
//   thumb.style.left = `calc(${timePercentage}-1.7em)`; // Adjusted position for the thumb
// });


//call function intially
customSlider();
//repeat the function when slider is selected
slider.addEventListener("input",customSlider);

// // Initial load
loadTrack();











