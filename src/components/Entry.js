import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Entry extends PureComponent {
    static propTypes = {
        startGame: PropTypes.func.isRequired
    };

    state = {
        custom: false,
        dimension: 5,
        winLength: 5
    };

    showSettings = () => {
        this.setState({ custom: true });
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
        if (winLength > dimension) return;
        // todo

        this.props.startGame({ dimension, winLength });
    };

    onStart = () => {
        this.props.startGame();
    };

    render() {
        const { custom, dimension, winLength } = this.state;

        return (
            <div>
                <h1>
                    Привет,<br />
                    <small>
                        зарубим в <b>крестики-нолики</b>?
                    </small>
                </h1>
                <hr />
                <button onClick={this.showSettings}>Но только в большие!</button>
                &nbsp;|&nbsp;
                <button onClick={this.onStart}>Давай</button>
                {custom && (
                    <form onSubmit={this.onSubmit}>
                        <input name="dimension" value={dimension} type="number" onChange={this.onChange} />
                        <input name="winLength" value={winLength} type="number" onChange={this.onChange} />
                        <input type="submit" value="Самое-то" />
                    </form>
                )}
            </div>
        );
    }
}

export default Entry;
