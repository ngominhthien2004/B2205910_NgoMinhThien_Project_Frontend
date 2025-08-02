<template>
  <div class="page">
    <h2>Quản lý nhà xuất bản</h2>
    <div class="mb-3">
      <button class="btn btn-success" @click="showAdd = !showAdd">
        {{ showAdd ? "Đóng" : "Thêm NXB mới" }}
      </button>
    </div>
    <div v-if="showAdd" class="card p-3 mb-4">
      <form @submit.prevent="addPublisher">
        <div class="form-group">
          <label>Mã NXB</label>
          <input v-model="newPublisher.idPublisher" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Tên NXB</label>
          <input v-model="newPublisher.namePublisher" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Địa chỉ</label>
          <input v-model="newPublisher.addressPublisher" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Lưu</button>
      </form>
    </div>
    <div v-if="editPublisherId" class="card p-3 mb-4">
      <form @submit.prevent="updatePublisher">
        <div class="form-group">
          <label>Mã NXB</label>
          <input v-model="editPublisher.idPublisher" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Tên NXB</label>
          <input v-model="editPublisher.namePublisher" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Địa chỉ</label>
          <input v-model="editPublisher.addressPublisher" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Cập nhật</button>
        <button type="button" class="btn btn-secondary mt-2 ml-2" @click="cancelEdit">Hủy</button>
      </form>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover w-100">
        <thead>
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
              <button class="btn btn-warning btn-sm mr-2" @click="startEdit(publisher)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deletePublisher(publisher._id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="publishers.length === 0" class="mt-3 text-center text-muted">Không có nhà xuất bản nào.</div>
    </div>
  </div>
</template>

<script>
import PublisherService from "@/services/publisher.service";
export default {
  data() {
    return {
      publishers: [],
      showAdd: false,
      newPublisher: {
        idPublisher: "",
        namePublisher: "",
        addressPublisher: ""
      },
      editPublisherId: null,
      editPublisher: {
        idPublisher: "",
        namePublisher: "",
        addressPublisher: ""
      }
    };
  },
  methods: {
    async fetchPublishers() {
      try {
        const data = await PublisherService.getAll();
        this.publishers = Array.isArray(data) ? data : (data.publishers || []);
      } catch {
        this.publishers = [];
      }
    },
    async addPublisher() {
      await PublisherService.create(this.newPublisher);
      this.newPublisher = { idPublisher: "", namePublisher: "", addressPublisher: "" };
      this.showAdd = false;
      this.fetchPublishers();
    },
    startEdit(publisher) {
      this.editPublisherId = publisher._id;
      this.editPublisher = {
        idPublisher: publisher.idPublisher,
        namePublisher: publisher.namePublisher,
        addressPublisher: publisher.addressPublisher
      };
    },
    async updatePublisher() {
      await PublisherService.update(this.editPublisherId, this.editPublisher);
      this.editPublisherId = null;
      this.editPublisher = { idPublisher: "", namePublisher: "", addressPublisher: "" };
      this.fetchPublishers();
    },
    cancelEdit() {
      this.editPublisherId = null;
      this.editPublisher = { idPublisher: "", namePublisher: "", addressPublisher: "" };
    },
    async deletePublisher(id) {
      if (confirm("Bạn có chắc muốn xóa NXB này?")) {
        await PublisherService.delete(id);
        this.fetchPublishers();
      }
    }
  },
  mounted() {
    this.fetchPublishers();
  }
};
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}
</style>
