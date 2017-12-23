import { StackNavigator } from 'react-navigation';
import RepoList from './Repos-list';
import RequestsList from './Pull-requests-list';
import {StatusBar} from 'react-native';

export default Navigator = StackNavigator({
    RepoList: {
        screen: RepoList,
        navigationOptions: {
            headerTitle: 'Repositories',
        },
    },
    RequestsList: {
        screen: RequestsList,
        navigationOptions: {
            headerTitle: 'Pull Requests',
        },
    }
}, {
    cardStyle: {
        paddingTop: StatusBar.currentHeight
    }
});