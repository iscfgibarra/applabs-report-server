import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from '../reports/hello-world.report';
import { employmentLetter } from '../reports/employment-letter';
import { employmentLetterById } from '../reports/employment-letter-by-id';
import { DateFormatter } from '../helpers';
import { countriesReport } from '../reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async hello() {
    return this.printerService.createPdf(getHelloWorldReport());
  }

  async employmentLetter() {
    return this.printerService.createPdf(employmentLetter());
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee ${employeeId} not found`);
    }

    return this.printerService.createPdf(
      employmentLetterById({
        employeeName: employee.name,
        employerName: 'Francisco Ibarra',
        employeePosition: employee.position,
        employeeStartDate: DateFormatter.getDDMMMYYYY(employee.start_date),
        employeeHours: employee.hours_per_day.toString(),
        employeeWorkSchedule: employee.work_schedule,
        employerCompany: 'Tucan Code Corp',
        employerPosition: 'Gerente',
        employeeCompany: 'La luna',
      }),
    );
  }

  async getCountriesReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    return this.printerService.createPdf(countriesReport({ countries }));
  }
}
