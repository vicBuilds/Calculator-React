import React, { useState } from "react";
import styled from "styled-components";

// CSS using Styled Components

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 570px) {
    width: 100vw;
    padding: 0px;
    height: 100vh;
  }
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
  font-size: 60px;
  width: 90%;
  height: 250px;
  border-radius: 0px 0px 0 0;
  overflow: hidden;
  background-color: black;

  @media (max-width: 570px) {
    width: 97%;
    height: 150px;
    font-size: 40px;
  }
`;

const Keypad = styled.div`
  padding: 0px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 0px 0px;
  background-color: black;

  @media (max-width: 570px) {
    width: 97%;
  }
`;

const Button = styled.button`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  flex: 1;
  margin: 0px 10px;
  color: white;
  background-color: #424242;
  border: none;
  border-radius: 50%;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.01);
    background-color: red;
  }
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
  margin: 10px;
  border-radius: 50%;
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
  padding: 0px;
`;

const Sub = styled.div`
  font-size: 22px;
  position: absolute;
  right: 10px;
  top: 50%;
  @media (max-width: 570px) {
    top: 40%;
    font-size: 15px;
  }
`;

const Calculator = () => {
  // All State Variables
  /*
  1. FirstNum for storing the state of the First Number.
  2. Same Thing goes for Second Num.
  3. Operation State for what operation to be performed.
  4. result to display the result when calculations are complete.
  5. decimal to add floating numbers. If the state is turned true it will accept floating inputs.
  6. Finally the Str state to show some history
  */
  let [firstNum, setFirstNum] = useState(0);
  let [secondNum, setSecondNum] = useState(null);
  let [operation, setOperation] = useState(null);
  let [result, setResult] = useState(null);
  let [decimal, setDecimal] = useState(false);
  let [str, setStr] = useState("");

  /*
  The below function is the heart of the Calculator. It decides what to do when a user adds a input.
  */
  const handleClickonButton = (e) => {
    let { value } = e.target;

    // If the user wants a floating number and presses '.', we are setting the state of decimal to true.
    // If already the input number is decimal we are returning.

    if (value === ".") {
      if (decimal) {
        return;
      }
      decimal = true;
      setDecimal(true);
      //   console.log("Hello Input", value);
      //   console.log("Decimal is", decimal);
    }

    // Reset the whole procedure if the user types 'C'
    if (value === "C") {
      setFirstNum(0);
      setSecondNum(null);
      setOperation(null);
      setResult(null);
      setStr("");
      setDecimal(false);
      return;
    }

    // If there is alreay result and the user types a number means he/she wants a new operation.
    if (result) {
      setFirstNum(e.target.value);
      setSecondNum(null);
      setOperation(null);
      setResult(null);
      setDecimal(false);
      setStr("");
      return;
    }

    //Taking input of the First Number till the user presses a operand(+,-,*,/) key.

    if (secondNum === null && secondNum !== "") {
      if (value === "%") {
        return;
      }
      if (value === "+/-") {
        setFirstNum(firstNum * -1);
        return;
      }

      let num;

      //Handling the Decimal with string input.
      if (decimal) {
        num = firstNum + value;
      } else {
        num = firstNum * 10 + parseInt(value);
      }
      //   Not Taking input of more than 10 digits.
      if (num.toString().length > 10) {
        return;
      }

      setFirstNum(num);
      //console.log(firstNum);
    } else {
      let num;
      //   Handling the Percentage Part
      if (value === "%") {
        num = (secondNum / 100) * firstNum;
        num = num.toPrecision(4);
        setSecondNum(num);
        return;
      }

      //   Same goes for Changing Sign

      if (value === "+/-") {
        setSecondNum(secondNum * -1);
        return;
      }

      //   Taking Input for the Second Number

      if (secondNum === "") {
        num = value;
      } else {
        if (decimal) {
          num = secondNum + value;
        } else {
          num = secondNum * 10 + parseInt(value);
        }
      }
      //Check so that the user can't input more that 10 digits

      if (num.toString().length > 10) {
        return;
      }

      setSecondNum(num);
    }
  };

  //   Setting what Operation to Do

  const setOperationType = (e) => {
    //console.log("Operation is ", e.target.value);
    // if (firstNum && operation && !secondNum) {
    //   return;
    // }

    // Fixed a Bug when a user double taps a operand

    if (secondNum === "" && !result) {
      return;
    }

    if (firstNum && secondNum) {
      firstNum = parseFloat(firstNum);
      secondNum = parseFloat(secondNum);

      //   Rallying the sum by setting the result as first number
      if (result) {
        setFirstNum(result);
        setSecondNum("");
        setOperation(e.target.value);
        setStr(result + e.target.value);
        setDecimal(false);
        setResult(null);
        //console.log("You are in the right place");
        return;
      }

      /*   If there is first number and second number and the user hits the operand buttons we should take the rally 
           forward for helping the user taking the sum of make a list of operations.
           Example: Adding a Grocery List.
           Below is how i handled that.
      */

      switch (operation) {
        case "+":
          //firstNum = firstNum + secondNum;
          setFirstNum(firstNum + secondNum);
          setResult(firstNum + secondNum);
          setStr(firstNum + "+" + secondNum);
          setOperation("+");
          secondNum = "";
          setSecondNum("");
          break;
        case "-":
          // code block
          setFirstNum(firstNum - secondNum);
          setResult(firstNum - secondNum);
          setStr(firstNum + "-" + secondNum);
          setOperation("-");
          secondNum = "";
          setSecondNum("");
          break;

        case "*":
          // code block
          setFirstNum(firstNum * secondNum);
          setResult(firstNum * secondNum);
          setStr(firstNum + "*" + secondNum);
          setOperation("*");
          secondNum = "";
          setSecondNum("");
          break;

        case "/":
          // code block
          setFirstNum(firstNum / secondNum);
          setResult(firstNum / secondNum);
          setStr(firstNum + "/" + secondNum);
          setOperation("/");
          secondNum = "";
          setSecondNum("");
          break;

        default:
          return;
      }
      return;
    }

    /*  One more case i found was when the user has hit the result(means '=')
         and want to take the rally forward. Below is how i handled that. 
    */

    if (result) {
      //console.log("Oops there is result", result);
      setFirstNum(result);
      setResult(null);
      //console.log("First Num is ", firstNum);
      //console.log("Result is ", result);
      setStr(result + "" + e.target.value);
      setOperation(e.target.value);
      setSecondNum("");
      setDecimal(false);
      return;
    }

    setOperation(e.target.value);
    decimal = false;
    setDecimal(false);
    setStr(str + "" + firstNum + "" + e.target.value);
    setSecondNum("");
  };

  const displayResult = (e) => {
    //console.log(e.target.value);
    // console.log("First Number is ", firstNum);
    // console.log("Second Number is ", secondNum);
    if (!secondNum) {
      return;
    }
    let calculatedResult = 0;
    setStr(firstNum + "" + operation + "" + secondNum + "=");
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    if (operation === "*") {
      // console.log("Hello I am here");

      //   setResult(firstNum * secondNum);
      calculatedResult = firstNum * secondNum;
    }
    if (operation === "+") {
      //console.log(typeof firstNum);
      //console.log(typeof secondNum);
      //console.log("Result of the Operation is ", firstNum * secondNum);
      calculatedResult = firstNum + secondNum;
      //setResult(firstNum + secondNum);
    }
    if (operation === "-") {
      //setResult(firstNum - secondNum);
      calculatedResult = firstNum - secondNum;
    }
    if (operation === "/") {
      //setResult(firstNum / secondNum);
      calculatedResult = firstNum / secondNum;
    }
    setStr(firstNum + "" + operation + "" + secondNum + "=");
    //calculatedResult.toString().length();
    //console.log(calculatedResult);
    //console.log(typeof calculatedResult);
    if (calculatedResult.toString().length > 11) {
      calculatedResult = calculatedResult.toPrecision(9);
    }

    //console.log("Result is ", calculatedResult);
    setResult(calculatedResult);
  };

  return (
    <Container>
      <Screen>
        <Sub>{str}</Sub>
        {!result && !secondNum && secondNum !== 0 && result !== 0 && firstNum}
        {!result && secondNum && result !== 0 && secondNum}
        {result && result}
      </Screen>

      <Keypad>
        <Row>
          <Button
            value={"C"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
            style={{ color: "black", backgroundColor: "grey" }}
          >
            C
          </Button>
          <Button
            value={"+/-"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
            style={{ color: "black", backgroundColor: "grey" }}
          >
            +/-
          </Button>
          <Button
            value={"%"}
            onClick={(e) => {
              handleClickonButton(e);
            }}
            style={{ color: "black", backgroundColor: "grey" }}
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
            style={{ flex: 2.1, borderRadius: "25px" }}
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
