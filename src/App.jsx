import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrainingRegistrationForm from './pages/TrainingRegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training-registration" element={<TrainingRegistrationForm />} />
        <Route path="/assessment-form" element={<TrainingRegistrationForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
