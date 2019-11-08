import { Session } from '../session';

let mock = null;

export class DateService {
    static mock(value: Date) {
        mock = value;
    }

    static getNow(): Date {
      const user = Session.get('user');
      return mock === null ? new Date() : new Date(mock);
    }

    static clear() {
        mock = null;
    }

    static setEndOfDay(date: Date) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
    }

    static getEndOfMonth(date: Date) {
        const time = new Date(date);
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        let day = time.getDate();
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                day = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                day = 30;
                break;
            case 2:
                if (DateService.isLeapYear(year)) {
                    day = 29;
                } else {
                    day = 28;
                }
                break;
        }

        return new Date(year, month - 1, day);
    }

    static isLeapYear(year): boolean {
        return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
    }

    static isSameDay(dateToCheck: Date, actualDate: Date): boolean {
        const dateToCheck1 = new Date(dateToCheck);
        const actualDate1 = new Date(actualDate);
        DateService.setEndOfDay(dateToCheck1);
        DateService.setEndOfDay(actualDate1);
        return (dateToCheck1.getDate() === actualDate1.getDate()
            && dateToCheck1.getMonth() === actualDate1.getMonth()
            && dateToCheck1.getFullYear() === actualDate1.getFullYear());
    }
}
