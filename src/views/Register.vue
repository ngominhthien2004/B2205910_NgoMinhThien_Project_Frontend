<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header"><h2>Register</h2></div>
      <div class="card-body">
        <form @submit.prevent="onRegister">
          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="fullName" type="text" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success btn-block mt-3">Register</button>
        </form>
        <div class="mt-3 text-center">
          Already have an account?
          <router-link to="/login">Login here</router-link>
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
      fullName: "",
    };
  },
  methods: {
    async onRegister() {
      // Gọi API đăng ký ở đây, ví dụ: /api/auth/register
      // Chỉ đăng ký với role reader
      // await AuthService.register({ email: this.email, password: this.password, fullName: this.fullName });
      alert("Register as reader (demo only)");
      this.$router.push({ name: "login" });
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
