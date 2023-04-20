import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Screen = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: #4a4343;
  padding: 1px 2px;
  box-sizing: border-box;
  color: white;
  font-size: 80px;
  width: 50%;
  height: 200px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;

const Keypad = styled.div`
  padding: 0px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 15px;
`;

const Button = styled.button`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  flex: 1;
`;

const OperationsButton = styled.button`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  flex: 1;
  background-color: orange;
  color: white;
  transition: all 0.1s ease;
  &:hover {
    background-color: #f8cd7e;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Sub = styled.div`
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 30%;
`;

const Calculator = () => {
  let [firstNum, setFirstNum] = useState(0);
  let [secondNum, setSecondNum] = useState(null);
  let [operation, setOperation] = useState(null);
  let [result, setResult] = useState(null);
  let [decimal, setDecimal] = useState(false);
  let [str, setStr] = useState("");

  const handleClickonButton = (e) => {
    console.log(e.target.isNumber);
    let { value } = e.target;
    if (value == ".") {
      setDecimal(true);
      console.log("Hello");
    }

    if (value === "C") {
      setFirstNum(0);
      setSecondNum(null);
      setOperation(null);
      setResult(null);
      setStr("");
      return;
    }

    if (result) {
      setFirstNum(e.target.value);
      setSecondNum(null);
      setOperation(null);
      setResult(null);
      setDecimal(false);
      setStr("");
      return;
    }

    // if (secondNum != null) {
    //   decimal ? (value = value / 10) : (value = value);
    //   const str = secondNum + "" + value;
    //   decimal ? setSecondNum(parseFloat(str)) : setSecondNum(parseFloat(str));
    //   //setDecimal(false);
    // } else {
    //   decimal ? (value = value / 10) : (value = value);
    //   const str = firstNum + "" + value;
    //   console.log("Value of Str is", str);
    //   decimal ? setFirstNum(parseFloat(str)) : setFirstNum(parseFloat(str));
    //   //setDecimal(false);
    // }
    if (secondNum == null && secondNum != "") {
      const num = firstNum * 10 + parseInt(value);
      setFirstNum(parseInt(num));
      console.log(firstNum);
    } else {
      // console.log("Helllo");
      let num;
      if (secondNum == "") {
        num = 0 * 10 + parseInt(value);
      } else {
        num = secondNum * 10 + parseInt(value);
      }
      setSecondNum(parseInt(num));
    }
  };

  //   Setting what Operation to Do
  const setOperationType = (e) => {
    console.log("Operation is ", e.target.value);
    if (result) {
      console.log("Oops there is result", result);
      setFirstNum(result);
      setResult(null);
      console.log("First Num is ", firstNum);
      console.log("Result is ", result);
      setStr(result + "" + e.target.value);
      setOperation(e.target.value);
      setSecondNum("");
      return;
    }

    setOperation(e.target.value);
    setStr(str + "" + firstNum + "" + e.target.value);
    setSecondNum("");
  };

  const displayResult = (e) => {
    console.log(e.target.value);
    // console.log("First Number is ", firstNum);
    // console.log("Second Number is ", secondNum);

    setStr(firstNum + "" + operation + "" + secondNum + "=");

    if (operation == "*") {
      // console.log("Hello I am here");
      console.log(firstNum);
      console.log(secondNum);
      console.log("Result of the Operation is ", firstNum * secondNum);
      setResult(firstNum * secondNum);
    }
    if (operation == "+") {
      setResult(firstNum + secondNum);
    }
    if (operation == "-") {
      setResult(firstNum - secondNum);
    }
    if (operation == "/") {
      setResult(firstNum / secondNum);
    }
    //setStr("");
  };

  return (
    <Container>
      <Screen>
        <Sub>{str}</Sub>
        {!result && !secondNum && secondNum != 0 && result != 0 && firstNum}
        {!result && secondNum && result != 0 && secondNum}
        {result && result}
      </Screen>

      <Keypad>
        <Row>
          <Button
            value={"C"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            C
          </Button>
          <Button
            value={"+/-"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            +/-
          </Button>
          <Button
            value={"%"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            %
          </Button>
          <OperationsButton
            value={"/"}
            onClick={(e) => {
              setOperationType(e);
            }}
          >
            /
          </OperationsButton>
        </Row>
        <Row>
          <Button
            value={"7"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            7
          </Button>
          <Button
            value={"8"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            8
          </Button>
          <Button
            value={"9"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            9
          </Button>
          <OperationsButton
            value={"*"}
            onClick={(e) => {
              setOperationType(e);
            }}
          >
            X
          </OperationsButton>
        </Row>
        <Row>
          <Button
            value={"4"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            4
          </Button>
          <Button
            value={"5"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            5
          </Button>
          <Button
            value={"6"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            6
          </Button>
          <OperationsButton
            value={"-"}
            onClick={(e) => {
              setOperationType(e);
            }}
          >
            -
          </OperationsButton>
        </Row>
        <Row>
          <Button
            value={"1"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            1
          </Button>
          <Button
            value={"2"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            2
          </Button>
          <Button
            value={"3"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            3
          </Button>
          <OperationsButton
            value={"+"}
            onClick={(e) => {
              setOperationType(e);
            }}
          >
            +
          </OperationsButton>
        </Row>
        <Row>
          <Button
            style={{ flex: 2.1 }}
            value={"0"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            0
          </Button>
          <Button
            value={"."}
            onClick={(e) => {
              handleClickonButton(e);
            }}
          >
            .
          </Button>
          <OperationsButton
            value={"="}
            onClick={(e) => {
              displayResult(e);
            }}
          >
            =
          </OperationsButton>
        </Row>
      </Keypad>
    </Container>
  );
};

export default Calculator;
