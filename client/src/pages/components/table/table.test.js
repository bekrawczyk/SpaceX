import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import Table from './table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
    let wrapper; 
    beforeEach(() => {
        const launches = {
            getAllLaunches: [
                {
                    date_utc: "2021-03-18T14:26:37.147Z",
                    details: "details",
                    flight_number: 23,
                    _id: "6053631ddf898a4a6164bdba",
                    name: "Launch name",
                    success: true,
                    upcoming: false,
                },
            ]
        };
        wrapper = mount(
            <MockedProvider >
                <Table launches ={launches}/>
            </MockedProvider>
        );
    })

    it('should render the table with data', () => {
        const title = wrapper.find('h1');
        const launchName = wrapper.find('.launch-name');
        expect(title.text()).toBe('Table below presents all SpaceX launches');
        expect(launchName.text()).toBe('Launch name');
    });

    it('should not display modal befor click on add or edit button', () => {
        const modalComponent = wrapper.find('.modal-container')
        expect(modalComponent.length).toBe(0);
    });

    it('should display modal after click on "Edit launch" button', () => {
        const editItemButton = wrapper.find('.edit-item-button');
        editItemButton.simulate('click');
        const modalComponent = wrapper.find('.modal-container')
        expect(modalComponent.length).toBe(1);
    });

    it('should display modal after click on "Add new launch" button', () => {
        const addNewButton = wrapper.find('.add-item-button');
        addNewButton.simulate('click');
        const modalComponent = wrapper.find('.modal-container')
        expect(modalComponent.length).toBe(1);
    });
})