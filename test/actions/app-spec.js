import React from 'react';
import { expect } from 'chai';
import {
    appRefresh,
    APP_REFRESH
} from "../../src/actions/app";

describe('App Actions', () => {
    it('should create an action for app refresh', () => {
        const expectedAction = {
            type: APP_REFRESH,
        };
        expect(appRefresh()).to.deep.equal(expectedAction);
    });
});
