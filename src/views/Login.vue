<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header"><h2>Login</h2></div>
      <div class="card-body">
        <form @submit.prevent="onLogin">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" required />
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
}
.login-card {
  width: 400px;
}
</style>
