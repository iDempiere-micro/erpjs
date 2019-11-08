export function sum(arrayToSum: Array<number>): number {
  return arrayToSum.sort().reduce((a, b) => a + b, 0);
}

export async function groupBy<T, R, S>(
  arrayToGroupBy: Array<T>,
  keyMapper: (T) => R, keyValueGetter?: (T) => S,
): Promise<Map<S, Array<T>>> {
  if (!keyValueGetter) {
    // @ts-ignore
    keyValueGetter = keyMapper;
  }
  const values = new Map<string, Array<T>>();
  const keys = new Map<string, S>();
  for( const x of  arrayToGroupBy) {
    const objKey = await keyMapper(x);
    const key = toUniqueString(objKey);
    const keyValue = await keyValueGetter(x);
    if (!values.get(key)) { values.set(key, []) }
    values.get(key).push(x);
    if (!keys.get(key)) { keys.set(key, keyValue) }
  }
  const result = new Map<S, Array<T>>();
  for ( const [key,objKey] of keys) {
    result.set(objKey, values.get(key));
  }
  return result;
}

export interface DayOfYear {
  year: number;
  day: number;
}

export function dayOfYear(now: Date): DayOfYear {
  const now1 = new Date(now);
  const year = now1.getFullYear();
  const start = new Date(year, 0, 0);
  // @ts-ignore
  const diff = (now1 - start) + ((start.getTimezoneOffset() - now1.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return { year, day };
}

export function dateFromDayOfYear(_dayOfYear:DayOfYear): Date {
  const date = new Date(_dayOfYear.year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(_dayOfYear.day)); // add the number of days
}

export function onlyDate(now: Date): Date {
  return dateFromDayOfYear(dayOfYear(now));
}

export function dateToISO(date: Date): string {
  if (!date) return '';
  return new Date(date).toISOString().substring(0,10);
}

export function roundNumber(num, scale) {
  num += Number('1e-' + (scale+2) );

  if(!('' + num).includes('e')) {
    return +(Math.round(Number(num + 'e+' + scale))  + 'e-' + scale);
  } else {
    const arr = ('' + num).split('e');
    let sig = '';
    if(+arr[1] + scale > 0) {
      sig = '+';
    }
    return +(Math.round(Number(+arr[0] + 'e' + sig + (+arr[1] + scale))) + 'e-' + scale);
  }
}

const isObject = function(obj) {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

function sortObjectKeys(testObj: any) {
  return Object.keys(testObj).sort().reduce((accumulator, currentValue) => {
    accumulator[currentValue] = testObj[currentValue];
    return accumulator;
  }, {})
}

/**
 * converts obj to an unique (*) string identifier.
 * Is used e.g. in the groupBy
 * @param obj - obj to be converted to a unique string identifier
 *
 * NOTE - toUniqueString is taking number literal strings ('123') and numbers (123)
 * as same!
 */
export function toUniqueString(obj : any): string {
  if (!(obj instanceof Array) && isObject(obj)) {
    const SortedObject: any = sortObjectKeys(obj);
    const jsonstring = JSON.stringify(SortedObject, function(k, v) {
      return v === undefined ? 'undef1' : v;
    });
    // Remove all whitespace
    return jsonstring.replace(/\s+/g, '');
  } else if (obj) {
    return obj.toString();
  } else return 'undef2';
}
