import React from 'react';
import type { DiscoverItem } from '../types';
import CarouselCard from './CarouselCard';

interface CarouselProps {
    title: string;
    items: DiscoverItem[];
}

// A helper style to hide scrollbars
const style = document.createElement('style');
style.innerHTML = `
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;
document.head.appendChild(style);


const Carousel: React.FC<CarouselProps> = ({ title, items }) => {
    return (
        <section className="space-y-3">
            <h2 className="text-xl font-display font-bold text-gray-800 px-4">
                {title}
            </h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                {items.map(item => (
                    <CarouselCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Carousel;
