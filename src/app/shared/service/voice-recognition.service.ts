import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  isPausedSpeechRecog = false;
  public text = '';
  tempWords!: string;

  constructor() {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: { results: { transcript: any }[][] }) => {
      const transcript = e.results[0][0].transcript;
      if(transcript){
        this.tempWords = transcript;
      }
      console.log(transcript);
    });

    this.recognition.addEventListener('error', (event: { error: any }) => {
      console.error(`Speech recognition error detected: ${event.error}`);
    });
  }

  start() {
    if (!this.isPausedSpeechRecog) {
      this.isStoppedSpeechRecog = false;
      this.recognition.start();
      console.log('Speech recognition started');
      this.recognition.addEventListener('end', (condition: any) => {
        if (this.isStoppedSpeechRecog) {
          this.recognition.stop();
          console.log('End speech recognition');
        } else {
          this.wordConcat();
          this.recognition.start();
        }
      });
    } else {
      // Resume recognition
      this.isPausedSpeechRecog = false;
      this.recognition.start();
      console.log('Resumed speech recognition');
    }
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.isPausedSpeechRecog = false;
    this.wordConcat();
    this.recognition.stop();
    console.log('End speech recognition');
  }

  pause() {
    this.isPausedSpeechRecog = true;
    this.recognition.stop();
    console.log('Paused speech recognition');
  }

  resume() {
    if (!this.isPausedSpeechRecog) {
      console.warn('Cannot resume, speech recognition is not paused.');
      return;
    }

    this.isPausedSpeechRecog = false;
    this.recognition.start();
    console.log('Resumed speech recognition');
  }

  wordConcat() {
    if(this.tempWords){
      this.text = this.text + ' ' + this.tempWords + '.';
      this.tempWords = '';
    }
  }
}
