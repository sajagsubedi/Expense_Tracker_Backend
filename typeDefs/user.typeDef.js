const userTypeDef=`
#graphql
type User{
  _id:ID!
  name:String!
  email:String!
  password:String!
  gender:String!
  profilePicture:String
}

type Query{
  users:[User!]
  authUser: User
  user(userId:ID!):User
}

type Mutation{
  signup(input:SignUpInput):User!
  sigin(input:SignInInput):User!
  logout:LogoutResponse
}

input SignUpInput{
  name:String!
  email:String!
  password:String!
  gender:String!
  }

input SignInInput{
  email:String!
  password:String!
}

type LogoutResponse{
  message:String!
}
`
export default userTypeDef