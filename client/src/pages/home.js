import React from 'react';
import { GET_ALL_LAUNCHES } from '../graphql/launchesQuery';
import { useQuery } from '@apollo/client';

import Table from './components/table/table';

export default function Home() {
    const { loading, error, data } = useQuery(GET_ALL_LAUNCHES);
    console.log(data)
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
//ify do bloku return 

    return(
        <>
            <h1>Launches Page:</h1>
            {
                data 
                ? <Table launches={data}/> 
                : <p>No data to display</p>
            }
        </>
    );
}