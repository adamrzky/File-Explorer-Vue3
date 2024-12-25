<template>
  <div class="file-explorer">
    <folder-list :folders="folders" @select-folder="selectFolder" />
    <folder-details :selectedFolder="selectedFolder" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import FolderList from './components/FolderList.vue'
import FolderDetails from './components/FolderDetails.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  components: {
    FolderList,
    FolderDetails,
    SearchBar
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
        if (folder.parent_id === null) {
          rootFolders.push(folder)
        } else {
          const parent = folderLookup[folder.parent_id]
          if (parent) {
            parent.children.push(folder)
          }
        }
      })

      return rootFolders
    }

    const selectFolder = (folder) => {
      selectedFolder.value = folder
    }

    onMounted(fetchFolders)

    return {
      folders,
      selectedFolder,
      selectFolder,
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
