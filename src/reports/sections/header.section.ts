import { Content, ContentImage } from 'pdfmake/interfaces';
import { DateFormatter } from '../../helpers';

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: `${DateFormatter.getDDMMMYYYY(new Date())}`,
  alignment: 'right',
  margin: [20, 20],
  width: 150,
};

export const HeaderSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: ContentImage = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;

  const headerSubTitle: Content = subTitle
    ? {
        text: subTitle,
        fontSize: 16,
        alignment: 'center',
        margin: [0, 2, 0, 0],
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            style: { bold: true, fontSize: 22 },
            alignment: 'center',
            margin: [0, 15, 0, 0],
          },
          headerSubTitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
