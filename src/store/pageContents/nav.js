import { create } from "zustand";
import { getNavs } from "../../apiCalls/pageContents/nav";

export const useNav = create((set) => ({
    nav_links: [
        {
            link_label: "Home",
            link: '/',
        },

        {
            link_label: "Who we are",
            link: '/'
        },

        {
            link_label: "Programs",
            link: '/',
        },

        {
            link_label: "Contact Us",
            link: '/',
        },

        {
            link_label: "Gallery",
            link: '/'
        },
    ],

    set_nav_links (nav_links) {
        return set((state) => ({nav_links}))
    },

    get_nav_links: async () => {
        const links = await getNavs();
        
        return set((state) => {

            if(links.length && links.length >= state.nav_links.length) {

                return {nav_links: links};
            }

            return state;

        })
        
    }
}))

