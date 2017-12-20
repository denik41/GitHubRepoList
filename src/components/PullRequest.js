import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class PullRequest extends Component {
    render() {
        return <View style={styles.container}>
            <Text style={styles.number}>{++this.props.index}.</Text>
            <View>
                <Text style={styles.text}>{this.props.title}</Text>
                <Text style={styles.text}>
                    <Text style={styles.title}>Author: </Text>{this.props.author}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.title}>Number: </Text>{this.props.number}
                </Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    number: {
        fontSize: 20,
        marginHorizontal: 7
    },
    text: {
        fontSize: 16
    },
    title: {
        color: '#323aab'
    }
});