import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientsService } from '../patients-service';
import { PatientDto } from '../models/patient-dto';
import { ApiResponse } from '../../../core/ApiResponse';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-patient-list-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-list-component.html',
  styleUrl: './patient-list-component.css',
})
export class PatientListComponent implements OnInit {

  // variables
  patients: PatientDto[] = [];
  searchQuery: string = '';
  selectedGender: string = '';
  viewMode: 'grid' | 'table' = 'grid';

  // injections
  private patientService = inject(PatientsService);

  // methods
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (response: ApiResponse<PatientDto[]>) => {
        this.patients = response.data || [];
      },
      error: (error: any) => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  // Get unique list of genders for the dropdown filter
  getUniqueGenders(): string[] {
    const genders = this.patients.map(p => p.gender).filter(Boolean);
    return Array.from(new Set(genders)).sort();
  }

  // Filter patients based on search query and selected gender
  get filteredPatients(): PatientDto[] {
    return this.patients.filter(patient => {
      const matchesSearch = !this.searchQuery || 
        (patient.name && patient.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (patient.phoneNumber && patient.phoneNumber.includes(this.searchQuery));
        
      const matchesGender = !this.selectedGender || 
        patient.gender === this.selectedGender;

      return matchesSearch && matchesGender;
    });
  }

  // Generate initials for patient avatar
  getInitials(name: string): string {
    if (!name) return 'PA';
    const parts = name.trim().split(/\s+/);
    
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }
}
