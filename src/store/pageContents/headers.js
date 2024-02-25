import { create } from "zustand";
import { getPageContents } from "../../apiCalls/pageContents"


export const useHomeHeader = create((set) => ({
    home_header: {
        url: "/images/header.jpeg",
        title: "Educating and Empowering the Nigerian Youth",
        content: "To care for our kids and young ones, indeed the future of the Nigerian youth through education and empowerment programs and outreach",
        link_label: "Ongoing Programs",
        link: "/programs"
    },

    set_home_header (home_header) {
        return set((state) => home_header);
    },

    get_home_header: async () => {
        const home_header = await getPageContents("home_header");

        return set((state) => {
            if(home_header.length > 0 && home_header[0].image) 
             return {home_header: {...home_header[0]}};

            return state;
        })
    }
}))