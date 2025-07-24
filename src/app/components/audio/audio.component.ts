import { Component } from '@angular/core';

@Component({
  selector: 'app-audio',
  imports: [],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {
  tracks = [
    { name: 'Tantos Mares', src: 'assets/songs/tantos mares.mp3' },
    { name: 'Quem Sabe Isso Quer Dizer Amor', src: 'assets/songs/Quem Sabe Isso Quer Dizer Amor.mp3' },    
    { name: 'A vida é boa com você', src: 'assets/songs/A Vida É Boa Com Você.mp3' }
  ]

  currentTrackIndex = 0;
  audio = new Audio(this.tracks[0].src);
  isPlaying = false;
  volume = 0.5;

  togglePlay() {
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  setVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    this.audio.volume = this.volume;
}

  playTrack(index: number) {
    this.audio.pause();
    this.currentTrackIndex = index;
    this.audio = new Audio(this.tracks[index].src);
    this.audio.volume = this.volume;
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  nextTrack() {
    let nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.playTrack(nextIndex);
  }

  prevTrack() {
    let prevIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.playTrack(prevIndex);
  }

  ngOnInit() {
    this.audio.volume = this.volume;
  }
}
