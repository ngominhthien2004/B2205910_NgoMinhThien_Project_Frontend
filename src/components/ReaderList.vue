<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover reader-table w-100">
      <thead>
        <tr>
          <th>Mã bạn đọc</th>
          <th>Họ</th>
          <th>Tên</th>
          <th>Tên đăng nhập</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Địa chỉ</th>
          <th>SĐT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader._id">
          <td>{{ reader.idReader }}</td>
          <td>{{ reader.lastNameReader }}</td>
          <td>{{ reader.firstNameReader }}</td>
          <td>{{ reader.username }}</td>
          <td>{{ reader.dateOfBirthReader }}</td>
          <td>{{ reader.genderReader }}</td>
          <td>{{ reader.addressReader }}</td>
          <td>{{ reader.phoneReader }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    readers: { type: Array, default: () => [] }
  }
};
</script>

<style scoped>
.reader-table {
  min-width: 900px;
  background: #fff;
}

.table-responsive {
  width: 100%;
  margin: 0 auto;
}
</style>
