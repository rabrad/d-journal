import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Title, Card, Paragraph } from "../shared/Elements";
import { Row, Container } from "../shared/GridSystem";
import { getReminderNotes } from "../../actions/notes";
import ReviewNoteList from "./ReviewNoteList";

const ReviewNote = () => {
  const dispatch = useDispatch();
  const { reminderNotes, loading } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getReminderNotes());
  }, [dispatch]);
  if (loading) {
    return (
      <Title center large>
        Loading......
      </Title>
    );
  }

  return (
    <>
      <>
        {reminderNotes !== null && reminderNotes.length === 0 && (
          <Container>
            <Card mt="2rem">
              <Title center medium>
                There is no notes to review today.
              </Title>
              <Paragraph mt="2rem">
                You can check your notes list and set a reminder for selected
                notes for later review.
              </Paragraph>
            </Card>
          </Container>
        )}
      </>
      <Row center>
        {reminderNotes !== null &&
          reminderNotes.length > 0 &&
          reminderNotes.map((note) => (
            <ReviewNoteList note={note} key={note._id} />
          ))}
      </Row>
    </>
  );
};

export default ReviewNote;
