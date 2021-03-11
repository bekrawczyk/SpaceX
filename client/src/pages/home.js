import React from 'react';
import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';
import { useQuery } from '@apollo/client';

export default function Home() {
    const { loading, error, data } = useQuery(GET_ALL_LAUNCHES);

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
            <h1>All Launches:</h1>
            <ul>
                {data && data.getAllLaunches.map( item => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </>
    );
}