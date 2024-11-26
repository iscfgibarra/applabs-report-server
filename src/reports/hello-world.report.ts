import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getHelloWorldReport = (): TDocumentDefinitions => {
  return {
    content: ['Hola mundo'],
  };
};
