import React, { useState, useEffect } from 'react';

const VibrationComponent = () => {
    const [ vibrateInterval, setVibrateInterval ] = useState(null);
    const [ isVibrationSupported, setIsVibrationSupported ] = useState(false);

    useEffect(() => {
        // Check if the Vibration API is supported
        if ('vibrate' in navigator)
        {
            setIsVibrationSupported(true);
        }
    }, []);

    // Starts vibration at passed in level
    const startVibrate = (duration) => {
        if (isVibrationSupported)
        {
            navigator.vibrate(duration);
        }
    };

    // Stops vibration
    const stopVibrate = () => {
        if (isVibrationSupported)
        {
            if (vibrateInterval) clearInterval(vibrateInterval);
            navigator.vibrate(0);
        }
    };

    // Start persistent vibration at given duration and interval
    const startPersistentVibrate = (duration, interval) => {
        if (isVibrationSupported)
        {
            const intervalId = setInterval(() => {
                startVibrate(duration);
            }, interval);
            setVibrateInterval(intervalId);
        }
    };

    // Clean up interval on component unmount
    useEffect(() => {
        return () => {
            if (vibrateInterval) clearInterval(vibrateInterval);
        };
    }, [ vibrateInterval ]);

    return (
        <div>
            { isVibrationSupported ? (
                <>
                    <button onClick={ () => startVibrate(200) }>Start Vibration</button>
                    <button onClick={ stopVibrate }>Stop Vibration</button>
                    <button onClick={ () => startPersistentVibrate(200, 500) }>Start Persistent Vibration</button>
                </>
            ) : (
                <p>Vibration API is not supported in this browser.</p>
            ) }
        </div>
    );
};

export default VibrationComponent;