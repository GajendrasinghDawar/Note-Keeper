// @ts-nocheck
import React from 'react'
import { useState } from 'react'
import './App.css'
import VibrationComponent from './components/Vibration'
import CheckBattery from './components/CheckBattery'
import Notepad from './components/Notepad'
import ContactPicker from './components/ContactPicker'

function App() {



  return (
    <div>
      <ContactPicker />
    </div>
  )
}

export default App
