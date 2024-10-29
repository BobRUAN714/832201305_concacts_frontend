<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增联系人</el-button>
    <el-table :data="contactList" border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="email" label="邮箱" width="240" />
      <el-table-column prop="company" label="公司" width="180" />
      <el-table-column prop="position" label="职位" width="180" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="联系人信息">
      <el-form :model="contactForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="contactForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="contactForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="contactForm.email"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="formLabelWidth">
          <el-input v-model="contactForm.company"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="contactForm.position"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listAddressBook, getAddressBook, addAddressBook, updateAddressBook, deleteAddressBook } from "@/api/addressBook";

export default {
  data() {
    return {
      contactList: [],
      loading: false,
      dialogVisible: false,
      contactForm: {
        id: null,
        name: '',
        phone: '',
        email: '',
        company: '',
        position: ''
      },
      formLabelWidth: '80px'
    };
  },
  methods: {
    fetchContacts() {
      this.loading = true;
      listAddressBook().then(response => {
        this.contactList = response.data;
        this.loading = false;
      });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.contactForm = { id: null, name: '', phone: '', email: '', company: '', position: '' };
    },
    handleEdit(contact) {
      getAddressBook(contact.id).then(response => {
        this.contactForm = response.data;
        this.dialogVisible = true;
      });
    },
    handleSave() {
      const apiMethod = this.contactForm.id ? updateAddressBook : addAddressBook;
      apiMethod(this.contactForm).then(() => {
        this.dialogVisible = false;
        this.fetchContacts();
      });
    },
    handleDelete(id) {
      deleteAddressBook(id).then(() => {
        this.fetchContacts();
      });
    }
  },
  mounted() {
    this.fetchContacts();
  }
};
</script>
