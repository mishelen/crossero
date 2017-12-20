import React, { PureComponent } from 'react';

class Final extends PureComponent {
    static propTypes = {
        standoff: PropTypes.bool.isRequired,
        win: PropTypes.string.isRequired
    };

    render() {
        const { standoff, win } = this.props;

        return (
            <div>
                <h1>{standoff ? 'Эта борьба окончилась ничьей!' : `Победили ${win}`}</h1>
                <hr />
                <button>Главное меню</button>
                <button>Переиграть</button>
            </div>
        );
    }
}

export default Final;
