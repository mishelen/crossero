import React, { Component } from 'react';
import Field from './components/Field';
import Entry from './components/Entry';

class App extends Component {
    state = {
        dimension: 3,
        winLength: 3,
        field: [],
        round: 0,
        gameStarted: false
    };

    initializeField = settings => {
        this.setState(
            prevState => {
                const { dimension, winLength } = settings || prevState;
                return {
                    field: Array.from({ length: dimension }, () => Array.from({ length: dimension }, () => null)),
                    ...(settings
                        ? {
                              dimension,
                              winLength
                          }
                        : {})
                };
            },
            () => {
                this.setState({ gameStarted: true });
            }
        );
    };

    startGame = data => {
        this.initializeField(data);
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
        const { field, gameStarted } = this.state;
        const { drawSign, startGame } = this;

        return <div>{gameStarted ? <Field field={field} drawSign={drawSign} /> : <Entry startGame={startGame} />}</div>;
    }
}

export default App;
