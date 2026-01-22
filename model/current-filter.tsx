import { create } from "zustand";

type CurrentProductsFilterState = {
    currentProductFilter: string[]
    setProductFilter: (filterIds: string[]) => void
}

export const productFilterStore = create<CurrentProductsFilterState>((set) => ({
    currentProductFilter: [],

    setProductFilter: (filterIds) => {
        set({
            currentProductFilter: filterIds,
        })
    },

}))
