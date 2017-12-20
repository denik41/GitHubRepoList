import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class ListItem extends Component {
    render() {
        return <TouchableHighlight onPress={this.props.onPress}
                                   underlayColor="transparent">
            <View style={style.container}>
                <View style={style.mainInfo}>
                    <Text style={style.number}>{++this.props.index}.</Text>
                    <View style={{flex: 1}}>
                        <Text style={style.repoName}>{this.props.title}</Text>
                        <View style={style.bottomInfoContainer}>
                            <Text style={style.bottomText}>Stars: {this.props.watchers}</Text>
                            <Text style={style.bottomText}>Forks: {this.props.forks}</Text>
                        </View>
                    </View>
                </View>
                <Text style={style.arrow}>></Text>
            </View>
        </TouchableHighlight>
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    arrow: {
        fontSize: 28,
        marginHorizontal: 15
    },
    repoName: {
        fontSize: 20
    },
    number: {
        fontSize: 20,
        marginHorizontal: 7
    },
    mainInfo: {
        flexDirection: 'row',
        flex: 1
    },
    bottomInfoContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    bottomText: {
        marginRight: 15
    }
});