<script setup>
import { ref, onMounted, nextTick, computed, watch } from "vue";
import { useRouter } from "vue-router"; // Importar useRouter
import { useI18n } from "vue-i18n";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const { t } = useI18n();
const router = useRouter(); // Crear una instancia del router
const user = ref(null);
const users = ref([]);
const country = ref(null);
const questions = ref([]);
const selectedQuestion = ref(null);
const answer = ref(null);
const incorrect = ref(null);
const winner = ref(false);

onMounted(async () => {
  // fetch selecteduser in localstorage
  const storedUser = localStorage.getItem("selectedUser");
  user.value = storedUser ? JSON.parse(storedUser) : null;

  if (user.value == null) {
    router.push("/babel-tower");
  }

  const storedCountry = localStorage.getItem("findFrom");
  country.value = storedCountry ? JSON.parse(storedCountry) : null;

  await fetch("/users.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json(); // Convertir a JSON
    })
    .then(data => {
      // Ordenar por nombre
      users.value = data.sort((a, b) => a.full_name.localeCompare(b.full_name));
    })
    .catch(error => {
      console.error("Hubo un problema con la carga del archivo:", error);
    });

  if (user?.value.nationality) {
    await fetch(`/question_${user?.value.nationality}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        return response.json(); // Convertir a JSON
      })
      .then(data => {
        // Ordenar por nombre
        questions.value = data;
      })
      .catch(error => {
        console.error("Hubo un problema con la carga del archivo:", error);
      });
  }

  // fetch questions answered in localstorage
  if (questions.value.length > 0) {
    for (let i = 1; i <= 15; i++) {
      const storedQuestion = localStorage.getItem("q" + i);
      if (storedQuestion) {
        // find questions where id is same as i and push success true
        let foundQuestion = questions.value.find(q => q.id == i);
        if (foundQuestion) {
          foundQuestion.success = true;
        }
      }
    }
  }
});

const selectQuestion = async questionId => {
  answer.value = null;
  selectedQuestion.value = questionId;

  // Esperar a que Vue termine de actualizar el DOM
  await nextTick();

  // Encontrar el elemento del contenedor de la pregunta seleccionada usando id
  const element = document.getElementById("question-" + questionId);
  if (element) {
    // Hacer que el contenedor se desplace al centro del viewport
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const scrollToAnswer = async questionId => {
  // Esperar a que Vue termine de actualizar el DOM
  await nextTick();

  // Encontrar el elemento de la respuesta seleccionada usando id
  const element = document.getElementById("answer-" + questionId);
  if (element) {
    // Hacer que el contenedor se desplace al centro del viewport
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const validateAnswer = async questionId => {
  // find the users who's password is the same as answer
  const foundUser = users.value.find(u => u.password == answer.value);
  // if user is found continue, else incorrect string is = no user found with this password
  if (!foundUser) {
    incorrect.value = "babel.no_password";
    return;
  }
  // finally, if question id is X check if the user has a field qX that is true
  if (foundUser["q" + questionId] == true || foundUser["q" + questionId] == "TRUE" || foundUser["q" + questionId] == 1) {
    // if all conditions add success = true in localstorage to question
    localStorage.setItem("q" + questionId, "true");
    if (user?.value.nationality) {
      await fetch(`/question_${user?.value.nationality}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
          }
          return response.json(); // Convertir a JSON
        })
        .then(data => {
          // Ordenar por nombre
          questions.value = data;
        })
        .catch(error => {
          console.error("Hubo un problema con la carga del archivo:", error);
        });
    }

    // fetch questions answered in localstorage
    if (questions.value.length > 0) {
      for (let i = 1; i <= 25; i++) {
        const storedQuestion = localStorage.getItem("q" + i);
        if (storedQuestion) {
          // find questions where id is same as i and push success true
          let foundQuestion = questions.value.find(q => q.id == i);
          if (foundQuestion) {
            foundQuestion.success = true;
            selectedQuestion.value = null;
          }
        }
      }
    }
  } else {
    incorrect.value = "babel.user_do_not_match";
    return;
  }
};

// Computar la traducción para usarla en `v-html`
const translatedMessage = computed(() => {
  return incorrect.value ? t(incorrect.value) : "";
});

// make incorrect null in a watcher after 3 seconds
watch(incorrect, value => {
  if (value) {
    setTimeout(() => {
      incorrect.value = null;
    }, 3000);
  }
});

// Create a computed property to count questions with success: true
const correctAnswerCount = computed(() => {
  return questions.value.filter(q => q.success === true).length;
});

// Watch the computed property to check if the user has won
watch(correctAnswerCount, newCount => {
  if (newCount >= 10) {
    winner.value = true;
  }
});
</script>

