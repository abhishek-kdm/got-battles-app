declare module '*.graphql' {
  export = require('graphql').DocumentNode;
}

declare module '*.gql' {
  export = require('graphql').DocumentNode;
}
