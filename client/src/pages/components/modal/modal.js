import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_LAUNCH, ADD_LAUNCH } from '../../../graphql/launchesQuery';

import './modal.css'

export default function Modal(props) {
const { show, onClose, currentLaunch: {_id, details, flight_number, name, success, upcoming} } = props;

const [ launchName, setLaunchName ] = useState("");
const [ launchFlightNumber, setLaunchFlightNumber ] = useState(0);
const [ launchDetails, setLaunchDetails ] = useState("");
const [ launchSuccess, setLaunchSuccess ] = useState(false);
const [ launchUpcoming, setLaunchUpcoming ] = useState(false); 

useEffect(() => {
    setLaunchName(`${name ? name : ""}`);
    setLaunchFlightNumber(flight_number);
    setLaunchDetails(`${details ? details : ""}`);
    setLaunchSuccess(success);
    setLaunchUpcoming(upcoming);
}, [details, flight_number, name, success, upcoming]);

const toogleSuccessChecked = () => {
    setLaunchSuccess(!launchSuccess);
};
const toogleUpcomingChecked = () => {
    setLaunchUpcoming(!launchUpcoming);
}
const [ editLaunch ] = useMutation(EDIT_LAUNCH);
const [ addLaunch ] = useMutation(ADD_LAUNCH);

const handleSubmit = async (event) => {
    event.preventDefault();
//     await editLaunch({
//             variables: {
//                 _id,
//                 input: {
//                     details: launchDetails, 
//                     flight_number: launchFlightNumber, 
//                     name: launchName, 
//                     success: launchSuccess, 
//                     upcoming: launchUpcoming
//                 }
//             }
//         })

    const addedLaunch = await addLaunch({
        variables: {
            input: {
                date_utc: new Date().toISOString(),
                details: launchDetails, 
                flight_number: launchFlightNumber, 
                name: launchName, 
                success: launchSuccess, 
                upcoming: launchUpcoming
            }
        }
    });
    console.log("addedLaunch: ", addedLaunch);

// //zmodyfikować oryginalne handlesubmit podając swoje argumenty
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
                                    onClick={toogleSuccessChecked}
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
                                    onClick={() => toogleUpcomingChecked()}
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
        </>
    )
}