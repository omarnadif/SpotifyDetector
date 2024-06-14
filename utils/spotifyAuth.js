import eventBus from './eventBus';

export const redirectToSpotifyAuth = () => {
    const clientId = '0dc5c5eda7304ef98b1a4fbb22c9c646';
    const redirectUri = encodeURIComponent('http://localhost:3000/');
    const scopes = encodeURIComponent('app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-recently-played user-library-modify');
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
};

export const logoutFromSpotify = () => {
    localStorage.removeItem('spotify_access_token');
    eventBus.emit('auth-changed', false);
    window.location.reload();
};
