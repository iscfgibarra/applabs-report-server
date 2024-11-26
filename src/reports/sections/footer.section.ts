import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    columns: [
      {
        text: `Pag. ${pageCount} de ${currentPage}`,
        style: 'footer',
        alignment: 'right',
        fontSize: 12,
        bold: true,
        margin: [0, 10, 35, 0],
      },
    ],
  };
};
