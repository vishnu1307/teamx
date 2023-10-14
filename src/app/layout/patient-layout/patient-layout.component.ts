/*patient-layout.component.ts*/
import { Component, OnDestroy } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ApiServiceService } from 'src/app/shared/service/api-service.service';
import { VoiceRecognitionService } from 'src/app/shared/service/voice-recognition.service';

const apiUrl = 'http://localhost:5000';
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
  isSubmit = false;
  languages = [{name: "English", code: "en"}, {name: "Tamil", code: "tn"},]
  selectedItem = null;
  constructor(
    public service: VoiceRecognitionService,
    private apiservice: ApiServiceService,
    private toastrService: NbToastrService
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
      // alert('Stop recording first before submitting.');
      // this.toastrService.show('warning', `Stop recording first before submitting.`);
      this.toastrService.danger('Stop recording first before submitting.', 'Warning');
    } else {
      // Send the recorded text to the backend API
      this.service.stop(); // Ensure the speech recognition service is stopped
      const recordedText = this.service.text;
      this.isSubmit = true;
      if (recordedText) {
        // Send the recorded text to the API
        this.apiservice.createRecord({ recorded_text: recordedText }).subscribe(
          (response) => {
            console.log('API Response:', response);
            this.showTextArea = false;
            this.showSubmitButton = false;
            this.showThankYou = true;
            this.isSubmit = false;
          this.toastrService.success('Your feedback saved successfully', 'Success');
          },
          (error) => {
            this.isSubmit = false;
            // console.error('API Error:', error);
          this.toastrService.danger('Something Went Worng', 'Error');
            // Handle API error here
          }
        );
      } else {
        this.toastrService.danger('No recorded text to submit.', 'Warning');
      }

    }
  }
}
