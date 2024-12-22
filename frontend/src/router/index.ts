import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/personalApp/HomeView.vue";
import TodoView from "@/views/personalApp/TodoView.vue";
import PomodoroView from "@/views/personalApp/PomodoroView.vue";
import CalenderView from "@/views/personalApp/CalenderView.vue";

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
      path: '/calendar',
      name: 'calendar',
      component: CalenderView
    },
    // {
    //   path: '/resume',
    //   name: 'resume',
    //   component: ResumeView
    // }
  ],
});

export default router;
