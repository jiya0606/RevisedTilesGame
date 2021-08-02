import React from 'react';
import { Button, StyleSheet, View} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; 

export default class SoundComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sound = new Audio.Sound();
    }
    componentDidMount() {
        Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      }); 
  
      // doesn't play when app isn't on 
      this.status = {
        shouldPlay: false,
      };
    }
    
    playSound() {
        // audio file
        this.sound.loadAsync(this.props.audio, this.status, false).then(
            ()=>{
            this.sound.replayAsync().then(
            ()=>{
            this.sound = new Audio.Sound();
            });
        });
        
        }

    render(){
        return (<View style = {styles.wolofContainer}>
        <Button title="WOLOF" color="#000000" style = {styles.wolofText} onPress={this.playSound.bind(this)}></Button>
        <Ionicons name="ios-volume-high" size={24} color="black" style = {styles.volumePositioning} />
      </View>);
    }
}

const styles = StyleSheet.create({
    wolofContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '11%', 
      },
});