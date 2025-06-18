'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes animations
const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const wave = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 24px;
`;

const LoaderText = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text, #ff8c00);
  text-align: center;
`;

// Ripple Effect Loader
const RippleContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const RippleCircle = styled.div`
  position: absolute;
  border: 4px solid #ff8c00;
  opacity: 1;
  border-radius: 50%;
  animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  
  &:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

// Wave Dots Loader
const WaveContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 50px;
`;

const WaveDot = styled.div<{ delay: number }>`
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #ff8c00;
  animation: ${wave} 1.2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

// Circular Progress Loader
const ProgressContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const ProgressRing = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #ff8c00;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #ff8c00 transparent transparent transparent;
`;

interface AnimatedLoaderProps {
  variant?: 'ripple' | 'wave' | 'progress';
  text?: string;
  color?: string;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({ 
  variant = 'ripple', 
  text = 'Loading...', 
  color = '#ff8c00' 
}) => {
  return (
    <LoaderContainer style={{ '--color-text': color } as React.CSSProperties}>
      {variant === 'ripple' && (
        <RippleContainer>
          <RippleCircle style={{ borderColor: color }} />
          <RippleCircle style={{ borderColor: color }} />
        </RippleContainer>
      )}
      
      {variant === 'wave' && (
        <WaveContainer>
          {[0, 1, 2, 3, 4].map((i) => (
            <WaveDot key={i} delay={i * 0.1} style={{ backgroundColor: color }} />
          ))}
        </WaveContainer>
      )}
      
      {variant === 'progress' && (
        <ProgressContainer>
          <ProgressRing style={{ borderTopColor: color }} />
        </ProgressContainer>
      )}
      
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );
};

export default AnimatedLoader;
