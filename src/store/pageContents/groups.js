
import { create } from "zustand";
import { getPageContents } from "../../apiCalls/pageContents"


export const useGroup = create((set) => ({
    group: [],

    set_group (position, payload) {
        return set((state) => {
            let group = [...state.group];
            group[position] = payload;

            return {group}
        });
    },

    get_group: async (position) => {
        const new_data = await getPageContents(position);

        return set((state) => {
            let group = [...state.group];

            if(new_data.length) 
             group = new_data;

            return {group};
        })
    }
}))