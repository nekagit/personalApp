import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/personalApp/HomeView.vue";
import TodoView from "@/views/personalApp/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView
    },
    // {
    //   path: '/education',
    //   name: 'education',
    //   component: EducationView
    // },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: ProjectsView
    // },
    // {
    //   path: '/resume',
    //   name: 'resume',
    //   component: ResumeView
    // }
  ],
});

export default router;
