import React from 'react';
import Swal from 'sweetalert2';
import { useState } from 'react';
const App = () => {
  const [amount,setAmount]=useState('')
  const [type,setType]=useState('income')
  const [transactions,setTransactions]=useState([])
  const handleTransactions=()=>{
   if(amount.trim()==''){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please Enter Your Amount!',
    });
    return;
   }
  setTransactions([...transactions,{amount,type}]) // Array Of Object
  setAmount('') 
  }
  const incomes=transactions.reduce((acc,value)=>{
   return  value.type=='income' ?acc+Number(value.amount) :acc
  },0)
  const types=transactions.reduce((acc,value)=>{
   return  value.type=='expense' ?acc+Number(value.amount) :acc
  },0)
  const balance=incomes-types
  console.log(balance);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-16">
      {/* Main Container */}
      <div className="flex flex-col items-center justify-center">
        {/* Top Section - Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-lg">
          <div className="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors duration-300">
            <h3 className="text-sm font-semibold">Income</h3>
            <p className="text-green-600 font-bold hover:text-green-700 transition-colors duration-300">{incomes}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-center hover:bg-red-200 transition-colors duration-300">
            <h3 className="text-sm font-semibold">Expense</h3>
            <p className="text-red-600 font-bold hover:text-red-700 transition-colors duration-300">{types}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors duration-300">
            <h3 className="text-sm font-semibold">Balance</h3>
            <p className="text-blue-600 font-bold hover:text-blue-700 transition-colors duration-300">{balance}</p>
          </div>
        </div>

        {/* Form and To-Do Container */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl">
          {/* Left Side - Transaction Form */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-lg font-bold mb-4 text-center">Add Transaction</h2>
            <input
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
              type="number"
              placeholder="Enter amount"
              className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
            />
            <select className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300" onChange={(e)=>setType(e.target.value)} value={type}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300" onClick={handleTransactions}>
              Submit
            </button>
          </div>

          {/* Right Side - Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-lg font-bold mb-4 text-center">Recent Transactions</h2>
            <div className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {/* Scrollable section with custom scrollbar */}
              {transactions.map((data,index)=>{
                return ( <ul>
                <li className="bg-gray-100 p-3 rounded-lg shadow-sm mb-2 flex justify-between hover:bg-gray-200 transition-colors duration-300">
                  <span key={index}>{index+1}</span>
                  <span>{data.amount}</span>
                  <span className={`font-bold  ${data.type=='income'?'text-green-600':'text-red-600'}`}>{data.type}</span>
                </li>
              </ul>
                )
              })}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
