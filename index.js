/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/index'
import Store from './app/store/index'
import {name as appName} from './app.json';
import { Provider } from "react-redux"

import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./app/store/api/graphql"

const configApp = () => (
    <Provider store={Store} >
        <ApolloProvider client={apolloClient} >
            <App/>
        </ApolloProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => configApp );
