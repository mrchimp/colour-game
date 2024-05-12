import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/Views/HomePage.vue";
import RandomColor from "../components/Views/RandomColor.vue";
import GuessColor from "../components/Views/GuessColor.vue";
import AlgorithmTester from "../components/Views/AlgorithmTester.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/random-color", name: "random-color", component: RandomColor },
  { path: "/guess-color", name: "guess-color", component: GuessColor },
  { path: "/score", name: "score", component: AlgorithmTester },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
