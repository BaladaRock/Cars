<template>
  <div class="btn_delete_container">
    <button @click="handleDelete" class="delete_button">
      Delete car
      <i class="icon-delete"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteButton',
  props: {
    serialNumber: {
      type: String,
      required: true,
    },
  },
  emits: ['delete-car'],
  methods: {
    handleDelete() {
      this.$emit('delete-car', this.serialNumber);
    },
  },
});
</script>

<style scoped>
@import "@/assets/styles/components/DeleteButtonComponent.css";
</style>