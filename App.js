import React from 'react';
import { Image,StyleSheet, Text, View, Dimensions, Animated, PanResponder } from 'react-native';
import { Audio } from 'expo-av'
import DropTiles from './DropTiles.js';
import SubmitButton from './SubmitButton';
import SoundComponent from './SoundComponent.js';
import LetterTilesContainerComponent from './LetterTilesContainerComponent.js';
import DropZone from './DropZone.js';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const vocabCards = [
  {
    image: require('./assets/mango.jpg'),
    description: "Mangos are sweet fruits that are typically are a yellow color with a hint of red/ orange. They have a hard center and juicy, soft pulp. Mangos typically grow on talll trees in tropical areas.", 
    engText: "Mango",
    frenchText: "Mangue", 
    buttonColor: "#FFE5B4",
    audio: require('./assets/sound.m4a'),
    letters: ['M', 'A', 'N', 'G', 'O'],
  },

  {
    image: require('./assets/watermelon.jpeg'),
    description: "Watermelons are amoung the biggest fruits and come in sphereical shapes. They have a dark green outer layer, black seeds, and are red on the inside. They are sweet, juicy, and great to eat during the summertime!",
    engText: "Watermelon",
    frenchText: "Pastèque",
    buttonColor: "#C1E1C1",
    audio: require('./assets/watermelon.m4a'),
    letters: ['W', 'A', 'T', 'E', 'R', 'M', 'E', 'L', 'O', 'N'],
  },

  {
    image: require('./assets/(2)baobadFruit.jpeg'),
    description: "Baobab Fruit is common in Africa. It is light green or grey on the outside, and its pulp divides into small white pieces. The fruit tastes dry and has a yogurt-like flavor.",
    engText: "Baobab Fruit",
    frenchText: "fruit du baobab",
    buttonColor: "#C1E1C1",
    audio: require('./assets/baobab_fruit.m4a'),
    letters: ['B', 'A', 'O', 'B', 'A', 'B', 'F', 'R', 'U', 'I', 'T'],
  },

  {
    image: require('./assets/(2)madd.png'),
    description: "Madd is a orange/brown fruit that contains a soft and juicy pulp. The fruit is sweet and tart. The fruits usually grow on wines and take more than a year to harvest",
    engText: "Madd",
    frenchText: "Fou",
    buttonColor: "#FFE5B4",
    audio: require('./assets/madd.m4a'),
    letters: ['M', 'A', 'D', 'D'],
  },

  {
    image: require('./assets/(3)ditax.png'),
    description: "Ditax has a brown outer coating and a green pulp. It can have both a sweet and sour flavor and has a dry pulp. Ditax also has a seed in the middle of the fruit.",
    engText: "Ditax",
    frenchText: "Ditax",
    buttonColor: "#D1C3B7",
    audio: require('./assets/ditax.m4a'),
    letters: ['D', 'I', 'T', 'A', 'X'],
  },

  {
    image: require('./assets/(2)coconut.jpeg'),
    description: "Coconuts have a brown outer coating and are white on the inside. They are filled with flavored water and are typically hard to break. Coconuts are also found on high trees.",
    engText: "Coconut",
    frenchText: "Noix de coco",
    buttonColor: "#D1C3B7", 
    audio: require('./assets/coconut.m4a'),
    letters: ['C', 'O', 'C', 'O', 'N', 'U', 'T'],
  },

  {image: require('./assets/tomato.jpeg'),
    description: "Tomatoes are red on the outside and on the inside. They have a squishy, soft pulp, which is filled with seeds. Tomatoes taste juicy and sweet, but can taste sour if they are not ripe.",
    engText: "Tomato",
    frenchText: "Tomate",
    buttonColor: "#ff9e99",
    audio: require('./assets/tomato.m4a'),
    letters: ['T', 'O', 'M', 'A', 'T', 'O'],
  },
]

