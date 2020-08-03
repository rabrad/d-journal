import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactTinyLink } from 'react-tiny-link';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Grid } from '../shared/GridSystem';
import { setReminder, updateNote } from '../../actions/notes';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import {
  Title,
  Card,
  Divider,
  Holder,
  Button,
  TagContent,
  Icon,
} from '../shared/Elements';

const ReviewNoteList = ({ note: { note, tags, title, link, _id } }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid xl={4} md={6}>
        <Card mb='1rem' mt='1rem' height='560px'>
          <Title>{title}</Title>
          <Divider gray />
          <ReactTinyLink
            cardSize='small'
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={link}
          />
          <Divider gray />
          <Holder direction='inherit' justifyContent='left'>
            {tags &&
              tags.map((tag) => <TagContent key={uuidv4()}>{tag}</TagContent>)}
          </Holder>
          <Divider gray />
          <Title left>Set reminder</Title>
          {/* <Divider gray /> */}
          <Holder
            direction='inherit'
            justifyContent='space-between'
            padding='0'>
            <Button
              margin='0rem 0.25rem'
              small
              onClick={() =>
                dispatch(
                  setReminder(
                    {
                      reminder: moment().add(1, 'd')._d,
                      kindOfReminder: 'daily',
                    },
                    _id
                  )
                )
              }>
              1D
            </Button>
            <Button
              margin='0rem 0.25rem'
              small
              onClick={() =>
                dispatch(
                  setReminder(
                    {
                      reminder: moment().add(1, 'w')._d,
                      kindOfReminder: 'weekly',
                    },
                    _id
                  )
                )
              }>
              1W
            </Button>
            <Button
              margin='0rem 0.25rem'
              small
              onClick={() =>
                dispatch(
                  setReminder(
                    {
                      reminder: moment().add(1, 'm')._d,
                      kindOfReminder: 'monthly',
                    },
                    _id
                  )
                )
              }>
              1M
            </Button>
            <Button
              margin='0rem 0.25rem'
              small
              onClick={() =>
                dispatch(
                  setReminder(
                    {
                      reminder: moment().add(1, 'y')._d,
                      kindOfReminder: 'yearly',
                    },
                    _id
                  )
                )
              }>
              1Y
            </Button>
          </Holder>
          <Button
            margin='2rem 0.25rem 0  0.25rem'
            gray
            small
            onClick={() =>
              dispatch(updateNote({ displayReminderNote: false }, _id, true))
            }>
            <Icon mr='0.5rem' className='fas fa-archive' />
            Archive
          </Button>
        </Card>
      </Grid>

      {note && (
        <Grid md={6}>
          <Card
            background='#334858'
            color='white'
            mt='1rem'
            height='560px'
            scroll>
            <Title center medium color='white'>
              Note
            </Title>
            <Divider />
            <ReactMarkdown source={note} renderers={{ code: CodeBlock }} />
          </Card>
        </Grid>
      )}
    </>
  );
};

export default ReviewNoteList;
