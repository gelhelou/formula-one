import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { App } from '../../src/components/app';
import WorldChampions from '../../src/components/world-champions/world-champions-container';

Enzyme.configure({ adapter: new Adapter() });

describe('App with error', () => {
    let component;
    let appRefresh;
    const error = {
        message: 'some-error'
    };

    before(() => {
        appRefresh = spy();
        component = shallow(<App
            appRefresh={appRefresh}
            error={error}
        />);
    });

    it('renders error when error is provided', () => {
        const errorDiv = component.find('div.error');
        expect(errorDiv).to.have.length(1);
        expect(errorDiv.text()).to.equal(`${error.message} Refresh`);
    });

    it('calls appRefresh when refresh-button is clicked', () => {
        const refreshButton = component.find('span.refresh-button');
        refreshButton.props().onClick();
        expect(appRefresh.calledWith()).to.equal(true);
    });
});

describe('App without error', () => {
    let component;
    const error = null;

    before(() => {
        component = shallow(<App />)
    });

    it('renders WorldChampions component', () => {
        const championsComp = component.find(WorldChampions);
        expect(championsComp).to.have.length(1);
    });
});