export default class App extends React.Component {
  constructor() {
   super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      correctAnswer: false,
      wrongAnswer: false,
      measurements: new Array(),
    }
    this.userAnswer = new Array(vocabCards[this.state.currentIndex].letters.length);

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });
    this.sound = new Audio.Sound();
  }

  // audio
   // audio device adjustment 
    async componentDidMount() {
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

    // play file 
    playSound() {
      // audio file
      this.sound.loadAsync(vocabCards[this.state.currentIndex].audio, this.status, false).then(
        ()=>{
        this.sound.replayAsync().then(
          ()=>{
          this.sound = new Audio.Sound();
        });
      });
      
    }
  
  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              this.userAnswer = new Array(vocabCards[this.state.currentIndex].letters.length);
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex - 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              this.userAnswer = new Array(vocabCards[this.state.currentIndex].letters.length);
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    });
  }

  handleWrongAnswer = () =>{
    this.setState({
      ...this.state,
      userAnswer: new Array(),
    })
  }

  renderVocabCards = () => {
    return vocabCards.map((item, i) => {
      console.log(i);
      //this.measurements = new Array();
      if (this.state.currentIndex >= vocabCards.length) {this.state.currentIndex = 0}
      if (this.state.currentIndex < 0) {this.state.currentIndex = vocabCards.length-1}
      
      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} 
            style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}
          >
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}/>
            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}/>
            <View style = {styles.container}>
            <View style = {styles.dictionaryContainer}>
              <Text style = {styles.dictionaryText}> English Scrabble</Text>
            </View>
        
            <View style = {styles.instructionsContainer}>
            <Text style = {styles.instructionsFormat}>Find the english translation of the word using with the image, audio, and description</Text>
            </View>

            {/* Wolof audio */}
            <SoundComponent audio={vocabCards[this.state.currentIndex].audio}/> 

            {/* image */}
            <View style = {styles.imgContainer}>
              <Image source={vocabCards[this.state.currentIndex].image} style ={styles.imageFormat} /> 
            </View> 
            
            {/* Description */}
            <View style = {styles.descContainer}>
              <Text style = {styles.descFormat}>{vocabCards[this.state.currentIndex].description} </Text>
            </View>
    
            </View>
            <View style = {styles.insP2cont}>
                  <Text style =  {styles.insP2text}> Drag the letters into the grey zone to spell the corresponding word. </Text>
            </View>

            {/* Submit */} 
            <SubmitButton 
              originalLetters={vocabCards[this.state.currentIndex].letters} 
              userAnswer={this.userAnswer} 
              onWrongAnswer={this.handleWrongAnswer}
            />
            <DropZone 
              letters={vocabCards[this.state.currentIndex].letters} 
              onSendCoord={
                (coordinates) => {
                  this.state.measurements.push(...coordinates);
                }
              }
            />
            <LetterTilesContainerComponent 
              letters={vocabCards[this.state.currentIndex].letters} 
              measurements={this.state.measurements} 
              userAnswer = {this.userAnswer}
            />
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View
            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri} />

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderVocabCards()}
        </View>
        <View style={{ height: 60 }}>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  //general container 
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    // dictionary
    dictionaryText: {
     fontWeight: 'bold',
      fontSize: 21,
    },

    dictionaryContainer: {
      alignItems: 'center',
      width: '100%',
      height: 100,
      borderColor: 'black',
     paddingBottom: "4%",
      backgroundColor: "#d2b48c",
      justifyContent: 'flex-end',
    },

    instructionsContainer: {
      top: '4%',
      width: '100%',
    },

    instructionsFormat: {
      textAlign: 'center',
      fontFamily: "Georgia",
      fontSize: 15,
      fontStyle: 'italic',
    },

   // term description 
  descFormat: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 210,
    width: '100%',
    color: '#444444',
  },

  descContainer: {
    width: "100%",
    top: 240,
    position: 'relative',
    position: 'absolute',
  },
  
  //image 
  imgContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "95%",
    height: 100,
    top: 230,
    position: 'absolute'
  },
  
  imageFormat: {
    width: 200,
    height: 150,
  },

  insP2cont: {
    top: 440,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#989898',
    width: '100%',
    paddingTop: 25,
    textAlign: 'center',
    left: 7,
  }, 

  insP2text: {
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },

  lineCont: {
    borderTopWidth: 1,
    borderColor: '#989898',
    top: 12,
    position: 'relative',
  },
});