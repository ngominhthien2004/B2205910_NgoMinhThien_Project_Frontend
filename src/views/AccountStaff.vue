<template>
  <div class="page account-page">
    <h2 class="text-center">Quản lý tài khoản</h2>
    <h4 class="mt-4">Tài khoản độc giả</h4>
    <!-- Bỏ thao tác thêm bạn đọc -->
    <div v-if="editReaderId" class="card p-3 mb-3">
      <form @submit.prevent="updateReader">
        <!-- Các trường giống như form thêm -->
        <div class="form-row">
          <div class="form-group col">
            <input v-model="readerForm.lastNameReader" class="form-control" placeholder="Họ" required />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.firstNameReader" class="form-control" placeholder="Tên" required />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.username" class="form-control" placeholder="Tên đăng nhập" required />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.password" class="form-control" placeholder="Mật khẩu" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <input v-model="readerForm.dateOfBirthReader" class="form-control" placeholder="Ngày sinh" />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.genderReader" class="form-control" placeholder="Giới tính" />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.addressReader" class="form-control" placeholder="Địa chỉ" />
          </div>
          <div class="form-group col">
            <input v-model="readerForm.phoneReader" class="form-control" placeholder="SĐT" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <button type="button" class="btn btn-secondary ml-2" @click="cancelEditReader">Hủy</button>
      </form>
    </div>
    <ReaderAccountList :readers="readers" @edit="startEditReader" @delete="deleteReader" />
    <h4 class="mt-4">Tài khoản nhân viên</h4>
    <button class="btn btn-success mb-2" @click="showAddStaff = !showAddStaff">
      {{ showAddStaff ? "Đóng" : "Thêm nhân viên" }}
    </button>
    <div v-if="showAddStaff" class="card p-3 mb-3">
      <form @submit.prevent="addStaff">
        <div class="form-row">
          <div class="form-group col">
            <input v-model="staffForm.nameStaff" class="form-control" placeholder="Tên nhân viên" required />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.roleStaff" class="form-control" placeholder="Chức vụ" />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.username" class="form-control" placeholder="Tên đăng nhập" required />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.password" type="password" class="form-control" placeholder="Mật khẩu" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <input v-model="staffForm.addressStaff" class="form-control" placeholder="Địa chỉ" />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.phoneStaff" class="form-control" placeholder="SĐT" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Lưu</button>
        <button type="button" class="btn btn-secondary ml-2" @click="cancelAddStaff">Hủy</button>
      </form>
    </div>
    <div v-if="editStaffId" class="card p-3 mb-3">
      <form @submit.prevent="updateStaff">
        <div class="form-row">
          <div class="form-group col">
            <input v-model="staffForm.nameStaff" class="form-control" placeholder="Tên nhân viên" required />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.roleStaff" class="form-control" placeholder="Chức vụ" />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.username" class="form-control" placeholder="Tên đăng nhập" required />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.password" type="password" class="form-control" placeholder="Mật khẩu" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <input v-model="staffForm.addressStaff" class="form-control" placeholder="Địa chỉ" />
          </div>
          <div class="form-group col">
            <input v-model="staffForm.phoneStaff" class="form-control" placeholder="SĐT" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <button type="button" class="btn btn-secondary ml-2" @click="cancelEditStaff">Hủy</button>
      </form>
    </div>
    <StaffAccountList :staffs="staffs" @edit="startEditStaff" @delete="deleteStaff" />
  </div>
</template>
<script>
import ReaderAccountList from "@/components/ReaderAccountList.vue";
import StaffAccountList from "@/components/StaffAccountList.vue";
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
export default {
  components: { ReaderAccountList, StaffAccountList },
  data() {
    return {
      readers: [],
      staffs: [],
      showAddStaff: false,
      editReaderId: null,
      editStaffId: null,
      readerForm: {
        lastNameReader: "",
        firstNameReader: "",
        username: "",
        password: "",
        dateOfBirthReader: "",
        genderReader: "",
        addressReader: "",
        phoneReader: ""
      },
      staffForm: {
        nameStaff: "",
        roleStaff: "",
        username: "",
        password: "",
        addressStaff: "",
        phoneStaff: ""
      }
    };
  },
  methods: {
    async fetchReaders() {
      try {
        const data = await ReaderService.getAll();
        this.readers = (Array.isArray(data) ? data : (data.readers || [])).map(r => ({
          ...r,
          _id: r._id || r.idReader
        }));
      } catch {
        this.readers = [];
      }
    },
    async fetchStaffs() {
      try {
        const data = await StaffService.getAll();
        this.staffs = (Array.isArray(data) ? data : (data.staffs || [])).map(s => ({
          ...s,
          _id: s._id || s.idStaff
        }));
      } catch {
        this.staffs = [];
      }
    },
    // Reader
    startEditReader(reader) {
      this.editReaderId = reader._id;
      this.readerForm = { ...reader };
    },
    async updateReader() {
      await ReaderService.update(this.editReaderId, this.readerForm);
      this.editReaderId = null;
      this.readerForm = {
        lastNameReader: "",
        firstNameReader: "",
        username: "",
        password: "",
        dateOfBirthReader: "",
        genderReader: "",
        addressReader: "",
        phoneReader: ""
      };
      this.fetchReaders();
    },
    cancelEditReader() {
      this.editReaderId = null;
      this.readerForm = {
        lastNameReader: "",
        firstNameReader: "",
        username: "",
        password: "",
        dateOfBirthReader: "",
        genderReader: "",
        addressReader: "",
        phoneReader: ""
      };
    },
    async deleteReader(id) {
      if (confirm("Bạn có chắc muốn xóa độc giả này?")) {
        await ReaderService.delete(id);
        this.fetchReaders();
      }
    },
    // Staff
    async addStaff() {
      await StaffService.create(this.staffForm);
      this.staffForm = {
        nameStaff: "",
        roleStaff: "",
        username: "",
        password: "",
        addressStaff: "",
        phoneStaff: ""
      };
      this.showAddStaff = false;
      this.fetchStaffs();
    },
    startEditStaff(staff) {
      this.editStaffId = staff._id;
      this.staffForm = { ...staff };
    },
    async updateStaff() {
      await StaffService.update(this.editStaffId, this.staffForm);
      this.editStaffId = null;
      this.staffForm = {
        nameStaff: "",
        roleStaff: "",
        username: "",
        password: "",
        addressStaff: "",
        phoneStaff: ""
      };
      this.fetchStaffs();
    },
    cancelEditStaff() {
      this.editStaffId = null;
      this.staffForm = {
        nameStaff: "",
        roleStaff: "",
        username: "",
        password: "",
        addressStaff: "",
        phoneStaff: ""
      };
    },
    cancelAddStaff() {
      this.showAddStaff = false;
      this.staffForm = {
        nameStaff: "",
        roleStaff: "",
        username: "",
        password: "",
        addressStaff: "",
        phoneStaff: ""
      };
    },
    async deleteStaff(username) {
      if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
        await StaffService.delete(username);
        this.fetchStaffs();
      }
    }
  },
  mounted() {
    // Kiểm tra quyền staff trước khi cho truy cập
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "staff") {
      this.$router.replace({ name: "login" }); // hoặc { path: "/" }
      return;
    }
    this.fetchReaders();
    this.fetchStaffs();
  }
};
</script>
<style scoped>
.account-page {
  max-width: 90vw;
  min-width: 900px;
  margin: 0 auto;
}

.thead-blue th {
  background: #1677ff;
  color: #fff;
  border: none;
}
</style>