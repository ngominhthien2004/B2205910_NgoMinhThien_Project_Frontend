<template>
  <div class="borrow-form-backdrop">
    <div class="borrow-form-modal">
      <h5>Mượn sách: {{ book.title }}</h5>
      <form @submit.prevent="submitBorrow">
        <div class="form-group">
          <label>Ngày mượn</label>
          <input type="date" v-model="borrowDate" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Ngày trả</label>
          <input type="date" v-model="returnDate" class="form-control" required :min="borrowDate" />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Xác nhận</button>
          <button type="button" class="btn btn-secondary ml-2" @click="$emit('close')">Hủy</button>
        </div>
        <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-2">{{ success }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true }
  },
  data() {
    const today = new Date().toISOString().substr(0, 10);
    return {
      borrowDate: today,
      returnDate: today,
      error: "",
      success: ""
    };
  },
  methods: {
    async submitBorrow() {
      this.error = "";
      this.success = "";
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        this.error = "Bạn cần đăng nhập để mượn sách.";
        return;
      }
      const user = JSON.parse(userStr);
      if (this.returnDate < this.borrowDate) {
        this.error = "Ngày trả phải sau hoặc bằng ngày mượn.";
        return;
      }
      try {
        const res = await fetch("/api/muonsachs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idBook: this.book.idBook,
            idReader: user._id,
            ngayMuon: this.borrowDate,
            ngayTra: this.returnDate
          })
        });
        const data = await res.json();
        if (!res.ok) {
          this.error = data.message || "Mượn sách thất bại";
          return;
        }
        this.success = "Mượn sách thành công!";
        setTimeout(() => {
          this.$emit("close");
        }, 1000);
      } catch (e) {
        this.error = "Không thể kết nối máy chủ";
      }
    }
  }
};
</script>

<style scoped>
.borrow-form-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.borrow-form-modal {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
