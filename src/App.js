import logo from './logo.svg';
import './App.css';
import React from 'react';
import TrackForm from './/Tracking/Tracking.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Track from './/Tracking/Track.tsx';

function App() {
    return (

        <Router>
            <div>
                <Routes>
                    <Route path="/tracking" element={<TrackForm />}>
                    </Route>
                    <Route path="/trackDetails/:trackName" element={<Track />}>
                    </Route>
                </Routes>
            </div>
        </Router>

  );
}

export default App;
