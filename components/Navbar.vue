<template>
  <header class="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-sm bg-gray-800 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl">
    <div class="px-4">
      <div class="flex items-center justify-between">
        <div class="flex shrink-0">
          <nuxt-link aria-current="page" class="flex items-center" to="/">
            <img class="h-8 w-auto rounded-full" src="../public/favicon.ico" alt="Logo">
            <p class="sr-only">Spotify Detector</p>
          </nuxt-link>
        </div>
        <nav class="flex space-x-4 items-center">
          <nuxt-link to="/" class="text-sm font-medium text-gray-300 hover:text-white">Home</nuxt-link>
          <nuxt-link to="/myplaylist" class="text-sm font-medium text-gray-300 hover:text-white">My Playlist</nuxt-link>
          <button
              @click="toggleAuth"
              class="bg-green-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-green-600">
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { redirectToSpotifyAuth, logoutFromSpotify } from '~/utils/spotifyAuth';
import eventBus from '~/utils/eventBus';

const isLoggedIn = ref(false);

const checkAuthStatus = () => {
  const token = localStorage.getItem('spotify_access_token');
  isLoggedIn.value = !!token;
};

const toggleAuth = () => {
  if (isLoggedIn.value) {
    logoutFromSpotify();
  } else {
    redirectToSpotifyAuth();
  }
};

onMounted(() => {
  checkAuthStatus();
  eventBus.on('auth-changed', (status) => {
    isLoggedIn.value = status;
  });
});
</script>

<style scoped>
</style>
