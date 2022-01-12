// time(team: String!): TimeSubscriptionPayload!

const Subscription = {
    time: {
        subscribe: (parent, { team }, { pubsub }) => {
                return pubsub.asyncIterator(`team ${team}`);
        },
    },
};

export default Subscription;