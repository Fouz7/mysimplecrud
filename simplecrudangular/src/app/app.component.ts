import { Component, ViewChild } from '@angular/core';
import { SimpleService } from './simple.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerDto } from './customer-dto';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simplecrudangular';
  customerForm: FormGroup;
  customers: any;
  isEditing = false;
  selectedCustomer: CustomerDto = {} as CustomerDto;
  pageSize = 20;
  pageNumber = 1;
  sortBy = 'no';
  sortOrder = 'ASC';
  nama = '';
  alamat = '';
  kota = '';
  searchName: string = '';
  filteredCustomers: CustomerDto[] = [];

  constructor(
    private simpleService: SimpleService
    ) {
      this.customerForm = new FormGroup({
        nama: new FormControl(''),
        alamat: new FormControl(''),
        kota: new FormControl('')
      });
    }

  displayDialog = false;
  
  ngOnInit() {
    this.getCustomers({
      pageSize: this.pageSize, 
      pageNumber: this.pageNumber, 
      sortBy: this.sortBy, 
      sortOrder: this.sortOrder, 
      nama: this.nama, 
      alamat: this.alamat, 
      kota: this.kota
    });
  }

  resetForm() {
    this.customerForm.reset();
    this.isEditing = false;
  }

  clear(table: Table) {
    table.clear();
  }

  getCustomers(params: {
    pageSize?: number,
    pageNumber?: number,
    sortBy?: string,
    sortOrder?: string,
    nama?: string,
    alamat?: string,
    kota?: string
  }) {
    this.simpleService.getCustomers(params).subscribe({
      next: data => {
        console.log('Data:', data);
        this.customers = data;
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  addCustomer() {
    this.isEditing = false;
    const customerDto: CustomerDto = {
      nama: this.customerForm.value.nama ?? '',
      alamat: this.customerForm.value.alamat ?? '',
      kota: this.customerForm.value.kota ?? ''
    };
    
    this.simpleService.addCustomer(customerDto).subscribe({
      next: data => {
        console.log('Data:', data);
        this.getCustomers({
          pageSize: this.pageSize, 
          pageNumber: this.pageNumber, 
          sortBy: this.sortBy, 
          sortOrder: this.sortOrder, 
          nama: this.nama, 
          alamat: this.alamat, 
          kota: this.kota
        });
        this.displayDialog = false;
        this.customerForm.reset();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  editCustomer(customer: CustomerDto) {
    this.isEditing = true;
    this.selectedCustomer = customer;
    this.customerForm.setValue({
      nama: customer.nama,
      alamat: customer.alamat,
      kota: customer.kota
    });
    this.displayDialog = true;
  }

  updateCustomer() {
    const updatedCustomer: CustomerDto = {
      nama: this.customerForm.value.nama ?? '',
      alamat: this.customerForm.value.alamat ?? '',
      kota: this.customerForm.value.kota ?? ''
    };
  
    const customerNo = this.selectedCustomer?.no ?? 0;
    this.simpleService.editCustomer(updatedCustomer, customerNo).subscribe({
      next: data => {
        console.log('Data:', data);
        this.getCustomers({
          pageSize: this.pageSize, 
          pageNumber: this.pageNumber, 
          sortBy: this.sortBy, 
          sortOrder: this.sortOrder, 
          nama: this.nama, 
          alamat: this.alamat, 
          kota: this.kota
        });
        this.displayDialog = false;
        this.customerForm.reset();
        this.isEditing = false;
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  deleteCustomer(customerNo: number) {
    if (customerNo == null) {
      console.error('Customer number is null or undefined');
      return;
    }
  
    this.simpleService.deleteCustomer(customerNo).subscribe({
      next: data => {
        console.log('Data:', data);
        this.getCustomers({
          pageSize: this.pageSize, 
          pageNumber: this.pageNumber, 
          sortBy: this.sortBy, 
          sortOrder: this.sortOrder, 
          nama: this.nama, 
          alamat: this.alamat, 
          kota: this.kota
        });
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  searchCustomers(nama?: string, alamat?: string, kota?: string) {
    this.getCustomers({
      pageSize: this.pageSize, 
      pageNumber: this.pageNumber, 
      sortBy: this.sortBy, 
      sortOrder: this.sortOrder, 
      nama: nama, 
      alamat: alamat, 
      kota: kota
    });
  }

  clearSearch() {
    this.searchName = '';
    this.searchCustomers(this.searchName);
  }



}
