import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Query } from '@nestjs/common';
import { CreateUpdateCustomerDto } from './dto/create-update-costumer.dto';
import { FindAllParams } from './customer.interface';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createUpdateCustomerDto: CreateUpdateCustomerDto) {
    return this.customerService.create(createUpdateCustomerDto);
  }

  @Get()
  findAll(@Query() params: FindAllParams) {
    return this.customerService.findAll(params);
  }

  @Get(':no')
  findOne(@Param('no') no: string) {
    return this.customerService.findOne(+no);
  }

  @Put(':no')
  update(@Param('no') no: string, @Body() createUpdateCustomerDto: CreateUpdateCustomerDto) {
    return this.customerService.update(+no, createUpdateCustomerDto);
  }

  @Delete(':no')
  remove(@Param('no') no: string) {
    return this.customerService.remove(+no);
  }
}