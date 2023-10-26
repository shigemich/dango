import { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import { Button } from '../components/Button';

const IndexPage: NextPage = (): ReactElement => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [firstinput, setFirstinput] = useState<boolean>(true);

  const handleDigitClick = (digit: string) => {
    if (firstinput){
      setDisplayValue(digit)
      setFirstinput(false)
      return
    }
    if (displayValue === '0') {
      setDisplayValue(digit);
     // setOperator('');
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleOperatorClick = (selectedOperator: string) => {
    if (firstOperand !=='' ) {
      // If there's already a first operand, perform the calculation
      const result = calculate();
      setDisplayValue(result.toString());
      setFirstOperand(result.toString());
      console.log(result)
    } 
    else {
      setFirstOperand(displayValue);
    }
      console.log(selectedOperator)
    setOperator(selectedOperator);
    setFirstinput(true)
    
  };

  const calculate = () => {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return num2;
    }
  };

  const handleEqualsClick = () => {
    console.log('handleEqualsClick called'); // コンソールログの追加
    console.log(firstOperand)
    console.log(operator)
    if (firstOperand && operator) {
      const result = calculate();
      setDisplayValue(result.toString());
      setFirstOperand(result.toString());
      setOperator('');
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand('');
    setOperator('');
  };

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{displayValue}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('7')}>
                7
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('8')}>
                8
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('9')}>
                9
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('+')}>
                +
            </Button>            
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('4')}>
                4
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('5')}>
                5
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"          
              onClick={() => handleDigitClick('6')}>
                6 
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('-')}>
                -
            </Button>                
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('1')}>
                1
              </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('2')}>
                2
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('3')}>
                3
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('*')}>
                *
            </Button>              
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('0')}>
                0
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white ronded border border-gray-200 cursor-pointer"
              onClick={() => handleDigitClick('00')}>
              00
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white ronded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('.')}>
                .
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('/')}>
                /
            </Button> 
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={handleClearClick}>
                C
            </Button>                              
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={handleEqualsClick}>
                =
            </Button>             
          </div>
        </div>
      </div>
      
    </>
  );
};

export default IndexPage;
