---
title: Building an Audio Sample Explorer in Electron Part 1 - Streaming and Custom Protocols
date: "2024-11-03"
description: "This post is part one of a series of the different tribulations to develop punks, my experimental audio sample explorer made in Electron."
tags: ["punks", "electron"]
---

This post is part one of a series of the different tribulations to develop [punks](https://www.github.com/samanshaiza004/punks), my experimental audio sample explorer made in Electron.

# Streaming audio from the user's file system

The fundamental aspect of an audio explorer is... well, streaming audio from the user's file system, duh. This isn't trivial in the slightest, but, luckily, Electron's flexibility allows us to easily create custom protocols to handle these requirements.

## "Why custom protocols?!"

Electron apps, by default, don't have a straight-forward way Traditional web apps load media over HTTP, but Electron allows file access directly. However, for security and performance reasons, Electron's build-in APIs are to be handled with care and thoughtfulness. This is crucial to handle large, continuous media files, like audio, directly from the file system.

Protocols are standardized sets of rules for transmitting data, used in everything from HTTP for websites to FTP for file transfers. In Electron, a custom protocol enables efficient and secure access to files and data outside the web’s limitations.

Electron’s APIs allow fine-grained control over local resources, making custom protocols effective for secure, high-performance file access without relying on web servers.

In this situation, custom protocols are ideal because:

- They give **control over how media is accessed** (I don't want a web server, obviously).
- The registered protocol handler ensures the app does not expose unintended files.
- Custom protocols with streaming support let us work with audio data efficiently.

## Setting up a custom protocol

In **punks**, I registered a custom `sample://` protocol, which tells the app how to handle audio files. This protocol supports the Electron environment's `net` and `protocol` modules, giving us more control over how files are loaded and played.

This can be setup really easily. The `protocol.registerSchemesAsPrivileged` function is used here to grant out custom protocol certain privileges, such as bypassing CSP restrictions and supporting streaming.

```typescript
// main.ts

protocol.registerSchemesAsPrivileged([
  {
    scheme: "sample",
    privileges: { bypassCSP: true, stream: true, supportFetchAPI: true },
  },
]);

app.whenReady().then(() => {
  protocol.handle("sample", (request) => {
    const filePath = request.url.replace("sample:///", ""); // Remove the scheme prefix
    return net.fetch("file://" + filePath); // Fetches the file as a stream
  });
});
```

The protocol is registered as "privileged" so it can **bypass content security policy (CSP), support the Fetch API**, and **stream** files. Registering as privileged allows Electron to bypass certain web restrictions, letting us safely access local files while preventing exposure to external threats.

`protocol.handle('sample', ...)` listens for requests to `sample://` URLs, converting them to file paths with `file://` for the local file system.

## Handling audio in the renderer with Wavesurfer.js

With the protocol in place, the next step is to handle audio playback. Here’s how I integrated **WaveSurfer.js** to control the audio stream in the frontend. This code lives in the custom `AudioProvider` component and supports play/pause, volume, and skipping.

```typescript
const playAudio = (filePath: string) => {
  // Set the current audio file path
  setCurrentAudio(filePath);

  if (waveSurferRef.current) {
    waveSurferRef.current.load(`sample://${filePath}`);
    waveSurferRef.current.on("ready", () => {
      waveSurferRef.current?.play();
    });
  }
};
```

When a file path is given to `playAudio`, WaveSurfer loads it using our `sample://` protocol.

WaveSurfer then manages audio playback, while `AudioProvider` functions (e.g., `playAudio`, `stopAudio`) provide control.

### Challenges: Security and Privileges

Electron’s default settings prevent files from being accessed directly for security reasons. Using a custom protocol with `registerSchemesAsPrivileged` allowed secure access by explicitly listing privileges.

On my first attempt of this app, I was using Wails and they use a static file server which was not an intuitive option for this app. The big reason why I chose Electron was the from a small prototype I made in order to see how easy it is to stream audio files. It was really easy as you can see.

## Future Plans

- **Custom keybinds**: Ensuring a good keyboard experience with keybinds and customizability.
- **Tab functionality**: Tabs made in React. Just fun.

## Conclusion

Implementing custom protocols in Electron is an invaluable approach for audio-based applications. This setup is essential to allow users access to files directly, creating an app that functions seamlessly with the local file system.

## Read more

- [Electron Documentation - Protocols](https://www.electronjs.org/docs/latest/api/protocol)
- [Doyensec's Electron Security Checklist](https://www.doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)
