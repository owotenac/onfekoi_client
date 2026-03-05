import { create } from "zustand";
import { Type } from "./products";

type CurrentProductsFilterState = {
    mainType: string;
    setMainType: (type: string) => void;

    currentProductFilter: Type[];
    setProductFilter: (filterIds: Type[]) => void;

    geolocalizedResults : boolean
    setGeolocalizedResults: (geo: boolean) => void;
}

export const useFilterStore = create<CurrentProductsFilterState>((set) => ({
    mainType: '',
    setMainType: (type) => set({ mainType: type }),

    currentProductFilter: [],
    setProductFilter: (filterIds) => set({ currentProductFilter: filterIds }),

    geolocalizedResults: false,
    setGeolocalizedResults: (geo) => set({ geolocalizedResults: geo }),
}));