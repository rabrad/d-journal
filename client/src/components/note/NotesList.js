import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Popup from "reactjs-popup";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../shared/GridSystem";
import { deleteNote, getCurrent, setReminder } from "../../actions/notes";
import {
  Title,
  Card,
  Icon,
  Holder,
  TagContent,
  Button,
  Divider,
} from "../shared/Elements";
import { GridButtons } from "../shared/FormGroup";

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledPopup = styled(Popup)`
  /* use your custom style for ".popup-overlay" */
  &-overlay {
  }

  &-content {
    padding: 1rem !important;
    display: flex !important;
    justify-content: center !important;
    @media (min-width: 576px) {
      width: 50% !important;
    }
    @media (max-width: 576px) {
      width: 60% !important;
    }
  }
`;

const NotesList = ({ notes }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth.user);

  const { title, tags, _id, user } = notes;

  return (
    <Grid xl={4} md={6}>
      <Card mb="1rem">
        {userAuth && user === userAuth._id && (
          <>
            <Icon
              mr="1rem"
              className="far fa-trash-alt"
              onClick={() => dispatch(deleteNote(_id))}
            />
            <Icon
              className="fas fa-edit"
              onClick={() => {
                dispatch(getCurrent(notes));
                history.push("/createNote");
              }}
            />
          </>
        )}
        <LinkStyled to={`note/${_id}`}>
          <Title>{title}</Title>
          <Divider gray />
          <Holder direction="inherit" justifyContent="left">
            {tags &&
              tags.map((tag) => <TagContent key={uuidv4()}>{tag}</TagContent>)}
          </Holder>
        </LinkStyled>
        <Divider gray />
        <Holder direction="inherent">
          <GridButtons>
            <LinkStyled to={`note/${_id}`}>
              <Button>More info</Button>
            </LinkStyled>
            <StyledPopup trigger={<Button>Reminder</Button>} modal>
              {(close) => (
                <>
                  <Button
                    medium
                    onClick={() => {
                      dispatch(
                        setReminder(
                          {
                            reminder: moment().add(1, "d")._d,
                            kindOfReminder: "daily",
                          },
                          _id
                        )
                      );
                      close();
                    }}
                  >
                    1D
                  </Button>
                  <Button
                    medium
                    onClick={() => {
                      dispatch(
                        setReminder(
                          {
                            reminder: moment().add(1, "w")._d,
                            kindOfReminder: "weekly",
                          },
                          _id
                        )
                      );
                      close();
                    }}
                  >
                    1W
                  </Button>
                  <Button
                    medium
                    onClick={() => {
                      dispatch(
                        setReminder(
                          {
                            reminder: moment().add(1, "m")._d,
                            kindOfReminder: "monthly",
                          },
                          _id
                        )
                      );
                      close();
                    }}
                  >
                    1M
                  </Button>
                  <Button
                    medium
                    onClick={() => {
                      dispatch(
                        setReminder(
                          {
                            reminder: moment().add(1, "y")._d,
                            kindOfReminder: "yearly",
                          },
                          _id
                        )
                      );
                      close();
                    }}
                  >
                    1Y
                  </Button>
                </>
              )}
            </StyledPopup>
          </GridButtons>
        </Holder>
      </Card>
    </Grid>
  );
};

export default NotesList;
