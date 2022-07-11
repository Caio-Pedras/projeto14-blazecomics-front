import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import styled from "styled-components";
import Footer from "../MainPage/components/Footer";
import banner from "../../assets/img/banner.jpg";
import Loading from "../../components/Loading.js";
import { Link } from "react-router-dom";
import axios from "axios";
export default function MainPage() {
  const { URL, token } = useContext(UserContext);
  const [products, setProducts] = useState();
  function getProducts() {
    axios
      .get(`${URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => getProducts(), []);
  console.log(products);
  if (!products) {
    return (
      <Container>
        <Loading></Loading>
      </Container>
    );
  }
  return (
    <Container>
      <Box>
        <h1>Blaze Comics</h1>
        <img src={banner} alt="banner" />
        <Banner></Banner>
      </Box>
      <ComicContainer>
        {products.map((product, index) => (
          <Link to={`/product/${product._id}`} key={index}>
            <Comic>
              <img src={product.picture} alt="" />
              <ComicBanner>
                <h1>{product.name}</h1>
                <p>R$ {product.price}</p>
                {product.number > 0 ? (
                  <span>Qtd. {product.number}</span>
                ) : (
                  <span>Sem estoque</span>
                )}
              </ComicBanner>
            </Comic>
          </Link>
        ))}
      </ComicContainer>
      <Footer>
        <Link to={"/purchases"}>
           <ion-icon name="card"></ion-icon>
        </Link>
        <Link to="/cart">
          <ion-icon name="cart"></ion-icon>
        </Link>
        {token ? (
          <ion-icon name="exit"></ion-icon>
        ) : (
          <Link to="/login">
            <ion-icon name={"person"}></ion-icon>
          </Link>
        )}
      </Footer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Comic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  padding: 10px;

  span {
    color: #ffffff;
    font-size: 15px;
  }

  img {
    height: 200px;
  }
  p {
    font-size: 17px;
    color: #ffffff;
  }
  h1 {
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const ComicBanner = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.8;
  position: absolute;
  bottom: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  border-radius: 5px;
`;
const ComicContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  column-gap: 30px;
  align-items: center;
  row-gap: 40px;
  margin-bottom: 80px;
  max-width: 1200px;
  @media (max-width: 390px) {
    justify-content: center;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 30px;
  img {
    margin-top: 60px;
    border-radius: 50%;
    height: 500px;
    width: 500px;
    object-fit: cover;
  }
  h1 {
    margin-top: 120px;
    font-weight: 400;
    font-size: 80px;
    color: #ffffff;
    font-family: "Bangers", cursive;
    text-align: center;
    text-shadow: 1px 1px 2px red, 0 0 0.1em white, 0 0 0.2em white;
  }
  @media (max-width: 500px) {
    img {
      height: 320px;
      width: 320px;
    }
  }
`;
const Banner = styled.div`
  width: 100%;
  background-color: #ce2a2a;
  height: 50px;
  position: absolute;
  bottom: 0;
`;
