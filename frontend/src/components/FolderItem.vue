<template>
  <li>
    <div class="folder-item" @click="toggleFolder">
      <img src="/public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
      {{ folder.name }}
    </div>
    <ul v-if="isOpen && folder.children && folder.children.length">
      <folder-item
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        @select-folder="$emit('select-folder', $event)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    folder: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleFolder() {
      this.isOpen = !this.isOpen;
      this.$emit('select-folder', this.folder);
    },
  },
};
</script>

<style scoped>
.folder-item {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.folder-icon {
  margin-right: 10px;
  width: 24px;
}
</style>
