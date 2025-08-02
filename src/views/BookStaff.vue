<template>
  <div class="page bookstaff-page">
    <h2>Quản lý sách</h2>
    <div class="row">
      <div class="col-md-6">
        <InputSearch v-model="searchText" placeholder="Tìm kiếm sách..." />
        <button class="btn btn-success mb-3" @click="showAddForm = true">Thêm sách mới</button>
        <StaffBookList
          :books="filteredBooks"
          :activeIndex="activeIndex"
          @update:activeIndex="setActiveIndex"
          @edit="startEditBook"
          @delete="deleteBook"
        />
      </div>
      <div class="col-md-6">
        <StaffBookCard
          v-if="activeBook && !showEditForm"
          :book="activeBook"
          @edit="startEditBook"
          @delete="deleteBook"
        />
        <BookUpdateForm
          v-if="showEditForm"
          :book="editBookData"
          @update="updateBook"
          @cancel="cancelEdit"
        />
        <BookForm
          v-if="showAddForm"
          :book="emptyBook"
          @submit:book="addBook"
          @delete:book="cancelAdd"
        />
        <p v-if="!activeBook && !showEditForm && !showAddForm" class="mt-3">Chọn một cuốn sách để xem chi tiết.</p>
      </div>
    </div>
    <div v-if="filteredBooks.length === 0" class="mt-3 text-center text-muted">Không có sách nào.</div>
  </div>
</template>
<script>
import StaffBookList from "@/components/StaffBookList.vue";
import StaffBookCard from "@/components/StaffBookCard.vue";
import BookForm from "@/components/BookForm.vue";
import BookUpdateForm from "@/components/BookUpdateForm.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";
export default {
  components: { StaffBookList, StaffBookCard, BookForm, BookUpdateForm, InputSearch },
  data() {
    return {
      books: [],
      searchText: "",
      activeIndex: -1,
      showAddForm: false,
      showEditForm: false,
      editBookData: null,
      emptyBook: {
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
      }
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
      const search = this.searchText.toLowerCase();
      return this.books.filter(book =>
        [book.idBook, book.title, book.description, book.category, book.author, book.publisher]
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const data = await BookService.getAll();
        this.books = Array.isArray(data) ? data : (data.books || data.data || []);
      } catch {
        this.books = [];
      }
    },
    setActiveIndex(index) {
      this.activeIndex = index;
      this.showEditForm = false;
      this.showAddForm = false;
    },
    startEditBook(book) {
      this.editBookData = { ...book };
      this.showEditForm = true;
      this.showAddForm = false;
    },
    async updateBook(book) {
      await BookService.update(book._id, book);
      this.showEditForm = false;
      this.editBookData = null;
      this.fetchBooks();
    },
    async addBook(book) {
      await BookService.create(book);
      this.showAddForm = false;
      this.fetchBooks();
    },
    async deleteBook(book) {
      if (confirm("Bạn có chắc muốn xóa sách này?")) {
        await BookService.delete(book._id);
        this.fetchBooks();
      }
    },
    cancelEdit() {
      this.showEditForm = false;
      this.editBookData = null;
    },
    cancelAdd() {
      this.showAddForm = false;
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>
<style scoped>
.bookstaff-page {
  max-width: 1200px;
  margin: 0 auto;
}
.welcome-banner h1 {
  font-size: 3rem;
  font-weight: 600;
}
.welcome-banner .lead {
  font-size: 1.25rem;
  margin-top: 12px;
}
.feature-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.feature-icon {
  margin-bottom: 12px;
}
.book-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
}
</style>
