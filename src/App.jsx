import React, { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import LoadingScreen from './components/UI/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            {!isLoading && <DashboardLayout />}
        </>
    );
}

export default App;
