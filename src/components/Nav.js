import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faMinus, faMusic, faTimes } from '@fortawesome/free-solid-svg-icons';

const Nav = ({setLibraryStatus, libraryStatus}) => {

    return (
        <nav>
            <h1>Music Player</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library {libraryStatus? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faMusic}/>}
            </button>
        </nav>
    )
}

export default Nav;
