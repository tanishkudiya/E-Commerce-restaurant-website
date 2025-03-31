import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" id='contact'>
      <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-section">
          <h2 className="footer-logo">🍕 Tanishk's Bistro</h2>
          <p>Delicious food delivered to your doorstep. Experience the best flavors with us.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#menu">Delivery</a></li>
            <li><a href="#contact">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><MapPin size={18} /> 123 Food Street, Flavor Town</p>
          <p><Phone size={18} /> +1 234 567 890</p>
          <p><Mail size={18} /> contact@foodiehub.com</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social">
            <a href="#"><Facebook size={24} /></a>
            <a href="#"><Instagram size={24} /></a>
            <a href="#"><Twitter size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 FoodieHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
