
import React from 'react';

interface AnimatedIconProps {
  name: string;
  className?: string;
}

const AnimatedIngredientIcon: React.FC<AnimatedIconProps> = ({ name, className }) => {
  const getIcon = () => {
    // Styles for animations
    const style = `
      .sway { animation: sway 3s ease-in-out infinite; transform-origin: 50% 100%; } @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
      .wobble { animation: wobble 2.5s ease-in-out infinite; transform-origin: 50% 100%; } @keyframes wobble { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
      .bounce { animation: bounce 3s ease-in-out infinite; transform-origin: 50% 100%; } @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      .shine { animation: shine 4s ease-in-out infinite; } @keyframes shine { 0%, 100% { opacity: 0; } 50% { opacity: 0.3; } }
      .pulse { animation: pulse 2s ease-in-out infinite; } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    `;

    const iconProps = { viewBox: "0 0 64 64", className };

    switch (name.toLowerCase()) {
      // Protein
      case 'black beans': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path fill="#34495E" d="M32 20a15 20 0 1 0 0 24a15 20 0 1 0 0-24z"/><path fill="#ECF0F1" d="M30 25a5 3 0 1 1 0 6" /></g></svg>;
      case 'tofu': return <svg {...iconProps}><style>{style}</style><g className="wobble"><rect x="16" y="24" width="32" height="20" rx="2" fill="#F8F7F2"/><rect x="16" y="24" width="32" height="20" rx="2" stroke="#DED9C4" strokeWidth="1.5" fill="none"/></g></svg>;
      case 'lentils': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="24" cy="30" r="5" fill="#C39D6F"/><circle cx="36" cy="34" r="6" fill="#A57F53"/><circle cx="28" cy="42" r="4" fill="#D3B48F"/></g></svg>;
      case 'chickpeas': return <svg {...iconProps}><style>{style}</style><g className="bounce"><circle cx="25" cy="30" r="7" fill="#FADCA5"/><circle cx="39" cy="32" r="8" fill="#F9D189"/><circle cx="30" cy="42" r="6" fill="#FFEBB9"/></g></svg>;
      case 'edamame': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#2ECC71" d="M20 25 C10 40 25 55 25 55 C40 45 45 25 35 20 C25 15 20 25 20 25z"/><circle cx="28" cy="32" r="5" fill="#27AE60"/><circle cx="32" cy="42" r="4" fill="#27AE60"/></g></svg>;
      case 'tempeh': return <svg {...iconProps}><style>{style}</style><g className="wobble"><rect x="14" y="26" width="36" height="16" rx="3" fill="#EADCA6"/><circle cx="22" cy="34" r="2" fill="#D1B894"/><circle cx="30" cy="31" r="1.5" fill="#D1B894"/><circle cx="40" cy="36" r="2" fill="#D1B894"/></g></svg>;

      // Cruciferous
      case 'broccoli': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#27AE60" d="M32 55 C 32 55, 24 50, 24 45 L 28 45 L 28 35 L 36 35 L 36 45 L 40 45 C 40 50, 32 55, 32 55 z"/><circle fill="#2ECC71" cx="32" cy="25" r="10"/><circle fill="#2ECC71" cx="22" cy="30" r="8"/><circle fill="#2ECC71" cx="42" cy="30" r="8"/></g></svg>;
      case 'cauliflower': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#BDC3C7" d="M32 55 C 32 55, 24 50, 24 45 L 28 45 L 28 35 L 36 35 L 36 45 L 40 45 C 40 50, 32 55, 32 55 z"/><circle fill="#ECF0F1" cx="32" cy="25" r="10"/><circle fill="#F1F2F6" cx="22" cy="30" r="8"/><circle fill="#ECF0F1" cx="42" cy="30" r="8"/></g></svg>;
      case 'brussels sprouts': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="25" cy="32" r="8" fill="#52BE80"/><circle cx="40" cy="35" r="7" fill="#2ECC71"/></g></svg>;
      case 'cabbage': return <svg {...iconProps}><style>{style}</style><g className="wobble"><circle cx="32" cy="34" r="16" fill="#82E0AA"/><path fill="#ABEBC6" d="M32 18 C 20 22 20 48 32 50 C 44 48 44 22 32 18z"/><path fill="#D5F5E3" d="M32 20 C 25 24 25 46 32 48 C 39 46 39 24 32 20z"/></g></svg>;
      case 'kale': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#2C3E50" d="M32 55V40"/><path fill="#27AE60" d="M32 40 C 20 40 15 25 25 20 C 30 15 34 15 40 20 C 50 25 44 40 32 40z"/><path fill="#2ECC71" d="M32 40 C 22 40 18 28 27 24 C 31 21 33 21 38 24 C 47 28 42 40 32 40z"/></g></svg>;

      // Leafy Greens
      case 'spinach': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#27AE60" d="M32 55V40"/><path fill="#2ECC71" d="M32 40 C 15 40 20 20 32 15 C 44 20 49 40 32 40z"/></g></svg>;
      case 'arugula': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#27AE60" d="M32 55V42"/><path fill="#2ECC71" d="M32 42 C 28 32 20 30 25 20"/><path fill="#2ECC71" d="M32 42 C 36 32 44 30 39 20"/></g></svg>;
      case 'romaine': return <svg {...iconProps}><style>{style}</style><g className="wobble"><path fill="#58D68D" d="M26 50 C 20 35 25 15 32 10 C 39 15 44 35 38 50z"/><path fill="#82E0AA" d="M29 50 C 25 35 28 20 32 16 C 36 20 39 35 35 50z"/></g></svg>;

      // Vegetables
      case 'carrot': return <svg {...iconProps}><style>{style}</style><g className="sway"><g><path fill="#27AE60" d="M32 24c-5 0-8-6-8-6s4-6 8-6 8 6 8 6-3 6-8 6z"/><path fill="#2ECC71" d="M24 20c-4 0-6-5-6-5s4-4 6-4 6 5 6 5-2 4-6 4z"/><path fill="#2ECC71" d="M40 20c4 0 6-5 6-5s-4-4-6-4-6 5-6 5 2 4 6 4z"/></g></g><path fill="#F39C12" d="M24 25l8 30 8-30z"/><path fill="#E67E22" d="M32 55L24 25h1.5l7 28.5z"/></svg>;
      case 'bell pepper': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#27AE60" d="M32 18 V10 C32 6 36 6 36 10 S32 12 32 18z"/><path fill="#E74C3C" d="M20 50 C 15 30 25 20 32 20 C 39 20 49 30 44 50z"/><path fill="#C0392B" d="M32 50 C 32 40 28 30 20 50z"/><path fill="#C0392B" d="M32 50 C 32 40 36 30 44 50z"/></g></svg>;
      case 'onion': return <svg {...iconProps}><style>{style}</style><g className="wobble"><path fill="#D2B4DE" d="M32 50C16 50 16 34 32 22C48 34 48 50 32 50z"/><path fill="#E8DAEF" d="M32 50C22 50 22 38 32 26C42 38 42 50 32 50z"/><path fill="#A569BD" d="M32 22 L 30 12 L 34 12 L 32 22z"/></g></svg>;
      case 'garlic': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path fill="#FDFEFE" d="M32 50 C 22 50 20 35 25 25 C 30 15 35 15 40 25 C 45 35 42 50 32 50z"/><path fill="#F4F6F6" d="M32 50 C 25 50 24 38 28 30"/><path fill="#EAECEE" d="M32 50 C 38 50 40 38 36 30"/></g></svg>;
      case 'tomato': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#27AE60" d="M36 18 l-4-6 -4 6 2-4 2 4 2-4 2 4z"/><circle cx="32" cy="36" r="16" fill="#E74C3C"/><circle cx="32" cy="36" r="16" fill="url(#shine-tomato)"/><defs><radialGradient id="shine-tomato" cx="0.25" cy="0.25" r="0.35"><stop offset="0%" stopColor="white" stopOpacity=".7"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs></g></svg>;
      case 'potato': return <svg {...iconProps}><style>{style}</style><g className="wobble"><ellipse cx="32" cy="36" rx="18" ry="12" fill="#D3A46F"/><circle cx="25" cy="34" r="1.5" fill="#A47B53"/><circle cx="38" cy="38" r="1" fill="#A47B53"/></g></svg>;
      case 'zucchini': return <svg {...iconProps}><style>{style}</style><g className="sway"><rect x="18" y="15" width="12" height="34" rx="6" fill="#2ECC71" transform="rotate(-10 32 32)"/><rect x="18" y="15" width="12" height="34" rx="6" fill="#27AE60" transform="rotate(-10 32 32)" clipPath="url(#clip-zucchini)"/><defs><clipPath id="clip-zucchini"><rect x="18" y="32" width="12" height="17" rx="6"/></clipPath></defs></g></svg>;
      case 'mushroom': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#EAEAEA" d="M22 48 V34 H42 V48z"/><path fill="#D9A982" d="M16 34 C16 22 48 22 48 34z"/></g></svg>;

      // Fruits
      case 'strawberry': return <svg {...iconProps}><style>{style}</style><g className="bounce"><path fill="#2ECC71" d="M32 15 L 36 20 L 30 20z"/><path fill="#E74C3C" d="M32 18 C 16 18 16 40 32 50 C 48 40 48 18 32 18z"/><circle cx="26" cy="30" r="1" fill="#F1C40F"/><circle cx="38" cy="30" r="1" fill="#F1C40F"/><circle cx="32" cy="38" r="1" fill="#F1C40F"/></g></svg>;
      case 'blueberries': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="24" cy="30" r="7" fill="#5DADE2"/><circle cx="38" cy="32" r="8" fill="#3498DB"/><circle cx="30" cy="42" r="6" fill="#85C1E9"/></g></svg>;
      case 'raspberries': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="24" cy="30" r="7" fill="#E74C3C"/><circle cx="38" cy="32" r="8" fill="#EC7063"/><circle cx="30" cy="42" r="6" fill="#F1948A"/></g></svg>;
      case 'apple': return <svg {...iconProps}><style>{style}</style><g><path fill="#7D5A4D" d="M32 18 V10 C32 6 36 6 36 10 S32 12 32 18z" /><path fill="#E74C3C" d="M32 20c-12 0-15 15-15 15s5 15 15 15 15-15 15-15-3-15-15-15z" /><path className="shine" fill="white" d="M22 24 A 15 15 0 0 1 38 24 A 10 10 0 0 1 22 24" /></g></svg>;
      case 'banana': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#F1C40F" d="M20 40 C 30 15 50 20 50 45 C 45 50 20 45 20 40z"/><path fill="#F39C12" d="M20 40 C 25 30 35 25 40 28" /></g></svg>;
      case 'orange': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="32" cy="34" r="16" fill="#F39C12"/><circle cx="32" cy="34" r="16" fill="url(#shine-orange)"/><defs><radialGradient id="shine-orange" cx="0.25" cy="0.25" r="0.35"><stop offset="0%" stopColor="white" stopOpacity=".5"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs></g></svg>;
      case 'avocado': return <svg {...iconProps}><style>{style}</style><g className="wobble"><path d="M32 16 C 20 16 18 35 24 50 L 40 50 C 46 35 44 16 32 16z" fill="#2ECC71"/><path d="M32 18 C 24 18 22 35 26 48 L 38 48 C 42 35 40 18 32 18z" fill="#82E0AA"/><circle cx="32" cy="38" r="8" fill="#A0522D"/></g></svg>;
      case 'lemon': return <svg {...iconProps}><style>{style}</style><g className="wobble"><ellipse cx="32" cy="34" rx="18" ry="12" fill="#F1C40F"/><path d="M50 34c0-2 0-4-1-6" stroke="#F39C12" strokeWidth="2" fill="none"/></g></svg>;
      case 'mango': return <svg {...iconProps}><style>{style}</style><g className="sway"><path fill="#F1C40F" d="M30 15 C 45 20 50 40 40 50 C 20 50 15 30 30 15z"/><path fill="#E67E22" d="M30 15 C 35 25 40 35 30 45" /></g></svg>;
      
      // Grains
      case 'brown rice': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path fill="#C39D6F" d="M20 30 L 25 28 L 27 33z"/><path fill="#A57F53" d="M30 35 L 35 33 L 37 38z"/><path fill="#D3B48F" d="M40 30 L 45 28 L 47 33z"/></g></svg>;
      case 'quinoa': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="24" cy="30" r="3" fill="#DED9C4"/><circle cx="36" cy="34" r="3" fill="#C9C0A6"/><circle cx="28" cy="42" r="3" fill="#E8E2CF"/></g></svg>;
      case 'pasta': return <svg {...iconProps}><style>{style}</style><g className="sway"><path d="M20 20 C 30 30 20 40 20 50" stroke="#FADCA5" strokeWidth="4" fill="none"/><path d="M32 20 C 42 30 32 40 32 50" stroke="#F9D189" strokeWidth="4" fill="none"/><path d="M44 20 C 54 30 44 40 44 50" stroke="#FFEBB9" strokeWidth="4" fill="none"/></g></svg>;
      case 'whole wheat bread': return <svg {...iconProps}><style>{style}</style><g className="wobble"><path fill="#B9936C" d="M14 45 h36 v-15 a18 12 0 0 0 -36 0z"/><path fill="#D3A46F" d="M16 43 h32 v-13 a16 10 0 0 0 -32 0z"/></g></svg>;
      case 'oats': return <svg {...iconProps}><style>{style}</style><g className="pulse"><ellipse cx="24" cy="30" rx="3" ry="5" fill="#EADCA6"/><ellipse cx="36" cy="34" rx="3" ry="5" fill="#D1B894"/><ellipse cx="28" cy="42" rx="3" ry="5" fill="#F1E4D2"/></g></svg>;

      // Herbs
      case 'oregano': return <svg {...iconProps}><style>{style}</style><g className="sway"><path stroke="#27AE60" strokeWidth="2" fill="none" d="M32 50 v-15"/><circle cx="26" cy="35" r="4" fill="#2ECC71"/><circle cx="38" cy="35" r="4" fill="#2ECC71"/><circle cx="32" cy="28" r="4" fill="#2ECC71"/></g></svg>;
      case 'parsley': return <svg {...iconProps}><style>{style}</style><g className="sway"><path stroke="#27AE60" strokeWidth="2" fill="none" d="M32 50 v-15"/><path fill="#2ECC71" d="M32 35 l-10 -5 l 5 -5 l 5 5 l 5 -5 l 5 5z"/></g></svg>;
      case 'basil': return <svg {...iconProps}><style>{style}</style><g className="sway"><path stroke="#27AE60" strokeWidth="2" fill="none" d="M32 50 v-15"/><ellipse cx="26" cy="32" rx="6" ry="4" fill="#2ECC71"/><ellipse cx="38" cy="32" rx="6" ry="4" fill="#2ECC71"/></g></svg>;
      
      // Spices
      case 'olive oil': return <svg {...iconProps}><style>{style}</style><g className="wobble"><path d="M24 50 h16 v-20 l-8-8 -8 8z" fill="#ABEBC6"/><path d="M32 10 L 30 22 H 34z" fill="#C0392B"/><path d="M26 50 h12 v-18 h-12z" fill="#F9E79F"/></g></svg>;
      case 'salt': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path d="M24 24 L 40 24 L 32 44z" fill="#ECF0F1" /><path d="M28 20 h8 v4 h-8z" fill="#BDC3C7"/><circle cx="30" cy="22" r="1" fill="#FFFFFF"/><circle cx="34" cy="22" r="1" fill="#FFFFFF"/></g></svg>;
      case 'black pepper': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path d="M24 24 L 40 24 L 32 44z" fill="#34495E" /><path d="M28 20 h8 v4 h-8z" fill="#2C3E50"/><circle cx="30" cy="22" r="1" fill="#7F8C8D"/><circle cx="34" cy="22" r="1" fill="#7F8C8D"/></g></svg>;
      case 'paprika': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path fill="#E74C3C" d="M20 45 L 32 20 L 44 45z"/><path fill="#C0392B" d="M32 20 L 20 45 h5z"/></g></svg>;

      // Nuts & Seeds
      case 'flax seeds': return <svg {...iconProps}><style>{style}</style><g className="pulse"><ellipse cx="24" cy="30" rx="5" ry="3" fill="#8E44AD"/><ellipse cx="36" cy="34" rx="5" ry="3" fill="#9B59B6"/><ellipse cx="28" cy="42" rx="5" ry="3" fill="#AF7AC5"/></g></svg>;
      case 'chia seeds': return <svg {...iconProps}><style>{style}</style><g className="pulse"><circle cx="24" cy="30" r="3" fill="#34495E"/><circle cx="36"cy="34" r="3" fill="#2C3E50"/><circle cx="28"cy="42" r="3" fill="#5D6D7E"/></g></svg>;
      case 'almonds': return <svg {...iconProps}><style>{style}</style><g className="pulse"><ellipse cx="25" cy="32" rx="8" ry="5" fill="#D3A46F" transform="rotate(-20 25 32)"/><ellipse cx="40" cy="35" rx="8" ry="5" fill="#B9936C" transform="rotate(15 40 35)"/></g></svg>;
      case 'walnuts': return <svg {...iconProps}><style>{style}</style><g className="pulse"><path d="M22 32 a 10 10 0 1 0 20 0 a 5 5 0 1 1-20 0" fill="#B9936C"/><path d="M22 32 a 10 10 0 1 1 20 0 a 5 5 0 1 0-20 0" fill="#D3A46F"/></g></svg>;
    }

    // This should ideally not be reached if all ingredients are covered.
    return (
        <svg viewBox="0 0 64 64" className={className}>
          <style>{`.fallback { animation: pulse 2s ease-in-out infinite; } @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }`}</style>
          <g className="fallback">
              <circle cx="32" cy="32" r="20" fill="#ECF0F1" />
              <circle cx="32" cy="32" r="18" fill="#BDC3C7" />
              <path d="M32,24l-6,10h12z" fill="white"/>
          </g>
        </svg>
    );
  };

  return getIcon();
};

export default AnimatedIngredientIcon;