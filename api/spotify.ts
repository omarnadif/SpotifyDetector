import axios from 'axios';

// Spotify API credentials
const client_id = '0dc5c5eda7304ef98b1a4fbb22c9c646';
const client_secret = '74b3af2308584a068c7160017e7ef538';

// Get Spotify token
export const getSpotifyToken = async (): Promise<string> => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
        return token;
    }
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
            },
        });
        console.log('Spotify token obtained:', response.data.access_token);
        localStorage.setItem('spotify_access_token', response.data.access_token); // Aggiorna token in localStorage
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining Spotify token:', error);
        throw error;
    }
};

// Get track by ID
export const getTrack = async (trackId: string): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Track data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching track:', error);
        throw error;
    }
};

// Add track to playlist
export const addToPlaylist = async (playlistId: string, trackUri: string) => {
    try {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
            throw new Error('Spotify access token is not available.');
        }
        const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: [trackUri],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Track added to playlist:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding track to playlist:', error);
        throw error;
    }
};

// Get random track
export const getRandomTrack = async (genre = 'pop'): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 1,
                seed_genres: genre,
            },
        });
        console.log('Random track fetched:', response.data.tracks[0]);
        return response.data.tracks[0];
    } catch (error) {
        console.error('Error fetching random track:', error);
        throw error;
    }
};

// Fetch playlist tracks
export const getPlaylistTracks = async (playlistId: string): Promise<any> => {
    try {
        const token = await getSpotifyToken();
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Playlist tracks fetched:', response.data.items);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching playlist tracks:', error);
        throw error;
    }
};
