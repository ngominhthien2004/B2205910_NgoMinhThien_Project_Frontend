<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header"><h2>Register</h2></div>
      <div class="card-body">
        <form @submit.prevent="onRegister">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Họ</label>
            <input v-model="lastNameReader" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Tên</label>
            <input v-model="firstNameReader" type="text" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success btn-block mt-3">Register</button>
        </form>
        <div class="mt-3 text-center">
          Already have an account?
          <router-link to="/login">Login here</router-link>
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
      lastNameReader: "",
      firstNameReader: "",
      error: "",
    };
  },
  methods: {
    async onRegister() {
      this.error = "";
      try {
        const res = await fetch("/api/readers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            lastNameReader: this.lastNameReader,
            firstNameReader: this.firstNameReader,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          this.error = data.message || "Register failed";
          return;
        }
        this.$router.push({ name: "login" });
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
