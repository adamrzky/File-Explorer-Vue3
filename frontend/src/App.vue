<template>
  <div class="file-explorer">
    <folder-list :folders="folders" @select-folder="selectFolder" />
    <folder-details :selectedFolder="selectedFolder" :load-folder-details="loadFolderDetails" />
  </div>
</template>

<script>
import FolderList from './components/FolderList.vue'
import FolderDetails from './components/FolderDetails.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  components: {
    FolderList,
    FolderDetails,
  },

  setup() {
    const folders = ref([])
    const selectedFolder = ref(null)

    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/v1/folders')
        if (response.status === 200) {
          folders.value = buildFolderTree(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    const buildFolderTree = (foldersData) => {
      const folderLookup = {}
      const rootFolders = []

      foldersData.forEach((folder) => {
        folder.children = [] 
        folderLookup[folder.id] = folder
      })

      foldersData.forEach((folder) => {
        if (folder.parent_id) {
          folderLookup[folder.parent_id].children.push(folder)
        } else {
          rootFolders.push(folder)
        }
      })

      return rootFolders
    }

    const selectFolder = (folder) => {
      selectedFolder.value = folder
    }

    const loadFolderDetails = async (folderId) => {
      try {
        const response = await axios.get(`/api/v1/folders/${folderId}`)
        if (response.status === 200 && response.data.success) {
          selectedFolder.value = { ...selectedFolder.value, children: response.data.data }

          return response.data
        } else {
          console.error('Failed to fetch folder details:', response.statusText)
          return null
        }
      } catch (error) {
        console.error('Error fetching folder details:', error)
        return null
      }
    }

    onMounted(fetchFolders)

    return {
      folders,
      selectedFolder,
      selectFolder,
      loadFolderDetails,
    }
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.file-explorer {
  display: flex;
  width: 100vw;
  height: 100vh;
}
</style>
