import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimationProvider } from './context/AnimationContext';
import { Navigation } from './components/Navigation/Navigation';
import { IntroGreeting } from './components/IntroGreeting/IntroGreeting';
import './styles/main.css';

// Lazy load heavy components
const Arc = lazy(() => import('./components/Arc/Arc').then(module => ({ default: module.Arc })));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

// ============================================================================
// LOADING FALLBACK
// ============================================================================

const LoadingFallback: React.FC = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#ffffff',
        fontFamily: "'Roboto Mono', monospace",
    }}>
        Loading...
    </div>
);

// ============================================================================
// MAIN APP
// ============================================================================

const App: React.FC = () => {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <AnimationProvider>
            <Router>
                <div className="grid-background" />

                {!showIntro && <Navigation />}

                <Suspense fallback={<LoadingFallback />}>
                    {showIntro ? (
                        <IntroGreeting onComplete={() => setShowIntro(false)} />
                    ) : (
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    )}
                </Suspense>
            </Router>
        </AnimationProvider>
    );
};

export default App;
