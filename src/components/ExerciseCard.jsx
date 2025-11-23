import React from 'react';

const ExerciseCard = ({ title, benefit, color, onClick }) => {
    return (
        <div
            className="glass-panel exercise-card"
            onClick={onClick}
            style={{
                padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 3vw, 1.5rem)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 'clamp(60px, 10vw, 80px)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                const opacity = title === 'Relax Breathing' ? '10' : '22';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 24px 0 ${color}${opacity}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: color,
                    filter: 'blur(40px)',
                    opacity: 0.15
                }}
            />

            <div style={{ zIndex: 1 }}>
                <h3 style={{
                    margin: '0 0 0.2rem 0',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)'
                }}>
                    {title}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    {benefit}
                </p>
            </div>

            <button
                style={{
                    marginLeft: '1rem',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'background 0.3s',
                    whiteSpace: 'nowrap',
                    zIndex: 1
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
                Start
            </button>
        </div>
    );
};

export default ExerciseCard;
