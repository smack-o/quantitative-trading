import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Test } from '@/containers/Test';
import { hot } from 'react-hot-loader';

export const Router = hot(module)(() => (
  <Switch>
    <Route path="/" component={Test} />
  </Switch>
));
