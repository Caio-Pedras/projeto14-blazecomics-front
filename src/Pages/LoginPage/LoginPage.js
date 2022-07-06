import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import Input from "../../components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { URL, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logIn() {
    setIsLoading(true);
    const body = {
      email,
      password,
    };

    axios
      .post(`${URL}/login`, body)
      .then((res) => {
        setToken(res.data);
        setIsLoading(false);
        navigate("/");
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
        <Button onClick={() => logIn()}>
          <p>Entrar</p>
        </Button>
      </Box>
      <Link to="/signup">
        <Text>
          <p>Primeira vez? Cadastre-se!</p>
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
    font-size: 50px;
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
