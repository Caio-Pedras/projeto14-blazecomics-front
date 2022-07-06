import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";

import Input from "../../components/Input";

export default function SignUpPage() {
  const { URL } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function postSignup() {
    setIsLoading(true);
    if (password !== confirmPassword) {
      alert("As senhas precisam ser iguais");
      setIsLoading(false);
      return;
    }

    const body = {
      email,
      name,
      password,
      confirmPassword,
    };

    axios
      .post(`${URL}/signup`, body)
      .then((res) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert(
          "Houve um erro, preencha os dados corretamente e tente novamente"
        );
      });
  }

  return (
    <Container>
      <h1>Blaze Comics</h1>
      <Box opacity={isLoading ? 0.5 : 1}>
        <Input
          type="text"
          placeholder="Nome"
          disabled={isLoading}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="E-mail"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          disabled={isLoading}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={() => postSignup()}>
          <p>Cadastrar</p>
        </Button>
      </Box>
      <Link to="/login">
        <Text>
          <p>Já tem uma conta? Entre agora!</p>
        </Text>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: 400;
    font-size: 40px;
    color: #ffffff;
    margin-bottom: 40px;
    font-family: "Bangers", cursive;
    text-align: center;
  }
`;
const Button = styled.div`
  text-align: center;
  background-color: #ce2a2a;
  color: #ffffff;
  width: 100%;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 400;
  padding: 10px 0;
  margin-bottom: 40px;
  font-family: "Bangers", cursive;
  cursor: pointer;
`;
const Text = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
  text-decoration-line: underline;
  cursor: pointer;
`;
const Box = styled.div`
  opacity: ${(props) => props.opacity};
  max-width: 600px;
`;
