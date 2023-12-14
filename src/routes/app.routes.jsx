import { Routes, Route, Navigate } from 'react-router-dom';

import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Details } from '../pages/Details';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/new' Component={New} />
      <Route path='/profile' Component={Profile} />
      <Route path='/details/:id' Component={Details} />

      <Route path='*' element={<Navigate to='/' />}/>
    </Routes>
  )
}