import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_LAUNCH } from '../../../graphql/launchesQuery';

import './modal.css'

export default function Modal(props) {
const { show, onClose, currentLaunch } = props;

const [ editLaunch ] = useMutation(EDIT_LAUNCH);

const [ launchName, setLaunchName ] = useState("");
const [ flightNumber, setFlightNumber ] = useState("");
const [ details, setDetails ] = useState("");
const [ success, setSuccess ] = useState(false);
const [ upcoming, setUpcoming ] = useState(false); 

useEffect(() => {
    setLaunchName(`${currentLaunch.name ? currentLaunch.name : ""}`);
    setFlightNumber(`${currentLaunch.flight_number ? currentLaunch.flight_number : 0}`);
    setDetails(`${currentLaunch.details ? currentLaunch.details : ""}`);
    setSuccess(currentLaunch.success);
    setUpcoming(currentLaunch.upcoming);
}, [currentLaunch]);

const toogleSuccessChecked = () => {
    setSuccess(!success);
};

const toogleUpcomingChecked = () => {
    setUpcoming(!upcoming);
}

const handleSubmit = (event) => {
    editLaunch({
        variables: {
            // id: currentLaunch.id,
            details: currentLaunch.details,
            flight_number: currentLaunch.flightNumber,
            name: currentLaunch.name,
            success: currentLaunch.success,
            upcoming: currentLaunch.upcoming,
        }
    })
    console.log("launch name: ", launchName, "flight number: ", flightNumber, "details: ", details, "success: ", success, "upcoming: ", upcoming);
//zmodyfikować oryginalne handlesubmit podając swoje argumenty
    event.preventDefault();
  }

  //funkcja onSubmit - form lub button, jak button to mam kontrolę nad tym co się dzieje, formularz ma swoje domyślne zachowanie, 
if(!show) {
    return null;
}

    return (
        <>
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
                                    value={flightNumber}
                                    onChange={(e) => setFlightNumber(e.target.value)}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="details">
                                    Details: 
                                </label>
                                <input 
                                    type="text" 
                                    name="details" 
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="success">
                                    Result of this launch (check if was succed): 
                                </label>
                                <input 
                                    type="checkbox" 
                                    name="success" 
                                    checked={success} 
                                    onClick={() => toogleSuccessChecked()}
                                    onChange={(e) => setSuccess(e.target.value)}
                                />                                
                            </section>

                            <section>
                                <label htmlFor="upcoming">
                                    Upcoming launch or latest(check if launch is upcoming): 
                                </label>
                                <input 
                                    type="checkbox" 
                                    name="upcoming" 
                                    checked={upcoming} 
                                    onClick={() => toogleUpcomingChecked()}
                                    onChange={(e) => setUpcoming(e.target.value)}
                                />                                
                            </section>

                            <section className="content modal-footer">
                                <button className="button close-button" onClick={onClose}>Close window</button>
                                <button className="button save-button" type="submit">Save changes</button>
                            </section>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}