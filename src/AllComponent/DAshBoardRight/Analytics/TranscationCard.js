import React from "react";

const TransactionCard = (props) =>{
    return (
        <>
        {props.Data.map((value, index) => (
         <div className='boxNoOne' key= {index}>
            <p className='boxValue'>{value.Head}</p>
            <p className='boxNumber'>{value.number}</p>
        </div>
        ))}
        </>
    )
}

export default TransactionCard;