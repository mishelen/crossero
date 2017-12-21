export function takeCellNeighborhood(matrix, neighborhood, y, x) {
    const rays = {
        horizontal: [],
        diagonal1: [],
        diagonal2: [],
        vertical: []
    };

    matrix.forEach((row, keyY) => {
        row.forEach((cell, keyX) => {
            if (Math.abs(keyX - x) < neighborhood) {
                if (keyY === y) rays.horizontal.push(cell);
                if (keyX - x === keyY - y) rays.diagonal1.push(cell);
                if (keyX - x === y - keyY) rays.diagonal2.push(cell);
            }
            if (Math.abs(keyY - y) < neighborhood) {
                if (keyX === x) rays.vertical.push(cell);
            }
        });
    });

    return rays;
}

export function takeEmptyCells(matrix) {
    const array = [];
    matrix.forEach((row, keyY) => {
        row.forEach((cell, keyX) => {
            if (cell === null) array.push({ keyY, keyX });
        });
    });

    return array;
}

export function checkWin(rays, sign, winLength) {
    const reg = new RegExp(`${sign},${sign}(,${sign}){${winLength - 2},}`);

    if (
        rays.horizontal.join().search(reg) !== -1 ||
        rays.vertical.join().search(reg) !== -1 ||
        rays.diagonal1.join().search(reg) !== -1 ||
        rays.diagonal2.join().search(reg) !== -1
    ) {
        return true;
    }
    return false;
}

export function checkStandOff(matrix) {
    const cells = takeEmptyCells(matrix);
    // todo checking
    //for (let i = 0; i <= cells.length; ++i) {
    //    const rays = takeCellNeighborhood(cells[i]);
    //}
    return false;
}
