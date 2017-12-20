import { StackNavigator } from 'react-navigation';
import RepoList from './Repos-list';
import RequestsList from './Pull-requests-list';

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
    },
});