import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './modal.css'

export default function Modal(props) {
const { show, onClose, currentLaunch } = props;

// const successCheckBox = useRef();
// const upcomingCheckBox = useRef();

const [successChecked, setSuccessChecked] = useState();
const [upcomingChecked, setUpcomingChecked] = useState();

useEffect(() => {
    setSuccessChecked(currentLaunch.success)
}, [currentLaunch.success]);
useEffect(() => {
    setUpcomingChecked(currentLaunch.upcoming)
}, [currentLaunch]);

console.log("variables: ", currentLaunch.success, currentLaunch.upcoming)
console.log("state success:", successChecked)
console.log("state upcoming:", upcomingChecked)

const toogleSuccessChecked = (e) => {
    setSuccessChecked(!successChecked);
};

const toogleUpcomingChecked = (e) => {
    setUpcomingChecked(!upcomingChecked);
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
                        <div>
                            <Formik
                            initialValues={{ 
                                launchName: `${currentLaunch.name ? currentLaunch.name : ""}`, 
                                flightNumber: `${currentLaunch.flight_number ? currentLaunch.flight_number : 0}`,
                                details: `${currentLaunch.details ? currentLaunch.details : ""}`,
                                success: successChecked,
                                upcoming: upcomingChecked,
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.flightNumber) {
                                errors.flightNumber = 'Required';
                                } else if (
                                !/^[0-9]{1,}$/i.test(values.flightNumber)
                                ) {
                                errors.flightNumber = 'Invalid value - field must be a number';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                            }}
                            >
                            {({ isSubmitting, values}) => (
                                <Form>
                                    <section>
                                        <label htmlFor="launchName">Launch name: </label>
                                        <Field type="text" name="launchName" />
                                        <ErrorMessage name="launchName" component="div" />
                                    </section>
                                    <section>
                                        <label htmlFor="flightNumber">Flight number: </label>
                                        <Field type="text" name="flightNumber" />
                                        <ErrorMessage name="flightNumber" component="div" />
                                    </section>
                                    <section>
                                        <label htmlFor="details">Details: </label>
                                        <Field type="textarea" name="details" />
                                        <ErrorMessage name="details" component="div" />
                                    </section>
                                    <section>
                                        <label htmlFor="seccess">Result of this launch: </label>
                                        <label>
                                            <Field type="checkbox" name="success" checked={successChecked} onChange={() => toogleSuccessChecked()}/>
                                        </label>   
                                        <label htmlFor="seccess">Check if success </label>
                                        <ErrorMessage name="success" component="div" />
                                    </section>
                                    <section>
                                        <label htmlFor="upcoming">Upcoming launch or latest: </label>
                                        <label>
                                            <Field type="checkbox" name="upcoming" checked={upcomingChecked} onClick={() => toogleUpcomingChecked()}/>
                                        </label>   
                                        <label htmlFor="upcoming">Check if upcoming </label>
                                        <ErrorMessage name="upcoming" component="div" />
                                    </section>
                                    <section className="content modal-footer">
                                        <button className="button close-button" onClick={onClose}>Close window</button>
                                        <button className="button save-button" type="submit" disabled={isSubmitting}>Save changes</button>
                                    </section>
                                </Form>
                            )}
                            </Formik>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}