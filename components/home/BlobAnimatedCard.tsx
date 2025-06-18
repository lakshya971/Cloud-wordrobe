"use client";

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface BlobAnimatedCardProps {
  children: ReactNode;
  backgroundColor?: string;
  blobColor?: string;
}

const CardContainer = styled(motion.div)<{ $bgColor?: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 250px;
  background-color: ${props => props.$bgColor || '#ffffff'};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const BlobAnimation = styled(motion.div)<{ $blobColor?: string }>`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: ${props => props.$blobColor || 'rgba(130, 130, 255, 0.1)'};
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

export default function BlobAnimatedCard({ 
  children, 
  backgroundColor = '#ffffff',
  blobColor = 'rgba(130, 130, 255, 0.1)'
}: BlobAnimatedCardProps) {
  return (
    <CardContainer 
      $bgColor={backgroundColor}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <BlobAnimation
        $blobColor={blobColor}
        animate={{
          rotate: [0, 360],
          borderRadius: ['42% 58% 70% 30% / 45% 45% 55% 55%', '60% 40% 30% 70% / 60% 30% 70% 40%', '42% 58% 70% 30% / 45% 45% 55% 55%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </CardContainer>
  );
}