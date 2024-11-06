/* eslint-disable prettier/prettier */
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil';


import ErrorBoundary from './components/ErrorBoundary'
import router from './router'

const App: React.FC = () => (
  <RecoilRoot>
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
  </RecoilRoot>
)
App.displayName = 'App'
export default App
