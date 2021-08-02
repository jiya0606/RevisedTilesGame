import React, { Component } from "react";
import {StyleSheet, View} from 'react-native';
import LetterComponent from './LetterComponent.js';

export default class LetterTilesContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: this.shuffleLetters(this.props.letters),
        }
    }

    shuffleLetters(orig_array) {
        const array = new Array();
        array.push(...orig_array);
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1) + 0);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
    }

    render() {
        //console.log("Inside letter component: ", this.props.measurements);
        return (
                <View style={styles.lettersContainer}> 
                    { this.state.letters.map(letter => 
                    <LetterComponent 
                        letter={letter} 
                        dropZoneMeasurements={this.props.measurements} 
                        userAnswer = {this.props.userAnswer}
                    />
                    )}
                </View>
            ); 
    }
}

const styles = StyleSheet.create({
    lettersContainer: {
        top: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      },
});