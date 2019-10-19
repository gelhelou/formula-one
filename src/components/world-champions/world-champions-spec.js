import React from 'react';
import 'jsdom-global/register';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import Loader from 'react-loader-spinner';
import { SeasonWinnersView } from '../season-winners/season-winners';
import WorldChampions, { WorldChampionsView } from './world-champions';
import { Headings } from '../../utils/helper';

const champions = [
    {
        year: 'some-year-1',
        driver: 'some-champion-1',
        age: 'some-age-1',
        nationality: 'some-nationality-1',
        points: 'some-points-1',
        driverId: 'some-driver-id-1'
    },
    {
        year: 'some-year-2',
        driver: 'some-champion-2',
        age: 'some-age-2',
        nationality: 'some-nationality-2',
        points: 'some-points-2',
        driverId: 'some-driver-id-2'
    },
    {
        year: 'some-year-3',
        driver: 'some-champion-3',
        age: 'some-age-3',
        nationality: 'some-nationality-3',
        points: 'some-points-3',
        driverId: 'some-driver-id-3'
    },
];

const winners = [
    {
        driver: 'some-driver-name',
        circuit: 'some-circuit-name',
        driverId: 'some-champion-id'
    }
];

describe('WorldChampionsView without season winners', () => {
    let component;
    const onRowClicked = spy();

    beforeEach(() => {
        component = mount(<WorldChampionsView
            champions={champions}
            onRowClicked={onRowClicked}
        />)
    });

    it('renders with correct title', () => {
        const title = component.find('#world-champions-title').text();
        expect(title).to.equal('F1 World Champions');
    });

    it('renders with correct headings', () => {
        const headings = component.find(Headings).find('.headings .heading');
        expect(headings).to.have.length(5);
        expect(headings.at(0).text()).to.equal(Object.keys(champions[0])[0].toUpperCase());
        expect(headings.at(1).text()).to.equal(Object.keys(champions[0])[1].toUpperCase());
        expect(headings.at(2).text()).to.equal(Object.keys(champions[0])[2].toUpperCase());
        expect(headings.at(3).text()).to.equal(Object.keys(champions[0])[3].toUpperCase());
        expect(headings.at(4).text()).to.equal(Object.keys(champions[0])[4].toUpperCase());
    });

    it('renders with correct champions data', () => {
        const championsWrapper = component.find('.champions');
        expect(championsWrapper).to.have.length(1);

        const championRows = championsWrapper.find('.champion-row');
        expect(championRows).to.have.length(3);

        const champion1 = championRows.at(0);
        const champion1Data = champion1.find('.champion-data');
        expect(champion1Data.at(0).text()).to.equal(champions[0].year);
        expect(champion1Data.at(1).text()).to.equal(champions[0].driver);
        expect(champion1Data.at(2).text()).to.equal(champions[0].age);
        expect(champion1Data.at(3).text()).to.equal(champions[0].nationality);
        expect(champion1Data.at(4).text()).to.equal(champions[0].points);

        const champion2 = championRows.at(1);
        const champion2Data = champion2.find('.champion-data');
        expect(champion2Data.at(0).text()).to.equal(champions[1].year);
        expect(champion2Data.at(1).text()).to.equal(champions[1].driver);
        expect(champion2Data.at(2).text()).to.equal(champions[1].age);
        expect(champion2Data.at(3).text()).to.equal(champions[1].nationality);
        expect(champion2Data.at(4).text()).to.equal(champions[1].points);

        const champion3 = championRows.at(2);
        const champion3Data = champion3.find('.champion-data');
        expect(champion3Data.at(0).text()).to.equal(champions[2].year);
        expect(champion3Data.at(1).text()).to.equal(champions[2].driver);
        expect(champion3Data.at(2).text()).to.equal(champions[2].age);
        expect(champion3Data.at(3).text()).to.equal(champions[2].nationality);
        expect(champion3Data.at(4).text()).to.equal(champions[2].points);
    });

    it('calls onRowClicked with correct arguments when champion row is clicked', () => {
        const championsWrapper = component.find('.champions');
        const championRows = championsWrapper.find('.champion-row');

        const champion1 = championRows.at(0);
        champion1.props().onClick();
        expect(onRowClicked.calledWith(champions[0], 0)).to.equal(true);
    });

    it('does not render SeasonWinnersView', () => {
        const winnersView = component.find(SeasonWinnersView);
        expect(winnersView).to.have.length(0);
    });
});

describe('WorldChampionsView with season winners', () => {
    let component;

    beforeEach(() => {
        component = shallow(<WorldChampionsView
            champions={champions}
            seasonWinners={winners}
            showSeasonWinnersIndex={0}
        />)
    });

    it('renders SeasonWinnersView with correct props', () => {
        const winnersView = component.find(SeasonWinnersView);
        expect(winnersView).to.have.length(1);

        expect(winnersView.props().loading).to.equal(false);
        expect(winnersView.props().winners).to.deep.equal(winners);
        expect(winnersView.props().championId).to.equal(champions[0].driverId);
    });
});

describe('WorldChampions', () => {
    let component;
    let fetchSeasonWinners;
    let fetchWorldChampions;

    beforeEach(() => {
        fetchSeasonWinners = spy();
        fetchWorldChampions = spy();
        component = shallow(<WorldChampions
            champions={champions}
            seasonWinners={winners}
            seasonWinnersPending={false}
            fetchSeasonWinners={fetchSeasonWinners}
            fetchWorldChampions={fetchWorldChampions}
        />)
    });

    it('has correct initial state', () => {
        expect(component.state().showSeasonWinnersIndex).to.equal(null);
    });

    it('calls fetchWorldChampions on componentDidMount', () => {
        component.instance().componentDidMount();
        expect(fetchWorldChampions.calledWith()).to.equal(true);
    });

    it('has onRowClicked that changes the state and fetches data', () => {
        component.instance().onRowClicked(champions[1], 1);
        expect(component.state().showSeasonWinnersIndex).to.equal(1);
        expect(fetchSeasonWinners.calledWith(champions[1].year)).to.equal(true);
    });

    it('renders WorldChampionsView with correct props', () => {
        const championsView = component.find(WorldChampionsView);
        expect(championsView.props().champions).to.deep.equal(champions);
        expect(championsView.props().seasonWinners).to.deep.equal(winners);
        expect(championsView.props().seasonWinnersLoading).to.equal(false);
        expect(championsView.props().showSeasonWinnersIndex).to.equal(null);
        expect(championsView.props().onRowClicked).to.equal(component.instance().onRowClicked);
    });

    it('renders Loader', () => {
        component.setProps({ championsPending: true });
        component.update();
        const loader = component.find('.champions-loader').find(Loader);
        expect(loader).to.have.length(1);
    });
});
