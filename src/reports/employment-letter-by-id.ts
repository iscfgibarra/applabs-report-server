import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { HeaderSection } from './sections/header.section';
import { DateFormatter } from "../helpers";

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employerCompany: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: string;
  employeeHours: string;
  employeeWorkSchedule: string;
  employeeCompany: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    bold: true,
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
  },
};

export const employmentLetterById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employerCompany,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employeeCompany,
  } = values;

  return {
    styles: styles,
    pageMargins: [60, 40, 40, 60],
    header: HeaderSection({}),

    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra 
empresa desde el ${employeeStartDate}. \n\n
Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores. \n\n
La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas 
semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y 
procedimientos establecidos por la empresa. \n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente. \n\n`,
        style: 'body',
      },
      {
        text:
          'Atentamente,\n' +
          `${employerName}\n` +
          `${employerPosition}\n` +
          `${employerCompany}\n` +
          `${DateFormatter.getDDMMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],

    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      margin: [0, 0, 0, 20],
      style: 'footer',
    },
  };
};
