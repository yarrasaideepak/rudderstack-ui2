import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tracking.css';
import trackingObj from './TrackingObj.tsx';
import eventObj from './EventObj';


const TrackForm = () => {


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [respData, setRespData] = useState(null);

    const [message, setMessage] = useState("");


    const { fields, append } = useFieldArray({
        control,
        name: 'eventDetails'

    });

    if (fields.length === 0) {
        append({ name: '', description: '', rules: '' });
    }


    const onSubmit = async (data) => {
        console.log("data from form is: ", data);

        let eventDetailsArray: eventObj[] = [];

        data.eventDetails.forEach(eventDetail => {

            const jsonObject = JSON.parse(eventDetail.rules);

            let eachEvent: eventObj = {
                name: eventDetail.name,
                description: eventDetail.description,
                rules: {
                    $schema: jsonObject.$schema,
                    type: jsonObject.type,
                    properties: jsonObject.properties,
                    required: jsonObject.required,
                }
            };

            eventDetailsArray.push(eachEvent);
        })

        let trackObj: trackingObj = {
            tracking_plan: {
                display_name: data.name,
                rules: {
                    events: eventDetailsArray
                }
            }
        };


        try {
            const response = await fetch('http://localhost:8080/tracking/addTracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trackObj),
            });

            const responseData = await response.json();

            if (responseData.message) {
                alert(responseData.message);
            }
            else if (responseData.error) {
                alert(responseData.error);
            }

            console.error('Added:', responseData);

            setRespData(responseData);
        } catch (error) {
            console.error('Error:', error);
        }

    };


    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="border border-2 p-4 d-inline-block" style={{ minWidth: "400px", width: "60%" }}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <h4>Add Tracking Plan</h4>
                    <br />

                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">
                            Name
                        </label>
                        <div className="col-sm-10" style={{ paddingRight: "150px" }}>
                            <input
                                type="text"
                                placeholder='Tracking Plan 1'
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                id="name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">Name is required</div>
                            )}
                        </div>
                    </div>


                    <div className="mb-3 row">

                        <label htmlFor="Description" className="col-sm-2 col-form-label">
                            Description
                        </label>

                        <div className="col-sm-10" style={{ paddingRight: "150px" }}>
                            <input
                                type="text"
                                placeholder='First Tracking Plan'
                                className={`form-control ${errors.Description ? "is-invalid" : ""}`}
                                id="Description"
                                {...register("Description", { required: true, })}
                            />
                            {errors.Description && (
                                <div className="invalid-feedback">
                                    {errors.Description.type === "required"
                                        ? "Description is required"
                                        : "Invalid Description"}
                                </div>
                            )}
                        </div>

                        <br /><br /><br /><br />
                        <hr></hr>

                    </div>

                    <h4>Events</h4>



                    {fields.map((eventDetails, index) => (

                        <div key={eventDetails.id} className="mb-3 row">


                            <label htmlFor="Name" className="col-sm-2 col-form-label">
                                Name
                            </label>

                            <div className="col-sm-10" style={{ paddingRight: "150px" }}>
                                <input
                                    type="text"
                                    placeholder='Order Placed'
                                    id="Description"
                                    className={`form-control`}
                                    {...register(`eventDetails.${index}.name`)}
                                />
                            </div>
                            <br></br><br></br>

                            <label htmlFor="Description2" className="col-sm-2 col-form-label">
                                Description
                            </label>
                            <div className="col-sm-10" style={{ paddingRight: "150px" }}>
                                <input
                                    type="text"
                                    placeholder='An Order is Placed'
                                    id="Description2"
                                    className={`form-control`}
                                    {...register(`eventDetails.${index}.description`)}
                                />
                            </div>

                            <br></br><br></br>

                            <label htmlFor="Rules" className="col-sm-2 col-form-label">
                                Rules
                            </label>
                            <div className="col-sm-10" style={{ paddingRight: "150px" }}>
                                <textarea
                                    placeholder='( JSON SCHEMA )'
                                    id="Rules"
                                    className={`form-control`}
                                    {...register(`eventDetails.${index}.rules`)}
                                />

                            </div>

                            <br /><br /><br /><br />


                        </div>
                    ))}




                    <div className="row">
                        <div className="col text-center">
                            <button type="button" className="btn btn-success" onClick={() => append({ name: '', description: '', rules: '' })}>
                                Add Event
                            </button>
                            <br></br><br></br>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>


                </form>



            </div>
        </div>
    );

};

export default TrackForm;
// function yupResolver(schema: yup.ObjectSchema<{ contacts: { name: string; description: string; rules: string; }[] | undefined; }, yup.AnyObject, { contacts: ""; }, "">): import("react-hook-form").Resolver<import("react-hook-form").FieldValues, any> | undefined {
//     throw new Error('Function not implemented.');
// }

