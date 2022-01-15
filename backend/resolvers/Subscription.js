// createTeam: Team!
// deleteTeam: Team!
// time(team: String!): [String!]
// allTeamTime: Team!
// adminData: AdminData!

const Subscription = {
    createTeam: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator('createTeam');
        },
    },

    deleteTeam: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator(`deleteTeam`);
        },
    },

    time: {
        subscribe: (parent, { team }, { pubsub }) => {
            return pubsub.asyncIterator(`team ${team}`);
        },
    },

    allTeamTime: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator(`allTeamTime`);
        },
    },

    adminData: {
        subscribe: (parent, args, { pubsub }) => {
            return pubsub.asyncIterator('adminData');
        },
    },
};

export default Subscription;