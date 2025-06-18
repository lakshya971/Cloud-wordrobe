"use client";

import React from 'react';
import styled from 'styled-components';

interface AnimatedButtonProps {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  color = 'royalblue', 
  onClick,
  className = '',
  type = 'button'
}) => {
  return (
    <StyledWrapper $color={color} className={className}>
      <button onClick={onClick} type={type}>
        {children}
        <span />
      </button>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  $color: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  button {
    border: none;
    display: block;
    position: relative;
    padding: 0.7em 2.4em;
    font-size: 18px;
    background: transparent;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    color: ${props => props.$color};
    z-index: 1;
    font-family: inherit;
    font-weight: 500;
  }

  button span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1;
    border: 4px solid ${props => props.$color};
  }

  button span::before {
    content: "";
    display: block;
    position: absolute;
    width: 8%;
    height: 500%;
    background: var(--lightgray);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-60deg);
    transition: all 0.3s;
  }

  button:hover span::before {
    transform: translate(-50%, -50%) rotate(-90deg);
    width: 100%;
    background: ${props => props.$color};
  }

  button:hover {
    color: white;
  }

  button:active span::before {
    background: ${props => {
      // Darken the color for the active state
      const color = props.$color;
      if (color === 'royalblue') return '#2751cd';
      return color;
    }};
  }
`;

export default AnimatedButton;
