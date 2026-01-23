// import { create } from "zustand";
// import { ProductProps } from "./products";

// type CurrentState = {
//     currentProduct : ProductProps;
//     setCurrentProduct: (p: ProductProps) => void

//     items : ProductProps[]
//     setItems: (i: ProductProps[] | ((prev: ProductProps[]) => ProductProps[])) => void 

//     nextPage: string
//     setNextPage: (p: string) => void
// }

// export const appStore = create<CurrentState>((set) => ({
//     currentProduct: {} as ProductProps,
//     setCurrentProduct: (_p: ProductProps) => set({ currentProduct: _p }),

//     items: {} as ProductProps[],
//     setItems: (_i: ProductProps[] | ((prev: ProductProps[]) => ProductProps[])) => 
//         set((state) => ({
//             items: typeof _i === 'function' ? _i(state.items) : _i
//     })),

//     nextPage: {} as string,
//     setNextPage: (p: string) => set({nextPage: p})
// }))