<template>
  <div class="table-responsive">
    <table class="table table-bordered staff-account-table w-100">
      <thead class="thead-blue">
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
            <button class="btn btn-sm btn-primary" @click="$emit('edit', staff)">Sửa</button>
            <button class="btn btn-sm btn-danger ml-2" @click="$emit('delete', staff.username)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    staffs: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.thead-blue th {
  background: #1677ff;
  color: #fff;
  border: none;
}
.staff-account-table {
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
</style>
