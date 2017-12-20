import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Cell extends PureComponent {
    static propTypes = {
        cell: PropTypes.oneOf(['x', 'o', null]).isRequired,
        drawSign: PropTypes.func.isRequired,
        keyX: PropTypes.number.isRequired,
        keyY: PropTypes.number.isRequired
    };

    render() {
        const { cell, drawSign, keyX, keyY } = this.props;

        return (
            <div
                style={{
                    display: 'inline-block',
                    verticalAlign: 'top',
                    width: 45,
                    height: 45,
                    border: '1px solid black'
                }}
                {...(!cell ? { onClick: drawSign(keyY, keyX) } : {})}>
                {cell}
            </div>
        );
    }
}

export default Cell;