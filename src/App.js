import React, {Component} from 'react';

class App extends Component {
    
    state = {
        fields: [
            ['x', 0, 0],
            [0, 'x', 0],
            [0, 0, 'x']
        ],
        round: 0
    };
    
    renderField = () => {
        const {fields} = this.state;
        return fields.map(row => <div>{row.map(
            cell => <span>{cell}</span>
        )}</div>)
        
    };
    
    render() {
        return (
            <div>
                {this.renderField()}
            </div>
        );
    }
}

export default App;

