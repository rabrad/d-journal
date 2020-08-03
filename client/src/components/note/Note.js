import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactTinyLink } from "react-tiny-link";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Row } from "../shared/GridSystem";
import { getNote } from "../../actions/notes";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import { Title, Card, Divider, Holder, TagContent } from "../shared/Elements";
import { Container } from "../shared/GridSystem";

const Note = () => {
  const noteId = useParams().id;

  const dispatch = useDispatch();

  const { note, loading } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getNote(noteId));
  }, [dispatch, noteId]);
  if (loading) {
    return (
      <Title center large>
        Loading......
      </Title>
    );
  }

  return (
    <>
      <Container>
        {note !== null && (
          <Row center>
            <Grid xl={4} md={6}>
              <Card mb="1rem" mt="1rem" height="350px">
                <Title>{note.title}</Title>
                <Divider gray />
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={1}
                  url={note.link}
                />
                <Divider gray />
                <Holder direction="inherit" justifyContent="center">
                  {note.tags &&
                    note.tags.map((tag) => (
                      <TagContent key={uuidv4()}>{tag}</TagContent>
                    ))}
                </Holder>
              </Card>
            </Grid>
            <Grid md={8}>
              {note.note && (
                <Card background="#334858" color="white">
                  <Title center medium color="white">
                    Note
                  </Title>
                  <Divider />
                  <ReactMarkdown
                    source={note.note}
                    renderers={{ code: CodeBlock }}
                  />
                </Card>
              )}
            </Grid>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Note;
