const React = window.React;
const ReactDOM = window.ReactDOM;
const { Vitessce, VitessceConfig, hconcat, vconcat } = window.vitessce.index;

function MyVitessce() {

    const vc = new VitessceConfig("My example config", "This demonstrates the JavaScript API");
    // Add a dataset and its files.
    const dataset = vc
        .addDataset("Dries")
        .addFile('https://s3.amazonaws.com/vitessce-data/0.0.31/master_release/dries/dries.cells.json', "cells", "cells.json")
        .addFile('https://s3.amazonaws.com/vitessce-data/0.0.31/master_release/dries/dries.cell-sets.json', "cell-sets", "cell-sets.json");
    // Add components.
    // Use mapping: "UMAP" so that cells are mapped to the UMAP positions from the JSON file.
    const umap = vc.addView(dataset, "scatterplot", { mapping: "UMAP" });
    // Use mapping: "t-SNE" so that cells are mapped to the t-SNE positions from the JSON file.
    const tsne = vc.addView(dataset, "scatterplot", { mapping: "t-SNE" });
    // Add the cell sets controller component.
    const cellSetsManager = vc.addView(dataset, "cellSets");
    // Add the cell set sizes bar plot component.
    const cellSetSizesPlot = vc.addView(dataset, "cellSetSizes");
    // Link the zoom levels of the two scatterplots.
    vc.linkViews([umap, tsne], ["embeddingZoom"], [2.5]);
    // Set the layout of components.
    vc.layout(
        vconcat(
            hconcat(tsne, umap),
            hconcat(cellSetsManager, cellSetSizesPlot)
        )
    );
    
    // Convert the configuration to its JSON format before passing to the config prop.
    const config = vc.toJSON();
    
    // See index.html for the height and width CSS which are added to the .vitessce-app element.
    return (
        <div className="vitessce-app">
            <Vitessce theme="light" config={config} />
        </div>
    );
}

function renderMyVitessce() {
    ReactDOM.render(<MyVitessce />, document.getElementById("vitessce"));
}

renderMyVitessce();

// // import myViewConfig from './static/json/human_motor_cortex.json';
// // import * as vitessce from 'vitessce';
// // const myViewConfig = require('./static/json/human_motor_cortex.json');
// // import { Scatterplot, Status } from 'vitessce';
// const React = window.React;
// const ReactDOM = window.ReactDOM;
// const { Vitessce, VitessceConfig, Status, Scatterplot } = window.vitessce.index;

// export default function VitessceApp() {
//   const view = { target: [0, 0, 0], zoom: 0.75 };
//   const mapping = "PCA";
//   const cells = {
//     1: { mappings: { [mapping]: [0, 0] } },
//     2: { mappings: { [mapping]: [1, 1] } },
//     3: { mappings: { [mapping]: [1, 2] } }
//   };
//   const selectedCellIds = new Set();
//   const dimensions = { width: '400px', height: '400px', margin: '10px' };
//   return (
//     <div className="vitessce-container vitessce-theme-light">
//       <div className="card card-body bg-secondary" style={dimensions}>
//         <Status
//           info="Hello world"
//           removeGridComponent={() => { }}
//         />
//       </div>
//       <div className="card card-body bg-secondary" style={dimensions}>
//         <Scatterplot
//           uuid="my-vitessce-scatterplot"
//           view={view}
//           mapping={mapping}
//           cells={cells}
//           selectedCellIds={selectedCellIds}
//           cellColors={null}
//           updateStatus={(message) => { }}
//           updateCellsSelection={(selectedIds) => { }}
//           updateCellsHover={(hoverInfo) => { }}
//           updateViewInfo={(viewInfo) => { }}
//           clearPleaseWait={(layerName) => { }}
//         />
//       </div>
//     </div>
//   );
// }

// function renderMyVitessce() {
//   ReactDOM.render(<VitessceApp />, document.getElementById("vitessce"));
// }
// renderMyVitessce()


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