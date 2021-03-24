import React, { useState } from 'react';
import {useMutation} from '@apollo/client';

import {ADD_LAUNCH, EDIT_LAUNCH, GET_ALL_LAUNCHES} from '../../../graphql/launchesQuery';
import './modal.css'

export default function Modal(props) {

const {
    isModalEdit,
    onClose, 
    currentLaunch: {
        _id, 
        details, 
        flight_number, 
        name, 
        success, 
        upcoming
    },
} = props;

const [launchName, setLaunchName] = useState(name);
const [launchFlightNumber, setLaunchFlightNumber] = useState(flight_number);
const [launchDetails, setLaunchDetails] = useState(details);
const [launchSuccess, setLaunchSuccess] = useState(success);
const [launchUpcoming, setLaunchUpcoming] = useState(upcoming);
const [addLaunch] = useMutation(ADD_LAUNCH);
const [editLaunch] = useMutation(EDIT_LAUNCH);

const toggleSuccessChecked = () => {
    setLaunchSuccess(!launchSuccess);
};
const toggleUpcomingChecked = () => {
    setLaunchUpcoming(!launchUpcoming);
}

const handleSubmit = async (e) => {
    //zmodyfikować oryginalne handlesubmit podając swoje argumenty
    //funkcja onSubmit - form lub button, jak button to mam kontrolę nad tym co się dzieje, formularz ma swoje domyślne zachowanie, 

    e.preventDefault();
    if (isModalEdit) {
        await editLaunch({
            variables: {
                _id,
                input: {
                    details: launchDetails, 
                    flight_number: launchFlightNumber, 
                    name: launchName, 
                    success: launchSuccess, 
                    upcoming: launchUpcoming
                }
            }
        })
    } else {
        await addLaunch({
            variables: {
                input: {
                    date_utc: new Date().toISOString(),
                    details: launchDetails, 
                    flight_number: launchFlightNumber, 
                    name: launchName, 
                    success: launchSuccess, 
                    upcoming: launchUpcoming
                }
            },
            optimisticResponse: {
                __typename: "Mutation",
                addLaunch: {
                  __typename: "Launch",
                  content: {
                    date_utc: new Date().toISOString(),
                    details: launchDetails, 
                    flight_number: launchFlightNumber, 
                    name: launchName, 
                    success: launchSuccess, 
                    upcoming: launchUpcoming
                }}
            },
            refetchQueries: [{query: GET_ALL_LAUNCHES}],        
        });
    };
    onClose();
  }

    return (
            <div className="modal-container">
                <div className="modal-content">
                    <h1>Modal header</h1>
                    <section className="content modal-body">
                        <form id="launchForm" onSubmit={handleSubmit}>
                            
                            <section>
                                <label htmlFor="launchName">
                                    Launch name: 
                                </label>
                                <input 
                                    type="text" 
                                    name="launchName"
                                    value={launchName} 
                                    onChange={(e) => setLaunchName(e.target.value)}
                                />
                            </section>
                            
                            <section>
                                <label htmlFor="flightNumber">
                                    Flight number: 
                                </label>
                                <input 
                                    type="text" 
                                    name="flightNumber" 
                                    value={launchFlightNumber}
                                    onChange={(e) => setLaunchFlightNumber(parseInt(e.target.value))}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="details">
                                    Details: 
                                </label>
                                <input 
                                    type="text" 
                                    name="details" 
                                    value={launchDetails}
                                    onChange={(e) => setLaunchDetails(e.target.value)}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="success">
                                    Result of this launch (check if was succed): 
                                </label>
                                <input 
                                    className="success-checkbox"
                                    type="checkbox" 
                                    name="success" 
                                    checked={launchSuccess}
                                    onClick={toggleSuccessChecked}
                                    onChange={(e) => setLaunchSuccess(e.target.checked)}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="upcoming">
                                    Upcoming launch or latest(check if launch is upcoming): 
                                </label>
                                <input 
                                    type="checkbox" 
                                    name="upcoming" 
                                    checked={launchUpcoming} 
                                    onClick={toggleUpcomingChecked}
                                    onChange={(e) => setLaunchUpcoming(e.target.checked)}
                                />                                
                            </section> 

                            <section className="content modal-footer">
                                <button className="button close-button" onClick={onClose}>Close window</button>
                                <button className="button save-button" type="submit" form="launchForm">Submit</button>
                            </section>
                        </form>
                    </section>
                </div>
            </div>
    )
}
