import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [productsCart, setProductsCart] = useState([])
  const body = JSON.parse(localStorage.getItem('cartItems'))
  useEffect(() => {
    axios
      .post("http://localhost:5000/cart", { body })
      .then((res) => {
        setProductsCart(res.data);
      })
      .catch((err) =>
        console.log(err)
      )
  }, [])

  return (
    <Container>
      <Title>Blaze Comics</Title>
      {productsCart.map((item, index) => {
        return (
          <Product key={index}>
            <Banner>
              <img src={item.picture} alt="" />
            </Banner>
            <div>
              <p> {item.name}</p>
              <p> {item.price} </p>
            </div>
            <IconTrash>
              <ion-icon name="trash-outline"></ion-icon>
            </IconTrash>
          </Product>
        )
      })}
      <Footer>
        <Link to="/">
          <IconWrapper>
            <ion-icon name="home"></ion-icon>
          </IconWrapper>
        </Link>
        <Button onClick={() => { }}>Finalizar</Button>
      </Footer>
    </Container>
  )
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
  border: 3px solid #07F802;
  border-radius: 5px;
  position: relative;
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
    width: 100%;
    padding: 15px;
  }

`

const IconTrash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 25px;
  justify-content: space-between;
`;

const Button = styled.div`
  text-align: center;
  background-color: #33CF2F;
  width: 100%;
  height: 50px;
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
  font-size: 80px;
  color: #ffffff;
  font-family: "Bangers", cursive;
  text-align: center;
  text-shadow: 1px 1px 2px red, 0 0 0.1em white, 0 0 0.2em white;
  @media (max-width: 1023px) {
    max-width: 270px;
    font-size: 60px;
  }
`;