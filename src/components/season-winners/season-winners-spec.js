import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from 'react-loader-spinner';
import { SeasonWinnersView } from './season-winners';

describe('SeasonWinnersView with no data', () => {
    let component;
    const loading = true;

    beforeEach(() => {
        component = shallow(<SeasonWinnersView loading={loading} />)
    });

    it('has a loader when loading is true', () => {
        const loader = component.find(Loader);
        expect(loader).to.have.length(1);
    });

    it('does not have a winners table when loading is true', () => {
        const table = component.find('.season-winners-wrapper');
        expect(table).to.have.length(0);
    });
});

describe('SeasonWinnersView with data', () => {
    let component;
    const championId = 'some-champion-id';
    const winners = [
        {
            driver: 'some-driver-name',
            circuit: 'some-circuit-name',
            driverId: 'some-champion-id'
        },
        {
            driver: 'another-driver-name',
            circuit: 'another-circuit-name',
            driverId: 'another-driver-id'
        }
    ];
    const loading = false;

    beforeEach(() => {
        component = shallow(<SeasonWinnersView
            loading={loading}
            championId={championId}
            winners={winners}
        />)
    });

    it('renders with correct headings', () => {
        const headings = component.find('.headings .heading');
        expect(headings).to.have.length(2);
        expect(headings.at(0).text()).to.equal('DRIVER');
        expect(headings.at(1).text()).to.equal('CIRCUIT');
    });

    it('renders with correct winners data', () => {
        const winnersWrapper = component.find('.winners');
        expect(winnersWrapper).to.have.length(1);

        const winnerRows = winnersWrapper.find('.winner-row');
        expect(winnerRows).to.have.length(2);

        const winner1 = winnerRows.at(0);
        expect(winner1.hasClass('champion-highlight')).to.equal(true);
        const winner1Data = winner1.find('.winner-data');
        expect(winner1Data.at(0).text()).to.equal(winners[0].driver);
        expect(winner1Data.at(1).text()).to.equal(winners[0].circuit);

        const winner2 = winnerRows.at(1);
        expect(winner2.hasClass('champion-highlight')).to.equal(false);
        const winner2Data = winner2.find('.winner-data');
        expect(winner2Data.at(0).text()).to.equal(winners[1].driver);
        expect(winner2Data.at(1).text()).to.equal(winners[1].circuit);
    });
});
