import * as utils from './utils'

describe('returnTime', () => {
  it('should return an number', () => {
    expect(utils.returnTime())
      .toBeGreaterThan(0);
    expect(utils.returnTime())
      .toMatch(/\d{1,}/);
  });
});

describe('capitalize', () => {
  it('first letter of the returning string should be capital', () => {
    let text = [{ text: 'aqwesafsdg', up: 'A' }, { text: 'ıaşsdiwe', up: 'I' }, { text: '4sdf4sdvs', up: '4' }, { text: 'ğsifşd', up: 'Ğ' }];
    text.forEach((t) => {
      expect(utils.capitalize(t.text)[0])
        .toBe(t.up);
    });
  });
});

describe('deviceType', () => {
  it('should return the tablet', () => {
    let type = utils.deviceType(1000, 600);
    expect(type)
      .toBe('tablet');
  });
  it('should return the phone', () => {
    let type = utils.deviceType(320, 700);
    expect(type)
      .toBe('phone');
  });
});
