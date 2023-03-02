import React from "react";
import { createCtx } from "~/shared/lib/context";
import { Text } from "~/shared/components/Text";
import { HomePageRoute, NewsPageRoute, UsersPageRoute, EventsPageRoute } from "~shared/routes";

const paths = [
  {
    title: <Text component='span'>Home</Text>,
    path: HomePageRoute
  },
  {
    title: <Text component='span'>Entities</Text>,
    children: [
      {
        title: <Text component='span'>News</Text>,
        path: NewsPageRoute
      },
      {
        title: <Text component='span'>Events</Text>,
        path: EventsPageRoute
      },
      {
        title: <Text component='span'>Users</Text>,
        path: UsersPageRoute
      }
    ]
  }
];

export const [usePaths, PathsProvider] = createCtx(paths, { name: "PathsProvider" });
