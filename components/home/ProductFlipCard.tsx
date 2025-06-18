"use client";

import { Heart, Star, Calendar, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ProductProps {
  product: {
    id: number;
    name: string;
    image: string;
    buyPrice: number;
    rentPrice: number;
    rating: number;
    reviews: number;
    vendor: string;
    location: string;
  };
  likedProducts: Set<number>;
  toggleLike: (productId: number) => void;
  addToCart: (product: any, type: 'rent' | 'buy') => void;
}

const ProductFlipCard = ({ product, likedProducts, toggleLike, addToCart }: ProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <StyledWrapper>
        <div className="flip-card">
          <div className="flip-card-inner">
            {/* Front side of the card */}
            <div className="flip-card-front">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <Badge variant="secondary" className="product-location">
                  {product.location}
                </Badge>
                <p className="vendor">by {product.vendor}</p>
                <div className="rating">
                  <Star className="star-icon" />
                  <span className="rating-value">{product.rating}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <div className="price-info">
                  <div className="rent-price">₹{product.rentPrice}<span className="rent-period">/3 days</span></div>
                  <div className="buy-price">Buy: ₹{product.buyPrice}</div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="like-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                >
                  <Heart 
                    className={`heart-icon ${likedProducts.has(product.id) ? 'liked' : ''}`} 
                  />
                </Button>
              </div>
            </div>

            {/* Back side of the card */}
            <div className="flip-card-back">
              <h3 className="product-name-back">{product.name}</h3>
              <p className="vendor-back">by {product.vendor}</p>
              <div className="rating-back">
                <Star className="star-icon-back" />
                <span className="rating-value-back">{product.rating}</span>
                <span className="reviews-back">({product.reviews} reviews)</span>
              </div>
              
              <div className="location-back">
                <Badge variant="secondary">{product.location}</Badge>
              </div>
              
              <div className="price-section">
                <div className="rent-option">
                  <p>Rent Price:</p>
                  <p className="price-value">₹{product.rentPrice}<span className="period">/3 days</span></p>
                </div>
                <div className="buy-option">
                  <p>Buy Price:</p>
                  <p className="price-value">₹{product.buyPrice}</p>
                </div>
              </div>
              
              <div className="action-buttons">
                <Button 
                  size="sm" 
                  className="rent-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 'rent');
                  }}
                >
                  <Calendar className="button-icon" />
                  Rent Now
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="buy-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 'buy');
                  }}
                >
                  <ShoppingCart className="button-icon" />
                  Buy Now
                </Button>
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                className="like-button-back"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(product.id);
                }}
              >
                <Heart 
                  className={`heart-icon-back ${likedProducts.has(product.id) ? 'liked' : ''}`} 
                />
              </Button>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </motion.div>
  );
};

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 380px;
    perspective: 1000px;
    color: #333;
    font-family: 'Inter', sans-serif;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.1);
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1rem;
    overflow: hidden;
  }

  .flip-card-front {
    background-color: white;
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .flip-card:hover .product-image {
    transform: scale(1.05);
  }

  .product-details {
    padding: 1rem;
    position: relative;
  }

  .product-name {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .product-location {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 0.7rem;
  }

  .vendor {
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.5rem;
  }

  .rating {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .star-icon {
    height: 0.875rem;
    width: 0.875rem;
    margin-right: 0.25rem;
    fill: #f59e0b;
    color: #f59e0b;
  }

  .rating-value {
    font-size: 0.75rem;
    font-weight: 500;
    margin-right: 0.25rem;
  }

  .reviews {
    font-size: 0.7rem;
    color: #64748b;
  }

  .price-info {
    display: flex;
    flex-direction: column;
  }

  .rent-price {
    font-size: 0.875rem;
    font-weight: 700;
    color: #f97316;
  }

  .rent-period {
    font-size: 0.7rem;
    color: #64748b;
    font-weight: normal;
    margin-left: 0.25rem;
  }

  .buy-price {
    font-size: 0.7rem;
    color: #64748b;
  }

  .like-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .heart-icon {
    height: 1rem;
    width: 1rem;
    transition: all 0.2s;
  }
  
  .heart-icon.liked {
    fill: #ef4444;
    color: #ef4444;
  }

  /* Back of card */
  .flip-card-back {
    background: linear-gradient(145deg, #ffffff, #f5f5f5);
    transform: rotateY(180deg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-name-back {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .vendor-back {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 1rem;
  }

  .rating-back {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .star-icon-back {
    height: 1rem;
    width: 1rem;
    margin-right: 0.25rem;
    fill: #f59e0b;
    color: #f59e0b;
  }

  .rating-value-back {
    font-size: 0.875rem;
    font-weight: 500;
    margin-right: 0.25rem;
  }

  .reviews-back {
    font-size: 0.75rem;
    color: #64748b;
  }

  .location-back {
    margin-bottom: 1.5rem;
  }

  .price-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .rent-option, .buy-option {
    text-align: center;
    padding: 0.75rem;
    background-color: #f8fafc;
    border-radius: 0.5rem;
    flex: 1;
  }

  .rent-option {
    margin-right: 0.5rem;
  }

  .price-value {
    font-weight: 700;
    font-size: 1rem;
    color: #f97316;
  }

  .period {
    font-size: 0.7rem;
    color: #64748b;
    font-weight: normal;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .rent-button {
    background-color: #f97316;
    color: white;
    flex: 1;
  }

  .rent-button:hover {
    background-color: #ea580c;
  }

  .buy-button {
    flex: 1;
  }

  .button-icon {
    height: 0.875rem;
    width: 0.875rem;
    margin-right: 0.25rem;
  }

  .like-button-back {
    align-self: center;
    background: transparent;
  }

  .heart-icon-back {
    height: 1.25rem;
    width: 1.25rem;
  }
  
  .heart-icon-back.liked {
    fill: #ef4444;
    color: #ef4444;
  }
`;

export default ProductFlipCard;
