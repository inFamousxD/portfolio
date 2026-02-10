import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AnimationContextType {
    speedMultiplier: number;
    setSpeedMultiplier: (multiplier: number) => void;
    toggleSpeed: () => void;
    getAdjustedDuration: (baseDuration: number) => number;
    isHighSpeed: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const SPEED_OPTIONS = [1, 5] as const;

interface AnimationProviderProps {
    children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
    const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

    const toggleSpeed = useCallback(() => {
        setSpeedMultiplier(current =>
            current === SPEED_OPTIONS[0] ? SPEED_OPTIONS[1] : SPEED_OPTIONS[0]
        );
    }, []);

    const getAdjustedDuration = useCallback((baseDuration: number): number => {
        return baseDuration / speedMultiplier;
    }, [speedMultiplier]);

    const value: AnimationContextType = {
        speedMultiplier,
        setSpeedMultiplier,
        toggleSpeed,
        getAdjustedDuration,
        isHighSpeed: speedMultiplier > 1,
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimationSpeed = (): AnimationContextType => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error('useAnimationSpeed must be used within AnimationProvider');
    }
    return context;
};
