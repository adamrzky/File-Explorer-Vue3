<template>
  <div>
    <h2 v-if="folderId" class="text-xl font-bold mb-4">Files in Folder #{{ folderId }}</h2>
    <ul>
      <li v-for="file in files" :key="file.id" class="py-2">
        {{ file.name }} ({{ file.file_type }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface File {
  id: number
  name: string
  file_type: string
}

const props = defineProps<{ folderId: number | null }>()
const files = ref<File[]>([])

const fetchFiles = async (folderId: number) => {
  const response = await fetch(`/api/v1/files?folder_id=${folderId}`)
  const data = await response.json()
  files.value = data.data || []
}

watch(
  () => props.folderId,
  (newFolderId) => {
    if (newFolderId) fetchFiles(newFolderId)
  },
)
</script>
