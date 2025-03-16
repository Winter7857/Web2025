"use client"

import { useState } from "react"

const STYLE = "border border-black rounded-md px-2 mb-2"
const STYLE_BUTTON = " inline-block mx-2 px-2 w-8 bg-red-100 text-center hover:bg-red-600 hover:text-white"

export default function Calculator() {

    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [result, setResult] = useState(0)

    const [operator, setOperator] = useState('')
    const [total, setTotal] = useState(0) 

    function cal(e: React.MouseEvent<HTMLButtonElement>) {
        const value: number = +e.currentTarget.value; 
        switch (operator) {
            case '+':
                setTotal(total + value)
                break
            case '-':
                setTotal(total - value)
                break
            case '*':
                setTotal(total * value)
                break
            default:
                setTotal(value)
        }
    }

    return (
        <div>
            <h1>Hello calculator</h1>
            <div>
                <label htmlFor="A">A: </label>
                <input
                    className={`${STYLE} bg-red-200`}
                    type="number"
                    value={a}
                    onChange={e => setA(+e.target.value)}
                />
                a = {a}
            </div>
            <div>
                <label htmlFor="B">B: </label>
                <input
                    className={`${STYLE} bg-blue-200`}
                    type="number"
                    value={b}
                    onChange={e => setB(+e.target.value)}
                />
                b = {b}
            </div>
            <div>
                <button className={`${STYLE}`}
                    onClick={() => setResult(a + b)}
                >+</button>
                <button className={`${STYLE} ml-2`}
                    onClick={() => {
                        setA(0)
                        setB(0)
                        setResult(0)
                    }}
                >clear</button>
            </div>
            <div>
                Result: a + b = {result}
            </div>

            <hr /> <br />
            <div>
                <div>
                    <div>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={1} onClick={cal}>1</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={2} onClick={cal}>2</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={3} onClick={cal}>3</button>
                    </div>
                    <div>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={4} onClick={cal}>4</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={5} onClick={cal}>5</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={6} onClick={cal}>6</button>
                    </div>
                    <div>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={7} onClick={cal}>7</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={8} onClick={cal}>8</button>
                        <button className={`${STYLE} ${STYLE_BUTTON}`} value={9} onClick={cal}>9</button>
                    </div>
                    <div>
                        <div className={`${STYLE} ${STYLE_BUTTON}`}
                            onClick={() => setOperator('+')}
                        >+</div>
                        <div className={`${STYLE} ${STYLE_BUTTON}`}
                            onClick={() => setOperator('-')}
                        >-</div>
                        <div className={`${STYLE} ${STYLE_BUTTON}`}
                            onClick={() => setOperator('*')}
                        >*</div>
                    </div>

                    <div>
                        <button className={`${STYLE} m-2`}
                            onClick={() => setTotal(0)}
                            >AC
                        </button>
                        Total = {total}
                    </div> 
                </div>
            </div>
        </div>
    )
}