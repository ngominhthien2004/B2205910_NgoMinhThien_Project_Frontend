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
        <!-- Modal for Add Book -->
        <div v-if="showAddForm" class="modal-overlay" @click.self="cancelAdd">
          <div class="modal-content">
            <BookForm
              :book="emptyBook"
              :errorMessage="''"
              @check:idBook="checkIdBookAdd"
              @submit:book="addBook"
              @delete:book="cancelAdd"
            />
          </div>
        </div>
        <!-- End Modal -->
        <p v-if="!activeBook && !showEditForm && !showAddForm" class="mt-3">Chọn một cuốn sách để xem chi tiết.</p>
      </div>
    </div>
    <div v-if="filteredBooks.length === 0" class="mt-3 text-center text-muted">Không có sách nào.</div>
    <div v-if="errorMessage" class="alert alert-danger mt-2">{{ errorMessage }}</div>

    <!-- Modal xác nhận xóa sách -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal-content modal-delete-content">
        <h5>Bạn có chắc muốn xóa sách này?</h5>
        <p><b>{{ bookToDelete?.title }}</b> (ID: {{ bookToDelete?.idBook }})</p>
        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-secondary mr-2" @click="cancelDelete">Hủy</button>
          <button class="btn btn-danger" @click="confirmDeleteBook">Xóa</button>
        </div>
      </div>
    </div>
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
      errorMessage: "", // Thêm biến lưu thông báo lỗi
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
      },
      showDeleteModal: false,
      bookToDelete: null,
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
      this.errorMessage = "";
    },
    startEditBook(book) {
      this.editBookData = { ...book };
      this.showEditForm = true;
      this.showAddForm = false;
      this.errorMessage = "";
    },
    async updateBook(book) {
      // Kiểm tra idBook trùng với sách khác (ngoại trừ chính nó)
      const duplicate = this.books.find(
        b => b.idBook === book.idBook && b._id !== book._id
      );
      if (duplicate) {
        this.errorMessage = "ID sách đã tồn tại. Vui lòng chọn ID khác.";
        return;
      }
      await BookService.update(book._id, book);
      this.showEditForm = false;
      this.editBookData = null;
      this.errorMessage = "";
      this.fetchBooks();
    },
    checkIdBookAdd(book, cb) {
      const duplicate = this.books.find(b => b.idBook === book.idBook);
      if (duplicate) {
        cb("ID sách đã tồn tại. Vui lòng chọn ID khác.");
      } else {
        cb("");
      }
    },
    async addBook(book) {
      // Không cần kiểm tra trùng ở đây nữa, đã kiểm tra ở form
      await BookService.create(book);
      this.showAddForm = false;
      this.errorMessage = "";
      this.fetchBooks();
    },
    async deleteBook(book) {
      this.bookToDelete = book;
      this.showDeleteModal = true;
    },
    async confirmDeleteBook() {
      if (!this.bookToDelete) return;
      await BookService.delete(this.bookToDelete._id);
      this.showDeleteModal = false;
      this.bookToDelete = null;
      // Luôn tải lại trang sau khi xóa thành công
      window.location.reload();
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.bookToDelete = null;
    },
    cancelEdit() {
      this.showEditForm = false;
      this.editBookData = null;
      this.errorMessage = "";
    },
    cancelAdd() {
      this.showAddForm = false;
      this.errorMessage = "";
    }
  },
  mounted() {
    // Kiểm tra quyền staff trước khi cho truy cập
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "staff") {
      this.$router.replace({ name: "login" });
      return;
    }
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

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 90px 10px 32px 24px;
  width: 70vw;
  height: 60vw;
  max-width: 95vw;
  max-height: 95vh;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  position: relative;
  overflow-y: auto;
}
/* Modal xác nhận xóa nhỏ hơn */
.modal-delete-content {
  padding: 32px 24px;
  width: 350px;
  max-width: 90vw;
  height: auto;
  max-height: 90vh;
}
</style>