import React from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/es/styles-compiled.css";
import styled from "styled-components";
import InputMask from "react-input-mask";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <CardWrapper>
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </CardWrapper>
        <form>
          <input
            type="tel"
            name="number"
            placeholder="Número do cartão"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="tel"
            name="name"
            placeholder="Nome do titular"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <InputWrapper>
            <input
              type="tel"
              name="expiry"
              placeholder="Validade"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="tel"
              maxLength="4"
              name="cvc"
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </InputWrapper>
        </form>
      </div>
    );
  }
}
const InputWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;
const CardWrapper = styled.div`
  margin-bottom: 20px;
`;
