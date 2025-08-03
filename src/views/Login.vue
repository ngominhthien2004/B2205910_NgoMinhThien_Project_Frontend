<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header"><h2>Đăng nhập</h2></div>
      <div class="card-body">
        <form @submit.prevent="onLogin">
          <div class="form-group">
            <label>Tên đăng nhập</label>
            <input v-model="username" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Mật khẩu</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Vai trò</label>
            <select v-model="role" class="form-control">
              <option value="reader">Độc giả</option>
              <option value="staff">Nhân viên</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-3">Đăng nhập</button>
        </form>
        <div v-if="role==='reader'" class="mt-3 text-center">
          Chưa có tài khoản?
          <router-link to="/register">Đăng ký tại đây</router-link>
        </div>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      role: "reader",
      error: "",
    };
  },
  methods: {
    async onLogin() {
      this.error = "";
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          this.error = data.message || "Login failed";
          return;
        }
        // Lưu user vào localStorage
        if (data.role === "reader") {
          localStorage.setItem("user", JSON.stringify({ ...data.reader, role: "reader" }));
        } else if (data.role === "staff") {
          localStorage.setItem("user", JSON.stringify({ ...data.staff, role: "staff" }));
        }
        this.$router.push({ name: "home" });
      } catch (e) {
        this.error = "Cannot connect to server";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  /* Thêm background image */
  background-image: url('@/assets/auth-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.login-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(22, 119, 255, 0.18); /* overlay mờ */
  z-index: 0;
}
.login-card {
  width: 400px;
  position: relative;
  z-index: 1;
}
</style>
