import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Loader from 'react-loader-spinner';
import { App } from './app';
import WorldChampions from './world-champions/world-champions-container';

Enzyme.configure({ adapter: new Adapter() });

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

describe('App', () => {
    let component;
    const fetchWorldChampions = spy();

    before(() => {
        component = shallow(<App
            worldChampions={champions}
            pending={false}
            fetchWorldChampions={fetchWorldChampions}
        />)
    });

    it('calls fetchWorldChampions on componentDidMount', () => {
        component.instance().componentDidMount();
        expect(fetchWorldChampions.calledWith()).to.equal(true);
    });
});

describe('App', () => {
    describe('isDataAvailable', () => {
        let component;
        const fetchWorldChampions = spy();

        before(() => {
            component = shallow(<App
                worldChampions={champions}
                pending={false}
                fetchWorldChampions={fetchWorldChampions}
            />)
        });

        it('returns true when data is present and pending is false', () => {
            expect(component.instance().isDataAvailable()).to.equal(true);
        });

        it('returns false when data is not present and pending is false', () => {
            component.setProps({ worldChampions: [] });
            expect(component.instance().isDataAvailable()).to.equal(false);
        });

        it('returns false when data is present and pending is true', () => {
            component.setProps({ worldChampions: champions, pending: true });
            expect(component.instance().isDataAvailable()).to.equal(false);
        });
    });
});

describe('App', () => {
    let component;
    const fetchWorldChampions = spy();
    const error = {
        message: 'some-error'
    };

    before(() => {
        component = shallow(<App
            worldChampions={champions}
            pending={false}
            fetchWorldChampions={fetchWorldChampions}
            error={error}
        />)
    });

    it('renders error when error is provided', () => {
        const errorDiv = component.find('.error');
        expect(errorDiv).to.have.length(1);
        expect(errorDiv.text()).to.equal(error.message);
    });
});

describe('App', () => {
    let component;
    const fetchWorldChampions = spy();

    before(() => {
        component = shallow(<App
            worldChampions={[]}
            pending={true}
            fetchWorldChampions={fetchWorldChampions}
        />)
    });

    it('renders error when error is provided', () => {
        const loader = component.find(Loader);
        expect(loader).to.have.length(1);
    });
});

describe('App', () => {
    let component;
    const fetchWorldChampions = spy();

    before(() => {
        component = shallow(<App
            worldChampions={champions}
            pending={false}
            fetchWorldChampions={fetchWorldChampions}
        />)
    });

    it('renders WorldChampions component when data is available', () => {
        const worldChampionsComponent = component.find(WorldChampions);
        expect(worldChampionsComponent).to.have.length(1);
        expect(worldChampionsComponent.props().champions).to.equal(champions);
    });
});
