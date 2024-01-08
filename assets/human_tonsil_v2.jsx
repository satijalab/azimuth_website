const React = window.React;
const ReactDOM = window.ReactDOM;
const { Vitessce } = window.vitessce.index;
import myViewConfig from 'json/human_tonsil_v2.json';

function MyVitessce() {
    return (
        <div className="vitessce-app">
            <Vitessce
                config={myViewConfig}
                height={800}
                theme="dark"
            />
        </div>
    );
}

function renderMyVitessce() {
    ReactDOM.render(<MyVitessce />, document.getElementById("vitessce"));
}

renderMyVitessce();
