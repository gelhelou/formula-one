import { expect } from 'chai';
import { getAge, isObjectEmpty } from './formatter';

describe('utils', () => {
    describe('getAge', () => {
        it('returns the correct age based on date of birth', () => {
            expect(getAge('1989-02-06')).to.equal(30);
            expect(getAge('1970-01-01')).to.equal(49);
        });
    });

    describe('isObjectEmpty', () => {
        it('returns true if object is empty', () => {
            expect(isObjectEmpty({})).to.equal(true);
        });

        it('returns false if object is not empty', () => {
            expect(isObjectEmpty({ someKey: 'someValue' })).to.equal(false);
        });
    });
});
