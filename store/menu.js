import {defineStore} from "pinia";
import {OZCOM,ACTIVITY,INTERACTIVE_SERVICES,DOCUMENTS,INFORMATION_SERVICE,NETWORK} from '../helpers/NavbarMenuListIDs'
import {useFetchApi} from "~/composables/useFetchApi";
import {useApi} from "~/composables/useApi";


export const useMenuStore = defineStore({
    id:'menu',
    state:()=>({
        menuList:[]
    }),
    getters:{
        getShortMenuList : (state)=>{
            const shortMenuNames = [OZCOM,ACTIVITY,INTERACTIVE_SERVICES,DOCUMENTS,INFORMATION_SERVICE,NETWORK]
            return  state.menuList.filter(m=>shortMenuNames.includes(m.name))
        },
        fullMenuList : (state)=>{
            return state.menuList
        }
    },
    actions:{
       async fetchMenuList(){
           const {data} = await useApi('/api/menu/','GET',{},'menu')
           if(data && data?.value) this.menuList = data.value
       },
       // getMenuBySubmenuSlug(slug){
       //      const allSubmenus = []
       //      this.menuList.forEach(menu=> menu.submenu.forEach(sm=> allSubmenus.push(sm)))
       //      const currentSubmenu = allSubmenus.find(submenu=>slug.includes(submenu.slug))
       //      if(currentSubmenu){
       //          const currentMenu = this.menuList.find((menu)=>menu.id ===  currentSubmenu.menu)
       //          return currentMenu
       //      }
       //      else return []
       //
       //  }
    }
})
