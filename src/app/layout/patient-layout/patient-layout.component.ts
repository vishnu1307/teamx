import { Component, OnDestroy } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ApiServiceService } from 'src/app/shared/service/api-service.service';
import { VoiceRecognitionService } from 'src/app/shared/service/voice-recognition.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  languages = [
    { name: "English", code: "en-US" },
    { name: "Tamil", code: 'ta-IN' },
    { name: "Hindi", code: 'hi-IN' },
    { name: "Arabic", code: 'ar-SA' },
  ];
  selectedItem = null;
  uploadedImage: string | null = null; // Initialize uploadedImage property

  forms: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.forms = this.fb.group({
      name: [''],
      avatar: [null],
    });
  }
  ngOnInit() {}
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.forms.patchValue({
      avatar: file,
    });
    if(this.forms){
    this.forms.get('avatar').updateValueAndValidity();
    }
  }
  submitForm() {
    var formData: any = new FormData();
    // formData.append('name', this.forms.get('name').value);
    formData.append('image', this.forms.get('avatar').value);
    this.http.post('http://127.0.0.1:5002/classify', formData).subscribe(
      (response) => console.log(response),
      (error) => {
        console.log(error.message);
      }
    );
    }
  ngOnDestroy() {
    //   // Ensure the speech recognition service is stopped when the component is destroyed
    //   this.service.stop();
   }
  /*

  changeLanguage(e: any) {
    this.service.init(e);
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
      // Alert the user to stop recording first before submitting
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
            this.toastrService.danger('Something Went Wrong', 'Error');
            // Handle API error here
          }
        );
      } else {
        this.toastrService.danger('No recorded text to submit.', 'Warning');
      }
    }
  }
  */
  // Function for handling image upload
  // uploadImage(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.uploadedImage = e.target.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // // Function for submitting the uploaded image
  // submitImage() {
  //   if (this.uploadedImage) {
  //     // Process and send the uploaded image to the API
  //     // ...
  //   }
  // }
}
