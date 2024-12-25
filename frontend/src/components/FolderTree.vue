<template>
  <div>
    <ul>
      <li v-for="folder in folders" :key="folder.id" class="cursor-pointer">
        <div
          class="py-2"
          :class="{ 'font-bold': folder.id === selectedFolderId }"
          @click="selectFolder(folder.id)"
        >
          {{ folder.name }}
        </div>
        <ul v-if="folder.children && folder.id === expandedFolderId" class="pl-4">
          <li
            v-for="child in folder.children"
            :key="child.id"
            @click.stop="selectFolder(child.id)"
            class="cursor-pointer"
          >
            {{ child.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Folder {
  id: number
  name: string
  children?: Folder[]
}

const folders = ref<Folder[]>([])
const selectedFolderId = ref<number | null>(null)
const expandedFolderId = ref<number | null>(null)

const fetchFolders = async () => {
  const response = await fetch('/api/v1/folders')
  const data = await response.json()
  folders.value = data
}

const selectFolder = (folderId: number) => {
  if (expandedFolderId.value === folderId) {
    expandedFolderId.value = null
  } else {
    expandedFolderId.value = folderId
  }
  selectedFolderId.value = folderId
  emit('folderSelected', folderId)
}

onMounted(fetchFolders)
</script>
