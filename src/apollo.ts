import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { LOCAL_STROAGE_TOKEN } from "./constant";
import { setContext } from '@apollo/client/link/context';


const token = localStorage.getItem(LOCAL_STROAGE_TOKEN)

export const isLoggedInVar = makeVar(Boolean(token))
export const authToken = makeVar(token)

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

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
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