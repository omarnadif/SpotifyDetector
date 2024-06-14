// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@nuxt/ui"],
    ssr: true,
    app: {
        head: {
            title: "Spotify Detector",
            script: [
                { src: 'https://sdk.scdn.co/spotify-player.js', defer: true },
                {
                    type: 'text/javascript',
                    innerHTML: `
          window.onSpotifyWebPlaybackSDKReady = function() {
            console.log('Spotify Web Playback SDK is ready');
          };
        `,
                }
            ],
        }
    }
})