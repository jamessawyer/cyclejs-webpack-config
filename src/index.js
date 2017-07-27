/** @jsx html */
import { html } from 'snabbdom-jsx';
import { run } from '@cycle/run';
import { div, label, input, hr, h1, makeDOMDriver } from '@cycle/dom';

function main(sources) {
    const sinks = {
        DOM: sources.DOM.select('.filed').events('input')
                .map(ev => ev.target.value)
                .startWith('')
                .map(name => 
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

// function main(sources) {
//     // 选取元素，添加事件
//     const input$ = sources.DOM.select('.field').events('input');

//     // 事件handler
//     const name$ = input$.map(ev => ev.target.value).startWith('');

//     // 虚拟dom
//     const vdom$ = name$.map(name => 
//         div([
//             label('Name:'),
//             input('.field', { attrs: { type: 'text' } }),
//             hr(),
//             h1('Hello ' + name)
//         ])
//     );

//     return { DOM: vdom$ };
// }

// run(main, { DOM: makeDOMDriver('#app-container') });