import React from 'react';
import type { DiscoverItem } from '../types';

interface CarouselCardProps {
    item: DiscoverItem;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ item }) => {
    return (
        <button className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden relative shadow-md group transition-transform duration-300 ease-in-out hover:-translate-y-1">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-3">
                <h3 className="text-white font-bold text-base leading-tight drop-shadow-md">{item.title}</h3>
            </div>
        </button>
    );
};

export default CarouselCard;
