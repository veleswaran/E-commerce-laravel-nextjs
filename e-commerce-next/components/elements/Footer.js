// components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are an e-commerce company providing the best products for your needs.
              Our mission is to make shopping easy and accessible for everyone.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled ">
              <li><a href="/products" className="text-info">Products</a></li>
              <li><a href="/about" className="text-info">About Us</a></li>
              <li><a href="/contact" className="text-info">Contact</a></li>
              <li><a href="/faq" className="text-info">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Subscribe to our Newsletter</h5>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" required />
              </div>
              <button type="submit" className="btn btn-info">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
