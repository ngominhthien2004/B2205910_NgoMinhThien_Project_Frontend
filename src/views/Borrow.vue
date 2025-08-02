<template>
  <div class="page borrow-history">
    <h2 class="mb-4 text-center">Lịch sử mượn sách</h2>
    <BorrowList :borrows="borrows" @refresh="fetchBorrows" />
    <div v-if="borrows.length === 0" class="mt-3 text-center text-muted">Không có lịch sử mượn sách.</div>
  </div>
</template>

<script>
import BorrowList from "@/components/BorrowList.vue";

export default {
  components: { BorrowList },
  data() {
    return {
      borrows: [],
    };
  },
  methods: {
    async fetchBorrows() {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        this.borrows = [];
        return;
      }
      const user = JSON.parse(userStr);
      let filter = "";
      if (user.role === "reader") {
        filter = `?idReader=${user._id}`;
      }
      try {
        const res = await fetch(`/api/muonsachs${filter}`);
        const data = await res.json();
        this.borrows = data.muonsachs || data || [];
      } catch {
        this.borrows = [];
      }
    }
  },
  mounted() {
    this.fetchBorrows();
  }
};
</script>

<style scoped>
.borrow-history {
  max-width: 800px;
  margin: 0 auto;
}
</style>
