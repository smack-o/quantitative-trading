import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { isMobile } from 'utils'

import Test from '@/containers/Test'

const router = () => (
  <Switch>
    <Route path='/' component={Test} />
  </Switch>
)

export default router
