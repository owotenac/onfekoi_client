import React from 'react';

interface Category {
    title: string;
    imageSource: any;
    accentColor: string;
    route: () => void;
}

export interface HomeScreenProps {
    categories?: Category[];
}

declare const HomeScreen: React.FC<HomeScreenProps>;
export default HomeScreen;