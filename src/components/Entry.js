import React, { PureComponent } from 'react';

class Entry extends PureComponent {
    render() {
        return (
            <div>
                <h1>
                    Привет,<br />
                    <small>
                        зарубим в <b>крестики-нолики</b>?
                    </small>
                </h1>
                <hr />

                <button>Но только в большие!</button>
                <button>Давай</button>
            </div>
        );
    }
}

export default Entry;
