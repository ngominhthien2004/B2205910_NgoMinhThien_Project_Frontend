<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover borrow-table w-100">
      <thead class="thead-dark">
        <tr>
          <th>Mã sách</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th v-if="staff">Cập nhật trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in sortedBorrows" :key="borrow._id">
          <td>{{ borrow.idBook }}</td>
          <td>{{ borrow.bookTitle || "..." }}</td>
          <td>{{ borrow.ngayMuon ? (new Date(borrow.ngayMuon)).toLocaleDateString() : "" }}</td>
          <td>{{ borrow.ngayTra ? (new Date(borrow.ngayTra)).toLocaleDateString() : "" }}</td>
          <td>
            <span :class="statusClass(borrow.status)">
              {{ translateStatus(borrow.status) }}
            </span>
          </td>
          <td v-if="staff">
            <select v-model="borrow._newStatus" class="form-control form-control-sm" style="width:auto;display:inline-block;">
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="borrowed">Đang mượn</option>
              <option value="returned">Đã trả</option>
            </select>
            <button class="btn btn-sm btn-primary ml-1" @click="emitUpdateStatus(borrow)">
              Lưu
            </button>
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
import BookService from "@/services/book.service";
export default {
  props: {
    borrows: { type: Array, default: () => [] },
    staff: { type: Boolean, default: true }
  },
  async mounted() {
    await this.attachBookTitles();
  },
  watch: {
    borrows: {
      handler() {
        this.attachBookTitles();
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    sortedBorrows() {
      // Sắp xếp borrow theo _id giảm dần (mới nhất trước)
      return [...this.borrows].sort((a, b) => {
        // Nếu _id là ObjectId dạng chuỗi, so sánh chuỗi giảm dần
        if (a._id > b._id) return -1;
        if (a._id < b._id) return 1;
        return 0;
      });
    }
  },
  methods: {
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
    },
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
          this.$emit("refresh");
        } else {
          const data = await res.json();
          alert(data.message || "Không thể hủy phiếu mượn.");
        }
      } catch (e) {
        alert("Không thể hủy phiếu mượn.");
      }
    },
    emitUpdateStatus(borrow) {
      const newStatus = borrow._newStatus || borrow.status;
      this.$emit("update", { id: borrow._id, field: "status", value: newStatus });
    }
  },
  watch: {
    borrows: {
      handler(newVal) {
        newVal.forEach(b => {
          if (!b._newStatus) b._newStatus = b.status;
        });
        this.attachBookTitles();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.borrow-table {
  min-width: 1100px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.table-responsive {
  width: 75vw;
  margin-left: 50%;
  transform: translateX(-50%);

}
.thead-dark th {
  background: #1677ff;
  color: #fff;
  border: none;
}
/* Cắt ngắn chiều rộng cột thao tác */
.borrow-table th:last-child,
.borrow-table td:last-child {
  width: 90px;
  min-width: 70px;
  max-width: 110px;
  text-align: center;
}
.badge {
  padding: 0.4em 0.7em;
  font-size: 0.95em;
}
</style>
