import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import Navigator from './src/components/Navigator';
import {Provider} from 'react-redux';
import {store} from './src/store';

export default class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Navigator />
        </Provider>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    }
});