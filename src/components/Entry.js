import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Entry extends PureComponent {
    static propTypes = {
        startGame: PropTypes.func.isRequired,
        dimension: PropTypes.number.isRequired,
        winLength: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultGame: true,
            dimension: props.dimension,
            winLength: props.winLength
        };
    }

    showSettings = () => {
        this.setState({ defaultGame: false });
    };

    onChange = event => {
        event.preventDefault();
        const { target: { name, value } } = event;
        this.setState({
            [name]: Number(value)
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const { dimension, winLength } = this.state;
        if (winLength > dimension) {
            return;
        }
        // todo

        this.props.startGame({ dimension, winLength });
    };

    onReset = event => {
        event.preventDefault();
        // todo reset
        this.setState({ defaultGame: true });
    };

    onStart = () => {
        this.props.startGame();
    };

    render() {
        const { defaultGame, dimension, winLength } = this.state;

        return (
            <div className="entry">
                <h1>
                    Привет,<br />
                    <small>
                        зарубим в <b>крестики-нолики</b>?
                    </small>
                </h1>
                <hr />

                {defaultGame ? (
                    <div>
                        <button onClick={this.showSettings}>Но только в большие!</button>
                        &nbsp;|&nbsp;
                        <button onClick={this.onStart}>Давай</button>
                    </div>
                ) : (
                    <form className="custom-game-form" onSubmit={this.onSubmit} onReset={this.onReset}>
                        <label htmlFor="dimension_input">Размер поля, n×n</label>
                        <input
                            className="custom-game-form__input"
                            id="dimension_input"
                            name="dimension"
                            value={dimension}
                            type="number"
                            onChange={this.onChange}
                        />
                        <label htmlFor="winLength_input">Длина победной линии</label>
                        <input
                            id="winLength_input"
                            className="custom-game-form__input"
                            name="winLength"
                            value={winLength}
                            type="number"
                            onChange={this.onChange}
                        />
                        <input className="custom-game-form__submit btn" type="submit" value="Самое-то" />
                        <input
                            className="custom-game-form__submit btn"
                            type="reset"
                            value="×"
                            title="Сбросить к умолчаниям"
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default Entry;
