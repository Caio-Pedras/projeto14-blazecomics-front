import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext/userContext";

export default function CartPage() {
  const [productsCart, setProductsCart] = useState([])
  const body = JSON.parse(localStorage.getItem('cartItems'))
  const navigate = useNavigate();
  const { setBodyCart, bodyCart, URL, token } = useContext(UserContext)
  let totalValue = 0
  console.log(productsCart)
  useEffect(() => {
    axios
      .post(`${URL}/cart`, body)
      .then((res) => {
        setProductsCart(res.data);
        setBodyCart(res.data);
      })
      .catch((err) =>
        console.log(err)
      )
  }, [])


  function finalizingOrder() {
    if (!token) {
      alert("você precisa estar logado para finalizar a compra");
      navigate("/login")
    }
    if (productsCart.length === 0) {
      alert("Você nao tem items no carrinho")
      return
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    axios
      .post(`${URL}/buy`, bodyCart, config)
      .then((res) => { localStorage.clear(); setProductsCart([]); setBodyCart([]) })
      .catch((err) => { navigate("/login") })
  }


  function removeProduct(id, number) {
    const item = {
      'productId': id,
      number
    }
    let cartItems = JSON.parse(localStorage.getItem("cartItems"))
    const filter = cartItems.filter((items) => item.productId !== items.productId)
    const showProducts = productsCart.filter((items) => item.productId !== items._id)
    setProductsCart(showProducts)
    setBodyCart(showProducts)
    localStorage.setItem('cartItems', JSON.stringify(filter))
  }



  return (
    <Container>
      <Title>Blaze Comics</Title>
      {
        productsCart.length === 0 ?
          <NoProduct>
            <p> Você nao possui produtos no carrinho </p>
          </NoProduct>
          :
          <ContainerProducts>
            <h6> Confira todos seus produtos: </h6>
            {productsCart.map((item, index) => {
              let value = (Number(item.price.replace(",", ".")) * parseInt(item.number)).toFixed(2);
              totalValue = totalValue + Number(value)
              return (
                <Product key={index}>
                  <Link to={`/product/${item._id}`} key={index}>
                    <Banner>
                      <img src={item.picture} alt="" />
                    </Banner>
                  </Link>
                  <div>
                    <p> {item.name}</p>
                    <Quantity item={item.number} id={item._id} removeProduct={removeProduct} />
                    <p>  Valor : {value.toString().replace(".", ",")} </p>
                  </div>

                  <IconTrash onClick={() => removeProduct(item._id, item.number)}>
                    <ion-icon name="trash-outline"></ion-icon>
                  </IconTrash>
                </Product>
              )
            })}
          </ContainerProducts>
      }
      <Total>
        TOTAL = R$ {totalValue.toFixed(2).toString().replace(".", ",")}
      </Total>
      <Footer>
        <Link to="/">
          <IconWrapper>
            <ion-icon name="home"></ion-icon>
          </IconWrapper>
        </Link>
        <Button onClick={finalizingOrder}>Finalizar</Button>
      </Footer>
    </Container>
  )
}


function Quantity({ item , id, removeProduct }) {
  return (
    <Quant>
      <ion-icon onClick={() => updateValue(item, id, removeProduct)}
        name="remove-circle"></ion-icon>
      <p>Quatindade: {item} </p>
      <ion-icon name="add-circle"></ion-icon>
    </Quant>
  )
}

function updateValue(item, id, removeProduct) {
  const it = {
    'productId': id,
    number: item - 1
  }
  if(it.number === 0){
    removeProduct(id, item)
  }
  // } else {
  //   removeProduct(id, item)
  //   // let cartItems = JSON.parse(localStorage.getItem("cartItems"))
  //   // const filter = cartItems.filter((items) => item.productId !== items.productId)
  //   // localStorage.setItem('cartItems', JSON.stringify(...filter, it))
  }

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Total = styled.div`
  width: 100%;
  height: 42px;
  background-color: #B5DE5D;
  font-weight: 700;
  font-size: 20px;
  text-align:  center;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 100px;
`

const ContainerProducts = styled.div`
  width: 100%;
  height: 70%;
  overflow-x: hidden;
  overflow-y: scroll;
  h6 {
    color: white;
    font-weight: 700;
    margin-bottom: 10px;
  }
`

const Product = styled.div`
  width: 100%;
  height: auto;
  min-height: 180px;
  background-color: white;
  display: flex;
  border: 3px solid #07F802;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
      margin-right: 10px;
    }
    font-size: 20px;
    padding:15px 15px 15px 0;
  }
  p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
`;

const NoProduct = styled.div`
  width: 100%;
  height: 180px;
  background-color: white;
  display: flex;
  border: 3px solid #07F802;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }
`

const Banner = styled.figure` 
  img {
    object-fit: cover;
    height: 180px;
    width: 124px;
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
  width: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding: 20px;
  font-size: 25px;
  margin-bottom: 20px;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
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
  max-width: 700px;
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

const Quant = styled.ul`
  background-color: rgba(95, 95, 95, 0.26);
  border-radius: 0 30px 30px 0;
  padding: 5px;
  max-width: 230px;
  width: 135px;
  margin: 10px 0 10px 0 ;
`