<template>
  <div class="page borrow-history">
    <h2 class="mb-4 text-center">Lịch sử mượn sách</h2>
    <ReaderBorrowList />
  </div>
</template>

<script>
import ReaderBorrowList from "@/components/ReaderBorrowList.vue";
export default {
  components: { ReaderBorrowList }
};
</script>
<style scoped>
.borrow-history {
  max-width: 800px;
  margin: 0 auto;
}
</style>
