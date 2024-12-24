import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/personalApp/HomeView.vue";
import TodoView from "@/views/personalApp/TodoView.vue";
import PomodoroView from "@/views/personalApp/PomodoroView.vue";
import CalenderView from "@/views/personalApp/CalenderView.vue";
import Markdown from "@/views/personalApp/Markdown.vue";
import FlashCardView from "@/views/personalApp/FlashCardView.vue";
import DiaryView from "@/views/personalApp/DiaryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoView,
    },
    {
      path: "/pomodoro",
      name: "pomodoro",
      component: PomodoroView,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalenderView,
    },
    {
      path: "/markdown",
      name: "markdown",
      component: Markdown,
    },
    {
      path: "/flashCard",
      name: "flashCard",
      component: FlashCardView,
    },
    {
      path: "/diary",
      name: "diary",
      component: DiaryView,
    },
  ],
});

export default router;
