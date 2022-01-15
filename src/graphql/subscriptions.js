// createTeam: Team!
// deleteTeam: Team!
// time(team: String!): [String!]
// allTeamTime: Team!
// adminData: AdminData!

import { gql } from "@apollo/client";

export const CREATETEAMNAME_SUBSCRIPTION = gql`
subscription createTeam {
    createTeam {
        team
    }
}
`

export const CREATETEAM_SUBSCRIPTION = gql`
subscription createTeam {
    createTeam {
        team
        time
    }
}
`

export const DELETETEAMNAME_SUBSCRIPTION = gql`
subscription deleteTeam {
    deleteTeam {
        team
        time
    }
}
`

export const DELETETEAM_SUBSCRIPTION = gql`
subscription deleteTeam {
    deleteTeam {
        team
        time
    }
}
`

export const TIME_SUBSCRIPTION = gql`
    subscription time($team: String!) {
        time(team: $team)
    }
`

export const ALLTEAMTIME_SUBSCRIPTION = gql`
    subscription allTeamTime {
        allTeamTime {
            team
            time
        }
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