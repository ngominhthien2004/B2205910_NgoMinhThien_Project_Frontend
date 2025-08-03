<template>
  <div class="page borrow-history">
    <h2 class="mb-4 text-center">Lịch sử mượn sách</h2>
    <div v-if="message" class="alert alert-success text-center" role="alert" style="font-size:1.1em;">
      {{ message }}
    </div>
    <ReaderBorrowList :borrows="borrows" @refresh="fetchBorrows" @show-message="showMessage" />
  </div>
</template>

<script>
import ReaderBorrowList from "@/components/ReaderBorrowList.vue";
export default {
  components: { ReaderBorrowList },
  data() {
    return {
      borrows: [],
      message: ""
    };
  },
  methods: {
    async fetchBorrows() {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user || !user._id) {
          this.borrows = [];
          return;
        }
        const res = await fetch(`/api/muonsachs?idReader=${user._id}`);
        const data = await res.json();
        this.borrows = data.muonsachs || data || [];
      } catch {
        this.borrows = [];
      }
    },
    showMessage(msg) {
      this.message = msg;
      setTimeout(() => {
        this.message = "";
      }, 2000);
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
