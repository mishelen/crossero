import React, { Component } from 'react';
import Field from './components/Field';
import Entry from './components/Entry';

class App extends Component {
    state = {
        dimension: 3,
        winLength: 3,
        field: [],
        round: 0,
        gameStarted: false,
        gameOver: false,
        win: null,
        standoff: false
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

    isGameContinue = (y, x) => {
        const { field, winLength, round } = this.state;
        const sign = !!(round % 2) ? 'x' : 'o';
        const reg = new RegExp(`${sign},${sign}(,${sign}){${winLength - 2},}`);

        const rays = {
            horizontal: [],
            diagonal1: [],
            diagonal2: [],
            vertical: []
        };

        field.forEach((row, keyY) => {
            row.forEach((cell, keyX) => {
                if (Math.abs(keyX - x) < winLength) {
                    if (keyY === y) rays.horizontal.push(cell);
                    if (keyX - x === keyY - y) rays.diagonal1.push(cell);
                    if (keyX - x === y - keyY) rays.diagonal2.push(cell);
                }
                if (Math.abs(keyY - y) < winLength) {
                    if (keyX === x) rays.vertical.push(cell);
                }
            });
        });

        if (
            rays.horizontal.join().search(reg) !== -1 ||
            rays.vertical.join().search(reg) !== -1 ||
            rays.diagonal1.join().search(reg) !== -1 ||
            rays.diagonal2.join().search(reg) !== -1
        ) {
            this.setState({
                gameOver: true,
                win: sign
            });
        } else if (
            // todo check standoff
            false
        ) {
            this.setState({
                gameOver: true,
                standoff: true
            });
        }
    };

    drawSign = (Y, X) => () => {
        this.setState(
            prevState => {
                const { field, round } = prevState;
                const sign = !(round % 2) ? 'x' : 'o';
                return {
                    field: field.map(
                        (row, keyY) => (keyY !== Y ? row : row.map((cell, keyX) => (keyX !== X ? cell : sign)))
                    ),
                    round: round + 1
                };
            },
            () => this.isGameContinue(Y, X)
        );
    };

    render() {
        const { field, gameStarted } = this.state;
        const { drawSign, startGame } = this;

        return <div>{gameStarted ? <Field field={field} drawSign={drawSign} /> : <Entry startGame={startGame} />}</div>;
    }
}

export default App;
