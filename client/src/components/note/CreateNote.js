import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import { Form, Input, Label, InputHolder } from '../shared/FormGroup';
import { Divider, Button, Icon, Holder, Title } from '../shared/Elements';
import { Row, Grid, Container } from '../shared/GridSystem';
import { addNote, updateNote, clearCurrent } from '../../actions/notes';
import { setAlert } from '../../actions/alert';
import { useHistory } from 'react-router-dom';

const MarkdownInput = styled.textarea`
  height: 250px;
  padding: 1rem;
  background: none;
  border: none;
  outline: none;
  color: white;
  border-bottom: 1px solid white;
  &::placeholder {
    color: white;
  }
`;

const CreateNote = () => {
  const { current } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: '',
    link: '',
    note: '',
    tags: '',
  });

  const history = useHistory();

  const { title, note, link, tags } = input;

  const onChangeCreateNoteHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const noteFormData = { title, link, note, tags };

  const onSubmitCreatNoteFormHandler = (e) => {
    e.preventDefault();

    if (current) {
      dispatch(updateNote(noteFormData, current._id));
      dispatch(clearCurrent());
    } else {
      if (title.trim() === '' || link.trim() === '' || tags.trim() === '') {
        return dispatch(setAlert(' All fields are required', 'danger'));
      }
      dispatch(addNote(noteFormData));
    }
    history.push('/notes');
  };

  useEffect(() => {
    if (current) {
      setInput({
        title: current.title,
        link: current.link,
        note: current.note,
        tags: current.tags,
      });
    }
  }, [current]);

  return (
    <>
      <Container>
        <Row center>
          <Grid md={6}>
            <Form onSubmit={onSubmitCreatNoteFormHandler} background='#334858'>
              <Title medium color='white' center>
                {current ? 'Update note' : 'New Note'}
              </Title>
              <Divider />
              <InputHolder>
                <Input
                  color='white'
                  name='title'
                  value={title}
                  onChange={onChangeCreateNoteHandler}
                  required
                />
                <Label color='#fff'>Title</Label>
              </InputHolder>
              <InputHolder>
                <Input
                  color='white'
                  name='link'
                  value={link}
                  onChange={onChangeCreateNoteHandler}
                  required
                />
                <Label color='#fff'>Link</Label>
              </InputHolder>
              <InputHolder>
                <Input
                  color='white'
                  name='tags'
                  value={tags}
                  onChange={onChangeCreateNoteHandler}
                  required
                />
                <Label color='#fff'>Tags</Label>
                <small>
                  Please use comma separated tags (eg. HTML,CSS,JavaScript,PHP)
                </small>
              </InputHolder>

              <MarkdownInput
                name='note'
                rows='3'
                value={note}
                onChange={onChangeCreateNoteHandler}
                placeholder='Markdown'
              />

              <Button small>
                <Icon
                  mr='0.25rem'
                  className={`fas ${current ? 'fa-edit' : 'fa-save'}`}
                />
                {current ? 'Update' : 'Save'}
              </Button>
              {current && (
                <Button
                  small
                  gray
                  onClick={() => {
                    dispatch(clearCurrent());
                    history.push('/notes');
                  }}>
                  Cancel
                </Button>
              )}
            </Form>
          </Grid>
          {note && (
            <Grid md={6}>
              <Holder background='#334858' color='white' borderRadius='7px'>
                <Title center medium color='white'>
                  Markdown Editor
                </Title>
                <Divider />
                <ReactMarkdown source={note} renderers={{ code: CodeBlock }} />
              </Holder>
            </Grid>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CreateNote;
