import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotesList from './NotesList';
import { getNotes } from '../../actions/notes';
import { Title, Divider, Holder } from '../shared/Elements';
import { Row, Container } from '../shared/GridSystem';

const Notes = () => {
  const { notes, loading } = useSelector((state) => state.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <Container>
      {notes !== null && (
        <Holder width='50%' ml='auto' mr='auto'>
          <Title medium center>
            {notes !== null && notes.length === 0
              ? 'There is no notes'
              : 'List of notes'}
          </Title>
          <Divider gray />
        </Holder>
      )}
      <Row>
        {loading && <Title center>loading.....</Title>}
        {notes !== null &&
          notes.length > 0 &&
          notes.map((note) => <NotesList key={note._id} notes={note} />)}
      </Row>
    </Container>
  );
};

export default Notes;
