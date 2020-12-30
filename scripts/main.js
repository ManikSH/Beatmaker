// All Selected Elements

let playBtn = document.querySelector(".playBtn button");
let pads = document.querySelectorAll(".pad");
let currentKickAudio = document.querySelector(".kickAudio");
let currentSnareAudio = document.querySelector(".snareAudio");
let currentHihatAudio = document.querySelector(".hihatAudio");
let muteAudioBtns = document.querySelectorAll(".muteBtn");
let tempoSlider = document.querySelector(".tempo input");
let tempoValue = document.querySelector(".tempoValue");
let select = document.querySelectorAll("select");
let bpm = 150;
let isPlaying = false;
let interval1Id;
let index = 1;

// Functions and objects

let drumKit = {
  activatePad() {
    this.classList.toggle("active");
  },

  loop() {
    interval1Id = setInterval(() => {
      if (index == 9) {
        index = 1;
      }
      let activeBar = document.querySelectorAll(`.o${index}`);
      activeBar.forEach((pad) => {
        pad.style.animation = "rotate 0.2s 2 alternate";
        pad.addEventListener("animationend", () => {
          pad.style.animation = "";
        });
        this.playAudio(pad);
      });
      index++;
    }, (60 / bpm) * 1000);
  },

  playAudio(pad) {
    if (pad.classList.contains("active")) {
      if (pad.classList.contains("kickPad")) {
        currentKickAudio.currentTime = 0;
        currentKickAudio.play();
      } else if (pad.classList.contains("snarePad")) {
        currentSnareAudio.currentTime = 0;
        currentSnareAudio.play();
      } else if (pad.classList.contains("hihatPad")) {
        currentHihatAudio.currentTime = 0;
        currentHihatAudio.play();
      }
    }
  },

  startDrumKit() {
    if (isPlaying == false) {
      playBtn.innerText = "Stop";
      isPlaying = true;
      this.loop();
    } else {
      playBtn.innerText = "Play";
      isPlaying = false;
      clearInterval(interval1Id);
    }
  },

  mute(e) {
    let childImg = e.target.children;
    if (childImg[0].classList.contains("full")) {
      childImg[0].src = "./assets/icons/volumeMute.svg";
      childImg[0].classList.replace("full", "mute");
      if (childImg[0].classList.contains("kickVol")) {
        currentKickAudio.volume = 0;
      } else if (childImg[0].classList.contains("snareVol")) {
        currentSnareAudio.volume = 0;
      } else {
        currentHihatAudio.volume = 0;
      }
    } else {
      childImg[0].src = "./assets/icons/volumeFull.svg";
      childImg[0].classList.replace("mute", "full");
      if (childImg[0].classList.contains("kickVol")) {
        currentKickAudio.volume = 1;
      } else if (childImg[0].classList.contains("snareVol")) {
        currentSnareAudio.volume = 1;
      } else {
        currentHihatAudio.volume = 1;
      }
    }
  },

  changeTempo(tv) {
    bpm = tv;
    tempoValue.innerText = tv;
    if (isPlaying === true) {
      clearInterval(interval1Id);
      isPlaying = false;
      this.startDrumKit();
    }
  },

  changeSound() {
    switch (this.classList.value) {
      case "kickSelect":
        currentKickAudio.src = this.value;
        break;

      case "snareSelect":
        currentSnareAudio.src = this.value;
        break;

      default:
        currentHihatAudio.src = this.value;
    }
  },
};

// Event Listeners

pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activatePad);
});

playBtn.addEventListener("click", () => {
  drumKit.startDrumKit();
});

muteAudioBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    drumKit.mute(e);
  });
});

tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e.target.value);
});

select.forEach((select) => {
  select.addEventListener("change", drumKit.changeSound);
});
