// import myViewConfig from './static/json/human_motor_cortex.json';
// import * as vitessce from 'vitessce';
const myViewConfig = require('./static/json/human_motor_cortex.json');
// import { Scatterplot, Status } from 'vitessce';

export default function VitessceApp() {
  const view = { target: [0, 0, 0], zoom: 0.75 };
  const mapping = "PCA";
  const cells = {
    1: { mappings: { [mapping]: [0, 0] } },
    2: { mappings: { [mapping]: [1, 1] } },
    3: { mappings: { [mapping]: [1, 2] } }
  };
  const selectedCellIds = new Set();
  const dimensions = { width: '400px', height: '400px', margin: '10px' };
  return (
    <div className="vitessce-container vitessce-theme-light">
      <div className="card card-body bg-secondary" style={dimensions}>
        <Status
          info="Hello world"
          removeGridComponent={() => { }}
        />
      </div>
      <div className="card card-body bg-secondary" style={dimensions}>
        <Scatterplot
          uuid="my-vitessce-scatterplot"
          view={view}
          mapping={mapping}
          cells={cells}
          selectedCellIds={selectedCellIds}
          cellColors={null}
          updateStatus={(message) => { }}
          updateCellsSelection={(selectedIds) => { }}
          updateCellsHover={(hoverInfo) => { }}
          updateViewInfo={(viewInfo) => { }}
          clearPleaseWait={(layerName) => { }}
        />
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(VitessceApp),
  document.getElementById("vitessce"));


// function Example() {
//   const [count, setCount] = React.useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }
// ReactDOM.render(React.createElement(Example),
//   document.getElementById("vitessce"));


// // import myViewConfig from './static/json/human_motor_cortex.json';
// // // const myViewConfig = require('./static/json/human_motor_cortex.json');
// // import * as vitessce from 'vitessce'

// // export default function VitessceApp() {
// //     return (
// //         <vitessce.Vitessce
// //             config={myViewConfig}
// //             height={800}
// //             theme="dark"
// //         />
// //     );
// // }

// // ReactDOM.render(React.createElement(VitessceApp),
// //     document.getElementById("vitessce"));



// import { Scatterplot } from 'vitessce';
// import { Status } from 'vitessce';
// // import '../../node_modules/vitessce/dist/es/production/static/css/index.css';

// class VitessceApp extends React.Component {
//   render() {
//     const view = { target: [0, 0, 0], zoom: 0.75 };
//     const mapping = "PCA";
//     const cells = {
//       1: { mappings: { [mapping]: [0, 0] } },
//       2: { mappings: { [mapping]: [1, 1] } },
//       3: { mappings: { [mapping]: [1, 2] } }
//     };
//     const selectedCellIds = new Set();
//     const dimensions = { width: '400px', height: '400px', margin: '10px' };

//     return (
//       <div>
//         Hi Hi Hi
//       </div>
//     );
//   }
// }

// ReactDOM.render(<VitessceApp />, document.getElementById('vitessce'));


// {/* <div className="vitessce-container vitessce-theme-light">
//         <div className="card card-body bg-secondary" style={dimensions}>
//           <Status
//             info="Hello world"
//             removeGridComponent={() => { }}
//           />
//         </div>
//         <div className="card card-body bg-secondary" style={dimensions}>
//           <Scatterplot
//             uuid="my-vitessce-scatterplot"
//             view={view}
//             mapping={mapping}
//             cells={cells}
//             selectedCellIds={selectedCellIds}
//             cellColors={null}
//             updateStatus={(message) => { }}
//             updateCellsSelection={(selectedIds) => { }}
//             updateCellsHover={(hoverInfo) => { }}
//             updateViewInfo={(viewInfo) => { }}
//             clearPleaseWait={(layerName) => { }}
//           />
//         </div>
//       </div> */}