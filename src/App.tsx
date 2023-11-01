import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {MainRoute} from "./app/routes/MainRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense>
                    <MainRoute></MainRoute>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
