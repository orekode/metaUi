

import { create } from "zustand";

export const usePageDna = create((set) => ({
    page_dna: "",
    set_dna (page_chromosome) {
        return set((state) => ({
            page_dna: state.page_dna + page_chromosome
        }))
    }
}))