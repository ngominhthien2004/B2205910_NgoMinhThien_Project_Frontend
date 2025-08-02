<template>
  <div class="profile-page page">
    <h2 class="mb-4 text-center">Thông tin cá nhân</h2>
    <div v-if="user">
      <div class="card p-4">
        <div v-if="user.role === 'reader'">
          <div class="row mb-2"><div class="col-4 font-weight-bold">Tên đăng nhập:</div><div class="col">{{ user.username }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Họ:</div><div class="col">{{ user.lastNameReader }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Tên:</div><div class="col">{{ user.firstNameReader }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Ngày sinh:</div><div class="col">{{ user.dateOfBirthReader }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Giới tính:</div><div class="col">{{ user.genderReader }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Địa chỉ:</div><div class="col">{{ user.addressReader }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Số điện thoại:</div><div class="col">{{ user.phoneReader }}</div></div>
        </div>
        <div v-else-if="user.role === 'staff'">
          <div class="row mb-2"><div class="col-4 font-weight-bold">Tên đăng nhập:</div><div class="col">{{ user.username }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Tên nhân viên:</div><div class="col">{{ user.nameStaff }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Chức vụ:</div><div class="col">{{ user.roleStaff }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Địa chỉ:</div><div class="col">{{ user.addressStaff }}</div></div>
          <div class="row mb-2"><div class="col-4 font-weight-bold">Số điện thoại:</div><div class="col">{{ user.phoneStaff }}</div></div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning text-center mt-4">
      Bạn chưa đăng nhập.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        this.user = JSON.parse(userStr);
      } catch {
        this.user = null;
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
</style>
