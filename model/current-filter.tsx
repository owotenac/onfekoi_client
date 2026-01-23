import { create } from "zustand";
import { Type } from "./products";

type CurrentProductsFilterState = {
    currentProductFilter: Type[]
    setProductFilter: (filterIds: Type[]) => void
}

export const productFilterStore = create<CurrentProductsFilterState>((set) => ({
    currentProductFilter: [],

    setProductFilter: (filterIds) => {
        set({
            currentProductFilter: filterIds,
        })
    },

}))
