<template>
    <div v-if="bookLocal" class="page">
        <h4>Hiệu chỉnh Sách</h4>
        <BookUpdateForm :book="bookLocal" @update="updateBook" @cancel="goBack" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BookUpdateForm from "@/components/BookUpdateForm.vue";
import BookService from "@/services/book.service";
export default {
    components: { BookUpdateForm },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            bookLocal: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                const book = await BookService.get(id);
                this.book = book;
                this.bookLocal = { ...book };
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, { ...data, _id: this.book._id });
                alert('Sách được cập nhật thành công.');
                this.$router.push({ name: "booklist" });
            } catch (error) {
                console.log(error);
            }
        },
        goBack() {
            this.$router.push({ name: "booklist" });
        }
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>
