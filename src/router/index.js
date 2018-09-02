import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { isMobile } from 'utils'

import Test from '@/containers/Test'
import Login from '@/containers/Login'

const router = () => (
  <Switch>
    <Route exact path='/' component={Test} />
    <Route path='/login' component={Login} />
  </Switch>
)

export default router
