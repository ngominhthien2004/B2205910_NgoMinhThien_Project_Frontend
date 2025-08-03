<template>
  <div class="profile-page page">
    <h2 class="mb-4 text-center">Thông tin cá nhân</h2>
    <div v-if="user">
      <div class="card p-4">
        <form @submit.prevent="updateProfile">
          <div v-if="user.role === 'reader'">
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Tên đăng nhập:</div>
              <div class="col"><input v-model="form.username" class="form-control" disabled /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Họ:</div>
              <div class="col"><input v-model="form.lastNameReader" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Tên:</div>
              <div class="col"><input v-model="form.firstNameReader" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Ngày sinh:</div>
              <div class="col">
                <input
                  v-model="form.dateOfBirthReader"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Giới tính:</div>
              <div class="col"><input v-model="form.genderReader" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Địa chỉ:</div>
              <div class="col"><input v-model="form.addressReader" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Số điện thoại:</div>
              <div class="col"><input v-model="form.phoneReader" class="form-control" /></div>
            </div>
          </div>
          <div v-else-if="user.role === 'staff'">
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Tên đăng nhập:</div>
              <div class="col"><input v-model="form.username" class="form-control" disabled /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Tên nhân viên:</div>
              <div class="col"><input v-model="form.nameStaff" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Chức vụ:</div>
              <div class="col"><input v-model="form.roleStaff" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Địa chỉ:</div>
              <div class="col"><input v-model="form.addressStaff" class="form-control" /></div>
            </div>
            <div class="row mb-2">
              <div class="col-4 font-weight-bold">Số điện thoại:</div>
              <div class="col"><input v-model="form.phoneStaff" class="form-control" /></div>
            </div>
          </div>
          <div class="text-center mt-3">
            <button type="submit" class="btn btn-primary">Cập nhật</button>
            <span v-if="message" :class="{'ml-3': true, 'text-success': messageSuccess, 'text-danger': !messageSuccess}">
              {{ message }}
            </span>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="alert alert-warning text-center mt-4">
      Bạn chưa đăng nhập.
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
export default {
  data() {
    return {
      user: null,
      form: {},
      message: "",
      messageSuccess: true,
    };
  },
  mounted() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        this.user = JSON.parse(userStr);
        this.form = { ...this.user };
      } catch {
        this.user = null;
      }
    }
  },
  methods: {
    async updateProfile() {
      try {
        if (this.user.role === "reader") {
          await ReaderService.update(this.user._id || this.user.idReader, this.form);
        } else if (this.user.role === "staff") {
          await StaffService.update(this.user._id || this.user.idStaff, this.form);
        }
        // Cập nhật lại localStorage và user hiện tại
        localStorage.setItem("user", JSON.stringify({ ...this.user, ...this.form }));
        this.user = { ...this.user, ...this.form };
        this.message = "Cập nhật thành công!";
        this.messageSuccess = true;
        window.location.reload();
      } catch {
        this.message = "Cập nhật thất bại!";
        this.messageSuccess = false;
      }
    }
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
}
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.font-weight-bold {
  font-weight: 600;
}
.text-danger {
  color: #dc3545 !important;
}
</style>
