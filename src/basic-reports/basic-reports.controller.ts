import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetter(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Carta de recomendación';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async countries(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountriesReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'List of countries';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
