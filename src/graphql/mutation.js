// createTeam(name: String!): Team!
// deleteTeam(name: String!): Boolean!
// updateTime(name: String!, time: [String!]!): Team!

import { gql } from "@apollo/client";

export const UPDATE_ADMINDATA_MUTATION = gql`
    mutation updateAdminData {
        updateAdminData {
            admin
            isRegisterClosed
        }
    }
`

export const CREATE_TEAM_MUTATION = gql`
    mutation createTeam($name: String!) {
        createTeam(name: $name) {
            team
            time
        }
    }
`

export const DELETE_TEAM_MUTATION = gql`
    mutation deleteTeam($name: String!) {
        deleteTeam(name: $name)
    }
`

export const UPDATE_TIME_MUTATION = gql`
    mutation updateTime($name: String!, $time: [String!]!) {
        updateTime(name: $name, time: $time) {
            team
            time
        }
    }
`

export const CREATE_MATCH_MUTATION = gql`
    mutation createMatch {
        createMatch {
            matchName
            time
        }
    }
`