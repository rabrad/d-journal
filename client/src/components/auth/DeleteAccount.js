import React from 'react';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUser } from '../../actions/auth';
import { Container, Row, Grid } from '../shared/GridSystem';
import { Card } from '../shared/Elements';
import { Button, Paragraph, Title } from '../shared/Elements';
import styled from 'styled-components';

const SingleDiv = styled.div`
  padding: 2rem 1rem;
`;

const DeleteAccountPopup = styled(Popup)`
  &-content {
    padding: 1rem !important;
    display: flex !important;
    justify-content: center !important;
    @media (max-width: 768px) {
      width: 90% !important;
    }
  }
`;

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const location = useHistory();

  const handleClick = () => {
    dispatch(deleteUser());
    location.push('/');
  };

  return (
    <Container>
      <Row center>
        <Grid md={6}>
          <Card mt='2rem'>
            <Paragraph mb='1rem'>
              Hi, you can delete your account here
            </Paragraph>
            <DeleteAccountPopup
              trigger={<Button small> Delete Account </Button>}
              modal>
              {(close) => (
                <SingleDiv>
                  <Title medium>
                    {' '}
                    Are you sure you want to delete your account?{' '}
                  </Title>
                  <Paragraph mb='1rem'>
                    Deleting your account is permanent and will remove all Notes
                    that you made so far. Are you sure you want to delete your
                    account?.
                  </Paragraph>
                  <div>
                    <Button onClick={handleClick} red small>
                      Delete Account
                    </Button>
                    <Button
                      onClick={() => {
                        close();
                      }}
                      small>
                      Cancel
                    </Button>
                  </div>
                </SingleDiv>
              )}
            </DeleteAccountPopup>
          </Card>
        </Grid>
      </Row>
    </Container>
  );
}
