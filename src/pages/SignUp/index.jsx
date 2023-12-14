import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiLogIn, FiUser } from 'react-icons/fi';

import { api } from '../../services/api';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Background, Container, Form } from '../SignIn/styles';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleKeyPress(event) {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.key === "Enter") {
      handleSignUp();
    }
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    api.post('/users', { name, email, password })
      .then((response) => {
          console.log('.then ~ response:', response);
          if (response.status != 400) {
            alert("Usuario cadastrado com sucesso.")
            navigate("/");
          }
        }
      )
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Nao foi possível cadastrar");
        }
      });
  }

  return (
    <Container>
      <Background />

      <Form onKeyPress={handleKeyPress}>
        <h1>
          Rocket Notes
        </h1>

        <p>
          Aplicação para salvar e gerenciar suas anotações.
        </p>

        <h2>
          Crie sua conta
        </h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

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

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Já tenho uma conta
        </Link>
      </Form>
    </Container>
  )
}