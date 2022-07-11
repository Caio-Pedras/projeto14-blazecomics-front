import styled from "styled-components";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../userContext/userContext";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer.js";
import { Link } from "react-router-dom";

export default function Purchases() {
  const { URL, token, setToken, setCountCartItems, countCartItems } = useContext(UserContext);
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${URL}/purchases`, config)
      .then((res) => {
        setBuyers(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  function logOut() {
    setToken('')
  }


  if (isLoading) {
    return (
      <Container>
        <Loading></Loading>
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>Blaze Comics</Title>
        {!token || buyers.length === 0 ? (
          <Buy>
            <h1> Você precisa logar para ver seus registros de compras</h1>
          </Buy>
        ) : (
          <section>
            {buyers.map((item, index) => {
              return item.items.map((product) => {
                let value = (
                  Number(product.price.replace(",", ".")) *
                  parseInt(product.number)
                ).toFixed(2);
                return (
                  <Buy>
                    <Link to={`/product/${product._id}`}>
                      <h1 key={index}>{product.name}</h1>
                    </Link>
                    <p>Data: {item.date}</p>
                    <p>Quantidade: {product.number}</p>
                    <p>Valor: {value.toString().replace(".", ",")}</p>
                  </Buy>
                );
              });
            })}
          </section>
        )}
        <Footer>
          <Link to={"/"}>
            <ion-icon name="home"></ion-icon>
          </Link>
          <CartWrapper>
            <Link to="/cart">
              <ion-icon name="cart"></ion-icon>
            </Link>
            {countCartItems ? <p>{countCartItems}</p> : <></>}
          </CartWrapper>
          {token ? (
            <ion-icon onClick={logOut} name="exit"></ion-icon>
          ) : (
            <Link to="/login">
              <ion-icon name={"person"}></ion-icon>
            </Link>
          )}
        </Footer>
      </Container>
    );
  }
}
const CartWrapper = styled.div`
  position: relative;
  p {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -12px;
    background-color: black;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    color: #ffffff;
  }
`;
const Container = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 120px;
  overflow-x: hidden;

  section {
    width: 100%;
    height: 70%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
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

const Buy = styled.div`
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  h1 {
    font-weight: bold;
  }
`;
