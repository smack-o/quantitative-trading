import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { isMobile } from 'utils'

import Home from '@/containers/Home'
import Login from '@/containers/Login'
import StrategyList from '@/containers/StrategyList'
const router = () => (
  <Switch>
    {/* <Route exact path='/' component={Home} /> */}
    <Redirect exact from='/' to='/stgs' />
    <Route path='/signup' component={Login} />
    <Route path='/signin' component={Login} />
    <Route path='/reset' component={Login} />
    <Route path='/stgs' component={Home} />
  </Switch>
)

export default router
