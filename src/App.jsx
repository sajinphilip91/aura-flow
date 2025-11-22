import { useState } from 'react'
import './index.css'
import LandingPage from './components/LandingPage'
import ExerciseSession from './components/ExerciseSession'

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'session'
  const [selectedExercise, setSelectedExercise] = useState(null);

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
