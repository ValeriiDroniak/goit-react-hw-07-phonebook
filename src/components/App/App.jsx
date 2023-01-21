import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import { Section, Title } from './App.styled';

const override = {
  display: 'block',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  background: '#dedede',
  zIndex: '1500',
};

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section bg="#4165f5">
        <Title>Phonebook</Title>
        <ContactForm />
      </Section>
      <Section bg="#4165f5">
        <Title as="h2">Contacts</Title>
        <Filter />
        <ContactList />
      </Section>
      {isLoading && !error && (
        <BarLoader
          cssOverride={override}
          loading={isLoading}
          color=" #07bc0c "
          height={4}
          aria-label="Loading Spinner"
          speedMultiplier={0.5}
        />
      )}
    </>
  );
};
