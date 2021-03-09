import React from 'react';
import { GET_LAUNCHES } from '../graphql/launchesQuery';
import { useQuery } from '@apollo/client';

export default function Home() {
    const { loading, error, data } = useQuery(GET_LAUNCHES);
    if (loading) {
        return (
            <p>Loading...</p>
        );
    }

    if (error) {
        return (
            <p>Error :(</p>
        );
    }

    return(
        <>
            <h1>Upcomming Launches</h1>
            <ul>
                {data && data.launches.map( item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </>
    );
}