"use client";

import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  $coverBgColor?: string;
}

interface BookCardProps {
  coverBgColor?: string;
  contentBgColor?: string;
  children: ReactNode;
  coverContent?: ReactNode;
}

const StyledWrapper = styled.div<WrapperProps>`
  .book {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    min-height: 300px;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 25px -5px, rgba(0, 0, 0, 0.05) 0px 8px 10px -6px;
    transform: preserve-3d;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    padding: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover .book {
    transform: translateY(-5px);
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .cover {
    top: 0;
    position: absolute;
    background: ${props => props.$coverBgColor || '#f97316'};
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .book:hover .cover {
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotatey(-80deg);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px;
  }

  .cover-content {
    padding: 1.5rem;
    text-align: center;
  }
`;

const BookCard: React.FC<BookCardProps> = ({ 
  coverBgColor, 
  contentBgColor = "whitesmoke",
  children, 
  coverContent 
}) => {
  return (
    <StyledWrapper $coverBgColor={coverBgColor}>
      <div className="book" style={{ backgroundColor: contentBgColor }}>
        <div className="content">
          {children}
        </div>
        <div className="cover">
          <div className="cover-content">
            {coverContent}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default BookCard;
