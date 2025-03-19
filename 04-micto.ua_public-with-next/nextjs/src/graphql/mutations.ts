import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    	accessToken
      refreshToken
    }
  }
`;
export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
    	accessToken
      refreshToken
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
 mutation changePassword(
  $input: ChangePasswordInput!
) {
  changePassword(input: $input)
}
`;

export const REGISTER_USER = gql`
mutation registerUser(
  $firstName: String!
  $lastName: String!
  $email: String!
  $phone: String
  $password: String!
  $confirmPassword: String!
) {
  registerUser(
    input: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      password: $password
      confirmPassword: $confirmPassword
    }
  ) {
    user {
      email
      firstName
      lastName
    }
    accessToken
    refreshToken
  }
}`

export const REGISTER_INSTITUTION_STEP_ONE = gql`
mutation registerInstitutionStep1($input: InstitutionRegistrationStep1Input!) {
  registerInstitutionStep1(input: $input) {
    token
  }
}
`;

export const REGISTER_INSTITUTION_STEP_TWO = gql`
mutation registerInstitutionStep2($input: InstitutionRegistrationStep2Input!, $token: String!) {
  registerInstitutionStep2(input: $input, token: $token) {
    token
  }
}
`;

export const REGISTER_INSTITUTION_STEP_THREE = gql`
mutation registerInstitutionStep3($input: InstitutionRegistrationStep3Input!, $token: String!) {
  registerInstitutionStep3(input: $input, token: $token) {
    token
  }
}
`;

export const COMPLETE_INSTITUTION_REGISTRATION = gql`
mutation registerInstitutionComplete($token: String!) {
  registerInstitutionComplete(token: $token) {
    user {
      email
    }
    accessToken
    refreshToken
  }
}
`;