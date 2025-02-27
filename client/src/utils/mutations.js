import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      username
      email
      isAdmin
    }
  }
}
`;

export const CREATE_USER = gql `
 mutation CreateUser($input: CreateUserInput) {
  createUser(input: $input) {
    token
    user{
      id
      username
      email
      isAdmin
    }
  }
 }
`;

export const CREATE_EVENT = gql `
 mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    title
    date
    maxParticipants
  }
 }
`;

export const DELETE_EVENT = gql`
 mutation DeleteEvent($id: ID!) {
  deleteEvent(id: $id)
 }
`;

export const CREATE_CHARATER_SHEET = gql `
 mutation CreateCharacterSheet($input: CreateCharacterInput) {
  createCharacter(input: $input) {
    id
    characterName
    class
    level
    abilities
    equipment
    user{
      id
      username
    }
  }
 }
`;

export const SIGNUP_FOR_EVENT = gql`
 mutation SignupForEvent($eventId: ID!, $userId: ID!) {
  signupForEvent(eventId: $eventId, userId: $userId) {
    id
    title
    participants{
      id
      username
    }
  }
 }
`;

export const DELETE_USER = gql `
 mutation DeleteUser($id: ID!) {
  deleteUser(id:$id)
 }
`;