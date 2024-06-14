<template>
  <div class="bg-black min-h-screen text-white relative">
    <Card />
    <div class="absolute bottom-4 right-4">
      <iframe
          :src="`https://open.spotify.com/embed/track/${trackId}`"
          width="300"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '~/components/Card.vue';
import eventBus from '~/utils/eventBus';

const trackId = ref('');

const updateTrackId = (id) => {
  trackId.value = id;
};

onMounted(() => {
  eventBus.on('track-changed', updateTrackId);
});
</script>

<style scoped>
</style>
