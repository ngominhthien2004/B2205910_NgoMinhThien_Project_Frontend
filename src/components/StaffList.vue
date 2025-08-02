<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover staff-table w-100">
      <thead>
        <tr>
          <th>Mã NV</th>
          <th>Tên nhân viên</th>
          <th>Chức vụ</th>
          <th>Tên đăng nhập</th>
          <th>Địa chỉ</th>
          <th>SĐT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff._id">
          <td>{{ staff.idStaff }}</td>
          <td>{{ staff.nameStaff }}</td>
          <td>{{ staff.roleStaff }}</td>
          <td>{{ staff.username }}</td>
          <td>{{ staff.addressStaff }}</td>
          <td>{{ staff.phoneStaff }}</td>
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
