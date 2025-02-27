import { gql } from '@apollo/client';

export const GET_USERs = gql `
query GetUsers {
    users {
        id
        username
        email
        isAdmin
    }
}
`;

export const GET_ME = gql `
query Me {
    me {
        id
        username
        email
        isAdmin
    }
}
`;

export const GET_EVENTS = gql`
query GetEvents {
    events {
        id
        title
        date
        maxParticipants
        participants {
            id
            username
        }
    }
}
`;

export const GET_CHARACTER_SHEETS = gql `
query GetCharacterSheets {
    characterSheets {
        id
        charcterName
        class
        level
        abilities
        equipment
        user {
            id
            username
        }
    }
}`