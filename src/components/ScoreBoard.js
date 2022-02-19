import React from "react"
import "../index.css" 

export default function(){
const scores = JSON.parse(localStorage.getItem("scores"));
function compare( a, b ) {
    if ( a.value < b.value ){
      return -1;
    }
    if ( a.value > b.value ){
      return 1;
    }
    return 0;
  }
  
scores.sort(compare);
//localStorage.setItem("scores", JSON.stringify(scores))
const score = scores.map( (item)=>{
    return (   <tr> <td>{item.name}</td><td>{item.value}</td> </tr>)
}   )
 
return (<div className="tab"><table> <tr> <th>name </th>  <th>score</th> </tr> {score}</table></div>);
}     