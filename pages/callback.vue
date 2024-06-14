<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import eventBus from '~/utils/eventBus';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

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
