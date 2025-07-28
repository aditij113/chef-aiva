import React from 'react';

const LandingIllustration: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
            <g>
                {/* Background Leafy Green */}
                <path
                    fill="#A7F3D0"
                    d="M100,20 C40,30 20,80 40,130 C60,180 140,190 170,140 C200,90 160,10 100,20 Z"
                    style={{ opacity: 0.8 }}
                />
                <path
                    fill="#6EE7B7"
                    d="M105,25 C55,35 35,85 55,135 C75,185 145,185 170,135 C195,85 155,15 105,25 Z"
                    style={{ mixBlendMode: 'multiply', opacity: 0.7 }}
                />

                {/* Tomato */}
                <g transform="translate(65, 60)">
                    <circle r="28" fill="#E74C3C" />
                    <path d="M -2, -28 L 0, -35 L 2, -28 L 0, -27Z" fill="#27AE60" />
                    <circle r="28" fill="url(#illustration-shine)" />
                </g>

                {/* Carrot */}
                <g transform="translate(130, 90) rotate(20)">
                    <path d="M 0,0 C 15,30 5,60 -5,65 C -15,60 -20,30 0,0 Z" fill="#F39C12" />
                    <path d="M -8,-5 L 0,-20 L 8,-5 Z" fill="#2ECC71" />
                    <path d="M -12,-2 L 0,-15 L 12,-2 Z" fill="#27AE60" style={{ mixBlendMode: 'multiply' }} />
                </g>

                {/* Avocado Half */}
                <g transform="translate(60, 135)">
                    <path d="M 0,-30 C -25,-30 -35,10 0,30 C 35,10 25,-30 0,-30 Z" fill="#2ECC71" />
                    <path d="M 0,-22 C -18,-22 -25,5 0,22 C 25,5 18,-22 0,-22 Z" fill="#82E0AA" />
                    <circle cy="5" r="10" fill="#A0522D" />
                </g>

                {/* Bell Pepper */}
                <g transform="translate(135, 55)">
                    <path d="M 0,-20 C -25,-20 -25,15 0,25 C 25,15 25,-20 0,-20 Z" fill="#F1C40F" />
                    <path d="M -5, -20 L 0,-28 L 5,-20 Z" fill="#27AE60" />
                </g>

            </g>
            <defs>
                <radialGradient id="illustration-shine" cx="0.25" cy="0.25" r="0.45">
                    <stop offset="0%" stopColor="white" stopOpacity=".5" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default LandingIllustration;
