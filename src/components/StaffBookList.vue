<script>
import StaffBookCard from "./StaffBookCard.vue";
export default {
    components: { StaffBookCard },
    props: {
        books: { type: Array, default: () => [] },
        activeIndex: { type: Number, default: -1 }
    },
    emits: ["edit", "delete", "add", "update:activeIndex"],
    methods: {
        setActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        editBook(book) {
            this.$emit("edit", book);
        },
        deleteBook(book) {
            this.$emit("delete", book);
        },
        addBook() {
            this.$emit("add");
        }
    }
};
</script>
<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item"
                v-for="(book, index) in books"
                :key="book._id"
                :class="{ active: index === activeIndex }"
                @click="setActiveIndex(index)">
                {{ book.title }}
            </li>
        </ul>
    </div>
</template>