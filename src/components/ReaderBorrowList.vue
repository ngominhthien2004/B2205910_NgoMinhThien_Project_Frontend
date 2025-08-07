<template>
  <div>
    <BorrowList :borrows="borrows" />
    <div v-if="borrows.length === 0" class="mt-3 text-center text-muted">
      Không có lịch sử mượn sách.
    </div>
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
      // Lấy đúng idReader (ưu tiên user.idReader, nếu không có thì user._id)
      const idReader = user.idReader || user._id;
      try {
        const res = await fetch(`/api/muonsachs?idReader=${idReader}`);
        const data = await res.json();
        // Lọc lại để chắc chắn chỉ lấy phiếu mượn của reader hiện tại
        this.borrows = (data.muonsachs || data || []).filter(
          b => String(b.idReader) === String(idReader)
        );
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
.table-responsive {
  width: 75vw;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  overflow: hidden;
}
</style>
