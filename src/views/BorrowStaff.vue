<template>
  <div class="page">
    <h2>Quản lý phiếu mượn sách</h2>
    <BorrowList :borrows="borrows" @refresh="fetchBorrows" />
  </div>
</template>
<script>
import BorrowList from "@/components/BorrowList.vue";
export default {
  components: { BorrowList },
  data() {
    return { borrows: [] };
  },
  methods: {
    async fetchBorrows() {
      try {
        const res = await fetch("/api/muonsachs");
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
