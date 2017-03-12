import {createStore} from 'redux';
import React,{Component} from 'react';
import ReactDom from 'react-dom';

const reducer = (state=0,action) => {
    switch(action.type) {
      case 'INCREASE':
         return state+1;
      case 'DECREASE':
         return state-1;
      default:
         return state;   
    }
}

const store = createStore(reducer);

// store.dispatch({
//     type:'crease',  
// })

// const render = () => {
//     document.body.innerHTML = store.getState();
// }
// render();

// store.subscribe(render);

// document.onclick = () => {
//     store.dispatch({
//         type:'INCREASE'
//     })
// }


class App extends Component {
    render () {
       return (
           <div>
               <h1>{store.getState()}</h1> 
               <button onClick={()=>{store.dispatch({type:'INCREASE'})}}>+</button>
               <button onClick={()=>{store.dispatch({type:'DECREASE'})}}>-</button>
           </div>
       )
    }
}

const render = () => {
  ReactDom.render(
    <App/>,
    document.getElementById('root')
  )
}
render();
store.subscribe(render);