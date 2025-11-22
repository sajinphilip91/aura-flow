import React from 'react';

const DisclaimerModal = ({ onContinue }) => {
    return (
        <div className="disclaimer-overlay">
            <div className="glass-panel disclaimer-modal">
                <h2 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: 'var(--color-text)'
                }}>Disclaimer</h2>

                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem'
                }}>
                    This breathing experience is a personal experimental project and is not intended as guidance, therapy, or a health recommendation. Please use it only if you choose to, at your own comfort.
                </p>

                <button
                    onClick={onContinue}
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #00f2ff 0%, #00c6ff 50%, #9d00ff 100%)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, opacity 0.2s',
                        width: '100%'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default DisclaimerModal;
