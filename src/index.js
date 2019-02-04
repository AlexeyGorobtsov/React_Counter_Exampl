import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Counter} from "./components/Counter";

const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    };

    const subscribe = listener => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({});
    return { getState, dispatch, subscribe }

};

const counter = (state = 0, action) => {
    console.log(action)ªª
    switch (action.type) {
        case 'INCREMENT':
            console.log(state);
            return state + 1;
        case 'DECREMENT':
            console.log(state);
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(counter);


// ReactDOM.render(<Counter
//     value={store.getState()}
//     onIncrement={() => store.dispatch({
//         type: 'INCREMENT'
//     })}
//     onDecrement={() => store.dispatch({
//         type: 'DECREMENT'
//     })}
//
// />, document.getElementById('root'));

const render = () => {
    ReactDOM.render(
        <Counter
        value={store.getState()}
        onIncrement={() =>
        store.dispatch({
            type: 'INCREMENT'
        })}
        onDecrement={() => {
            store.dispatch({
                type: 'DECREMENT'
            })
        }}
        />,
        document.getElementById('root')
    )
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
