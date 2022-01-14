import { gql } from "@apollo/client";

export const TIME_SUBSCRIPTION = gql`
    subscription time($team: String!) {
        time(team: $team)
    }
`