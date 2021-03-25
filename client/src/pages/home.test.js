import React from 'react';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';
import Home from './home';

const mockedLaunch = [
    {
        request: {
            query: GET_ALL_LAUNCHES,
        },
        result: {
            data: {
                getAllLaunches: [
                    {
                        date_utc: "2021-06-22T08:37:30.571Z",
                        details: "Some details",
                        flight_number: 4,
                        name: "New Launch2",
                        success: true,
                        upcoming: false,
                        _id: "6058574ad37c18995f1f1715",
                    },
                ]
            },
        },
    },
]; 

const emptyMock = [
    {
        request: {
            query: GET_ALL_LAUNCHES,
        },
        result: {
            data: []
        }
    }
];

const errorMock = [
    {
        request: {
            query: GET_ALL_LAUNCHES,
        },
        error: new Error(''),
    }
];

describe('Home', () => {
    it('render "Loading..." while waiting for data from server', () => {
        const { getByText } = render(
            <MockedProvider mocks={mockedLaunch} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        expect(getByText("Loading...")).toBeInTheDocument();
    });

    it('render table with data', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mockedLaunch} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(getByText("Table below presents all SpaceX launches")).toBeInTheDocument();
    });

    it('returns "There is no data" paragraph when there is no data to display', async () => {
        const { getByText } = render(
            <MockedProvider mocks={emptyMock} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(getByText("No data to display")).toBeInTheDocument();
    });

    it('returns "Error" paragraph when any error occurs', async () => {
        const { getByText } = render(
            <MockedProvider mocks={errorMock} addTypename={false}>
                <Home/>
            </MockedProvider>
        );

        await act(() => {
            return new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(getByText("Error :(")).toBeInTheDocument();
    });
})