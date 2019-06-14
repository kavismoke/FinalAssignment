$('.demo').youtubeVideo();

$('.demo').youtubeVideo({

  // custom layout
  layout: {
    wrap: $('<div />', { class: 'ytb-video-wrap' }),
    container: $('<div />', { class: 'ytb-video-container' }),
    iframe: $('<iframe />', { class: 'ytb-video-iframe' }),
    button: $('<div />', { class: 'ytb-video-play-button'})
      .append('<svg viewBox="0 0 68 48"><path class="ytb-video-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'),
  },

  /*
    56.25 - 16:9
    75.25 - 4:3
    80.25 - 5:4
    100 - 1:1
  */
  aspectRatio: 56.25,

   'default' - 120x90
    'mqdefault' - 320x180
    'hqdefault' - 480x360
    'sddefault' - 640x480
    'maxresdefault' - 1280x720
    'http://...' - custom image
  
  cover: 'mqdefault',

  // custom parameters
  parametrs: 'autoplay=1&autohide=1',

  // play event
  playEvent: 'click',

  // or 'button'
  playMode: 'block',

  // or 'playlist'
  type: 'video',

  // Youtube API
  api: '',

  // displays the duration of the video
  // requires Youtube API
  duration: false,

  // displays the video title
  // requires Youtube API
  title: false,

  // displays the video description
  // requires Youtube API
  description: false
  
});