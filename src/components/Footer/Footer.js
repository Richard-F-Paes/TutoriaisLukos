import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <i className="fas fa-desktop"></i>
                        <span>TutorialLukos</span>
                    </div>
                    <p className="footer-text">
                        © {currentYear} TutorialLukos. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
