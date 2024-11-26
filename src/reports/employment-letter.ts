import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { HeaderSection } from './sections/header.section';

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

export const employmentLetter = (): TDocumentDefinitions => {
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
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
por medio de la presente certifco que [Nombre del Empleado] ha sido empleado en nuestra 
empresa desde el [Fecha de Inicio del Empleado]. \n\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores. \n\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas 
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y 
procedimientos establecidos por la empresa. \n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente. \n\n`,
        style: 'body',
      },
      {
        text:
          'Atentamente,\n' +
          '[Nombre del Empleador]\n' +
          '[Cargo del Empleador]\n' +
          '[Nombre de la Empresa]\n' +
          '[Fecha de Emisión]',
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
