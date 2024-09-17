// @ts-nocheck
import React from 'react'
import { useState } from 'react'
import './App.css'
import VibrationComponent from './components/Vibration'
import CheckBattery from './components/CheckBattery'

function App() {



  return (
    <div>
      <VibrationComponent />
      <hr />
      <CheckBattery />
    </div>
  )
}

export default App
