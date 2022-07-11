import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";
import axios from "axios";
import InputMask from "react-input-mask";
import PaymentForm from "./components/PaymentForm";
import Loading from "../../components/Loading";
export default function SignUpPage() {
  const { URL, token, bodyCart, setBodyCart } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [creditCard, setCreditCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [signUpData, setSignUpData] = useState({
    cep: "",
    street: "",
    neighbourhood: "",
    city: "",
    state: "",
    extra: "",
    number: "",
  });

  const navigate = useNavigate();

  function finalizingOrder() {
    setIsLoading(true);

    if (signUpData.street === "" || signUpData.number === "") {
      alert("Favor preencher todos os campos para concluir a compra");
      setIsLoading(false);
      return;
    }
    if (!token) {
      alert("você precisa estar logado para finalizar a compra");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    if (bodyCart.length === 0) {
      alert("Você nao tem items no carrinho");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${URL}/buy`, bodyCart, config)
      .then((res) => {
        localStorage.clear();
        setBodyCart([]);
        setIsLoading(false);
        alert("Compra concluída!");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/login");
      });
  }

  function getAdress() {
    if (signUpData.cep.length === 9) {
      signUpData.cep.replace("-", "");
      try {
        axios
          .get(`https://viacep.com.br/ws/${signUpData.cep}/json/`)
          .then((res) => {
            const { data } = res;
            setSignUpData({
              ...signUpData,
              street: data.logradouro,
              neighbourhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              extra: data.complemento,
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    getAdress();
  }, [signUpData.cep]);
  if (isLoading) {
    return (
      <Container>
        <Loading></Loading>
      </Container>
    );
  }
  return (
    <Container>
      <h1>Blaze Comics</h1>
      <Box>
        <PaymentForm
          creditCard={creditCard}
          setCreditCard={setCreditCard}
        ></PaymentForm>
        <InputWrapper>
          <InputMask
            mask="99999-999"
            placeholder="CEP"
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                cep: e.target.value.replace("_", ""),
              })
            }
            value={signUpData.cep}
            type="text"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={signUpData.city}
            disabled={true}
          />
          <input
            className="smallInput"
            type="text"
            placeholder="UF"
            value={signUpData.state}
            disabled={true}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Logradouro"
            value={signUpData.street}
            disabled={true}
          />
          <input
            className="smallInput"
            type="number"
            placeholder="Nº"
            value={signUpData.number}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                number: e.target.value,
              })
            }
          />
        </InputWrapper>

        <InputWrapper>
          <input
            type="text"
            placeholder="Bairro"
            value={signUpData.neighbourhood}
            disabled={true}
          />
          <input
            type="text"
            placeholder="Complemento"
            value={signUpData.extra}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                extra: e.target.value,
              })
            }
          />
        </InputWrapper>

        <Button onClick={() => finalizingOrder()}>
          <p>Finalizar Compra</p>
        </Button>
      </Box>
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
    text-shadow: 1px 1px 2px red, 0 0 0.1em white, 0 0 0.2em white;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  column-gap: 20px;
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
const Box = styled.div`
  max-width: 600px;
  .smallInput {
    width: 70px;
  }
  input {
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    color: #000000;
    width: 100%;
    border-radius: 5px;
    font-size: 15px;
    margin-bottom: 10px;
    font-family: "Inter", sans-serif;

    ::placeholder {
      color: #000000;
    }
  }
`;
