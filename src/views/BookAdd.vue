<template>
    <div class="page">
        <h4>Thêm sách mới</h4>
        <BookForm
            :book="book"
            @submit:book="createBook"
            @delete:book="goBack"
        />
    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
    components: { BookForm },
    data() {
        return {
            book: {
                idBook: "",
                title: "",
                description: "",
                category: "",
                price: "",
                totalCopies: "",
                availableCopies: "",
                releaseDate: "",
                publisher: "",
                author: "",
            },
        };
    },
    methods: {
        async createBook(book) {
            await BookService.create(book);
            this.$router.push({ name: "booklist" });
        },
        goBack() {
            this.$router.push({ name: "booklist" });
        },
    },
};
</script>
