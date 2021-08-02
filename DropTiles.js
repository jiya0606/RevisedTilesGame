import React, { Component } from "react";
import { StyleSheet, View, Text, Animated, UIManager, findNodeHandle } from "react-native";

const position = new Animated.ValueXY();

export default class DropTiles extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     dropTileCoord: new Map(),
        // }
    }
    measure () {
        this.view.measure((fx, fy, width, height, px, py) => {
            this.props.onSendCoord({px, py, width, height});  
        });
    }

    componentDidMount() {
        setTimeout(()=>{this.measure();},100);
    }

    render () {
        return <View style={styles.square} ref={ref => this.view = ref}></View>
    }
}
const SQUARE_RADIUS = 45;
const styles = StyleSheet.create({
square: {
    backgroundColor: "#656565",
    width: SQUARE_RADIUS + 1,
    height: SQUARE_RADIUS + 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
},
});