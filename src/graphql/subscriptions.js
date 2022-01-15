import { gql } from "@apollo/client";

export const TIME_SUBSCRIPTION = gql`
    subscription time($team: String!) {
        time(team: $team)
    }
`
export const ADMINDATA_SUBSCRIPTION = gql`
    subscription adminData {
        adminData {
            admin
            isRegisterClosed
        }
    }
`