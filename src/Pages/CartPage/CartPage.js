import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";

export default function CartPage() {
  const [productsCart, setProductsCart] = useState([]);
  const body = JSON.parse(localStorage.getItem("cartItems"));
  const navigate = useNavigate();
  const { setBodyCart, bodyCart, URL, token } = useContext(UserContext);
  useEffect(() => {
    axios
      .post(`${URL}/cart`, { body })
      .then((res) => {
        setProductsCart(res.data);
        setBodyCart(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function finalizingOrder() {
    if (!token) {
      alert("você precisa estar logado para finalizar a compra");
      navigate("/login");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${URL}/buy`, bodyCart, config)
      .then((res) => console.log("to dentro"))
      .catch((err) => {
        console.log("logue");
        navigate("/login");
      });
  }

  return (
    <Container>
      <Title>Blaze Comics</Title>
      {productsCart.length === 0 ? (
        <Product>
          <p> Você nao tem produtos no carrinho </p>
        </Product>
      ) : (
        productsCart.map((item, index) => {
          return (
            <Product key={index}>
              <Banner>
                <img src={item.picture} alt="" />
              </Banner>
              <div>
                <p> {item.name}</p>
                <p> {item.number} </p>
                <p> {item.price} </p>
              </div>
              <IconTrash>
                <ion-icon name="trash-outline"></ion-icon>
              </IconTrash>
            </Product>
          );
        })
      )}
      <Footer>
        <Link to="/">
          <IconWrapper>
            <ion-icon name="home"></ion-icon>
          </IconWrapper>
        </Link>
        <Button onClick={finalizingOrder}>Finalizar</Button>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Product = styled.div`
  width: 100%;
  height: 180px;
  background-color: white;
  display: flex;
  border: 3px solid #07f802;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  div {
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
    font-size: 20px;
    padding: 15px;
  }
`;

const Banner = styled.figure`
  img {
    object-fit: cover;
    height: 180px;
    width: 124px;
    padding: 15px;
  }
`;

const IconTrash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 25px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Button = styled.div`
  text-align: center;
  background-color: #33cf2f;
  width: 100%;
  height: 50px;
  min-width: 280px;
  border-radius: 30px;
  font-weight: 400;
  padding: 10px 0;
  margin-left: 10px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  background-color: rgba(187, 186, 183, 0.33);
  border-radius: 30px;
  min-width: 53px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 50px;
  font-weight: 400;
  font-size: 40px;
  color: #ffffff;
  font-family: "Bangers", cursive;
  text-align: center;
  text-shadow: 1px 1px 2px red, 0 0 0.1em white, 0 0 0.2em white;
`;
