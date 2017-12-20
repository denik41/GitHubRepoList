import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import ListItem from './ListItem';
import {connect} from 'react-redux';
import {chooseRepo} from '../actions';

class RepoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/search/repositories?q=stars:>50000&sort=stars&order=desc')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({list: responseJson.items});
            })
            .catch(error => {
                console.error(error);
            });
    }

    onPressItem = (repo) => {
        this.props.chooseRepo(repo);
        this.props.navigation.navigate('RequestsList');
    };

    renderItem = ({item, index}) => <ListItem
        title={item.name}
        index={index}
        forks={item.forks}
        watchers={item.watchers}
        onPress={() => {
            this.onPressItem(item);
    }}/>;

    render() {
        return <View>
            <Text style={style.title}>Top Repositories</Text>
            <View>
                <FlatList
                    data={this.state.list}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                    style={style.list}
                />
            </View>
        </View>
    }
}

const style = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    list: {
        borderTopWidth: 1,
        height: '100%'
    },
    container: {

    }
});

export default connect(
    state => ({

    }),
    dispatch => ({
        chooseRepo: (data) => {
            dispatch(chooseRepo(data))
        }
    })
)(RepoList);