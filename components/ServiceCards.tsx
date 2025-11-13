'use client';

import { useMemo } from 'react';

interface CardDetail {
    icon: React.ReactNode;
    text: string;
}

export interface ServiceCardData {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    icon: React.ReactNode;
    category: string; // This is the key for filtering
    details: CardDetail[];
}

interface ServiceCardsProps {
    filter: string;
    cards: ServiceCardData[];
}

const ServiceCards: React.FC<ServiceCardsProps> = ({ filter, cards }) => {
    // Memoize the filtered list so it only recalculates when the filter or cards change
    const filteredCards = useMemo(() => {
        // If 'All Services' is selected, return all cards
        if (filter === 'All Services') {
            return cards;
        }
        // Otherwise, filter by the category
        return cards.filter(card => card.category === filter);
    }, [filter, cards]);

    // Show a message if no cards match the filter
    if (filteredCards.length === 0) {
        return (
            <div className="w-full max-w-6xl text-center mt-10 py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No services found for this category.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-20">
            {filteredCards.map((card) => (
                <div
                    key={card.id}
                    // This container has the hover effect you wanted
                    className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 flex flex-col"
                >
                    {/* Image Section */}
                    <div
                        className="relative w-full h-56 bg-cover bg-center"
                        style={{ backgroundImage: `url(${card.image})` }}
                    >
                        {/* Price Tag */}
                        <span className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {card.price}
                        </span>

                        {/* Main Icon (bottom left) */}
                        <div className="absolute bottom-4 left-4 bg-white text-black p-3 rounded-full shadow-lg">
                            {card.icon}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-left">{card.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed text-left">
                            {card.description}
                        </p>
                    </div>

                    {/* Footer Details Section */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            {card.details.map((detail, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="text-gray-500">{detail.icon}</span>
                                    <span className="truncate">{detail.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCards;