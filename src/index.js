/** @jsx html */
import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
// import { div, label, input, hr, h1, makeDOMDriver } from '@cycle/dom';
import { makeDOMDriver } from '@cycle/dom'; // 使用jsx语法我们不需要引入上面的那些dom标签

import xs from 'xstream';

/**
 * bmi指数
 */
function main(sources) {
    const weight$ = sources.DOM.select('.weight').events('input').map(ev => ev.target.value).startWith(70);
    const height$ = sources.DOM.select('.height').events('input').map(ev => ev.target.value).startWith(140);

    // combine接收多个流作为输入，产生一个包含多个值的流数组
    const state$ = xs.combine(weight$, height$)
                     .map(([weight, height]) => {
                         const heightMeters = height * 0.01;
                         const bmi = Math.round(weight / (heightMeters * heightMeters));
                         return { weight, height, bmi }
                     })
    const sinks = {
        DOM: state$.map(({weight, height, bmi}) => 
            <div>
                体重 { weight } kg: 
                <input className="weight" type="range" min="40" max="100" />
                <hr />
                身高 { height } cm: 
                <input className="height" type="range" min="140" max="200" />
                <hr />
                <h2>bmi值： { bmi }</h2>
            </div>
        )
    };

    return sinks;
}
run(main, { DOM: makeDOMDriver('#app-container') })


/**
 * jsx写法
 */
/*
function main(sources) {
    const name$ = sources.DOM.select('.filed').events('input')
                .map(ev => ev.target.value)
                .startWith('');
    const sinks = {
        DOM: name$.map(name => 
                    <div>
                        <label />Name:
                        <input className="filed" type="text" />
                        <hr />
                        <h1>hello {name}</h1>
                    </div>
                )
    };
    return sinks;
}
run(main, { DOM: makeDOMDriver('#app-container') })
*/

/**
 * 常规写法
 */
/*
function main(sources) {
    // 选取元素，添加事件
    const input$ = sources.DOM.select('.field').events('input');

    // 事件handler
    const name$ = input$.map(ev => ev.target.value).startWith('');

    // 虚拟dom
    const vdom$ = name$.map(name => 
        div([
            label('Name:'),
            input('.field', { attrs: { type: 'text' } }),
            hr(),
            h1('Hello ' + name)
        ])
    );

    return { DOM: vdom$ };
}

run(main, { DOM: makeDOMDriver('#app-container') });
*/