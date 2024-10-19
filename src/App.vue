<script setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// Obtener el locale de i18n
const { locale } = useI18n();

// Definir la variable reactiva `lang`
const lang = ref("es"); // Valor por defecto (puede ser cualquier idioma)

// Controla el menú desplegable de selección de idioma
const openLang = ref(false);

// Función para detectar el idioma del navegador si no se ha seleccionado antes
const detectBrowserLanguage = () => {
  const browserLang = navigator.language.split("-")[0]; // "es", "en", "fr", etc.
  return ["es", "en", "fr"].includes(browserLang) ? browserLang : "en";
};

// Cargar idioma de `localStorage` o detectar idioma del navegador al iniciar
onMounted(() => {
  const storedLang = localStorage.getItem("app-lang");
  lang.value = storedLang ? storedLang : detectBrowserLanguage();
  locale.value = lang.value; // Sincroniza el idioma de i18n
});

// Observar cambios en `lang` y actualizar `locale` e `localStorage`
watch(lang, newLang => {
  locale.value = newLang; // Actualiza `vue-i18n` locale
  localStorage.setItem("app-lang", newLang); // Guarda el idioma en `localStorage`
});
</script>
<template>
  <div class="w-[100vw] bg-green flex justify-center items-center overflow-hidden">
    <div class="max-w-[500px] w-full h-full flex flex-col">
      <div
        class="bg-[#0C0E0B] shadow-md flex justify-between items-center min-h-[60px] px-4 fixed top-0 w-full max-w-[500px] z-50"
      >
        <router-link to="/">
          <img src="/img/logo.png" alt="logo" class="h-12 w-12" />
        </router-link>
        <!-- if url different than root, show button "back" to root -->
        <router-link v-if="$route.path != '/'" to="/" class="text-white">
          <div class="flex items-center justify-center space-x-2">
            <img src="/img/back.png" alt="back" class="h-4 w-4 mr-2" />
            {{ $t("back") }}
          </div>
        </router-link>
        <div @click="openLang = !openLang" class="relative w-[50px] flex justify-center z-[9999999]">
          <img v-if="lang == 'fr'" src="/img/france.png" alt="france" class="h-8 w-8" />
          <img v-if="lang == 'es'" src="/img/spain.png" alt="spain" class="h-8 w-8" />
          <img v-if="lang == 'en'" src="/img/uk.png" alt="english" class="h-8 w-8" />

          <Transition>
            <div
              v-if="openLang"
              class="absolute bg-white z-[50] top-[50px] py-2 rounded-lg flex flex-col items-center justify-center transition-all space-y-2"
              @click.stop
            >
              <img
                @click="
                  lang = 'fr';
                  openLang = false;
                "
                v-if="lang != 'fr'"
                src="/img/france.png"
                alt="france"
                class="h-10 w-10 mx-4"
              />
              <img
                @click="
                  lang = 'es';
                  openLang = false;
                "
                v-if="lang != 'es'"
                src="/img/spain.png"
                alt="spain"
                class="h-10 w-10 mx-4"
              />
              <img
                @click="
                  lang = 'en';
                  openLang = false;
                "
                v-if="lang != 'en'"
                src="/img/uk.png"
                alt="english"
                class="h-10 w-10 mx-4"
              />
            </div>
          </Transition>
        </div>

        <Transition>
          <div
            class="fixed inset-0 bg-black/50 z-[99999] transition-all ease-in-out duration-200"
            @click="openLang = false"
            v-if="openLang"
          ></div>
        </Transition>
      </div>
      <div class="flex flex-col h-full overflow-y-auto border-2 border-black">
        <router-view :lang="lang" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
