<template>
  <form @submit.prevent="submitUpdate">
    <div class="form-group">
      <label>Mã sách</label>
      <input v-model="form.idBook" class="form-control" disabled />
    </div>
    <div class="form-group">
      <label>Tên sách</label>
      <input v-model="form.title" class="form-control" required />
    </div>
    <div class="form-group">
      <label>Mô tả</label>
      <input v-model="form.description" class="form-control" />
    </div>
    <div class="form-group">
      <label>Thể loại</label>
      <input v-model="form.category" class="form-control" />
    </div>
    <div class="form-group">
      <label>Giá</label>
      <input v-model="form.price" type="number" class="form-control" />
    </div>
    <div class="form-group">
      <label>Tổng số lượng</label>
      <input v-model="form.totalCopies" type="number" class="form-control" />
    </div>
    <div class="form-group">
      <label>Số lượng còn lại</label>
      <input v-model="form.availableCopies" type="number" class="form-control" />
    </div>
    <div class="form-group">
      <label>Ngày phát hành</label>
      <input v-model="form.releaseDate" type="date" class="form-control" />
    </div>
    <div class="form-group">
      <label>Nhà xuất bản</label>
      <input v-model="form.publisher" class="form-control" />
    </div>
    <div class="form-group">
      <label>Tác giả</label>
      <input v-model="form.author" class="form-control" />
    </div>
    <div class="form-group mt-3">
      <button type="submit" class="btn btn-primary">Cập nhật</button>
      <button type="button" class="btn btn-secondary ml-2" @click="$emit('cancel')">Hủy</button>
    </div>
    <div v-if="message" class="alert alert-info mt-2">{{ message }}</div>
  </form>
</template>

<script>
export default {
  props: {
    book: { type: Object, required: true }
  },
  emits: ["update", "cancel"],
  data() {
    return {
      form: { ...this.book },
      message: ""
    };
  },
  watch: {
    book: {
      handler(newVal) {
        this.form = { ...newVal };
      },
      immediate: true
    }
  },
  methods: {
    async submitUpdate() {
      this.$emit("update", { ...this.form });
    }
  }
};
</script>
