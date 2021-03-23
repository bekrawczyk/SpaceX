import React from 'react';
import { act } from '@testing-library/react';

import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import Home from './home';
import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';

Enzyme.configure({ adapter: new Adapter() });


describe('Home', () => {
    let wrapper;
    const mocks = [{
        request: {
            query: GET_ALL_LAUNCHES,
        },
        result: {
            data: {
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
    }]; 

    beforeEach(() => {
        wrapper = mount(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home/>
            </MockedProvider>
        );
    });
    
    it('should render the home page correctly', () => {
        console.log(wrapper.debug());
    })
})