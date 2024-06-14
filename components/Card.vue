<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-6 max-w-sm relative">
      <template v-if="track">
        <img v-if="track.album && track.album.images && track.album.images[0]" class="rounded-md" :src="track.album.images[0].url" :alt="track.name">
        <div class="mt-4 text-center">
          <p class="font-bold">{{ track.name }}</p>
          <p class="text-gray-500">{{ track.artists[0].name }}</p>
        </div>
      </template>
      <template v-else>
        <p>Loading...</p>
      </template>
      <div class="flex justify-center gap-4 mt-4">
        <UButton
            icon="i-heroicons-heart-solid"
            size="sm"
            color="green"
            class="text-green-500 bg-white rounded-full shadow"
            @click="like"
        />
        <UButton
            icon="i-heroicons-x-mark-16-solid"
            size="sm"
            color="red"
            class="text-red-500 bg-white rounded-full shadow"
            @click="dislike"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getTrack, addToPlaylist, getRandomTrack } from '~/api/spotify';
import eventBus from '~/utils/eventBus';

const track = ref(null);
const playlistId = '5ajEw91BOciQ5qyYgRqeI8';

const like = async () => {
  if (track.value) {
    console.log('Liking track:', track.value.uri);
    try {
      await addToPlaylist(playlistId, track.value.uri);
      alert('Track added to playlist!');
    } catch (error) {
      console.error('Error adding track to playlist:', error);
      alert('Failed to add track to playlist.');
    }
  } else {
    console.log('No track to like.');
  }
};

const dislike = async () => {
  console.log('Disliking track and fetching a new one.');
  try {
    track.value = await getRandomTrack();
    eventBus.emit('track-changed', track.value.id);
  } catch (error) {
    console.error('Error fetching random track:', error);
    alert('Failed to fetch a new track.');
  }
};

onMounted(async () => {
  console.log('Fetching a random track on mount.');
  try {
    track.value = await getRandomTrack();
    eventBus.emit('track-changed', track.value.id);
  } catch (error) {
    console.error('Error fetching initial random track:', error);
    alert('Failed to fetch initial track.');
  }
});

watch(track, (newTrack) => {
  if (newTrack) {
    eventBus.emit('track-changed', newTrack.id);
  }
});
</script>

<style scoped>
</style>
