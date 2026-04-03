import { create } from "zustand";
import { Departement } from "../model/departement";
import { Type } from "../model/products";


type CurrentProductsFilterState = {
    mainType: string;
    setMainType: (type: string) => void;

    department : Departement;
    setDepartment: (dept: Departement) => void;

    currentProductFilter: Type[];
    setProductFilter: (filterIds: Type[]) => void;

    geolocalizedResults : boolean
    setGeolocalizedResults: (geo: boolean) => void;
}

export const useFilterStore = create<CurrentProductsFilterState>((set) => ({
    mainType: '',
    setMainType: (type) => set({ mainType: type }),

    department: { code: '', nom: '' },
    setDepartment: (dept) => set({ department: dept }),

    currentProductFilter: [],
    setProductFilter: (filterIds) => set({ currentProductFilter: filterIds }),

    geolocalizedResults: false,
    setGeolocalizedResults: (geo) => set({ geolocalizedResults: geo }),
}));