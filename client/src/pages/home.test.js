import React from 'react';
import { act, cleanup } from '@testing-library/react';

import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import Home from './home';
import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';

Enzyme.configure({ adapter: new Adapter() });

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

const errorMock = [
    {
        request: 
            {
                query: GET_ALL_LAUNCHES,
            },
        error: new Error('')
    },
];

describe('Home', () => {

    it('should render the home page with data', async () => {
        
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <Home/>
            </MockedProvider>
        );

        await act( async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            const table = wrapper.find('.Table__table');
            console.log("table: ", table.debug())
            const launchName = wrapper.find('.launch-name')
            expect(table.length).toBe(1);
            expect(launchName.length).toBe(1);
        })
    });

    it('should render error message', async () => {
        const wrapper = mount(
            <MockedProvider mocks={errorMock}>
                <Home/>
            </MockedProvider>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            const errorMessage = wrapper.find('p');
            expect(errorMessage.text()).toBe('Error :(');
        })
    })
})