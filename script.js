const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const cdBackground = document.getElementById('cd-background'); 

const songs = [
    { title: "Hawayein_Jab Harry Met Sejal", artist: "Arijit Singh", path: "Hawayein_(Arijit).mp3" },
    { title: "Radhe Title Track_Salman Khan", artist: "Salman Khan & Sajid Wajid", path: "Radhe Title Track_Salman Khan.mp3" },
    { title: "Tere Naam_Salman Khan", artist: "Udit Narayan, Himesh Reshammiya", path: "Tere Naam_Salman Khan.mp3" },
];

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(song) {
  document.getElementById('title').textContent = song.title;
  document.getElementById('artist').textContent = song.artist;
  audio.src = song.path;
}

function playSong() {
  playBtn.textContent = "⏸️";
  audio.play();
  isPlaying = true;
  cdBackground.style.display = 'block'; 
}

function pauseSong() {
  playBtn.textContent = "▶️";
  audio.pause();
  isPlaying = false;
  cdBackground.style.display = 'none'; 
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress(e) {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function nextSong() {
  songIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#1db954" : "#fff";
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;
  repeatBtn.style.color = isRepeat ? "#1db954" : "#fff";
});


loadSong(songs[songIndex]);
