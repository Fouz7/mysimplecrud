import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateUpdateCustomerDto } from './dto/create-update-costumer.dto';
import { FindAllParams } from './customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  create(createUpdateCustomerDto: CreateUpdateCustomerDto) {
    return this.customerRepository.save(createUpdateCustomerDto);
  }

  findAll(params: FindAllParams) {
    const { pageSize = 10, pageNumber = 1, sortBy = 'no', sortOrder = 'ASC',  nama, kota, alamat } = params;
  
    const query = this.customerRepository.createQueryBuilder('customer');
  
    if (nama) {
      query.andWhere('customer.nama = :nama', { nama });
    }
  
    if (kota) {
      query.andWhere('customer.kota = :kota', { kota });
    }
  
    if (alamat) {
      query.andWhere('customer.alamat = :alamat', { alamat });
    }
  
    return query
      .orderBy(`customer.${sortBy}`, sortOrder)
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }
  
  findOne(no: number) {
    return this.customerRepository.findOne({ where: { no } });
  }

  update(no: number, createUpdateCustomerDto: CreateUpdateCustomerDto) {
    return this.customerRepository.update(no, createUpdateCustomerDto);
  }

  remove(no: number) {
    return this.customerRepository.delete(no);
  }
}