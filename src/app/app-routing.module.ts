import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalLayoutComponent } from './layout/hospital-layout/hospital-layout.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCaptureComponent } from './shared/components/image-capture/image-capture.component';

const routes: Routes = [
  {
    path: '', 
    component: PatientLayoutComponent,
  },
  {
    path: 'hospital',
    component: HospitalLayoutComponent,
  },
  {
    path: 'image',
    component: ImageCaptureComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
