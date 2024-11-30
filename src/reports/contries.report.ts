import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { HeaderSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const countriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  return {
    header: HeaderSection({
      title: title ?? 'Countries',
      subTitle: subTitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageOrientation: 'landscape',
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Local Name', 'Continent'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.local_name,
              country.continent,
            ]),
            ['', '', '', '', '', ''],
            ['', '', '', '', 'Totales', `${countries.length} paises`],
          ],
        },
      },
      {
        text: 'Totales',
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          body: [
            [
              {
                text: 'Total de paises',
                bold: true,

              },
              {
                text: `${countries.length} paises`,
                bold: true,

              },
            ],
          ],
        },
      },
    ],
  };
};
