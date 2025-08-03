<template>
  <div class="page borrowstaff-page">
    <h2>Quản lý phiếu mượn sách</h2>
    <StaffBorrowList :borrows="borrows" @refresh="fetchBorrows" @update-status="updateStatus" />
  </div>
</template>
<script>
import StaffBorrowList from "@/components/StaffBorrowList.vue";
export default {
  components: { StaffBorrowList },
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
    },
    async updateStatus(id, status) {
      try {
        await fetch(`/api/muonsachs/${id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        this.fetchBorrows();
      } catch {}
    }
  },
  mounted() {
    // Kiểm tra quyền staff trước khi cho truy cập
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "staff") {
      this.$router.replace({ name: "login" });
      return;
    }
    this.fetchBorrows();
  }
};
</script>
<style scoped>
.borrowstaff-page {
  max-width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
