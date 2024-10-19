<template>
  <div class="flex justify-between items-center w-[90vw] sm:w-[500px] lg:w-[1100px] mx-auto lg:mt-[200px] mt-[150px]">
    <div class="flex flex-col justify-center items-center bg-white rounded-3xl w-full px-4 lg:px-12 py-12 mb-24 shadow-lg">
      <h2 class="text-black pb-2 border-b-4 mt-4 border-solid border-orange text-3xl mb-6 font-bold text-center">
        404 - Page non trouvée !
      </h2>
      <p class="w-3/4 text-center font-bold text-sm">
        Nous n'avons pas pu trouver la page que vous recherchiez.<br />
        Utilisez le bouton ci-dessous pour retrouver l'Accueil du site !
      </p>
      <router-link to="/">
        <button
          class="hover:border-orange hover:text-black transition ease-in-out transform duration-300 border-orange border-[3px] text-orange rounded-md font-bold text-xl cursor-pointer px-4 py-2 text-center w-full mt-6"
        >
          Vers l'Accueil
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "404",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fef1ea inset !important;
  -webkit-text-fill-color: black !important;
}
</style>
