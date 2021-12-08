import { query as q } from 'faunadb';

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/faunadb';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email } = user;

      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold('lima.julio.cs@gmail.com')
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            { data: { email } }
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(email)
            )
          )
        )
      )
      .then((ret) => {
        console.log(ret);
        return true;
      })
      .catch((err) => {
        console.error('Error: %s', err)
      })
      
      return true
    },
  }
})