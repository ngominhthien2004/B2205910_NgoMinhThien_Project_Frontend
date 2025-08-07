<template>
  <div class="page">
    <h2 class="text-center">Quản lý nhà xuất bản</h2>
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
    <PublisherList
      :publishers="publishers"
      @edit="startEdit"
      @delete="deletePublisher"
    />
  </div>
</template>

<script>
import PublisherService from "@/services/publisher.service";
import PublisherList from "@/components/PublisherList.vue";
export default {
  components: { PublisherList },
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
    // Kiểm tra quyền staff trước khi cho truy cập
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "staff") {
      this.$router.replace({ name: "login" });
      return;
    }
    this.fetchPublishers();
  }
};
</script>

<style scoped>
.page {
  max-width: 100vw;
  margin: 0 auto;
}

.publisher-table-bg {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}

/* Thêm shading xanh dương cho header bảng */
.thead-blue th {
  background: #1677ff;
  color: #fff;
  border: none;
}
</style>