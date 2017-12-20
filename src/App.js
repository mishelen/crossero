import React, { Component } from 'react';
import Field from './Field';

class App extends Component {
    state = {
        field: [['x', null, 'o'], ['o', null, 'o'], [null, 'o', null]],
        round: 0
    };

    drawSign = (Y, X) => () => {
        this.setState(prevState => {
            const { field, round } = prevState;
            const sign = !(round % 2) ? 'x' : 'o';
            return {
                field: field.map(
                    (row, keyY) => (keyY !== Y ? row : row.map((cell, keyX) => (keyX !== X ? cell : sign)))
                ),
                round: round + 1
            };
        });
    };

    render() {
        const { field } = this.state;

        return (
            <div>
                <Field field={field} drawSign={this.drawSign} />
            </div>
        );
    }
}

export default App;
