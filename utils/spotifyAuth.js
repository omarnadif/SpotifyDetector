import eventBus from './eventBus';

export const redirectToSpotifyAuth = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
    const scopes = encodeURIComponent('app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-recently-played user-library-modify');
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
};

export const logoutFromSpotify = () => {
    localStorage.removeItem('spotify_access_token');
    eventBus.emit('auth-changed', false);
    window.location.reload();
};
