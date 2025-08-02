<template>
  <div class="page">
    <h2>Quản lý sách</h2>
    <router-link :to="{ name: 'book.add' }" class="btn btn-success mb-3">Thêm sách mới</router-link>
    <BookList :books="books" :activeIndex="activeIndex" @update:activeIndex="setActiveIndex" />
    <BookCard v-if="activeBook" :book="activeBook" />
  </div>
</template>
<script>
import BookList from "@/components/BookList.vue";
import BookCard from "@/components/BookCard.vue";
import BookService from "@/services/book.service";
export default {
  components: { BookList, BookCard },
  data() {
    return {
      books: [],
      activeIndex: -1,
    };
  },
  computed: {
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.books[this.activeIndex];
    }
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    }
  },
  async mounted() {
    try {
      // Lấy đúng danh sách sách từ BookService (BookService.getAll trả về mảng)
      this.books = await BookService.getAll();
    } catch {
      this.books = [];
    }
  }
};
</script>
