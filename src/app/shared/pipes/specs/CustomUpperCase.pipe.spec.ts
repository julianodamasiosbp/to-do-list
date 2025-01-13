import { CustomUpperCasePipe } from '../CustomUpperCase.pipe';

describe('CustomUpperCasePipe', () => {
  const customUpperCase = new CustomUpperCasePipe();

  it('should return value on UpperCase', () => {
    const textTranformed = customUpperCase.transform('Angular');

    expect(textTranformed).toEqual('ANGULAR');
  });

  it('should UpperCase string to continue as UpperCase', () => {
    const textTranformed = customUpperCase.transform('ANGULAR');

    expect(textTranformed).toEqual('ANGULAR');
  });
});
