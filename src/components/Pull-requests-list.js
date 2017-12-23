import React, {Component} from 'react';
import {View, FlatList, StyleSheet, StatusBar, Text} from 'react-native';
import {connect} from 'react-redux';
import PullRequest from './PullRequest';

class RequestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullRequests: null,
            refreshing: false
        }
    }

    componentDidMount() {
        this.fetchPullRequests();
    }

    fetchPullRequests = () => {
        let url = this.props.repository.pulls_url;
        fetch(`${url.substring(0, url.indexOf("{"))}?sort=created&direction=desc`)
            .then(response => response.json())
            .then(responseJson => {
                const lastPulls = responseJson.slice(0, 10);
                this.setState({
                    pullRequests: lastPulls,
                    refreshing: false
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({refreshing: false});
            });
    };

    renderItem = ({item, index}) => <PullRequest
        title={item.title}
        index={index}
        author={item.user.login}
        number={item.number}/>;

    renderHeader = () => {
        return <View style={{borderBottomWidth: 1}}>
            <Text style={styles.title}>{this.props.repository.name}</Text>
            <Text style={[styles.title, {
                marginTop: 5,
                marginBottom: 10
            }]}>10 last Pull Requests</Text>
        </View>;
    };

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.fetchPullRequests();
        });
    };

    render() {
        const pullRequests = this.state.pullRequests;

        return <View>
            <View>
                {pullRequests && pullRequests.length === 0 ?
                    <Text style={styles.noPulls}>No Pull Requests</Text> :
                    <FlatList
                        data={pullRequests}
                        extraData={this.state}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        style={styles.list}
                        ListHeaderComponent={this.renderHeader}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginLeft: 30,
        marginTop: 15
    },
    list: {
        borderTopWidth: 1
    },
    noPulls: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    }
});

export default connect(
    state => ({
        repository: state.repository.data
    }),
    dispatch => ({})
)(RequestsList);