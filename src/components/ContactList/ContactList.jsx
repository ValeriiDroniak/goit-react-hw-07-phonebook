import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { Contact } from 'components/Contact';
import { ContactItems } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const getFilteredContacts = () =>
    filter
      ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
      : contacts;

  return (
    <ContactItems>
      {getFilteredContacts().map(({ name, number, id }) => {
        return <Contact key={id} id={id} name={name} number={number} />;
      })}
    </ContactItems>
  );
};
