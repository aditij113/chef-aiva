import React from 'react';

interface FooterProps {
    children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <footer className="bg-white/90 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] p-4 border-t border-gray-200">
            <div className="flex justify-between items-center px-2">
                {children}
            </div>
        </footer>
    );
};

export default Footer;
