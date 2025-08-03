<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover borrow-table w-100">
      <thead class="thead-dark">
        <tr>
          <th>Mã sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th v-if="staff">Cập nhật trạng thái</th>
          <th>Thao tác/Ghi chú</th>
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
            <template v-if="borrow.status === 'pending'">
              <button
                class="btn btn-sm btn-danger"
                @click="cancelBorrow(borrow._id)"
              >
                Hủy mượn
              </button>
            </template>
            <template v-else>
              <span class="note-text">{{ getNote(borrow) }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    borrows: { type: Array, default: () => [] },
    staff: { type: Boolean, default: false }
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
    getNote(borrow) {
      if (borrow.status === "approved") {
        return "Yêu cầu mượn sách đã được duyệt, vui lòng đến trực tiếp thư viện để lấy sách";
      }
      if (borrow.status === "borrowed") {
        return "Đang mượn sách, vui lòng trả sách đúng hạn để tránh bị phạt";
      }
      if (borrow.status === "returned") {
        if (borrow.fine && borrow.fine > 0 && borrow.daysLate && borrow.daysLate > 0) {
          return `Bị phạt ${borrow.fine} đồng vì trễ ${borrow.daysLate} ngày`;
        }
        return "Trả sách đúng hạn";
      }
      return "";
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
      this.$emit("update-status", borrow._id, newStatus);
    }
  },
  watch: {
    borrows: {
      handler(newVal) {
        newVal.forEach(b => {
          if (!b._newStatus) b._newStatus = b.status;
        });
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
  border-radius: 12px;
}
.table-responsive {
  width: 75vw;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  overflow: hidden;
}
.thead-dark th {
  background: #1677ff;
  color: #fff;
  border: none;
}
.badge {
  padding: 0.4em 0.58em;
  font-size: 0.95em;
}
.note-text {
  font-size: 0.97em;
  color: #555;
  font-style: italic;
}
</style>
