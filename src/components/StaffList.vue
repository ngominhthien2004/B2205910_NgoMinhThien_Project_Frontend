<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover staff-table w-100">
      <thead>
        <tr>
          <th>Tên nhân viên</th>
          <th>Chức vụ</th>
          <th>Tên đăng nhập</th>
          <th>Địa chỉ</th>
          <th>SĐT</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff._id">
          <td>{{ staff.nameStaff }}</td>
          <td>{{ staff.roleStaff }}</td>
          <td>{{ staff.username }}</td>
          <td>{{ staff.addressStaff }}</td>
          <td>{{ staff.phoneStaff }}</td>
          <td>
            <button class="btn btn-warning btn-sm mr-2" @click="$emit('edit', staff)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="$emit('delete', staff._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    staffs: { type: Array, default: () => [] }
  }
};
</script>

<style scoped>
.staff-table {
  min-width: 900px;
  background: #fff;
}

.table-responsive {
  width: 100%;
  margin: 0 auto;
}
</style>
