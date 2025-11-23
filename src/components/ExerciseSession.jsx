import React, { useState, useEffect, useRef } from 'react';

const ExerciseSession = ({ exercise, onClose }) => {
    const [isGetReady, setIsGetReady] = useState(true);
    const [timeLeft, setTimeLeft] = useState(5); // 5s countdown
    const [isActive, setIsActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [cycleIndex, setCycleIndex] = useState(0);

    const [remainingTime, setRemainingTime] = useState(0);

    const timerRef = useRef(null);
    const voiceRef = useRef(null); // Ref for voice guidance
    const { pattern, color } = exercise;

    // Construct the cycle with explicit scales
    const cycle = React.useMemo(() => {
        const c = [{ name: 'Breathe In', duration: pattern.inhale, scale: 1.5 }];
        if (pattern.hold > 0) c.push({ name: 'Hold', duration: pattern.hold, scale: 1.5 });
        c.push({ name: 'Breathe Out', duration: pattern.exhale, scale: 1 });
        if (pattern.hold2 > 0) c.push({ name: 'Hold', duration: pattern.hold2, scale: 1 });
        return c;
    }, [pattern]);

    // Derived State for Rendering (Moved up for useEffect access)
    const currentStep = cycle[cycleIndex];
    const phaseName = isGetReady ? 'Starts in' : currentStep.name;
    const currentScale = isGetReady ? 1 : currentStep.scale;
    const currentDuration = currentStep.duration;

    // Voice Guidance Logic - Phase Changes
    useEffect(() => {
        if (isMuted || !isActive) return;

        let audioFile = null;
        switch (phaseName) {
            case 'Breathe In':
                audioFile = '/breathe%20in.mp3';
                break;
            case 'Breathe Out':
                audioFile = '/breathe%20out.mp3';
                break;
            case 'Hold':
                audioFile = '/hold.mp3';
                break;
            default:
                break;
        }

        if (audioFile) {
            if (voiceRef.current) {
                // Only play if it's a different file or not playing
                const currentSrc = voiceRef.current.getAttribute('src');
                if (currentSrc !== audioFile || voiceRef.current.paused) {
                    voiceRef.current.src = audioFile;
                    voiceRef.current.play().catch(e => console.log("Audio play failed:", e));
                }
            }
        }
    }, [phaseName, isMuted, isActive]);

    // Voice Guidance Logic - Get Ready / Relax
    useEffect(() => {
        if (isGetReady && !isMuted) {
            // Small delay to ensure play works after navigation
            const timer = setTimeout(() => {
                if (voiceRef.current) {
                    voiceRef.current.src = '/Relax.mp3';
                    voiceRef.current.play().catch(e => console.log("Relax play failed:", e));
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isGetReady, isMuted]);

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

    // Cycle Timer with Pause/Resume and Active Countdown
    useEffect(() => {
        if (!isActive || isGetReady) return;

        let animationFrameId;
        const startTime = Date.now();
        const initialRemaining = remainingTime;

        const updateTimer = () => {
            const elapsed = Date.now() - startTime;
            const newRemaining = Math.max(0, initialRemaining - elapsed);

            setRemainingTime(newRemaining);

            if (newRemaining <= 0) {
                const nextIndex = (cycleIndex + 1) % cycle.length;
                setCycleIndex(nextIndex);
                setRemainingTime(cycle[nextIndex].duration * 1000); // Update time immediately with next phase
            } else {
                animationFrameId = requestAnimationFrame(updateTimer);
            }
        };

        animationFrameId = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isActive, isGetReady, cycleIndex]); // Removed remainingTime from dependency to avoid infinite loop reset

    const togglePause = () => {
        if (!isActive) {
            // Resuming: Restart the breathing technique from the beginning with countdown
            setIsGetReady(true);
            setTimeLeft(5);
            setCycleIndex(0);
            if (cycle && cycle.length > 0) {
                setRemainingTime(cycle[0].duration * 1000);
            }
        }
        setIsActive(!isActive);
    };



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
                    width: 'min(600px, 115vw)', // Increased from 90vw for mobile
                    height: 'min(600px, 115vw)',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Removed scale transform
                }}>
                    {/* Inner Border Line */}
                    <div style={{
                        position: 'absolute',
                        width: 'min(480px, 92vw)', // Increased from 72vw
                        height: 'min(480px, 92vw)',
                        borderRadius: '45% 55% 70% 30% / 50% 30% 70% 50%',
                        background: exercise.color, // Use exercise color
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
                        width: 'min(520px, 100vw)', // Increased from 78vw
                        height: 'min(520px, 100vw)',
                        borderRadius: '50% 50% 30% 70% / 50% 70% 30% 50%',
                        background: exercise.color, // Use exercise color
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
                            mixBlendMode: 'screen', // Removes black background
                            // Mask to fade out the rectangular edges
                            WebkitMaskImage: 'radial-gradient(closest-side, black 40%, transparent 100%)',
                            maskImage: 'radial-gradient(closest-side, black 40%, transparent 100%)',
                            filter: `drop-shadow(0 0 ${exercise.title === 'Relax Breathing' ? '10px' : '20px'} ${exercise.color}${exercise.title === 'Relax Breathing' ? '80' : ''})` // Adjust glow for Relax
                        }}
                    />

                    {/* Tint Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: '10%', left: '10%', right: '10%', bottom: '10%', // Constrain to center
                        background: exercise.color,
                        mixBlendMode: 'color',
                        opacity: 0.6,
                        zIndex: 1,
                        pointerEvents: 'none',
                        borderRadius: '50%',
                        filter: 'blur(20px)'
                    }} />
                    <div style={{
                        position: 'absolute',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}>
                        <span style={{
                            fontSize: '5rem',
                            fontWeight: 200, // Thin font
                            color: 'white',
                            lineHeight: 1,
                            fontVariantNumeric: 'tabular-nums', // Prevents jumping
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>
                            {isGetReady ? timeLeft : Math.ceil(remainingTime / 1000)}
                        </span>
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginTop: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}>
                            {phaseName}
                        </span>
                    </div>
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

            {/* Audio Tracks */}
            {!isMuted && isActive && (
                <>
                    <audio
                        ref={(el) => { if (el) el.volume = 0.3; }} // Background music volume
                        src="/Echoes%20of%20Eternity.mp3"
                        autoPlay
                        loop
                        style={{ display: 'none' }}
                    />
                    <audio
                        ref={voiceRef}
                        style={{ display: 'none' }}
                    />
                </>
            )}
        </div >
    );
};

export default ExerciseSession;
