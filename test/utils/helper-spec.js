import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Headings, DataRow } from '../../src/utils/helper';

describe('utils helper', () => {
    describe('Headings', () => {
        let component;
        const item = {
            someKey1: 'someValue1',
            someKey2: 'someValue2',
            someKey3: 'someValue3',
            someKey4: 'someValue4',
            someKey5: 'someValue5'
        };
        const hidden = ['someKey3'];

        beforeEach(() => {
            component = shallow(<Headings item={item} hidden={hidden}/>)
        });

        it('renders headings correctly based on item and hidden', () => {
            const headingsDiv = component.find('.headings');
            expect(headingsDiv).to.have.length(1);

            const headings = headingsDiv.find('.heading');
            expect(headings).to.have.length(4);

            expect(headings.at(0).text()).to.equal(Object.keys(item)[0].toUpperCase());
            expect(headings.at(1).text()).to.equal(Object.keys(item)[1].toUpperCase());

            // the difference here is due to the hidden array, which is omitting 'someKey3'
            expect(headings.at(2).text()).to.equal(Object.keys(item)[3].toUpperCase());
            expect(headings.at(3).text()).to.equal(Object.keys(item)[4].toUpperCase());
        });
    });

    describe('DataRow', () => {
        let component;
        const item = {
            someKey1: 'someValue1',
            someKey2: 'someValue2',
            someKey3: 'someValue3',
            someKey4: 'someValue4',
            someKey5: 'someValue5'
        };
        const hidden = ['someKey3'];
        const rowClass = 'some-class';

        beforeEach(() => {
            component = shallow(<DataRow item={item} hidden={hidden} rowClass={rowClass} />)
        });

        it('renders data rows correctly based on item, hidden, and rowClass', () => {
            const rows = component.find(`.${rowClass}`);
            expect(rows).to.have.length(4);

            expect(rows.at(0).text()).to.equal(item['someKey1']);
            expect(rows.at(1).text()).to.equal(item['someKey2']);

            // the difference here is due to the hidden array, which is omitting 'someKey3'
            expect(rows.at(2).text()).to.equal(item['someKey4']);
            expect(rows.at(3).text()).to.equal(item['someKey5']);
        });
    });
});
