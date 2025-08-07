<template>
    <div class="header-wrapper">
        <nav class="navbar navbar-expand navbar-dark bg-dark" style="position: relative; z-index: 1050;">
            <a href="/" class="navbar-brand">
                <img src="/favicon.ico" alt="Logo" class="mr-2" style="height: 24px; width: 24px;" />
                Thư viện MT
            </a>
            <div class="mr-auto navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'book' }" class="nav-link">
                        Sách
                    </router-link>
                </li>
                <li v-if="user && (user.role === 'reader' || user.role === 'staff')" class="nav-item">
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
                <li v-if="user && user.role === 'staff'" class="nav-item">
                    <router-link :to="{ name: 'publisherstaff' }" class="nav-link">
                        Quản lý NXB
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
                        <router-link class="dropdown-item" :to="{ name: 'profile' }">Hồ sơ</router-link>
                        <a class="dropdown-item" href="#" @click.prevent="logout">Đăng xuất</a>
                    </div>
                </li>
            </div>
        </nav>
    </div>
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
.header-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    border-radius: 10px;
    position: static;
}

.navbar {
    margin-bottom: 20px;
    background-image: url('@/assets/header-bg.jpg');
    background-size: cover;
    background-position: center;
    color: #111 !important;
    border-radius: 10px;
}

.navbar * {
    color: #111 !important;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-menu {
    z-index: 9999; /* Tăng giá trị z-index lên cao hơn */
    position: absolute;
    /* top: 100%; */ /* Bỏ comment nếu dropdown chưa đúng vị trí */
    /* left: 0; */   /* Bỏ comment nếu cần căn chỉnh */
}
</style>