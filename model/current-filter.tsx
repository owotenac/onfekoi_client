import { create } from "zustand";
import { Type } from "./products";

type CurrentProductsFilterState = {
    mainType: string;
    setMainType: (type: string) => void;

    currentProductFilter: Type[];
    setProductFilter: (filterIds: Type[]) => void;
}

export const productFilterStore = create<CurrentProductsFilterState>((set) => ({
    mainType: '',
    setMainType: (type) => set({ mainType: type }),

    currentProductFilter: [],
    setProductFilter: (filterIds) => set({ currentProductFilter: filterIds }),
}));