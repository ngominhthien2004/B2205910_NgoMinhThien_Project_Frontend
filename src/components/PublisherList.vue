<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover publisher-table w-100">
      <thead class="thead-blue">
        <tr>
          <th>Mã NXB</th>
          <th>Tên NXB</th>
          <th>Địa chỉ</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishers" :key="publisher._id">
          <td>{{ publisher.idPublisher }}</td>
          <td>{{ publisher.namePublisher }}</td>
          <td>{{ publisher.addressPublisher }}</td>
          <td>
            <button class="btn btn-warning btn-sm mr-2" @click="$emit('edit', publisher)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="$emit('delete', publisher._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="publishers.length === 0" class="mt-3 text-center text-muted">Không có nhà xuất bản nào.</div>
  </div>
</template>

<script>
export default {
  props: {
    publishers: { type: Array, default: () => [] }
  }
};
</script>

<style scoped>
.thead-blue th {
  background: #1677ff;
  color: #fff;
  border: none;
}
.publisher-table {
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
