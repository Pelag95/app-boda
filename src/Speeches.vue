<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import { useRouter } from "vue-router"; // Importar useRouter
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

// import props lang passed from component
const props = defineProps({
  lang: {
    type: String, // Specify the type of the prop
    required: true, // Optional: Make it required if `lang` should always be passed
  },
});

const router = useRouter(); // Crear una instancia del router
const speeches_en = ref([]);
const speeches_fr = ref([]);
const speeches_es = ref([]);

// Computed property to dynamically select the speech array based on the language prop
const selectedSpeeches = computed(() => {
  switch (props.lang) {
    case "fr":
      return speeches_fr.value;
    case "es":
      return speeches_es.value;
    default:
      return speeches_en.value;
  }
});

const scrollToText = title => {
  // Get all h3 elements
  const elements = document.querySelectorAll("h3");

  // Find the one that contains the title
  const element = Array.from(elements).find(el => el.textContent.trim() === title);

  if (element) {
    // Get the position of the element
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    // Scroll to the element position minus the offset (150px)
    window.scrollTo({
      top: elementPosition - 150,
      behavior: "smooth",
    });
  }
};

onMounted(async () => {
  await fetch("/speeches_en.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // Ordenar por nombre
      speeches_en.value = data;
    })
    .catch(error => {
      console.error("Hubo un problema con la carga del archivo:", error);
    });
  await fetch("/speeches_fr.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // Ordenar por nombre
      speeches_fr.value = data;
    })
    .catch(error => {
      console.error("Hubo un problema con la carga del archivo:", error);
    });
  await fetch("/speeches_es.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // Ordenar por nombre
      speeches_es.value = data;
    })
    .catch(error => {
      console.error("Hubo un problema con la carga del archivo:", error);
    });
});

const alternatingText = speech => {
  if (!speech) return "";
  // check if all speeches have at least 1 length
  if (speeches_en.value.length === 0 || speeches_fr.value.length === 0 || speeches_es.value.length === 0) {
    return "";
  }

  // Check if the user's language matches the speech's language.
  if (props.lang === speech.language) {
    const originalSentences = speech.text.split(/(?<=[.!?])\s+/);
    const alternatingOutput = [];
    const maxLength = Math.max(originalSentences.length);
    for (let i = 0; i < maxLength; i++) {
      // Create a div for each translated sentence, with the class "italic".
      if (originalSentences[i]) {
        let translatedDiv = `<div >${originalSentences[i]}</div>`;
        alternatingOutput.push(translatedDiv);
      }
    }

    // Join the alternating divs and return as a single HTML-formatted string.
    return alternatingOutput.join("");
  } else {
    // Determine which is the original language and the target language for translation.
    let transText = speech.text;
    let originalText = null;
    if (speech.language == "es") {
      originalText = speeches_es.value.find(s => s.title === speech.title).text;
    } else if (speech.language == "fr") {
      originalText = speeches_fr.value.find(s => s.title === speech.title).text;
    } else {
      originalText = speeches_en.value.find(s => s.title === speech.title).text;
    }

    // Step 1: Split the original text into sentences using a regular expression.
    const translatedSentences = originalText.split(/(?<=[.!?])\s+/);
    const originalSentences = speech.text.split(/(?<=[.!?])\s+/);

    // Step 3: Alternate sentences: 1 original, 1 translated, etc.
    const alternatingOutput = [];
    const maxLength = Math.max(originalSentences.length, translatedSentences.length);

    for (let i = 0; i < maxLength; i++) {
      // Create a div for each original sentence.
      if (originalSentences[i]) {
        let originalDiv = `<div >${originalSentences[i]}</div>`;
        alternatingOutput.push(originalDiv);
      }
      // Create a div for each translated sentence, with the class "italic".
      if (translatedSentences[i]) {
        let translatedDiv = `<div class="italic">${translatedSentences[i]}</div>`;
        alternatingOutput.push(translatedDiv);
      }
    }

    // Join the alternating divs and return as a single HTML-formatted string.
    return alternatingOutput.join("");
  }
};
</script>

<template>
  <div class="w-full flex flex-col pt-[60px] bg-white leading-tight">
    <div class="bg-green p-6 flex flex-col justify-center items-center">
      <img src="/img/microphone.png" alt="title" class="h-[50px] w-[50px]" />
      <h1 class="text-black text-3xl font-bold mt-4 text-center">{{ $t("speech.title") }}</h1>
      <p class="text-black text-xl font-bold mt-4 text-center leading-tight">{{ $t("speech.subtitle") }}</p>
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
    <p class="text-black text-xl font-bold text-center mt-[90px]">{{ $t("speech.click") }}</p>
    <div class="w-full px-[10%]">
      <!-- add a div that iterates over speeches and scroll to corresponding text on click -->
      <div
        v-for="speech in selectedSpeeches.sort((a, b) => a.order - b.order)"
        :key="speech.title"
        @click="() => scrollToText(speech.title)"
        class="flex flex-col justify-between items-center cursor-pointer w-full rounded-full my-2 bg-[#ECE7DC] border border-black"
      >
        <div class="flex justify-center items-center space-x-2">
          <p class="text-xl">{{ speech.title }}</p>
          <img v-if="speech.language == 'fr'" src="/img/france.png" alt="france" class="h-4 w-4" />
          <img v-if="speech.language == 'es'" src="/img/spain.png" alt="spain" class="h-4 w-4" />
          <img v-if="speech.language == 'en'" src="/img/uk.png" alt="english" class="h-4 w-4" />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center px-6">
      <template v-for="speech in selectedSpeeches.sort((a, b) => a.order - b.order)">
        <img src="/img/hr1.webp" alt="title" class="my-12 w-1/2" />
        <div class="flex justify-center items-center space-x-4">
          <h3 class="text-2xl">{{ speech.title }}</h3>
          <img v-if="speech.language == 'fr'" src="/img/france.png" alt="france" class="h-8 w-8" />
          <img v-if="speech.language == 'es'" src="/img/spain.png" alt="spain" class="h-8 w-8" />
          <img v-if="speech.language == 'en'" src="/img/uk.png" alt="english" class="h-8 w-8" />
        </div>
        <p v-html="alternatingText(speech)" class="text-lg my-6 text-center leading-snug flex flex-col space-y-3"></p>
        <img src="/img/hr1.webp" alt="title" class="my-6 w-1/2 rotate-180" />
      </template>
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
</style>
