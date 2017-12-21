import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Field = ({ field, drawSign, round, goToMainScreen }) => {
    const renderRow = (row, keyY) =>
        row.map((cell, keyX) => <Cell key={keyX} cell={cell} keyY={keyY} keyX={keyX} drawSign={drawSign} />);

    return (
        <div className="field">
            <div className="field__additional-info">
                &nbsp;&nbsp;Ход: <b>{round + 1}</b>. Ходит <b>{!!(round % 2) ? 0 : 'x'}</b>
            </div>
            <div>
                {field.map((row, keyY) => (
                    <div className="field__row" key={keyY}>
                        {renderRow(row, keyY)}
                    </div>
                ))}
            </div>

            <div className="field__game-reset-block">
                <button
                    className="btn btn--small btn--link"
                    onClick={() => {
                        goToMainScreen();
                    }}>
                    Прервать игру
                </button>
            </div>
        </div>
    );
};

Field.propTypes = {
    field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(['x', 'o', null]))).isRequired,
    drawSign: PropTypes.func.isRequired,
    round: PropTypes.number.isRequired,
    goToMainScreen: PropTypes.func.isRequired
};

export default Field;
