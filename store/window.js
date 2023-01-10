import {defineStore} from "pinia";



export const useWindowSizeStore = defineStore({
    id:'window',
    state:()=>({
        windowSize:null
    }),
    getters: {
        getWindowSize: (state) => state.windowSize,
        isWindowSmallerThanXL:(state)=> state.windowSize < 1140,
        isWindowSmallerThanMD:(state)=> state.windowSize < 768,
    },
    actions:{
        setWindowSize(size){
            this.windowSize = size
        }
    },
})
