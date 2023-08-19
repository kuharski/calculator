import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './styles.css';
import { create, all } from 'mathjs'

const config = {
    number: 'number',
    precision: 64,
  }
  const math = create(all, config);

export const ACTIONS = {
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {

    // eslint-disable-next-line default-case
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if(payload === '0' && state.currentOperand === '0') {
                return state;
            }
            else if(payload !== '0' && state.currentOperand === '0') {
                return {
                    ...state,
                    currentOperand: payload
                }
            }
            else if(payload === '.' && state.currentOperand.includes('.')) {
                return state;
            }
            else {
                return {
                    ...state,
                    currentOperand: `${state.currentOperand || ""}${payload}`,
                }
            }
        case ACTIONS.CLEAR:
            return {};
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            else if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            else {
                return {
                    ...state,
                    previousOperand: math.evaluate(`${state.previousOperand} ${state.operation} ${state.currentOperand}`),
                    operation: payload,
                    currentOperand: null,
                }
            }
    }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <main className='main'>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button>DEL</button>
        <OperationButton operation='÷' dispatch={dispatch} />
        <DigitButton digit='1' dispatch={dispatch} />
        <DigitButton digit='2' dispatch={dispatch} />
        <DigitButton digit='3' dispatch={dispatch} />
        <OperationButton operation='*' dispatch={dispatch} />
        <DigitButton digit='4' dispatch={dispatch} />
        <DigitButton digit='5' dispatch={dispatch} />
        <DigitButton digit='6' dispatch={dispatch} />
        <OperationButton operation='+' dispatch={dispatch} />
        <DigitButton digit='7' dispatch={dispatch} />
        <DigitButton digit='8' dispatch={dispatch} />
        <DigitButton digit='9' dispatch={dispatch} />
        <OperationButton operation='-' dispatch={dispatch} />
        <DigitButton digit='.' dispatch={dispatch} />
        <DigitButton digit='0' dispatch={dispatch} />
        <button className="span-two">=</button>
      </div>
    </main>
  );
}

export default App;