<template>
  <div class="w-full flex flex-col pt-[60px] bg-white leading-tight">
    <div class="bg-green p-6 flex flex-col justify-center items-center">
      <!-- <img src="/img/tower-of-babel.png" alt="title" class="h-[50px] w-[50px]" /> -->
      <h1 class="text-black text-3xl font-bold text-center">{{ $t("babel.title") }}</h1>
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
    <div class="mt-12 flex flex-col justify-center items-center px-4 text-center">
      <!-- <h3 class="text-4xl">{{ $t("babel.player") }}</h3> -->
      <div class="text-lg text-center mt-2">
        {{ $t("babel.player2") }}: <strong>{{ user?.full_name }}</strong
        >. <br />
        {{ $t("babel.player3") }}: <br />
        <div class="my-4">
          <span class="font-bold text-2xl bg-green rounded-lg shadow-md px-4 py-2">{{ user?.password }}</span>
        </div>
        {{ $t("babel.player4") }}
      </div>
    </div>
    <img src="/img/hr1.webp" alt="title" class="my-6 mx-auto w-1/2 rotate-180" />
    <div class="mt-3 flex flex-col justify-center items-center px-6 text-center mb-12">
      <h3 class="text-4xl">{{ $t("babel.whoswho") }}</h3>
      <p class="mt-2">
        {{ $t("babel.whoswho2") }}
        <!-- <strong>
          <template v-if="country == 'fr'">{{ $t("fr") }}</template>
          <template v-if="country == 'es'">{{ $t("es") }}</template>
        </strong> -->
        {{ $t("babel.whoswho3") }}
      </p>
      <!-- QUESTIONS -->

      <!-- number of good answers / total questions -->
      <h1 class="text-3xl mt-6">{{ questions.filter(q => q.success).length }} / 10</h1>
      <Transition v-if="winner">
        <div class="w-full justify-center items-center flex flex-col">
          <DotLottieVue v-if="winner" autoplay class="h-[300px] w-[300px] transition-all" :src="'/winner.json'" />
          <p class="text-2xl" v-html="$t('babel.congrats')"></p>
        </div>
      </Transition>
      <div v-else class="mt-4 w-full flex flex-col justify-center items-center space-y-6 transition-all mb-[200px]">
        <div
          :class="[selectedQuestion == question.id ? 'bg-[#0C0E0B]' : 'bg-green', question.success ? 'bg-[#b7f0b7]' : '']"
          class="py-3 px-3 w-full relative rounded-lg min-h-[75px] flex flex-col items-center justify-center"
          :id="'question-' + question.id"
          v-for="(question, index) in questions.sort((a, b) => {
            const order = [2, 5, 3, 4, 6, 1, 7, 15, 8, 14, 11, 13, 9, 12, 10];
            return order.indexOf(a.id) - order.indexOf(b.id);
          })"
          :key="index++"
          @click="!question.success ? selectQuestion(question.id) : ''"
        >
          <Transition>
            <div v-if="question.success" class="absolute inset-0 w-full h-full">
              <DotLottieVue
                autoplay
                class="h-[180px] w-[180px] absolute top-[-90px] right-[-40px] m-auto z-30 transition-all"
                :src="'/check.json'"
              />
            </div>
          </Transition>
          <div
            :class="selectedQuestion == question.id ? 'bg-green text-black' : 'bg-[#0C0E0B] text-white'"
            class="transition-all absolute rounded-full w-[30px] h-[30px] top-[-15px] left-[-15px] flex justify-center items-center text-xl"
          >
            <span class="-mt-1.5">
              {{ index }}
            </span>
          </div>
          <p :class="selectedQuestion == question.id ? 'text-white' : 'text-black'" class="text-xl leading-tight px-6 font-bold">
            {{ question.question }}
          </p>
          <Transition>
            <div v-if="question.id == selectedQuestion" class="w-full transition-all ease-in-out">
              <div class="w-full flex justify-center items-center space-x-2">
                <input
                  v-model="answer"
                  :placeholder="$t('babel.writeanswer')"
                  name="answer"
                  class="font-bold w-full resize-none border-b border-white bg-transparent pt-4 pb-1.5 text-lg text-white outline outline-0 transition-all placeholder-shown:border-white focus:border-r-emerald-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  :id="'answer-' + question.id"
                  @focus="scrollToAnswer(question.id)"
                />

                <button
                  class="bg-green text-black font-bold text-xl rounded-lg p-2 ml-2 disabled:opacity-20 transition-all ease-in"
                  :disabled="answer == null || answer == ''"
                  @click="validateAnswer(question.id)"
                >
                  {{ $t("babel.validate") }}
                </button>
              </div>
              <Transition>
                <div v-if="incorrect" class="w-full text-start text-red-400 transition-all" v-html="translatedMessage"></div>
              </Transition>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
  translate: 0 -20px;
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
  translate: 0 -15px;
}
@import "vue-select/dist/vue-select.css";
</style>
