import React, { useState } from 'react';

const ContactPicker = () => {
    const [ contacts, setContacts ] = useState([]);

    const handlePickContacts = async () => {
        try
        {
            const props = [ 'name', 'email', 'tel' ];
            const opts = { multiple: true };

            if ('contacts' in navigator && 'ContactsManager' in window)
            {
                const selectedContacts = await navigator.contacts.select(props, opts);
                setContacts(selectedContacts);
            } else
            {
                alert('Contact Picker API is not supported in this browser.');
            }
        } catch (error)
        {
            console.error('Error picking contacts:', error);
        }
    };

    return (
        <div>
            <button onClick={ handlePickContacts }>Pick Contacts</button>
            { contacts.length > 0 && (
                <div>
                    <h3>Selected Contacts:</h3>
                    <ul>
                        { contacts.map((contact, index) => (
                            <li key={ index }>
                                <p>Name: { contact.name.join(', ') }</p>
                                { contact.email && <p>Email: { contact.email.join(', ') }</p> }
                                { contact.tel && <p>Phone: { contact.tel.join(', ') }</p> }
                            </li>
                        )) }
                    </ul>
                </div>
            ) }
        </div>
    );
};

export default ContactPicker;