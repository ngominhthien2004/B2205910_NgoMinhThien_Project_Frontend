<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">
            <i class="fa fa-book-open mr-2"></i>
            Library Management
        </a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Books
                </router-link>
            </li>
            <li v-if="user && user.role === 'reader'" class="nav-item">
                <router-link :to="{ name: 'borrow' }" class="nav-link">
                    Lịch sử mượn sách
                </router-link>
            </li>
            <li v-if="user && user.role === 'staff'" class="nav-item">
                <router-link :to="{ name: 'bookstaff' }" class="nav-link">
                    Quản lý sách
                </router-link>
            </li>
            <li v-if="user && user.role === 'staff'" class="nav-item">
                <router-link :to="{ name: 'borrowstaff' }" class="nav-link">
                    Quản lý mượn sách
                </router-link>
            </li>
            <li v-if="user && user.role === 'staff'" class="nav-item">
                <router-link :to="{ name: 'accountstaff' }" class="nav-link">
                    Quản lý tài khoản
                </router-link>
            </li>
        </div>
        <div class="navbar-nav ml-auto">
            <li v-if="!user" class="nav-item d-flex align-items-center">
                <router-link :to="{ name: 'login' }" class="nav-link px-2">Đăng Nhập</router-link>
                <span class="nav-link px-0">|</span>
                <router-link :to="{ name: 'register' }" class="nav-link px-2">Đăng ký</router-link>
            </li>
            <li v-else class="nav-item dropdown" :class="{ show: dropdownOpen }">
                <a class="nav-link dropdown-toggle"
                   href="#"
                   id="userDropdown"
                   role="button"
                   :aria-expanded="dropdownOpen ? 'true' : 'false'"
                   @click.prevent="toggleDropdown">
                    {{ displayName }}
                </a>
                <div class="dropdown-menu dropdown-menu-right" :class="{ show: dropdownOpen }" aria-labelledby="userDropdown">
                    <router-link class="dropdown-item" :to="{ name: 'profile' }">Profile</router-link>
                    <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
                </div>
            </li>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            dropdownOpen: false,
        };
    },
    computed: {
        displayName() {
            if (!this.user) return "";
            if (this.user.role === "reader") {
                // Ưu tiên lấy tên đầy đủ nếu có, nếu không thì ghép họ tên
                if (this.user.firstNameReader && this.user.lastNameReader) {
                    return `${this.user.lastNameReader} ${this.user.firstNameReader}`.trim();
                }
                // fallback cho các trường hợp khác
                return this.user.username || "";
            }
            if (this.user.role === "staff") {
                // Ưu tiên lấy tên nhân viên nếu có
                return this.user.nameStaff || this.user.name || this.user.username || "";
            }
            return "";
        }
    },
    methods: {
        updateUser() {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    this.user = JSON.parse(userStr);
                } catch {
                    this.user = null;
                }
            } else {
                this.user = null;
            }
        },
        logout() {
            localStorage.removeItem("user");
            this.user = null;
            this.dropdownOpen = false;
            this.$router.push({ name: "login" });
        },
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.dropdownOpen = false;
            }
        }
    },
    mounted() {
        this.updateUser();
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    watch: {
        $route() {
            this.updateUser();
            this.dropdownOpen = false;
        }
    }
};
</script>

<style scoped>
.navbar {
    margin-bottom: 20px;
}
.dropdown-menu.show {
    display: block;
}
</style>