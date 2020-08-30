import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import './NotFoundPage.scss';

const NotFoundPage = () => (
    <div className='not_found_container'>
        <h1>Błąd 404. Nie znaleziono strony...</h1>
        <FontAwesomeIcon
			icon={faExclamationTriangle}
            style={{color: 'red', fontSize: 80, textAlign: 'center'}}
        />
    </div>
    );

export default NotFoundPage;