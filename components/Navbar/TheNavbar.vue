<template>
  <div class="relative">
    <div id="particles-js" class="absolute top-0 left-0 w-full h-full z-[0]"></div>
    <div class="relative z-[1]">
        <marquee behavior="alternate" direction="left">
        <span class="my-[6px] px-[12px] font-montserrat text-center text-[#d8aa63]">
          {{ $t('common.site-working-on-test-mode') }}
        </span>
        </marquee>
      <div class="border-b-[1px] border-[#5C587A]">
        <NavbarTop :socials="socials"/>
      </div>
      <NavbarBottom class="hidden xl:flex container mx-auto"/>
    </div>
  </div>
</template>

<script setup>
import NavbarTop from "./NavbarTop";
import NavbarBottom from "./NavbarBottom";
import {useSocialMediaStore} from "~/store/socials";

const socialMediaStore = useSocialMediaStore()

const socials = computed(() => socialMediaStore.getSocials)
// onMounted(() => {
//   particlesJS('particles-js', {
//     "particles": {
//       "number": {
//         "value": 250,
//         "density": {
//           "enable": true,
//           "value_area": 1200
//         }
//       },
//       "color": {
//         "value": "#ffffff"
//       },
//       "shape": {
//         "type": "image",
//         "stroke": {
//           "width": 3,
//           "color": "#fff"
//         },
//         "polygon": {
//           "nb_sides": 5
//         },
//         "image": {
//           "src": snow,
//           "width": 50,
//           "height": 50
//         }
//       },
//       "opacity": {
//         "value": 0.7,
//         "random": false,
//         "anim": {
//           "enable": false,
//           "speed": 1,
//           "opacity_min": 0.1,
//           "sync": false
//         }
//       },
//       "size": {
//         "value": 5,
//         "random": true,
//         "anim": {
//           "enable": false,
//           "speed": 20,
//           "size_min": 0.1,
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enable": false,
//         "distance": 50,
//         "color": "#ffffff",
//         "opacity": 0.6,
//         "width": 1
//       },
//       "move": {
//         "enable": true,
//         "speed": 2,
//         "direction": "bottom",
//         "random": true,
//         "straight": false,
//         "out_mode": "out",
//         "bounce": false,
//         "attract": {
//           "enable": true,
//           "rotateX": 300,
//           "rotateY": 1200
//         }
//       }
//     },
//     "interactivity": {
//       "detect_on": "canvas",
//       "events": {
//         "onhover": {
//           "enable": true,
//           "mode": "bubble"
//         },
//         "onclick": {
//           "enable": true,
//           "mode": "repulse"
//         },
//         "resize": true
//       },
//       "modes": {
//         "grab": {
//           "distance": 150,
//           "line_linked": {
//             "opacity": 1
//           }
//         },
//         "bubble": {
//           "distance": 200,
//           "size": 40,
//           "duration": 2,
//           "opacity": 8,
//           "speed": 3
//         },
//         "repulse": {
//           "distance": 200,
//           "duration": 0.2
//         },
//         "push": {
//           "particles_nb": 4
//         },
//         "remove": {
//           "particles_nb": 2
//         }
//       }
//     },
//     "retina_detect": true
//   });
// })

</script>

<style scoped>

</style>
