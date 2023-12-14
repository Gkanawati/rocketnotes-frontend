import { Link } from 'react-router-dom';
import { FiLock, FiLogIn } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Background, Container, Form } from './styles';
import { useAuth } from '../../hooks/auth';
import { useState } from 'react';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleKeyPress(event) {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.key === "Enter") {
      handleSignIn();
    }
  }

  function handleSignIn() {
    signIn({ email,  password });
  }

  return (
    <Container>
      <Form onKeyPress={handleKeyPress}>
        <h1>
          Rocket Notes
        </h1>

        <p>
          Aplicação para salvar e gerenciar suas anotações.
        </p>

        <h2>
          Faça seu Login
        </h2>

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiLogIn}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button 
          title="Entrar" 
          onClick={handleSignIn}
        />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <Background />
    </Container>
  )
}