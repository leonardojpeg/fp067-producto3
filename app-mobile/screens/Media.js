import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function Media({ route }) {
  const { player } = route.params || {};

  // URL del video de highlights por defecto si el jugador no tiene uno
  const videoSource = player?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const videoPlayer = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highlights: {player?.name || player?.nombre || 'Jugador'}</Text>
      
      <View style={styles.videoContainer}>
        <VideoView 
          style={styles.video} 
          player={videoPlayer} 
          allowsFullscreen 
          allowsPictureInPicture 
        />
      </View>

      <View style={styles.controlsContainer}>
        <Button
          title={videoPlayer.playing ? 'Pausa' : 'Play'}
          onPress={() => {
            if (videoPlayer.playing) {
              videoPlayer.pause();
            } else {
              videoPlayer.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
