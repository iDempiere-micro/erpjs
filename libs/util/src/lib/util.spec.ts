import { dateFromDayOfYear, dayOfYear, groupBy, roundNumber, toUniqueString } from '@erpjs/util';

describe('util', () => {
  describe('dayOfYear', () => {
    it('should work on 2019-10-09', () => {
      const now = new Date(2019,10-1,9);
      const nowOfYear = dayOfYear(now);
      expect(nowOfYear.year).toBe(2019);
      expect(nowOfYear.day).toBe(282);
    });
    it('should work on 2019-01-03', () => {
      const now = new Date(2019,1-1,3);
      const nowOfYear = dayOfYear(now);
      expect(nowOfYear.year).toBe(2019);
      expect(nowOfYear.day).toBe(3);
    });
    it('should work on 2019-02-01', () => {
      const now = new Date(2019,2-1,1);
      const nowOfYear = dayOfYear(now);
      expect(nowOfYear.year).toBe(2019);
      expect(nowOfYear.day).toBe(32);
    });
    it('should work on 2016-06-01', () => {
      const now = new Date(2016,6-1,1);
      const nowOfYear = dayOfYear(now);
      expect(nowOfYear.year).toBe(2016);
      expect(nowOfYear.day).toBe(153);
    });
  });
  describe('date from dayOfYear', () => {
    function sameDay(now1, now2) {
      expect(now2.getFullYear()).toBe(now1.getFullYear());
      expect(now2.getMonth()).toBe(now1.getMonth());
      expect(now2.getDate()).toBe(now2.getDate());
    }

    it('should work on 2019 282', () => {
      const now1 = new Date(2019,10-1,9);
      const now2 = dateFromDayOfYear({year: 2019, day: 282});
      sameDay(now1, now2);
    });
    it('should work on 2019 3', () => {
      const now1 = new Date(2019,1-1,3);
      const now2 = dateFromDayOfYear({year: 2019, day: 3});
      sameDay(now1, now2);
    });
    it('should work on 2019 32', () => {
      const now1 = new Date(2019,2-1,1);
      const now2 = dateFromDayOfYear({year: 2019, day: 32});
      sameDay(now1, now2);
    });
    it('should work on 2016-06-01', () => {
      const now1 = new Date(2016,6-1,1);
      const now2 = dateFromDayOfYear({year: 2016, day: 153});
      sameDay(now1, now2);
    });
  });

  describe('ObjectToUniqueStringNoWhiteSpace', () => {
    it('should work on a number', () => {
      const res = toUniqueString(1);
      expect(res).toBe('1');
    });
    it('should work on a number array', () => {
      const res = toUniqueString([1, 2]);
      expect(res).toBe('1,2');
    });
    it('should work on a string', () => {
      const res = toUniqueString('abc');
      expect(res).toBe('abc');
    });
    it('should work on a string array', () => {
      const res = toUniqueString(['1', 'xyz']);
      expect(res).toBe('1,xyz');
    });
    it('should work on a small obj', () => {
      const res = toUniqueString({a: 1});
      expect(res).toBe('{"a":1}');
    });
    it('should work on a bigger obj', () => {
      const res = toUniqueString({a: 1, b: [8,9]});
      expect(res).toBe('{"a":1,"b":[8,9]}');
    });
    it('should work on a complex obj', () => {
      const res = toUniqueString({a: 1, b: [{o: 1},{o:2}], c: { x: 'y' }});
      expect(res).toBe('{"a":1,"b":[{"o":1},{"o":2}],"c":{"x":"y"}}');
    });
  });

  describe('groupBy', () => {
    it('should work on a simple array', async  () => {
      const array = ['one', 'two', 'three'];
      const res = await groupBy(array, x => x.length);
      expect(res.size).toBe(2);
      expect(res.get(3).length).toBe(2);
      expect(res.get(5).length).toBe(1);
    });
    it('should work on a more complex array', async  () => {
      const array = [{a: {x:1}}, {a: {x:1}}];
      const res = await groupBy(array, x => x.a);
      expect(res.size).toBe(1);
      const key = res.keys().next().value as any;
      expect(key.x).toBe(1);
      expect(res.get(key).length).toBe(2);
    });
    it('should work on object too', async () => {
      const data = { id: 0 };
      const group = [ { a: 1, data: data }, { a: 2, data: data }, { a: 3, data: null }, { a: 4, data: null } ];
      const test = await groupBy(group, x => x.data);
      expect(test.size).toEqual(2);
      expect(test.get(data).length).toEqual(2);
    });
    it('should work on a more complex array with values', async  () => {
      const array = [{a: {x:1}, b: {c: 'c'}}, {a: {x:1}, b: {c: 'd'}}];
      const res = await groupBy(array, x => x.a, x => x.b);
      expect(res.size).toBe(1);
      const key = res.keys().next().value;
      expect(key.c).toBe('c');
      expect(res.get(key).length).toBe(2);
    });
  });

  describe('round number', () => {
    it('should work on a simple number', async () => {
      const result = roundNumber(1000,2);
      expect(result).toBe(1000);
    });
    it('should work on 1.005', async () => {
      const result = roundNumber(1.005,2);
      expect(result).toBe(1.01);
    });
    it('should work on 1.7777777', async () => {
      const result = roundNumber(1.7777777,2);
      expect(result).toBe(1.78);
    });
    it('should work on 9.1', async () => {
      const result = roundNumber(9.1,2);
      expect(result).toBe(9.1);
    });
    it('should work on 875 * 19.42 * 0.21', async () => {
      const result = roundNumber(875 * 19.42 * 0.21,2);
      expect(result).toBe(3568.43);
    });
  });

});
