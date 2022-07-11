import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import styled from "styled-components";
import Loading from "../../components/Loading.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function ProductPage() {
  const { URL, countCartItems, setCountCartItems } = useContext(UserContext);
  const [product, setProduct] = useState();
  const [buyNumber, setBuyNumber] = useState(1);
  const { productId } = useParams();
  const [finalPrice, setFinalPrice] = useState("");
  const navigate = useNavigate();
  function getProductById() {
    axios
      .get(`${URL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setFinalPrice(res.data.price);
      })
      .catch((err) => console.log(err));
  }
  function addToCart() {
    if (product.number < 1) {
      alert("O volume selecionado não esta disponivel");
      return;
    }
    const item = { productId, number: buyNumber };
    if (!JSON.parse(localStorage.getItem("cartItems"))) {
      localStorage.setItem("cartItems", JSON.stringify([item]));
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems.some((item) => item.productId === productId)) {
        cartItems.map((item) => {
          if (item.productId === productId) {
            item.number = item.number + buyNumber;
          }
          return item;
        });
      } else {
        cartItems.push(item);
        setCountCartItems(countCartItems + 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    navigate("/");
  }
  useEffect(() => getProductById(), []);
  useEffect(() => calculateFinalPrice(), [buyNumber]);
  function calculateFinalPrice() {
    if (!product) {
      return;
    }
    const price = Number(product.price.replace(",", "."));
    let total = price * buyNumber;
    total = total.toFixed(2);
    total = total.toString().replace(".", ",");
    setFinalPrice(total);
  }
  if (!product) {
    return (
      <Container>
        <Loading></Loading>
      </Container>
    );
  }
  return (
    <Container>
      <Title>Blaze Comics</Title>
      <BuyBox>
        <DesktopWrapper>
          <ProductWrapper>
            <h1>{product.name}</h1>
            <img src={product.picture} alt={product.name} />
          </ProductWrapper>
          <BuyInfo>
            <MobileSelector>
              <NumberSelector>
                {product.number > 0 ? (
                  <>
                    <ion-icon
                      name="remove-circle"
                      onClick={() => {
                        if (buyNumber > 1) setBuyNumber(buyNumber - 1);
                      }}
                    ></ion-icon>
                    <p>Quatindade: {buyNumber} </p>
                    <ion-icon
                      name="add-circle"
                      onClick={() => {
                        if (buyNumber < product.number)
                          setBuyNumber(buyNumber + 1);
                      }}
                    ></ion-icon>
                  </>
                ) : (
                  <p>Sem estoque</p>
                )}
              </NumberSelector>
              <p>R$ {finalPrice}</p>
            </MobileSelector>
          </BuyInfo>

          <Synopsis>
            <p>{product.description}</p>
            <DesktopSelector>
              <DesktopNumberSelector>
                {product.number > 0 ? (
                  <>
                    <ion-icon
                      name="remove-circle"
                      onClick={() => {
                        if (buyNumber > 1) setBuyNumber(buyNumber - 1);
                      }}
                    ></ion-icon>
                    <p>Quatindade: {buyNumber} </p>
                    <ion-icon
                      name="add-circle"
                      onClick={() => {
                        if (buyNumber < product.number)
                          setBuyNumber(buyNumber + 1);
                      }}
                    ></ion-icon>
                  </>
                ) : (
                  <p>Sem estoque</p>
                )}
              </DesktopNumberSelector>
              <p>R$ {finalPrice}</p>
            </DesktopSelector>
          </Synopsis>
        </DesktopWrapper>
        <Footer>
          <Link to="/">
            <IconWrapper>
              <ion-icon name="home"></ion-icon>
            </IconWrapper>
          </Link>
          <Button onClick={() => addToCart()}>Comprar</Button>
        </Footer>
      </BuyBox>
    </Container>
  );
}
const DesktopSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;

  @media (max-width: 1023px) {
    display: none;
  }
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

const DesktopNumberSelector = styled.div`
  background-color: #ffffff;
  color: #000000;
  border-radius: 90px;
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: space-around;
  column-gap: 5px;
  padding: 5px;
  margin-top: 20px;
`;
const DesktopWrapper = styled.div`
  max-width: 1100px;
  display: flex;
  @media (max-width: 1023px) {
    display: inherit;
  }
`;
const ProductWrapper = styled.div`
  max-width: 280px;
  h1 {
    font-size: 25px;
    color: #ffffff;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 15px;
  }
`;
const BuyBox = styled.div`
  padding: 0 30px;
  img {
    height: 400px;
    border-radius: 5px;
  }

  @media (max-width: 1023px) {
    max-width: 270px;
    padding: 0;
  }
`;
const IconWrapper = styled.div`
  background-color: rgba(255, 187, 0, 0.33);
  border-radius: 30px;
  min-width: 53px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
  background-color: #dead28;
  width: 100%;
  height: 50px;
  border-radius: 30px;
  font-weight: 400;
  padding: 10px 0;
  margin-left: 10px;
  max-width: 700px;
  cursor: pointer;
`;
const Synopsis = styled.div`
  margin-top: 40px;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    text-overflow: ellipsis;
    line-height: 25px;
  }
  @media (max-width: 1023px) {
    font-size: 16px;
    margin-top: 0px;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: scroll;
    p {
      line-height: 18px;
    }
  }
`;
const NumberSelector = styled.div`
  color: #000000;
  background-color: #ffffff;
  border-radius: 90px;
  display: flex;
  width: 180px;
  justify-content: center;
  column-gap: 5px;
  padding: 5px;
`;
const BuyInfo = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
`;
const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MobileSelector = styled.div`
  display: none;
  margin-bottom: 20px;
  p {
    font-size: 16px;
  }
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;
