import React from 'react';
import { useQuery } from '@apollo/client';
import client from '../apollo/apolloClient';
import pairModel from '../apollo/pairModel';
import './graphqlClient.css';



function PairList() {
    const { loading, error, data } = useQuery(pairModel, { client });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="neumorphic-container">
            {data.pairs.map((pair: any) => (
                <div key={pair.id} className="neumorphic-card">
                    <div className='card-content'>
                        <p>ID: {pair.id}</p>
                        <p >Contract: {pair.contract}</p>
                        <p>Reserve 0: {pair.reserve0}</p>
                        <p>Reserve 1: {pair.reserve1}</p>
                        <p>Price: {pair.price}</p>
                        <p>Timestamp: {pair.timestamp}</p>
                        <p>Synced: {pair.synced}</p>
                        <p>Transaction: {pair.tx}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PairList;
