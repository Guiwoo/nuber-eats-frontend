import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import { LOCAL_STROAGE_TOKEN } from "./constant";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem(LOCAL_STROAGE_TOKEN)

export const isLoggedInVar = makeVar(Boolean(token))
export const authToken = makeVar(token)

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            "X-JWT": authToken() || ""
        }
    }
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "X-JWT": authToken() || ""
        }
    }
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read(thing, option) {
                            return isLoggedInVar
                        }
                    },
                    token: {
                        read() {
                            return authToken
                        }
                    }
                }
            }
        }
    })
});