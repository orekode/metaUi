
import { create } from "zustand";
import { getPageContents } from "../../apiCalls/pageContents"


export const useHome = create((set) => ({
    home: {

        home_left_right_one: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                The Metas Educational was established in June 2022 with the purpose of assisting the needy through monetary assistance, goods, paying school fees, and educational materials. We believe that quality, affordable education should be available to all children regardless of socio-economic status or background. To achieve this goal, we aim to partner with schools to provide access and opportunities through the provision of necessary items that will help create and maintain a sustainable learning environment.
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'home_left_right_one',
        },

        home_card_one: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                We've partnered with 6 schools, providing uniforms, textbooks, and essentials. Installed water pumps and provided Audio-Visual aids to enhance learning." 
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'home_card_one',
        },

        home_card_two: {
            position: 'home_card_two',
        },

        home_card_three: {
            position: 'home_card_three',
        },

        home_card_four: {
            position: 'home_card_four',
        },

        home_card_five: {
            position: 'home_card_five',
        },

        home_card_six: {
            position: 'home_card_six',
        },

        home_card_seven: {
            position: 'home_card_seven',
        },

        home_left_right_two: {
            position: 'home_left_right_two',
        },

        about_left_right_one: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                The Metas Educational was established in June 2022 with the purpose of assisting the needy through monetary assistance, goods, paying school fees, and educational materials. We believe that quality, affordable education should be available to all children regardless of socio-economic status or background. To achieve this goal, we aim to partner with schools to provide access and opportunities through the provision of necessary items that will help create and maintain a sustainable learning environment.
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'about_left_right_one',
        },

        about_left_right_two: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                The Metas Educational was established in June 2022 with the purpose of assisting the needy through monetary assistance, goods, paying school fees, and educational materials. We believe that quality, affordable education should be available to all children regardless of socio-economic status or background. To achieve this goal, we aim to partner with schools to provide access and opportunities through the provision of necessary items that will help create and maintain a sustainable learning environment.
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'about_left_right_two',
        },

        about_left_right_three: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                The Metas Educational was established in June 2022 with the purpose of assisting the needy through monetary assistance, goods, paying school fees, and educational materials. We believe that quality, affordable education should be available to all children regardless of socio-economic status or background. To achieve this goal, we aim to partner with schools to provide access and opportunities through the provision of necessary items that will help create and maintain a sustainable learning environment.
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'about_left_right_three',
        },

        about_card_one: {
            url: "/images/header.jpeg",
            title: "Empowering The Needy",
            content: `
                We've partnered with 6 schools, providing uniforms, textbooks, and essentials. Installed water pumps and provided Audio-Visual aids to enhance learning." 
            `,
            link_label: "Reach Out To Us",
            link: "/programs",
            position: 'about_card_one',
        },

        contact_us_title: {
            position: "contact_us_title"
        },

        contact_us_location: {
            position: "contact_us_location"
        },

        contact_us_contact: {
            position: "contact_us_contact"
        },

        contact_us_form: {
            position: "contact_us_form"
        },

        donation_page_header: {
            title: "empower change with every donations",
            content: "Your generous donation can make a significant impact, bringing hope and opportunities to children in need. Together, let's build a brighter future.",
            position: "donation_page_header",
        },

        donation_page_btn_one: {
            link_label: "Donate Now",
            position: "donation_page_btn_one"
        },

        donation_page_btn_two: {
            link_label: "Anonymous Donation",
            position: "donation_page_btn_two"
        }


    },

    set_home (position, payload) {
        return set((state) => {
            let home = {...state.home};
            home[position] = payload;

            return {home}
        });
    },

    get_home: async (position) => {
        const new_data = await getPageContents(position);

        return set((state) => {
            let home = {...state.home};

            if(new_data.length > 0) 
             home[position] = new_data[0];

            return {home};
        })
    }
}))