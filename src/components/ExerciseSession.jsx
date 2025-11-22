import React, { useState, useEffect, useRef } from 'react';

const ExerciseSession = ({ exercise, onClose }) => {
    const [isGetReady, setIsGetReady] = useState(true);
    const [timeLeft, setTimeLeft] = useState(3); // 3s countdown
    const [isActive, setIsActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [cycleIndex, setCycleIndex] = useState(0);

    const [remainingTime, setRemainingTime] = useState(0);

    const timerRef = useRef(null);
    const { pattern, color } = exercise;

    // Construct the cycle with explicit scales
    const cycle = React.useMemo(() => {
        const c = [{ name: 'Inhale', duration: pattern.inhale, scale: 1.5 }];
        if (pattern.hold > 0) c.push({ name: 'Hold', duration: pattern.hold, scale: 1.5 });
        c.push({ name: 'Exhale', duration: pattern.exhale, scale: 1 });
        if (pattern.hold2 > 0) c.push({ name: 'Hold', duration: pattern.hold2, scale: 1 });
        return c;
    }, [pattern]);

    // Initialize remaining time when step changes
    useEffect(() => {
        if (cycle[cycleIndex]) {
            setRemainingTime(cycle[cycleIndex].duration * 1000);
        }
    }, [cycleIndex, cycle]);

    // Get Ready Countdown
    useEffect(() => {
        if (isGetReady) {
            if (timeLeft > 0) {
                const timeout = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
                return () => clearTimeout(timeout);
            } else {
                setIsGetReady(false);
                setIsActive(true);
            }
        }
    }, [isGetReady, timeLeft]);

    // Cycle Timer with Pause/Resume
    useEffect(() => {
        if (!isActive || isGetReady || remainingTime <= 0) return;

        const startTime = Date.now();

        timerRef.current = setTimeout(() => {
            setCycleIndex((prev) => (prev + 1) % cycle.length);
        }, remainingTime);

        return () => {
            clearTimeout(timerRef.current);
            const elapsed = Date.now() - startTime;
            setRemainingTime((prev) => Math.max(0, prev - elapsed));
        };
    }, [isActive, isGetReady, cycleIndex, remainingTime]);

    const togglePause = () => {
        setIsActive(!isActive);
    };

    // Derived State for Rendering
    const currentStep = cycle[cycleIndex];
    const phaseName = isGetReady ? 'Get Ready' : currentStep.name;
    const currentScale = isGetReady ? 1 : currentStep.scale;
    const currentDuration = currentStep.duration; // Use currentStep.duration for transition

    return (
        <div className="animate-fade-in" style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--color-bg)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                width: '100%',
                padding: '0 2rem',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{ margin: 0, textAlign: 'center' }}>{exercise.title}</h2>
                <button onClick={onClose} style={{
                    fontSize: '1.5rem',
                    color: 'white',
                    position: 'absolute',
                    right: '2rem',
                    cursor: 'pointer'
                }}>✕</button>
            </div>

            {/* Central Animation */}
            <div style={{ position: 'relative' }}>


                {/* Breathing Blob Image */}
                <div style={{
                    width: 'min(600px, 90vw)',
                    height: 'min(600px, 90vw)',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Removed scale transform
                }}>
                    {/* Inner Border Line */}
                    <div style={{
                        position: 'absolute',
                        width: 'min(480px, 72vw)',
                        height: 'min(480px, 72vw)',
                        borderRadius: '45% 55% 70% 30% / 50% 30% 70% 50%',
                        background: 'linear-gradient(135deg, #00f2ff 0%, #00c6ff 50%, #9d00ff 100%)',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: 0.5,
                        animation: 'water-flow 20s linear infinite',
                        animationPlayState: isActive ? 'running' : 'paused',
                        pointerEvents: 'none'
                    }} />

                    {/* Outer Border Line */}
                    <div style={{
                        position: 'absolute',
                        width: 'min(520px, 78vw)',
                        height: 'min(520px, 78vw)',
                        borderRadius: '50% 50% 30% 70% / 50% 70% 30% 50%',
                        background: 'linear-gradient(135deg, #00f2ff 0%, #00c6ff 50%, #9d00ff 100%)',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: 0.3,
                        animation: 'water-flow 20s linear infinite',
                        animationPlayState: isActive ? 'running' : 'paused',
                        pointerEvents: 'none'
                    }} />

                    <img
                        src="/blob_static.jpg"
                        alt="Breathing Blob"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            animation: 'water-flow 20s linear infinite', // Slow clockwise rotation
                            animationPlayState: isActive ? 'running' : 'paused',
                            position: 'relative',
                            zIndex: 1,
                            mixBlendMode: 'screen' // Removes black background
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'white',
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        zIndex: 2
                    }}>
                        {isGetReady ? timeLeft : phaseName}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div style={{
                position: 'absolute',
                bottom: '4rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'white',
                        color: 'var(--color-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    {isMuted ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                    )}
                </button>

                <button
                    onClick={togglePause}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'white',
                        color: 'var(--color-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    {isActive ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    )}
                </button>
            </div>

            {/* Audio Track */}
            {!isMuted && isActive && (
                <audio
                    src="/ambient-loop.mp3"
                    autoPlay
                    loop
                    style={{ display: 'none' }}
                />
            )}
        </div >
    );
};

export default ExerciseSession;
