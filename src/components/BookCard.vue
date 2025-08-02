<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book.idBook }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.title }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ book.description }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ book.category }}
        </div>
        <div class="p-1">
            <strong>Giá:</strong>
            {{ book.price }}
        </div>
        <div class="p-1">
            <strong>Tổng số lượng:</strong>
            {{ book.totalCopies }}
        </div>
        <div class="p-1">
            <strong>Số lượng còn lại:</strong>
            {{ book.availableCopies }}
        </div>
        <div class="p-1">
            <strong>Ngày phát hành:</strong>
            {{ book.releaseDate ? (new Date(book.releaseDate)).toLocaleDateString() : '' }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ book.publisher }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.author }}
        </div>
    </div>
</template>