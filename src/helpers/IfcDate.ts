/**
 * Implémentation d'un calendrier fixe avec :
 * - 13 mois de 28 jours
 * - Un "Year Day" après le 28e jour du 13e mois
 * - Un "Leap Day" après le 28 juin lors des années bissextiles
 *
 * Cette classe maintient la synchronisation avec le calendrier grégorien
 * tout en exposant une interface pour le calendrier fixe.
 */
export class IfcDate {
  private date: Date;
  private readonly DAYS_PER_MONTH = 28;
  private readonly MONTHS_PER_YEAR = 13;
  private readonly YEAR_DAY_MONTH = 13;
  private readonly LEAP_DAY_MONTH = 6;
  private readonly LEAP_DAY = this.LEAP_DAY_MONTH * this.DAYS_PER_MONTH + 1;
  private readonly MS_PER_SECOND = 1000;
  private readonly SECONDS_PER_MINUTE = 60;
  private readonly MINUTES_PER_HOUR = 60;
  private readonly HOURS_PER_DAY = 24;
  private readonly DAYS_IN_NORMAL_YEAR = 365;
  private readonly DAYS_IN_LEAP_YEAR = 366;

  constructor(date?: Date) {
    if (date === undefined) {
      this.date = new Date();
    } else {
      this.date = new Date(date);
    }
  }

  private getDayOfYear(): number {
    const start = new Date(this.date.getFullYear(), 0, 0);
    const diff =
      this.date.getTime() -
      start.getTime() +
      (start.getTimezoneOffset() - this.date.getTimezoneOffset()) * this.MS_PER_SECOND * this.SECONDS_PER_MINUTE;

    const MS_PER_DAY = this.MS_PER_SECOND * this.SECONDS_PER_MINUTE * this.MINUTES_PER_HOUR * this.HOURS_PER_DAY;

    // return (
    //     (Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()) -
    //       Date.UTC(this.date.getFullYear(), 0, 0)) /
    //     this.HOURS_PER_DAY /
    //     this.MINUTES_PER_HOUR /
    //     this.SECONDS_PER_MINUTE /
    //     this.MS_PER_SECOND
    //   );

    return Math.floor(diff / MS_PER_DAY);
  }

  /**
   * Vérifie si la date courante est le dernier jour de l'année (Year Day).
   * Ce jour spécial suit le 28e jour du 13e mois.
   */
  private isYearDay(): boolean {
    const dayOfYear = this.getDayOfYear();
    return (
      (!this.isLeapYear() && dayOfYear === this.DAYS_IN_NORMAL_YEAR) ||
      (this.isLeapYear() && dayOfYear === this.DAYS_IN_LEAP_YEAR)
    );
  }

  /**
   * Vérifie si la date courante est le jour bissextile (Leap Day).
   * Ce jour spécial est ajouté après le 28 juin lors des années bissextiles.
   */
  private isLeapDay(): boolean {
    const dayOfYear = this.getDayOfYear();
    return this.isLeapYear() && dayOfYear === this.LEAP_DAY;
  }

  isLeapYear(): boolean {
    const year = this.date.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  // Getters modifiés pour le calendrier fixe
  getDate(): number {
    if (this.isLeapDay() || this.isYearDay()) {
      return 29;
    }
    let dayOfYear = this.getDayOfYear();

    // Si on est dans une année bissextile et après le Leap Day,
    // on doit soustraire 1 pour compenser le décalage
    if (this.isLeapYear() && dayOfYear > this.LEAP_DAY) {
      dayOfYear -= 1;
    }

    return dayOfYear % this.DAYS_PER_MONTH || this.DAYS_PER_MONTH;
  }

  getMonth(): number {
    if (this.isLeapDay()) {
      return this.LEAP_DAY_MONTH;
    }
    if (this.isYearDay()) {
      return this.YEAR_DAY_MONTH;
    }
    const daysPerMonth =
      (this.DAYS_PER_MONTH * this.MONTHS_PER_YEAR + (this.isLeapYear() ? 1 : 0)) / this.MONTHS_PER_YEAR;
    return Math.ceil(this.getDayOfYear() / daysPerMonth);
  }

  // Méthodes héritées de la classe Date
  getFullYear(): number {
    return this.date.getFullYear();
  }

  getHours(): number {
    return this.date.getHours();
  }

  getMinutes(): number {
    return this.date.getMinutes();
  }

  getSeconds(): number {
    return this.date.getSeconds();
  }

  getTime(): number {
    return this.date.getTime();
  }

  // Setters adaptés au calendrier fixe
  setDate(date: number): number {
    // Validation de base : une date doit être entre 1 et 29
    if (date < 1 || date > 29) {
      throw new Error('Date invalide pour le calendrier fixe');
    }

    const currentMonth = this.getMonth();

    // Le jour 29 n'est valide que pour :
    // - Le dernier jour de l'année (mois 13)
    // - Le jour bissextile en juin lors des années bissextiles
    if (
      date === 29 &&
      currentMonth !== this.YEAR_DAY_MONTH &&
      !(currentMonth === this.LEAP_DAY_MONTH && this.isLeapYear())
    ) {
      throw new Error("Le 29 n'est valide que pour le Year Day et le Leap Day");
    }

    let dayOfYear = (currentMonth - 1) * this.DAYS_PER_MONTH + date;

    // Si on est dans une année bissextile et qu'on est après juin
    if (this.isLeapYear() && currentMonth > this.LEAP_DAY_MONTH) {
      dayOfYear += 1; // On ajoute un jour pour compenser le Leap Day
    }

    const newDate = new Date(this.date);
    newDate.setMonth(0, dayOfYear);
    this.date = newDate;
    return this.getTime();
  }

  setMonth(month: number): number {
    if (month < 1 || month > this.MONTHS_PER_YEAR) {
      throw new Error('Mois invalide pour le calendrier fixe');
    }

    const dayOfYear = (month - 1) * this.DAYS_PER_MONTH + this.getDate();
    const newDate = new Date(this.date);
    newDate.setMonth(0, dayOfYear);
    this.date = newDate;
    return this.getTime();
  }

  setYear(year: number): number {
    if (year < 0) {
      throw new Error('Année invalide pour le calendrier fixe');
    }

    const newDate = new Date(this.date);
    newDate.setFullYear(year);
    this.date = newDate;
    return this.getTime();
  }

  // Méthodes de comparaison
  isBefore(other: IfcDate): boolean {
    return this.date.getTime() < other.date.getTime();
  }

  isAfter(other: IfcDate): boolean {
    return this.date.getTime() > other.date.getTime();
  }

  isEqual(other: IfcDate): boolean {
    return this.date.getTime() === other.date.getTime();
  }

  isSameDate(other: IfcDate): boolean {
    return (
      this.getFullYear() === other.getFullYear() &&
      this.getMonth() === other.getMonth() &&
      this.getDate() === other.getDate()
    );
  }

  // Méthodes statiques
  static now(): number {
    return Date.now();
  }

  static fromGregorian(date: Date): IfcDate {
    return new IfcDate(date);
  }

  // Getter pour accéder à la date native (grégorienne)
  toGregorian(): Date {
    return new Date(this.date);
  }
}
