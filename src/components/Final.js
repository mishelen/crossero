import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Final extends PureComponent {
    static propTypes = {
        standoff: PropTypes.bool.isRequired,
        win: PropTypes.string.isRequired,
        gotoMainScreen: PropTypes.func.isRequired,
        replay: PropTypes.func.isRequired
    };

    render() {
        const { standoff, win, gotoMainScreen, replay } = this.props;

        return (
            <div>
                <h1>{standoff ? 'Эта борьба окончилась ничьей!' : `Победили ${win}`}</h1>
                <hr />
                <button
                    onClick={() => {
                        gotoMainScreen();
                    }}>
                    Главное меню
                </button>
                &nbsp;|&nbsp;
                <button
                    onClick={() => {
                        replay();
                    }}>
                    Переиграть
                </button>
            </div>
        );
    }
}

export default Final;
