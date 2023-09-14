import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientLayoutComponent } from './patient-layout.component';

describe('PatientLayoutComponent', () => {
  let component: PatientLayoutComponent;
  let fixture: ComponentFixture<PatientLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state values', () => {
    expect(component.recordingState).toBe('Start Recording');
    expect(component.showTextArea).toBe(false);
    expect(component.showSubmitButton).toBe(false);
    expect(component.showThankYou).toBe(false);
  });
});

