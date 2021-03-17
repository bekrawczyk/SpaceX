import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../modal/modal'
import './table.css';
//oddzielać importy
export default function Table(props) {
    const {launches} = props;
    const [showModal, setShowModal] = useState(false);
    const [currentLaunch, setCurrentLaunch] = useState({});

    //show/close Modal a nie toggle modal i literówka
     const toogleModal = (item) => {
        if (showModal) {
            setShowModal(false);
            setCurrentLaunch({});
        } else {
            setShowModal(true);
            setCurrentLaunch(item);
        }
    }
                    //style BEM, nazwy komponentów nazywane od nazw komponentów, zwróć uwagę na konwencje nazewnictwa - znaki oddzielające "Table__table", screen ze slacka
                    //modal na górę, przed section, ale poza section
    return (
            <section className="table-container Table__table">
                <h1>Table below presents all SpaceX launches</h1>
                <table className="layout display responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Result</th>
                            <th>Details</th>
                            <th>Launch date</th>
                            <th>Upcomming</th>
                            <th>Flight numbers</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {launches && launches.getAllLaunches.map((launch) => {
                            return (
                            <tr key={launch.id}>
                                <td className="launch-name table-cell">
                                    {launch.name}
                                </td>
                                <td className="launch-success table-cell">
                                    {launch.success ? "success" : "failure"}
                                </td>
                                <td className="organisationname">
                                    {launch.details ? launch.details : "-"}
                                </td>
                                <td className="organisationnumber">
                                    {moment(launch.date_utc).format("dddd, MMMM Do YYYY")}
                                </td>
                                <td className="organisationnumber">
                                    {launch.upcoming ? "Upcomming" : "Recent"}
                                </td>
                                <td className="organisationnumber">
                                    {launch.flight_number}
                                </td>
                                <td className="actions">
                                    <button 
                                        className="edit-item-button" 
                                        onClick={() => toogleModal(launch)} 
                                        title="Edit"
                                        >
                                            Edit {launch.name}
                                    </button>
                                </td>
                            </tr>
                            )
                     
                        })}
                    </tbody>
                </table>
                <Modal show={showModal} onClose={toogleModal} currentLaunch={currentLaunch}/>
            </section>
    )
}