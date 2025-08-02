<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header"><h2>Login</h2></div>
      <div class="card-body">
        <form @submit.prevent="onLogin">
          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select v-model="role" class="form-control">
              <option value="reader">Reader</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-block mt-3">Login</button>
        </form>
        <div v-if="role==='reader'" class="mt-3 text-center">
          Don't have an account?
          <router-link to="/register">Register here</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      role: "reader",
    };
  },
  methods: {
    async onLogin() {
      // Gọi API đăng nhập ở đây, ví dụ: /api/auth/login
      // Truyền role để backend xác thực đúng loại tài khoản
      // Sau khi đăng nhập thành công, chuyển hướng về trang chủ hoặc dashboard
      // Ví dụ:
      // await AuthService.login({ email: this.email, password: this.password, role: this.role });
      // this.$router.push({ name: "home" });
      alert(`Login as ${this.role} (demo only)`);
      this.$router.push({ name: "home" });
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
}
.login-card {
  width: 400px;
}
</style>
