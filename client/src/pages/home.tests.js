import React from 'react';
import { act, cleanup } from '@testing-library/react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import Home from './home';
import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';

Enzyme.configure({ adapter: new Adapter() });

describe('Home', () => {
    beforeEach(() => cleanup());

    it('should render the home page with data', () => {
        const mocks = [
            {
                request: 
                    {
                        query: GET_ALL_LAUNCHES,
                    },
                result: 
                    {
                        data: 
                            {
                                getAllLaunches: [
                                    {
                                        date_utc: "2021-03-22T08:37:30.571Z",
                                        details: "delele",
                                        flight_number: 4,
                                        name: "New Launch2",
                                        success: true,
                                        upcoming: false,
                                        __typename: "Launch",
                                        _id: "6058574ad37c18995f1f1715",
                                    }
                                ]
                            }
                    }
            },
        ]; 
        const wrapper = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        act(() => {
            const table = wrapper.find('.table');
            expect(table).toBeTruthy();
        })
    });

    it('should render error message', () => {
        const errorMock = [
            {
                request: 
                    {
                        query: GET_ALL_LAUNCHES,
                    },
                error: new Error('')
            },
        ]; 
        const wrapper = mount(
            <MockedProvider mocks={errorMock} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        act(() => {
            const errorMessage = wrapper.find('p');
            expect(errorMessage.text()).toBe('Error :(');
        })
    })
})