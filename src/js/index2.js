import {createStore} from 'redux';
import {combineReducers} from 'redux';
import React,{Component} from 'react';
import ReactDom from 'react-dom';

let gid = 0;
const toReducer = (state = [],action) => {
   switch(action.type) {
       case 'ADD_TODO':
            let newState = [...state];
            newState.push({
                text:action.text,
                id:gid++,
                complete:false
            })
            return newState;
        case 'TOUCH_TODO':
            let newState2 = state.map((ele,index) => {
                if(ele.id === action.id) {
                    return Object.assign({},ele,{complete:!ele.complete})
                }
                return ele;
            })
            return newState2;
        default:
            return state;
   }
}

const filterReduce = (state='SHOW_ALL',action)=> {
    switch(action.type) {
        case 'TOUCH_FILTER':
           return action.filter;
        default:
           return state;
    }
}

let rootReducer = combineReducers({
    toDolist:toReducer,
    filterText:filterReduce
})

let store = createStore(rootReducer);

const filterToDOList = (toDolist,filterText) => {
   switch(filterText) {
       case 'SHOW_COMPLETE':
          return toDolist.filter((ele,index) => {
                 return !ele.complete;
          })
       case 'SHOW_ACTIVE':
          return toDolist.filter((ele,index) => {
                 return ele.complete;
          })
       default:
          return toDolist;
   }
}

class App extends Component {
    render () {
        let {toDolist,filterText} = store.getState();
        toDolist = filterToDOList(toDolist,filterText);
        return (
            <div>
               <input type="text" ref='inp'/>     
               <button onClick={
                //用action去描述要怎么改变
                  () => {
                    store.dispatch({
                      type:'ADD_TODO',
                      text:this.refs.inp.value
                    })
                  }
               }>add</button>   
               <ul>
                 {
                     toDolist.map( (ele,index) => {
                     return <li style={{textDecoration:ele.complete ? 'line-through' : 'none'}} onClick={
                         () => {
                             store.dispatch({
                                 type:'TOUCH_TODO',
                                 id:ele.id
                             })
                         }
                     } key={ele.id}>{ele.text}</li>
                     })
                  }
               </ul>
               <div>
                  <a href="#" onClick={
                      () => {
                          store.dispatch({
                              type:'TOUCH_FILTER',
                              filter:'SHOW_ALL',
                          })
                      }
                  }>SHOW_ALL</a>
                  <a href="#" onClick={
                      () => {
                          store.dispatch({
                              type:'TOUCH_FILTER',
                              filter:'SHOW_COMPLETE',
                          })
                      }
                  }>SHOW_COMPLETE</a>
                  <a href="#" onClick={
                      () => {
                          store.dispatch({
                              type:'TOUCH_FILTER',
                              filter:'SHOW_ACTIVE',
                          })
                      }
                  }>SHOW_ACTIVE</a>
               </div>
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


//action
//{type:'ADD_TODO',text:value}