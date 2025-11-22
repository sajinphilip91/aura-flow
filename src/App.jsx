import { useState, useEffect } from 'react'
import './index.css'
import LandingPage from './components/LandingPage'
import ExerciseSession from './components/ExerciseSession'
import DisclaimerModal from './components/DisclaimerModal'

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'session'
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Removed useEffect to show disclaimer every time

  const handleDisclaimerContinue = () => {
    // localStorage.setItem('hasSeenDisclaimer', 'true'); // Don't save
    setShowDisclaimer(false);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentView('session');
  };

  const handleCloseSession = () => {
    setCurrentView('landing');
    setSelectedExercise(null);
  };

  return (
    <div className="app-container">
      {showDisclaimer && (
        <DisclaimerModal onContinue={handleDisclaimerContinue} />
      )}

      {currentView === 'landing' && (
        <LandingPage onSelectExercise={handleSelectExercise} />
      )}

      {currentView === 'session' && selectedExercise && (
        <ExerciseSession
          exercise={selectedExercise}
          onClose={handleCloseSession}
        />
      )}
    </div>
  )
}

export default App
