/* import React, { useState, useEffect } from "react";
*
* import { useAppSelector, useAppDispatch } from "../app/hooks";
* import {
*   decrement,
*   increment,
*   incrementByAmount,
*   incrementAsync,
*   selectCount,
* } from "./counterSlice";
* import styles from "./Counter.module.css";
* import { useNavigate, useParams } from "react-router-dom";
* import { ProductsService } from "services/ProductService";
*
* type Params = {
*   id: string;
*   somethingelse: string;
* };
*
* export function Counter() {
*   const count = useAppSelector(selectCount);
*   const dispatch = useAppDispatch();
*   const [incrementAmount, setIncrementAmount] = useState("2");
*
*   const navigate = useNavigate();
*   const params = useParams<Params>();
*
*   const incrementValue = Number(incrementAmount) || 0;
*
*   const getData = async () => {
*     try {
*       const res = await ProductsService.getAllProducts();
*       console.log({ res });
*     } catch (error) {
*       console.log(error);
*     }
*   };
*
*   useEffect(() => {
*     getData();
*   }, []);
*
*   return (
*     <div>
*       <button onClick={() => navigate(-1)}>Go back</button>
*       {params.id} + {params.somethingelse}
*       <div className={styles.row}>
*         <button
*           className={styles.button}
*           aria-label="Decrement value"
*           onClick={() => dispatch(decrement())}>
*           -
*         </button>
*         <span className={styles.value}>{count}</span>
*         <button
*           className={styles.button}
*           aria-label="Increment value"
*           onClick={() => dispatch(increment())}>
*           +
*         </button>
*       </div>
*       <div className={styles.row}>
*         <input
*           className={styles.textbox}
*           aria-label="Set increment amount"
*           value={incrementAmount}
*           onChange={e => setIncrementAmount(e.target.value)}
*         />
*         <button
*           className={styles.button}
*           onClick={() => dispatch(incrementByAmount(incrementValue))}>
*           Add Amount
*         </button>
*         <button
*           className={styles.asyncButton}
*           onClick={async () => await dispatch(incrementAsync(incrementValue))}>
*           Add Async
*         </button>
*       </div>
*     </div>
*   );
* } */
