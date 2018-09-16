import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { isMobile } from 'utils'

import Home from '@/containers/Home'
import Login from '@/containers/Login'
import StrategyList from '@/containers/StrategyList'
const router = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/signup' component={Login} />
    <Route path='/signin' component={Login} />
    <Route path='/reset' component={Login} />
    <Route path='/stgs' component={StrategyList} />
  </Switch>
)

export default router
