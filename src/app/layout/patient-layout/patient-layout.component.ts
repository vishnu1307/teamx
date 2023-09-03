import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/shared/service/voice-recognition.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss'],
  providers: [VoiceRecognitionService]
})
export class PatientLayoutComponent implements OnInit {
  text: String | undefined;
  constructor(
    public service: VoiceRecognitionService
  ) { 
    this.service.init()
  }

  ngOnInit(): void {
  }
  start(){
    this.service.start()
  }
  stop(){
    this.service.stop()
  }
}
