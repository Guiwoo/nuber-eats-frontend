import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCAL_STROAGE_TOKEN } from "./constant";

const token = localStorage.getItem(LOCAL_STROAGE_TOKEN)

export const isLoggedInVar = makeVar(Boolean(token))
export const authToken = makeVar(token)

console.log("Defatul value isLoggedInVar", isLoggedInVar())
console.log("Defatul value authToken", authToken())

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
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