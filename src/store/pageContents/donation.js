import { create } from "zustand";
import { getPageContents } from "../../apiCalls/pageContents"


export const useDonationBtn = create((set) => ({
    donation_btn: {
        link_label: "Make a Donation",
    },

    set_donation_btn (donation_btn) {
        return set((state) => donation_btn);
    },

    get_donation_btn: async () => {
        const donation_btn = await getPageContents("donation_btn");
        
        return set((state) => {
            if(donation_btn.length > 0 && donation_btn[0].image) 
             return {donation_btn: {...donation_btn[0], url: donation_btn[0].image}};

            return state;
        })

    }
}))