import { Component, OnDestroy } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/service/api-service.service';
import { VoiceRecognitionService } from 'src/app/shared/service/voice-recognition.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss'],
  providers: [VoiceRecognitionService],
})
export class PatientLayoutComponent implements OnDestroy {
  recordingState = 'Start Recording';
  showTextArea = false;
  showSubmitButton = false;
  showThankYou = false;

  constructor(
    public service: VoiceRecognitionService,
    private apiservice: ApiServiceService
  ) {
    this.service.init();
  }

  ngOnDestroy() {
    // Ensure the speech recognition service is stopped when the component is destroyed
    this.service.stop();
  }

  toggleRecording() {
    if (this.recordingState === 'Start Recording' || this.recordingState === 'Recording Stopped') {
      // Start recording
      this.recordingState = 'Recording';
      this.showTextArea = true;
      this.showSubmitButton = true;
      this.service.start();
    } else if (this.recordingState === 'Recording') {
      // Stop recording
      this.recordingState = 'Recording Stopped';
      this.service.stop();
    }
  }

  submitResponse() {
    if (this.recordingState === 'Recording') {
      // Alert user to stop recording first before submitting
      alert('Stop recording first before submitting.');
    } else {
      // Send the recorded text to the backend API
      this.service.stop(); // Ensure the speech recognition service is stopped
      const recordedText = this.service.text;

      if (recordedText) {
        // Send the recorded text to the API
        this.apiservice.createRecord({ recorded_text: recordedText }).subscribe(
          (response) => {
            console.log('API Response:', response);
            this.showTextArea = false;
            this.showSubmitButton = false;
            this.showThankYou = true;
          },
          (error) => {
            console.error('API Error:', error);
            // Handle API error here
          }
        );
      } else {
        alert('No recorded text to submit.');
      }

    }
  }
}
