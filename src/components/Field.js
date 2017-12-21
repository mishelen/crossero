import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Field = ({ field, drawSign }) => {
    const renderRow = (row, keyY) =>
        row.map((cell, keyX) => <Cell key={keyX} cell={cell} keyY={keyY} keyX={keyX} drawSign={drawSign} />);

    return <div className="field">{field.map((row, keyY) => <div key={keyY}>{renderRow(row, keyY)}</div>)}</div>;
};

Field.propTypes = {
    field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(['x', 'o', null]))).isRequired,
    drawSign: PropTypes.func.isRequired
};

export default Field;
