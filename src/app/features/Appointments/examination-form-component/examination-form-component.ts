import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../appointment-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicationDto } from '../models/MedicationDto';
import { AddDiagnosisDto } from '../models/AddDiagnosisDto';
import { AddPrescriptionDto } from '../models/AddPrescriptionDto';
import { SaveExaminationDto } from '../models/SaveExaminationDto';

@Component({
  selector: 'app-examination-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './examination-form-component.html',
  styleUrl: './examination-form-component.css',
})
export class ExaminationFormComponent implements OnInit {
  //Vars
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private appointmentService = inject(AppointmentService);
  protected diagnosisFormGroup!: FormGroup;
  medications!:MedicationDto[];

  //Injections
  private fb = inject(FormBuilder);

  //Methods
  ngOnInit(): void {
    this.initializeDiagnosisForm();
    this.getMedications();
  }

  getMedications(){
    this.appointmentService.getMedications().subscribe({
      next: (res) => {
        this.medications = res.data;
        // console.log(this.medications);
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  initializeDiagnosisForm() {
    this.diagnosisFormGroup = this.fb.group({
      name: [''],
      description: [''],
      prescription: this.fb.array([]),
    });

    this.addMedicine();
  }

  get prescriptionFormArray(): FormArray {
    return this.diagnosisFormGroup.get('prescription') as FormArray;
  }

  addMedicine() {
    const itemGroup = this.fb.group({
      medicationId: ['', Validators.required],
      dosage: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      durationInDays: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      instructions: ['', Validators.required],
    });

    this.prescriptionFormArray.push(itemGroup);
  }

  submitDiagnosis() {
  if (this.diagnosisFormGroup.invalid) {
    this.toastr.error('Please fill all the required fields');
    return;
  }

  const formValue = this.diagnosisFormGroup.getRawValue();

  const appointmentId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  const examination: SaveExaminationDto = {
    diagnosisDto: {
      name: formValue.name,
      description: formValue.description,
      appointmentId: appointmentId
    },

    prescriptionDto: {
      appointmentId: appointmentId,
      items: this.prescriptionFormArray.getRawValue()
    }
  };

  console.log('Examination Payload:', examination);

  this.appointmentService.saveExamination(examination).subscribe({
    next: () => {
      this.toastr.success('Diagnosis added successfully');
      this.router.navigate(['/appointments']);
    },
    error: (error) => {
      console.log(error);
      this.toastr.error(error.error.message);
    }
  });
}

  deleteMedicine(index: number) {
    if (this.prescriptionFormArray.length > 1) {
      this.prescriptionFormArray.removeAt(index);
    } else {
      this.toastr.error('You must have at least one medicine');
    }
  }
}
