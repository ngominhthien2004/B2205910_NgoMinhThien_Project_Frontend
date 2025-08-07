<template>
  <div class="table-responsive">
    <table class="table table-bordered reader-account-table w-100">
      <thead class="thead-blue">
        <tr>
          <th>Họ</th>
          <th>Tên</th>
          <th>Tên đăng nhập</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Địa chỉ</th>
          <th>SĐT</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader._id">
          <td>{{ reader.lastNameReader }}</td>
          <td>{{ reader.firstNameReader }}</td>
          <td>{{ reader.username }}</td>
          <td>{{ reader.dateOfBirthReader }}</td>
          <td>{{ reader.genderReader }}</td>
          <td>{{ reader.addressReader }}</td>
          <td>{{ reader.phoneReader }}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click="$emit('edit', reader)">Sửa</button>
            <button class="btn btn-sm btn-danger ml-2" @click="$emit('delete', reader._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    readers: {
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
.reader-account-table {
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
