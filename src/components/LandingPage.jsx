import React from 'react';
import ExerciseCard from './ExerciseCard';

const exercises = [
    {
        id: 'box',
        title: 'Box Breathing',
        benefit: 'Reduce Stress',
        color: 'var(--color-accent-cyan)',
        pattern: { inhale: 4, hold: 4, exhale: 4, hold2: 4 }
    },
    {
        id: 'equal',
        title: 'Equal Breathing',
        benefit: 'Relax & Focus',
        color: 'var(--color-accent-green)',
        pattern: { inhale: 4, hold: 0, exhale: 4, hold2: 0 }
    },
    {
        id: 'harmonized',
        title: 'Harmonized',
        benefit: 'Reduce Anxiety',
        color: 'var(--color-accent-lavender)',
        pattern: { inhale: 4, hold: 2, exhale: 4, hold2: 0 }
    },
    {
        id: 'relax',
        title: 'Relax Breathing',
        benefit: 'Improve Sleep',
        color: 'var(--color-accent-indigo)',
        pattern: { inhale: 4, hold: 7, exhale: 8, hold2: 0 }
    }
];

const LandingPage = ({ onSelectExercise, onOpenDisclaimer }) => {
    return (
        <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '2rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: 'clamp(1.5rem, 5vw, 4rem) 0',
                position: 'relative',
                marginBottom: 'clamp(1rem, 3vw, 2rem)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(165, 243, 252, 0.2) 0%, rgba(26, 26, 46, 0) 70%)',
                    animation: 'pulse-orb 6s infinite ease-in-out',
                    zIndex: -1
                }} />

                <h1 style={{
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Breathing <span className="text-gradient">Exercise</span>
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Scientifically proven breathing techniques to restore balance and clarity to your mind.
                </p>
            </section>

            {/* Exercise List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.8rem, 2vw, 1.5rem)',
                padding: '0 1rem',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                {exercises.map((ex) => (
                    <ExerciseCard
                        key={ex.id}
                        title={ex.title}
                        benefit={ex.benefit}
                        color={ex.color}
                        onClick={() => onSelectExercise(ex)}
                    />
                ))}
            </div>

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                marginTop: '3rem',
                paddingBottom: '1rem'
            }}>
                <button
                    onClick={onOpenDisclaimer}
                    style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'underline',
                        opacity: 0.6,
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem'
                    }}
                >
                    Disclaimer
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
