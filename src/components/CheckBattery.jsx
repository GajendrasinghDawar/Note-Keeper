// @ts-nocheck

import { useState, useEffect } from 'react'


export default function CheckBattery() {
    const [ batteryIsCharging, setBatteryIsCharging ] = useState(false);
    useEffect(() => {
        navigator.getBattery().then((battery) => {
            setBatteryIsCharging(battery.charging);

            const updateBatteryStatus = () => {
                setBatteryIsCharging(battery.charging);
            };

            battery.addEventListener("chargingchange", updateBatteryStatus);

            return () => {
                battery.removeEventListener("chargingchange", updateBatteryStatus);
            };
        });
        console.log('Battery charging:', batteryIsCharging);
    }, [ batteryIsCharging ]);

    return (
        <div>
            <h1>Battery is charging: { batteryIsCharging ? "Yes" : "No" }</h1>
        </div>
    );
}