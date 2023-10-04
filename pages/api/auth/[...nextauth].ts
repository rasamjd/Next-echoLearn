import databaseConncection from '@/app/db/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import User from '@/app/models/User.model';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "text" }
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as {
          username: string,
          password: string,
        }
        await databaseConncection();
        const user = await User.findOne({ username });
        const isValid = await compare(password, user.password);

        if (!user) return null         
        if (!isValid) return null

        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account, profile, user, session }) {
      if (user) {
        return {
          ...token,
          username: user.username,
        }
      }
      return token
    },
    async session({ token, user, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        }
      }
      return session
    }
  },
});




// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import databaseConncection from "@/app/db/mongodb";
// import User from "@/app/models/User.model";
// import bcrypt from "bcryptjs" 

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: 'credentials',
//       credentials: {
//         username: { label:'username', type:'text',placeholder:'' },
//         password: { label:'password',type:'password' }
//       },
//       async authorize(credentials, req) {
//         const { username, password } = credentials as {
//           username: string,
//           password: string,
//         };

//         try {
//               await databaseConncection();
//               const user = await User.findOne({ username });
//               const passwordsMatch = await bcrypt.compare(password, user.password) || password === user.password
    
//               if (!user) return null         
//               if (!passwordsMatch) return null
      
//               return user

//             } catch (error) {
//                 console.log("Error: ", error);
//             }
//       }
//     }),
//   ],
//   pages: {
//     signIn: "/login",  
//   }
// })