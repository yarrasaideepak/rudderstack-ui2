import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Track = () => {

    const { trackName } = useParams();


    const [jsonData, setJsonData] = useState(null);
    
    const apiUrl = 'http://localhost:8080/tracking/getTracking/'+trackName;

    const fetchTrackingData = async () =>{
        const response = await fetch(apiUrl, {
          method: 'GET'
        })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResp =  await response.json()
        setJsonData(jsonResp)
    }


    useEffect(() => {
        fetchTrackingData()
    }, [])


    return (

        <div className="container mt-4">
            <h1 className="mb-4">Tracking Plan for the request</h1>
            <div className="card">
                <div className="card-body">
                    {jsonData ? (
                        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>
            </div>
        </div>

    );

};

export default Track;