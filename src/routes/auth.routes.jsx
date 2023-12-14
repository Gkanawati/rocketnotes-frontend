import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AuthRoutes() {
  const user = localStorage.getItem("@rocketnotes:user");

  return (
    <Routes>
      <Route path='/' Component={SignIn} />
      <Route path='/register' Component={SignUp} />

      {/* Rota de Fallback, faz o redirecionamento de rotas indisponíveis */}
      {!user && <Route path='*' element={<Navigate to='/' />}/> }
    </Routes>
  )
}