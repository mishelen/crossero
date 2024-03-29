import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Zero from './zero';
import Cross from './cross';

class Cell extends PureComponent {
    static propTypes = {
        cell: PropTypes.oneOf(['x', 'o', null]).isRequired,
        drawSign: PropTypes.func.isRequired,
        keyX: PropTypes.number.isRequired,
        keyY: PropTypes.number.isRequired
    };

    render() {
        const { cell, drawSign, keyX, keyY } = this.props;
        const sign = cell === 'x' ? <Cross /> : cell === 'o' ? <Zero /> : '';

        return (
            <div className="field__cell" {...(!cell ? { onClick: drawSign(keyY, keyX) } : {})}>
                {sign}
            </div>
        );
    }
}

export default Cell;
