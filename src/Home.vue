<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

// import props lang passed from component
const props = defineProps({
  lang: {
    type: String, // Specify the type of the prop
    required: true, // Optional: Make it required if `lang` should always be passed
  },
});
const linkProgram = () => {
  // open PDF in public folder in new tab based on language
  if (props.lang == "en") {
    window.open("/en.pdf", "_blank");
  } else if (props.lang == "fr") {
    window.open("/fr.pdf", "_blank");
  } else {
    window.open("/es.pdf", "_blank");
  }
};

const photos = () => {
  window.open(
    "https://weduploader.com/upload/5MkhIj5yOyErDfhK?utm_source=gdoc&utm_medium=qrcode&utm_campaign=guestsign&utm_content=5MkhIj5yOyErDfhK",
    "_blank"
  );
};
</script>
<template>
  <div class="h-full w-full flex flex-col pt-[55px]">
    <div class="w-full h-[400px] relative">
      <img
        src="/img/toshop_enhanced.webp"
        alt="background photo"
        class="w-full h-full object-cover object-top brightness-[.2] z-20"
      />
      <div class="absolute inset-0 bg-green/10 mix-soft-light z-20"></div>
      <img
        src="/img/title2.webp"
        alt="title"
        class="absolute left-0 right-0 m-auto z-30 top-12 w-[65%] transform rotate-[1.25]"
      />
    </div>
    <div class="relative">
      <div class="custom-shape-divider-bottom-1728252372">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <!-- <img src="/img/detail1.webp" alt="title" class="w-full absolute bottom-full z-[40] -mb-[2px]" /> -->
    </div>
    <div class="flex-grow bg-white w-full flex flex-col justify-between items-center pt-12 py-6 px-6 space-y-6 rounded-t-lg">
      <!-- <img src="/img/bleft.webp" alt="title" class="absolute -bottom-2 -left-2 h-[50px]" />
        <img src="/img/tright.webp" alt="title" class="absolute -top-2 -right-2 h-[50px]" /> 
        <img src="/img/corner.webp" alt="title" class="absolute -top-2 -left-2 h-[20px]" /> -->
      <!-- <img src="/img/hr1.webp" alt="title" class="w-1/2" /> -->
      <router-link to="/speeches" class="w-full flex flex-col">
        <div
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/microphone.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("speeches") }}
          </div>
          <img src="/img/microphone.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("speeches2") }}</p>
      </router-link>
      <router-link to="/babel-tower" class="w-full flex flex-col">
        <div
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/tower-of-babel.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("babel_tower") }}
          </div>
          <img src="/img/tower-of-babel.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("babel_tower2") }}</p>
      </router-link>
      <div class="w-full">
        <div
          @click="linkProgram"
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/clock.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("program") }}
          </div>
          <img src="/img/clock.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("program2") }}</p>
      </div>
      <div @click="photos" class="w-full flex flex-col">
        <div
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/camera.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("photos") }}
          </div>
          <img src="/img/camera.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("photos2") }}</p>
      </div>
      <router-link to="/guestbook" class="w-full flex flex-col">
        <div
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/guestbook.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("guestbook") }}
          </div>
          <img src="/img/guestbook.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("guestbook2") }}</p>
      </router-link>
      <router-link to="/information" class="w-full flex flex-col">
        <div
          class="w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-3xl font-bold rounded-t-md relative shadow-md py-2 px-2"
        >
          <img src="/img/info.png" alt="title" class="h-[25px]" />
          <div class="px-4 flex items-center font-['Dream_Avenue'] mt-1 uppercase">
            {{ $t("information") }}
          </div>
          <img src="/img/info.png" alt="title" class="h-[25px] -scale-x-100" />
        </div>
        <p class="font-bold w-full text-center bg-[#0C0E0B] text-white rounded-b-md px-2">{{ $t("information2") }}</p>
      </router-link>
      <img src="/img/hr1.webp" alt="title" class="w-1/2 rotate-180 py-6" />
    </div>
  </div>
</template>

<style lang="scss">
.v-enter-from {
  opacity: 0;
  translate: 0 -50px;
}
.v-enter-to {
  opacity: 1;
  translate: 0 0;
}
.v-leave-from {
  opacity: 1;
  translate: 0 0;
}
.v-leave-to {
  opacity: 0;
  translate: 0 -25px;
}
.custom-shape-divider-bottom-1728252372 {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1728252372 svg {
  position: relative;
  display: block;
  width: calc(160% + 1.3px);
  height: 40px;
}

.custom-shape-divider-bottom-1728252372 .shape-fill {
  fill: #ffffff;
}
</style>
