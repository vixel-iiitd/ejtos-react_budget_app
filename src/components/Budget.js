
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const { dispatch} = useContext(AppContext);
    const [newCurrency, setCurrency] = useState("");

    const handleBudgetChange = (event) => {
        
        const totalExpenses = expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        
        console.log(totalExpenses);
        if(event.target.value>20000){
            alert("Budget is exceeding 20,000  £");
            // return;
        }
        if(event.target.value<totalExpenses){
            alert("You cannot reduce the budget lower than the spending");
            // return;
        }else{

            dispatch({
                type: 'SET_BUDGET',
                payload: event.target.value,
            });
        }
        setNewBudget(event.target.value);
    }

    const handleCurrency = (event) => {
        console.log(event.target.value);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
        setCurrency(event.target.value);
    }



    return (
<div className='alert alert-secondary'>

<label for="currency">Select Currency</label>

<select name="currency" id="currency" value = {newCurrency} onChange={handleCurrency}>
  <option value="$">$ Dollar</option>
  <option value="£">£ Pound</option>
  <option value="€">€ Euro</option>
  <option value="₹">₹ Ruppee</option>
</select>


<br/>
<span>Budget: {newCurrency} {budget}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;