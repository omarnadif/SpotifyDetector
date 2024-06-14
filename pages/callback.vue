<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import eventBus from '~/utils/eventBus';

const client_id = '0dc5c5eda7304ef98b1a4fbb22c9c646';
const client_secret = '74b3af2308584a068c7160017e7ef538';
const redirect_uri = 'http://localhost:3000/';

const route = useRoute();
const router = useRouter();

const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const accessToken = response.data.access_token;
    localStorage.setItem('spotify_access_token', accessToken);
    eventBus.emit('auth-changed', true);
    router.push('/');
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};

onMounted(() => {
  const code = route.query.code;
  if (code) {
    exchangeCodeForToken(code);
  } else {
    router.push('/');
  }
});
</script>

<style scoped>
</style>
