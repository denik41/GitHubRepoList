import React, {Component} from 'react';
import {View, FlatList, StyleSheet, StatusBar, Text} from 'react-native';
import {connect} from 'react-redux';
import PullRequest from './PullRequest';

class RequestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullRequests: null
        }
    }

    componentDidMount() {
        let url = this.props.repository.pulls_url;
        fetch(`${url.substring(0, url.indexOf("{"))}?sort=created&direction=desc`)
            .then(response => response.json())
            .then(responseJson => {
                const lastPulls = responseJson.slice(0, 10);
                this.setState({pullRequests: lastPulls});
            })
            .catch(error => {
                console.error(error);
            });
    }

    renderItem = ({item, index}) => <PullRequest
        title={item.title}
        index={index}
        author={item.user.login}
        number={item.number}/>;

    render() {
        const pullRequests = this.state.pullRequests;

        return <View>
            <Text style={styles.title}>{this.props.repository.name}</Text>
            <Text style={[styles.title, {marginTop: 5}]}>10 last Pull Requests</Text>
            <View>
                {pullRequests && pullRequests.length === 0 ?
                    <Text style={styles.noPulls}>No Pull Requests</Text> :
                    <FlatList
                        data={pullRequests}
                        extraData={this.state}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        style={styles.list}
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
        borderTopWidth: 1,
        marginTop: 15
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