<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Importar useRouter
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const router = useRouter(); // Crear una instancia del router
const users = ref([]);
const user = ref(null);
const selectedUser = ref(null);
const selectedCountry = ref(null);

onMounted(() => {
  fetch("/users.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // Ordenar por nombre
      console.log(data);
      users.value = data.sort((a, b) => a.mote.localeCompare(b.Mote));
    })
    .catch(error => {
      console.error("Hubo un problema con la carga del archivo:", error);
    });

  // fetch selecteduser in localstorage
  const storedUser = localStorage.getItem("selectedUser");
  user.value = storedUser ? JSON.parse(storedUser) : null;
  if (user.value) {
    selectedUser.value = user.value;
  }
});

// Almacenar el usuario seleccionado en localStorage y navegar
const storeSelectedUser = () => {
  localStorage.setItem("selectedUser", JSON.stringify(selectedUser.value));
  if (selectedUser.nationality === "es") {
    localStorage.setItem("findFrom", JSON.stringify("fr"));
  } else if (selectedUser.nationality === "fr") {
    localStorage.setItem("findFrom", JSON.stringify("es"));
  } else {
    localStorage.setItem("findFrom", JSON.stringify(selectedCountry.value));
  }
  router.push("/babel-tower/game"); // Navegar a la ruta deseada
};
</script>

<template>
  <div class="w-full flex flex-col pt-[60px] bg-white leading-tight">
    <div class="bg-green p-6 flex flex-col justify-center items-center">
      <img src="/img/tower-of-babel.png" alt="title" class="h-[50px] w-[50px]" />
      <h1 class="text-black text-3xl font-bold mt-4 text-center">{{ $t("babel.title") }}</h1>
      <p class="text-black text-xl font-bold mt-4 text-center leading-tight">{{ $t("babel.subtitle") }}</p>
    </div>
    <div class="relative">
      <div class="custom-shape-divider-top-1728252536">
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
    </div>
    <div class="flex flex-col justify-center items-center px-6 mt-[80px]">
      <h3 class="text-4xl">{{ $t("babel.start") }}</h3>
      <p class="text-lg text-center">{{ $t("babel.start2") }}</p>
      <div class="w-full flex flex-col justify-center items-center">
        <v-select
          v-if="users.length >= 1"
          :options="users"
          v-model="selectedUser"
          :placeholder="$t('babel.findname')"
          :getOptionLabel="user => user.mote + ' (' + user.full_name + ')'"
          class="w-full mt-4 border-green border-2 rounded-lg"
        >
        </v-select>
        <p v-else>No users available</p>
        <!-- Message for when there are no users -->
        <div v-if="selectedUser" class="mt-4 flex flex-col justify-center items-center text-center">
          <!-- <div v-if="selectedUser.nationality == 'en' && selectedCountry == null">
            <p>
              {{ $t("babel.areyou3") }}
            </p>
            <p class="font-bold text-lg mt-2">
              {{ $t("babel.areyou4") }}
            </p>
            <div class="w-full flex justify-center space-x-6 mt-2">
              <img @click="selectedCountry = 'fr'" src="/img/france.png" alt="france" class="h-12 w-12" />
              <img @click="selectedCountry = 'es'" src="/img/spain.png" alt="spain" class="h-12 w-12" />
            </div>
          </div> -->
          <div v-if="selectedUser">
            <p>
              {{ $t("babel.areyou1") }}: <strong>{{ selectedUser.full_name }}</strong
              >. <br />{{ $t("babel.areyou2") }}
            </p>
            <div
              @click="storeSelectedUser"
              class="mt-4 w-full bg-green hover:saturate-[2] flex justify-between items-center text-black text-xl font-bold rounded-md relative shadow-md py-2"
            >
              <div class="px-4 flex items-center">
                {{ $t("babel.letsplay") }}
              </div>
              <img src="/img/side.webp" alt="title" class="px-2 rotate-180 h-[20px] opacity-70" />
            </div>
          </div>
        </div>
      </div>
      <img src="/img/hr1.webp" alt="title" class="my-12 w-1/2 rotate-180" />
    </div>
    <div class="mt-3 flex flex-col justify-center items-center px-4 text-center">
      <div class="bg-green shadow-md flex flex-col justify-center items-center p-6 rounded-lg mb-12">
        <h3 class="text-4xl">{{ $t("babel.rules") }}</h3>
        <p class="text-xl" v-html="$t('babel.rules2')"></p>
        <img src="/img/hr1.webp" alt="title" class="my-6 w-1/2 rotate-180" />
        <h3 class="text-4xl">{{ $t("babel.prize") }}</h3>
        <DotLottieVue style="height: 200px; width: 200px" autoplay loop class="-mt-6" :src="'/prize.json'" />
        <p class="text-lg">{{ $t("babel.prize2") }}</p>
      </div>
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
@import "vue-select/dist/vue-select.css";
.custom-shape-divider-top-1728252536 {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1728252536 svg {
  position: relative;
  display: block;
  width: calc(130% + 1.3px);
  height: 50px;
}

.custom-shape-divider-top-1728252536 .shape-fill {
  fill: #ece7dc;
}
</style>
