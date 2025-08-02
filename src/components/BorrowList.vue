<template>
  <div>
    <table class="table table-bordered table-hover borrow-table">
      <thead class="thead-dark">
        <tr>
          <th>Mã sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in borrows" :key="borrow._id">
          <td>{{ borrow.idBook }}</td>
          <td>{{ borrow.ngayMuon ? (new Date(borrow.ngayMuon)).toLocaleDateString() : "" }}</td>
          <td>{{ borrow.ngayTra ? (new Date(borrow.ngayTra)).toLocaleDateString() : "" }}</td>
          <td>
            <span :class="statusClass(borrow.status)">
              {{ translateStatus(borrow.status) }}
            </span>
          </td>
          <td>
            <button
              v-if="borrow.status === 'pending'"
              class="btn btn-sm btn-danger"
              @click="cancelBorrow(borrow._id)"
            >
              Hủy mượn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    borrows: { type: Array, default: () => [] }
  },
  methods: {
    translateStatus(status) {
      switch (status) {
        case "pending":
          return "Chờ duyệt";
        case "approved":
          return "Đã duyệt";
        case "borrowed":
          return "Đang mượn";
        case "returned":
          return "Đã trả";
        default:
          return status;
      }
    },
    statusClass(status) {
      switch (status) {
        case "pending":
          return "badge badge-warning";
        case "approved":
          return "badge badge-info";
        case "borrowed":
          return "badge badge-primary";
        case "returned":
          return "badge badge-success";
        default:
          return "";
      }
    },
    async cancelBorrow(id) {
      if (!confirm("Bạn có chắc muốn hủy phiếu mượn này?")) return;
      try {
        const res = await fetch(`/api/muonsachs/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
          // Đợi backend xóa xong, gọi lại fetchBorrows ở Borrow.vue qua emit
          this.$emit("refresh");
        } else {
          const data = await res.json();
          alert(data.message || "Không thể hủy phiếu mượn.");
        }
      } catch (e) {
        alert("Không thể hủy phiếu mượn.");
      }
    }
  }
};
</script>

<style scoped>
.borrow-table {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 24px;
}
.thead-dark th {
  background: #1677ff;
  color: #fff;
  border: none;
}
.badge {
  padding: 0.4em 0.7em;
  font-size: 0.95em;
}
</style>
