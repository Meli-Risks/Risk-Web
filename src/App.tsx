import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {MainRoute} from "./app/routes/MainRoute";

/**
 * The main component that serves as the entry point of the application.
 * It sets up the routing using BrowserRouter and renders the MainRoute component
 * which handles the main navigation and content rendering of the application.
 */
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
