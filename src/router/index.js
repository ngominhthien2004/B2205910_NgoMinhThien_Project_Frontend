import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
const routes = [
    {
        path: "/",
        name: "book",
        component: Book,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
