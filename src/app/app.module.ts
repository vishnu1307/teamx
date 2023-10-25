import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { HospitalLayoutComponent } from './layout/hospital-layout/hospital-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbToastrService, NbToastrModule, NbIconModule, NbTooltipModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageCaptureComponent } from './shared/components/image-capture/image-capture.component';
import { LocalStorageService } from 'ngx-webstorage';
import { WebcamModule } from 'ngx-webcam';
import { FileDropDirective } from './file-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    PatientLayoutComponent,
    HospitalLayoutComponent,
    ImageCaptureComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbTooltipModule,
    NbCardModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
    NbDialogModule.forRoot(),

  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
