<template>
    <!-- Hiển thị lỗi idBook trùng nếu có -->
    <div v-if="errorMessage" class="alert alert-danger mb-2">{{ errorMessage }}</div>
    <Form @submit="submitBook" :validation-schema="bookFormSchema" v-slot="{ errors }">
        <div class="form-row">
            <div class="form-group flex-1">
                <label for="idBook">Mã sách</label>
                <Field name="idBook" type="text" class="form-control" v-model="bookLocal.idBook" />
                <ErrorMessage name="idBook" class="error-feedback" />
                <!-- Hiển thị lỗi trùng idBook dưới trường nhập -->
                <div v-if="idBookDuplicateError" class="error-feedback">{{ idBookDuplicateError }}</div>
            </div>
            <div class="form-group flex-1">
                <label for="title">Tên sách</label>
                <Field name="title" type="text" class="form-control" v-model="bookLocal.title" />
                <ErrorMessage name="title" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group flex-1">
                <label for="description">Mô tả</label>
                <Field name="description" type="text" class="form-control" v-model="bookLocal.description" />
                <ErrorMessage name="description" class="error-feedback" />
            </div>
            <div class="form-group flex-1">
                <label for="category">Thể loại</label>
                <Field name="category" type="text" class="form-control" v-model="bookLocal.category" />
                <ErrorMessage name="category" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group flex-1">
                <label for="price">Giá</label>
                <Field name="price" type="number" class="form-control" v-model="bookLocal.price" />
                <ErrorMessage name="price" class="error-feedback" />
            </div>
            <div class="form-group flex-1">
                <label for="totalCopies">Tổng số lượng</label>
                <Field name="totalCopies" type="number" class="form-control" v-model="bookLocal.totalCopies" />
                <ErrorMessage name="totalCopies" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group flex-1">
                <label for="availableCopies">Số lượng còn lại</label>
                <Field name="availableCopies" type="number" class="form-control" v-model="bookLocal.availableCopies" />
                <ErrorMessage name="availableCopies" class="error-feedback" />
            </div>
            <div class="form-group flex-1">
                <label for="releaseDate">Ngày phát hành</label>
                <Field name="releaseDate" type="date" class="form-control" v-model="bookLocal.releaseDate" />
                <ErrorMessage name="releaseDate" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group flex-1">
                <label for="publisher">Nhà xuất bản</label>
                <Field name="publisher" type="text" class="form-control" v-model="bookLocal.publisher" />
                <ErrorMessage name="publisher" class="error-feedback" />
            </div>
            <div class="form-group flex-1">
                <label for="author">Tác giả</label>
                <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
                <ErrorMessage name="author" class="error-feedback" />
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-danger" @click="cancelForm">
                Thoát
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book", "check:idBook"],
    props: {
        book: { type: Object, required: true },
        errorMessage: { type: String, default: "" }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            idBook: yup.string().required("Mã sách là bắt buộc."),
            title: yup.string().required("Tên sách là bắt buộc."),
            description: yup.string().max(500, "Mô tả tối đa 500 ký tự."),
            category: yup.string().max(100, "Thể loại tối đa 100 ký tự."),
            price: yup.number().typeError("Giá phải là số.").required("Giá là bắt buộc."),
            totalCopies: yup.number().typeError("Tổng số lượng phải là số.").required("Tổng số lượng là bắt buộc."),
            availableCopies: yup.number().typeError("Số lượng còn lại phải là số.").required("Số lượng còn lại là bắt buộc."),
            releaseDate: yup.date().typeError("Ngày phát hành không hợp lệ."),
            publisher: yup.string().max(100, "Nhà xuất bản tối đa 100 ký tự."),
            author: yup.string().max(100, "Tác giả tối đa 100 ký tự."),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            idBookDuplicateError: ""
        };
    },
    watch: {
        errorMessage(val) {
            // Nếu có lỗi trùng idBook từ cha, hiển thị ở trường idBook
            this.idBookDuplicateError = val;
        }
    },
    methods: {
        submitBook() {
            this.idBookDuplicateError = "";
            this.$emit("check:idBook", this.bookLocal, (duplicateMsg) => {
                if (duplicateMsg) {
                    this.idBookDuplicateError = duplicateMsg;
                } else {
                    this.$emit("submit:book", this.bookLocal);
                }
            });
        },
        deleteBook() {
            this.$emit("delete:book");
        },
        cancelForm() {
            // Loại bỏ window.confirm, chỉ emit để cha đóng modal ngay lập tức
            this.$emit("delete:book");
        }
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 3px;
}
.flex-1 {
  flex: 1;
}
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>