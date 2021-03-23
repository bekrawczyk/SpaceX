import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import Table from './table';
import { GET_ALL_LAUNCHES } from '../../../graphql/launchesQuery';
import mount from 'enzyme/build/mount';

Enzyme.configure({ adapter: new Adapter() });
const mocks = [{
    request: {
        query: GET_ALL_LAUNCHES,
    },
    result: {
        data: {
            launches: [
                {
                    date_utc: "2021-03-18T14:26:37.147Z",
                    details: "details",
                    flight_number: 23,
                    _id: "6053631ddf898a4a6164bdba",
                    name: "Launch name",
                    success: true,
                    upcoming: false,
                }
            ]
        }
    }
}]; 

const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
        <Table/>
    </MockedProvider>
);

describe('Table', () => {


    it('should render the table correctly', () => {
        const title = wrapper.find('h1');
        expect(title.text()).toBe('Table below presents all SpaceX launches');
    });

    it('should display modal after click on "Add new launch" button', () => {
        const addNewButton = wrapper.find('.add-item-button');
        addNewButton.simulate('click');
        const modalComponent = wrapper.find('.modal-container')
        expect(modalComponent.length).toBe(1);
    });
})