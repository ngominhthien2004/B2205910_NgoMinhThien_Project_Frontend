<template>
  <div>
    <div class="welcome-banner">
      <h1>Welcome to Library Management System</h1>
      <p class="lead">Discover, borrow, and manage your favorite books with ease</p>
      <router-link :to="{ name: 'book' }" class="btn btn-lg btn-primary mt-3">Browse Books</router-link>
    </div>
    <!-- Thanh tìm kiếm và danh sách sách -->
    <div class="book-section mb-5">
      <div class="row mb-3">
        <div class="col-md-8">
          <InputSearch v-model="searchText" placeholder="Search books..." />
        </div>
      </div>
      <div>
        <BookList :books="filteredBooks" />
        <p v-if="filteredBooks.length === 0" class="mt-3">No books found.</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4 mb-3">
        <div class="feature-card text-center p-4">
          <div class="feature-icon mb-2">
            <i class="fa fa-search fa-3x text-primary"></i>
          </div>
          <h4>Browse Books</h4>
          <p>Explore our extensive collection of books across various categories.</p>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="feature-card text-center p-4">
          <div class="feature-icon mb-2">
            <i class="fa fa-bookmark fa-3x text-success"></i>
          </div>
          <h4>Request Books</h4>
          <p>Request to borrow books online and pick them up at the library.</p>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="feature-card text-center p-4">
          <div class="feature-icon mb-2">
            <i class="fa fa-clock fa-3x text-info"></i>
          </div>
          <h4>Track History</h4>
          <p>Keep track of your borrowing history and due dates.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";
export default {
  components: {
    BookList,
    InputSearch,
  },
  data() {
    return {
      books: [],
      searchText: "",
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
  },
  async mounted() {
    try {
      this.books = await BookService.getAll();
    } catch (e) {
      this.books = [];
    }
  },
};
</script>

<style scoped>
.welcome-banner {
  background: #1677ff;
  color: #fff;
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  margin-bottom: 32px;
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
