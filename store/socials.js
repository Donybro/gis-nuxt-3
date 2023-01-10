import { defineStore } from "pinia";
import { getConnectionStaticFields } from "~/api/getConnectionData";

export const useSocialMediaStore = defineStore({
  id: "socials",
  state: () => ({
    facebook: "",
    instagram: "",
    telegram: "",
    youtube: "",
  }),
  getters: {
    getSocials: (state) => {
      return {
        facebook: state.facebook,
        instagram: state.instagram,
        telegram: state.telegram,
        youtube: state.youtube,
      };
    },
  },
  actions: {
    async fetchSocials() {
      const { data } = await getConnectionStaticFields();
      if (data && data?.value[0]) {
        const { facebook, instagram, telegram, youtube } = data?.value[0];
        this.facebook = facebook;
        this.instagram = instagram;
        this.telegram = telegram;
        this.youtube = youtube;
      }
    },
  },
});
