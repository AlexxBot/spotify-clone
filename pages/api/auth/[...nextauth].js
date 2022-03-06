import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { refreshAccessToken } from "spotify-web-api-node/src/server-methods"
import spotifyApi , { LOGIN_URL } from "../../../lib/spotify"

const refreshAccessTokenAuth = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshToken } = await spotifyApi.refreshAccessToken();

        return {
            ...token,
            accessToken: refreshToken.accessToken,
            accessTokenExpires: Date.now + refreshToken.expires_in * 1000,

            refreshToken: refreshToken.refresh_token?? token.refreshToken
        }
    } catch(error){
        console.error(error)
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID ,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],

    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'

    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.accessToken,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000 ,

                }
            }

            if(Date.now()< token.accessTokenExpires){
                console.log('existing access token is valid')
                return token
            } 

            console.log('access token has expiredk refreshing')
            return await refreshAccessTokenAuth(token)


        }
    },


    session : async ({ session, token }) => {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshAccessToken
        session.user.username = token.username

        return session
    }
})