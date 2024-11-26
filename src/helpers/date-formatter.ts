export class DateFormatter {
  static formater = Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMMYYYY(date: Date): string {
    return this.formater.format(date);
  }
}
