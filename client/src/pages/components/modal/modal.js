import React, { useState, useRef, useEffect } from 'react';

import './modal.css'

export default function Modal(props) {
const { show, onClose, currentLaunch } = props;

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

console.log("variables: ", currentLaunch.success, currentLaunch.upcoming)

const toogleSuccessChecked = (e) => {
    setSuccess(!success);
};

const toogleUpcomingChecked = (e) => {
    setUpcoming(!upcoming);
}

const handleSubmit = (event) => {
    console.log(launchName, flightNumber, details, success, upcoming);

    event.preventDefault();
  }

if(!show) {
    return null;
}

    return (
        <>
            <div className="modal-container">
                <div className="modal-content">
                    <section className="content modal-header">
                        <h1>Modal header</h1>
                    </section>
                    <section className="content modal-body">
                        <form id="launchForm" onSubmit={handleSubmit}>
                            <label htmlFor="launchName">
                                Launch name: 
                            </label>
                            <input 
                                type="text" 
                                name="launchName"
                                value={launchName} 
                                onChange={e => setLaunchName(e.target.value)}
                            />
                            
                            <label htmlFor="flightNumber">
                                Flight number: 
                            </label>
                            <input 
                                type="text" 
                                name="flightNumber" 
                                value={flightNumber}
                                onChange={e => setFlightNumber(e.target.value)}
                            />
                            
                            <label htmlFor="details">
                                Details: 
                            </label>
                            <input 
                                type="text" 
                                name="details" 
                                value={details}
                                onChange={e => setDetails(e.target.value)}
                            />
                            
                            <label htmlFor="seccess">
                                Result of this launch (check if was succed): 
                            </label>
                            <input 
                                type="checkbox" 
                                name="success" 
                                checked={success} 
                                onClick={() => toogleSuccessChecked()}
                                onChange={e => setSuccess(e.target.value)}
                            />
                            
                            <label htmlFor="upcoming">
                                Upcoming launch or latest(check if launch is upcoming): 
                            </label>
                            <input 
                                type="checkbox" 
                                name="upcoming" 
                                checked={upcoming} 
                                onClick={() => toogleUpcomingChecked()}
                                onChange={e => setUpcoming(e.target.value)}
                            />
                            
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