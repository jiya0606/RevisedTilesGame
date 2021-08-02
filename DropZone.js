import React, { Component, useEffect } from "react";
import {StyleSheet, View} from 'react-native';
import DropTiles from "./DropTiles";

export default class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropTileCoord: new Array(),
        }
    }

    render() {
        return (
            <View style={styles.dropZoneContainer}>
                {this.props.letters.map((letter, i)=>{
                    return <DropTiles 
                        letter={letter}
                        onSendCoord = {
                            (coord) => {
                                this.state.dropTileCoord.push({...coord, index: i});
                                this.setState({dropTileCoord: this.state.dropTileCoord})
                            }
                        }
                    />;
                })}
                {this.props.onSendCoord(this.state.dropTileCoord)}
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    dropZoneContainer: {
        top: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
      },
});