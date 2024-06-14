<template>
  <div class="bg-white min-h-screen text-black flex flex-col items-center justify-center p-4">
    <h1 class="text-3xl font-bold mb-8 text-center mt-16">Voici votre playlist</h1>
    <div v-if="playlistTracks.length > 0" class="space-y-4 overflow-auto max-h-[60vh] w-full max-w-2xl p-4 bg-gray-200 rounded-lg shadow-lg">
      <ul>
        <li v-for="track in playlistTracks" :key="track.id" class="mb-2">
          <div class="flex items-center p-2 bg-white rounded-md shadow hover:bg-gray-100 transition-colors duration-200">
            <img :src="track.album.images[0]?.url" class="h-12 w-12 rounded-md mr-4" :alt="track.name" />
            <div>
              <p class="font-bold text-lg">{{ track.name }}</p>
              <p class="text-sm text-gray-600">{{ track.artists.map((artist: Artist) => artist.name).join(', ') }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="text-center text-gray-600 mt-4">
      <p>Pas de morceaux dans votre playlist pour l'instant.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPlaylistTracks } from '~/api/spotify';
import type { Artist } from '~/model/artist';
import type { Track } from '~/model/track';

const playlistId = '5ajEw91BOciQ5qyYgRqeI8';
const playlistTracks = ref<Track[]>([]);

const fetchPlaylistTracks = async () => {
  try {
    const tracks = await getPlaylistTracks(playlistId);
    playlistTracks.value = tracks.map((item: { track: Track }) => item.track);
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
  }
};

onMounted(() => {
  fetchPlaylistTracks();
});
</script>

<style scoped>
</style>
