import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Borrow from "@/views/Borrow.vue";
import Profile from "@/views/Profile.vue";
import BookStaff from "@/views/BookStaff.vue";
import BorrowStaff from "@/views/BorrowStaff.vue";
import AccountStaff from "@/views/AccountStaff.vue";
import PublisherStaff from "@/views/PublisherStaff.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/book",
        name: "book",
        component: Book,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/borrow",
        name: "borrow",
        component: Borrow,
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
    },
    {
        path: "/bookstaff",
        name: "bookstaff",
        component: BookStaff,
    },
    {
        path: "/borrowstaff",
        name: "borrowstaff",
        component: BorrowStaff,
    },
    {
        path: "/accountstaff",
        name: "accountstaff",
        component: AccountStaff,
    },
    {
        path: "/publisherstaff",
        name: "publisherstaff",
        component: PublisherStaff,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
