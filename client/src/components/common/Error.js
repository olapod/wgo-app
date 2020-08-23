import React from "react";
import { observer, inject } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@inject('appStore', 'adminStore') 
@observer
class Error extends React.Component {

    render() {
        return (
            <div className="error">
                <FontAwesomeIcon icon={faExclamationTriangle}/>                
                <h4 className="error-title">Błąd. Coś poszło nie tak....</h4>
                <p>Prawdopodobnie wgrano zły format danych.</p>
                <div className='reset'>
                    <Button className='reset_button' onClick={this.props.adminStore.resetAdminPanel} >Spróbuj ponownie</Button>
                </div>
            </div>
        )};

    };
export default Error;