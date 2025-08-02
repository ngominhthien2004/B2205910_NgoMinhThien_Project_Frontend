<template>
  <div class="page account-page">
    <h2 class="text-center">Quản lý tài khoản</h2>
    <h4 class="mt-4">Tài khoản bạn đọc</h4>
    <ReaderList :readers="readers" />
    <h4 class="mt-4">Tài khoản nhân viên</h4>
    <StaffList :staffs="staffs" />
  </div>
</template>
<script>
import ReaderList from "@/components/ReaderList.vue";
import StaffList from "@/components/StaffList.vue";
export default {
  components: { ReaderList, StaffList },
  data() {
    return {
      readers: [],
      staffs: [],
    };
  },
  async mounted() {
    try {
      const resReaders = await fetch("/api/readers");
      const dataReaders = await resReaders.json();
      this.readers = dataReaders.readers || dataReaders || [];
    } catch {
      this.readers = [];
    }
    try {
      const resStaffs = await fetch("/api/staffs");
      const dataStaffs = await resStaffs.json();
      this.staffs = dataStaffs.staffs || dataStaffs || [];
    } catch {
      this.staffs = [];
    }
  }
};
</script>
<style scoped>
.account-page {
  max-width: 90vw;
  min-width: 900px;
  margin: 0 auto;
}
</style>
