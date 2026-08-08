import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsService } from '../doctors-service';
import { DoctorDto } from '../models/DoctorDto';
import { ApiResponse } from '../../../core/ApiResponse';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-doctor-list-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctor-list-component.html',
  styleUrl: './doctor-list-component.css',
})
export class DoctorListComponent implements OnInit {

  // variables
  doctors: DoctorDto[] = [];
  searchQuery: string = '';
  selectedSpecialty: string = '';
  viewMode: 'grid' | 'table' = 'grid';

  // injections
  private doctorService = inject(DoctorsService);

  // methods
  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (response: ApiResponse<DoctorDto[]>) => {
        this.doctors = response.data || [];
      },
      error: (error: any) => {
        console.error('Error fetching doctors:', error);
      }
    });
  }

  // Get unique list of specialties for the dropdown filter
  getUniqueSpecialties(): string[] {
    const specialties = this.doctors.map(d => d.specialty).filter(Boolean);
    return Array.from(new Set(specialties)).sort();
  }

  // Filter doctors based on search query and selected specialty
  get filteredDoctors(): DoctorDto[] {
    return this.doctors.filter(doctor => {
      const matchesSearch = !this.searchQuery || 
        (doctor.name && doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (doctor.phoneNumber && doctor.phoneNumber.includes(this.searchQuery)) ||
        (doctor.specialty && doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase()));
        
      const matchesSpecialty = !this.selectedSpecialty || 
        doctor.specialty === this.selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }

  // Generate initials for doctor avatar
  getInitials(name: string): string {
    if (!name) return 'DR';
    const parts = name.trim().split(/\s+/);
    // Remove "Dr." prefix if present
    const filteredParts = parts.filter(p => !p.toLowerCase().replace('.', '').startsWith('dr'));
    
    const partsToUse = filteredParts.length > 0 ? filteredParts : parts;
    
    if (partsToUse.length >= 2) {
      return (partsToUse[0].charAt(0) + partsToUse[1].charAt(0)).toUpperCase();
    }
    return partsToUse[0].substring(0, 2).toUpperCase();
  }
}
