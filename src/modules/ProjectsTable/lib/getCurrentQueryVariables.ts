import {
  OrderByRelationWithColumnAggregateFunction,
  ProjectsQueryVariables,
  QueryProjectsOrderByContestColumn
} from "~/generated/graphql";

export const getCurrentQueryVariables = (variables: ProjectsQueryVariables) => {
  if (
    variables.orderBy &&
    Array.isArray(variables.orderBy) &&
    variables.orderBy[0]?.column === "contest"
  ) {
    return {
      ...variables,
      orderBy: [
        {
          contest: {
            column: QueryProjectsOrderByContestColumn.Name,
            aggregate: OrderByRelationWithColumnAggregateFunction.Min
          },
          order: variables.orderBy[0].order
        }
      ]
    };
  } else return variables;
};
