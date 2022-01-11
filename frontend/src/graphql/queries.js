import { gql } from "@apollo/client";

// teamName(team: String!): Boolean!
// allTeam: [Team!]
// teamTime(team: String!): Team!
// teamMatch(team: String!): Match!
// allMatch: [Match!]

export const TEAMNAME_QUERY = gql`
    query TeamNameQuery($team: String!) {
        teamName(team: $team)
    }
`

export const ALLTEAM_QUERY = gql`
    query AllTeamQuery {
        allTeam {
            team
            time
        }
    }
`

export const TEAMTIME_QUERY = gql`
    query TeamTimeQuery($team: String!) {
        teamTime(team: $team) {
            team
            time
        }
    }
`

export const TEAMMATCH_QUERY = gql`
    query TeamMatchQuery($team: String!) {
        teamMatch(team: $team) {
            matchName
            team_1
            team_2
            time
        }
    }
`

export const ALLMATCH_QUERY = gql`
    query AllMatchQuery {
        allMatch {
            matchName
            team_1
            team_2
            time
        }
    }
`