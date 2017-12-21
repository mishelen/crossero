import React, { Component } from 'react';
import Field from './components/Field';
import Entry from './components/Entry';
import Final from './components/Final';

import { checkWin, checkStandOff, takeCellNeighborhood, takeEmptyCells } from './gameLogics';

class App extends Component {
    state = {
        dimension: 3,
        winLength: 3,
        field: [],
        round: 0,
        mainScreen: true,
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
                this.setState({ mainScreen: false, gameOver: false, round: 0 });
            }
        );
    };

    startGame = data => {
        this.initializeField(data);
    };

    goToMainScreen = () => {
        this.setState({ mainScreen: true, gameOver: false });
    };

    isGameContinue = (y, x) => {
        const { field, winLength, round } = this.state;
        const sign = !!(round % 2) ? 'x' : 'o';

        const rays = takeCellNeighborhood(field, winLength, y, x);

        if (checkWin(rays, sign, winLength)) {
            this.setState({
                gameOver: true,
                win: sign
            });
        } else if (checkStandOff(field)) {
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
        const { field, mainScreen, gameOver, standoff, win, winLength, dimension, round } = this.state;
        const { drawSign, startGame, goToMainScreen } = this;

        return (
            <div className="container">
                {!gameOver ? (
                    mainScreen ? (
                        <Entry startGame={startGame} winLength={winLength} dimension={dimension} />
                    ) : (
                        <Field field={field} drawSign={drawSign} goToMainScreen={goToMainScreen} round={round} />
                    )
                ) : (
                    <Final standoff={standoff} win={win} gotoMainScreen={goToMainScreen} replay={startGame} />
                )}
            </div>
        );
    }
}

export default App;
