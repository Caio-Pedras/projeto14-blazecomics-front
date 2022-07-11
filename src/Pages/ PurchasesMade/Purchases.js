import styled from "styled-components";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../userContext/userContext";

export default function Purchases() {
    const { URL, token } = useContext(UserContext);
    const [buyers, setBuyers] = useState([])
    console.log(buyers)
    useEffect(() => {
        const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
        }
        console.log(config)
        axios
            .get(`${URL}/purchases`, config)
            .then((res) => {
                setBuyers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <Container>
            <Title>Blaze Comics</Title>
            {
                !token || buyers.length === 0 ?
                    <div>
                        <p> Você precisa logar para ver seus registros de compras</p>
                    </div>
                    :
                    <div>
                        {buyers.map((item) => { 
                            return(
                                <>
                                <p>{ item.title }</p>
                                </>
                            )
                        })}
                    </div>
            }
                
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    padding: 20px;
`

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



`