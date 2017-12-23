import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import ListItem from './ListItem';
import {connect} from 'react-redux';
import {chooseRepo} from '../actions';

class RepoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            refreshing: false
        };
    }

    componentDidMount() {
        this.fetchRepos();
    }

    fetchRepos(callback = () => {}) {
        fetch('https://api.github.com/search/repositories?q=stars:>50000&sort=stars&order=desc')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({list: responseJson.items});
                callback();
            })
            .catch(error => {
                console.error(error);
                callback();
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

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.fetchRepos(() => {
                this.setState({refreshing: false})
            });
        });
    };

    renderHeader = () => {
        return <Text style={style.title}>Top Repositories</Text>;
    };

    render() {
        return <View>
            <View>
                <FlatList
                    data={this.state.list}
                    extraData={this.state}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                    style={style.list}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        </View>
    }
}

const style = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingBottom: 15,
        marginTop: 15,
        borderBottomWidth: 1
    },
    list: {
        borderTopWidth: 1,
        height: '100%'
    },
    container: {}
});

export default connect(
    state => ({}),
    dispatch => ({
        chooseRepo: (data) => {
            dispatch(chooseRepo(data))
        }
    })
)(RepoList);