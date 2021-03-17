// import myViewConfig from './static/json/human_motor_cortex.json';
const myViewConfig = require('./static/json/human_motor_cortex.json');
import * as vitessce from 'vitessce'

export default function VitessceApp() {
    return (
        <vitessce.Vitessce
            config={myViewConfig}
            height={800}
            theme="dark"
        />
    );
}

ReactDOM.render(React.createElement(VitessceApp),
    document.getElementById("vitessce"));