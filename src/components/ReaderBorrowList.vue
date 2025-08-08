<template>
  <div>
    <BorrowList :borrows="sortedBorrows" />
    <div v-if="borrows.length === 0" class="mt-3 text-center text-muted">
      Không có lịch sử mượn sách.
    </div>
  </div>
</template>

<script>
import BorrowList from "@/components/BorrowList.vue";
import BookService from "@/services/book.service";

export default {
  components: { BorrowList },
  data() {
    return {
      borrows: [],
    };
  },
  computed: {
    sortedBorrows() {
      // Sắp xếp borrow theo _id giảm dần (mới nhất trước)
      return [...this.borrows].sort((a, b) => {
        if (a._id > b._id) return -1;
        if (a._id < b._id) return 1;
        return 0;
      });
    }
  },
  methods: {
    async fetchBorrows() {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        this.borrows = [];
        return;
      }
      const user = JSON.parse(userStr);
      // Lấy đúng idReader (ưu tiên user.idReader, nếu không có thì user._id)
      const idReader = user.idReader || user._id;
      try {
        const res = await fetch(`/api/muonsachs?idReader=${idReader}`);
        const data = await res.json();
        // Lọc lại để chắc chắn chỉ lấy phiếu mượn của reader hiện tại
        this.borrows = (data.muonsachs || data || []).filter(
          b => String(b.idReader) === String(idReader)
        );
        await this.attachBookTitles();
      } catch {
        this.borrows = [];
      }
    },
    async attachBookTitles() {
      const ids = [...new Set(this.borrows.map(b => b.idBook))];
      const bookMap = {};
      for (const id of ids) {
        if (!id) continue;
        try {
          const book = await BookService.get(id);
          if (book && book.title) bookMap[id] = book.title;
        } catch {}
      }
      this.borrows.forEach(b => {
        b.bookTitle = bookMap[b.idBook] || "";
      });
    }
  },
  mounted() {
    this.fetchBorrows();
  },
  watch: {
    borrows: {
      handler() {
        this.attachBookTitles();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.table-responsive {
  width: 75vw;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  overflow: hidden;
}
</style>
