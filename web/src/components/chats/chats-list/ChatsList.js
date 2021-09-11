/* import { useState } from "react"
import { useHistory } from "react-router-dom"
import service from "../../services/users-service"
import './Login.css';
 */
function ChatsList() {

    return (
      <div className="container logged-out text-center">
          <h1>Chat list</h1>
      </div>
    )
  }
  
export default ChatsList

  /* import { Component } from 'react';
import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';

import contactsService from '../../../services/contacts-service';

class ContactList extends Component {

  state = {
    contacts: [],
    isLoading: true
  }

  fetchContacts() {
    contactsService.list()
      .then(contacts => this.setState({ contacts, isLoading: false }))
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      });
  }

  componentDidMount() {
    this.fetchContacts();
  }

  handleDeleteContact(id) {
    contactsService.remove(id)
      .then(() => this.fetchContacts())
      .catch(error => console.error(error));
  }

  handleCreateContact(contact) {
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts]
    }))
  }

  render() {
    const { contacts, isLoading } = this.state;
    return (
      contacts &&
        <>
          
          </div>
            <div className="row mb-2">
              <div className="col">
                <ul className="list-group">
                  {contacts.map(contact =>
                    <li key={contact.id} className="list-group-item list-group-item-action">
                      <ContactItem {...contact} onDeleteContact={(id) => this.handleDeleteContact(id)} />
                    </li>
                </ul>
              </div>
            </div>
          )}
        </>
    );
  }

}

export default ContactList; */