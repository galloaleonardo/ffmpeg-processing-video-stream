# Processing Video Stream with FFMPEG Binay

A small project that reads a video, applies some color filters as you choose and makes it available to the client as a stream.

---

### Requirements:
- NodeJS >= 18.
- FFMPEG installed on OS. ([check installation here](https://ffmpeg.org/download.html)).

---

### Install

- Install dependencies:
```
yarn install
```

- Place a video mp3 file named `video.mp4` in the `media/` folder.

---

### Usage:

- Start server streaming on 3000 port:
```
yarn start:server 
```

- Start client on 8080 port by default:
```
yarn start:client
```
---

Enjoy yourself! =)
