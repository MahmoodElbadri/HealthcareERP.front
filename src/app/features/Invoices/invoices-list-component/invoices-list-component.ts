import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InvoiceDto } from '../models/invoice-dto';
import { InvoiceService } from '../invoice-service';
import { AlertService } from '../../../shared/services/alert-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoices-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './invoices-list-component.html',
  styleUrl: './invoices-list-component.css',
})
export class InvoicesListComponent implements OnInit {

  // vars
  invoices: InvoiceDto[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  isLoading: boolean = false;

  // injections
  private invoiceService = inject(InvoiceService);
  private alertService = inject(AlertService);
  private toastr = inject(ToastrService);

  // methods
  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.isLoading = true;
    this.invoiceService.getAllInvoices().subscribe({
      next: (res) => {
        this.invoices = res.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Failed to load invoices');
        this.isLoading = false;
      },
    });
  }

  confirmPayInvoice(invoice: InvoiceDto): void {
    this.alertService
      .confirm(
        'Confirm Payment',
        `Are you sure you want to mark Invoice #${invoice.id} for Appointment #${invoice.appointmentId} (Amount: ${invoice.totalAmount} EGP) as PAID?`,
        'Yes, Mark as Paid',
        'Cancel',
        'warning'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.payInvoice(invoice.id);
        }
      });
  }

  payInvoice(invoiceId: number): void {
    this.invoiceService.payInvoice(invoiceId).subscribe({
      next: (res) => {
        this.alertService.toastSuccess(res.message || 'Invoice payment successful!');
        this.loadInvoices();
      },
      error: (error) => {
        this.alertService.error('Payment Error', error?.error?.message || 'Failed to process invoice payment');
      },
    });
  }

  get filteredInvoices(): InvoiceDto[] {
    return this.invoices.filter((item) => {
      const matchesSearch =
        !this.searchQuery ||
        item.id?.toString().includes(this.searchQuery) ||
        item.appointmentId?.toString().includes(this.searchQuery);
      const matchesStatus = !this.selectedStatus || item.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  get paidInvoicesTotal(): number {
    return this.invoices
      .filter((inv) => inv.status === 'Paid' || inv.status === 'paid' || inv.status === '1')
      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  }

  get pendingInvoicesCount(): number {
    return this.invoices.filter(
      (inv) => inv.status === 'Pending' || inv.status === 'pending' || inv.status === '0'
    ).length;
  }

  getStatusBadgeClass(status?: string): string {
    switch (status?.toLowerCase()) {
      case 'paid':
      case '1':
        return 'badge-paid';
      case 'pending':
      case '0':
        return 'badge-pending';
      case 'cancelled':
      case '2':
        return 'badge-cancelled';
      default:
        return 'badge-secondary';
    }
  }

  getStatusLabel(status?: string): string {
    switch (status?.toLowerCase()) {
      case 'paid':
      case '1':
        return 'Paid';
      case 'pending':
      case '0':
        return 'Pending';
      case 'cancelled':
      case '2':
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  }
}

