import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { App } from '../../src/components/app';
import WorldChampions from '../../src/components/world-champions/world-champions-container';

Enzyme.configure({ adapter: new Adapter() });

describe('App with error', () => {
    let component;
    const error = {
        message: 'some-error'
    };

    before(() => {
        component = shallow(<App
            error={error}
        />);
    });

    it('renders error when error is provided', () => {
        const errorDiv = component.find('div.error');
        expect(errorDiv).to.have.length(1);
        expect(errorDiv.text()).to.equal(error.message);
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
