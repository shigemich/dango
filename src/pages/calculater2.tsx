import { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import { Button } from '../components/Button';

const IndexPage: NextPage = (): ReactElement => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<string>('');
  const [operator, setOperator] = useState<string>('');

  const handleDigitClick = (digit: string) => {
    if (displayValue === '0' || operator) {
      setDisplayValue(digit);
      setOperator('');
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleOperatorClick = (selectedOperator: string) => {
    if (firstOperand) {
      // If there's already a first operand, perform the calculation
      const result = calculate();
      setDisplayValue(result.toString());
      setFirstOperand(result.toString());
    } else {
      setFirstOperand(displayValue);
    }
    setOperator(selectedOperator);
  };

  const calculate = () => {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return (num1 + num2).toString();
      case '-':
        return (num1 - num2).toString();
      case '*':
        return (num1 * num2).toString();
      case '/':
        return (num1 / num2).toString();
      default:
        return displayValue;
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
            {/* 他の数字ボタンも同様に設定 */}
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('+')}>
                +
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => handleOperatorClick('=')}>
                =
            </Button>
            {/* 他の演算子ボタンも同様に設定 */}
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={handleClearClick}>
                C
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;