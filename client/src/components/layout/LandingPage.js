import React from 'react';
import styled from 'styled-components';

import { Container, Row, Grid } from '../shared/GridSystem';
import Auth from '../auth/Auth';
import { Holder, Paragraph, Title, Card } from '../shared/Elements';

import iconWrit from '../../assets/icon-write.svg';
import iconSend from '../../assets/icon-send.svg';
import iconFind from '../../assets/icon-find.svg';

const LandingPageContainer = styled.div`
  min-height: 60%;
`;

const LandingBottomContainer = styled.div`
  background-image: url('./images/wave-bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: ${({ mt }) => mt};
  }
`;

const ColoredIcon = styled.img`
  margin: 0.8rem 0;
`;

const LandingPage = () => {
  return (
    <>
      <LandingPageContainer>
        <Container>
          <Row>
            <Grid md={6}>
              <Holder justifyContent='center' padding='0 3rem 0 0' p_md='0'>
                <Title large ml='0rem'>
                  Welcome to your journal!
                </Title>
                <Paragraph color='#334858' lh='1.5'>
                  It's your own notebook, you can add external links or notes to
                  yourself, and place snippets in unique cells so they’re easy
                  to discover.
                </Paragraph>
              </Holder>
            </Grid>

            <Grid md={6}>
              <Holder
                height='500px'
                alignItems='center'
                height_sm='100%'
                padding='0 0 0 6rem '
                p_md='0'>
                <Auth />
              </Holder>
            </Grid>
          </Row>
        </Container>
      </LandingPageContainer>

      <LandingBottomContainer mt='4rem'>
        <Container>
          <Row>
            <Grid md={4} sm={6}>
              <Card mb='1rem' textAlign='center'>
                <ColoredIcon src={iconWrit} alt='Write' />
                <Paragraph mt='3rem' lh='1.5'>
                  Save links, comments and snippets, so you can come back later
                  for review.
                </Paragraph>
              </Card>
            </Grid>
            <Grid md={4} sm={6}>
              <Card mb='1rem' textAlign='center'>
                <ColoredIcon src={iconSend} alt='Send' />
                <Paragraph mt='3rem' lh='1.5'>
                  Set up a reminder and get a notification by email, so you get
                  back to read more about the interesting topic.
                </Paragraph>
              </Card>
            </Grid>
            <Grid md={4} sm={6}>
              <Card mb='1rem' textAlign='center'>
                <ColoredIcon src={iconFind} alt='Find' />
                <Paragraph mt='3rem' lh='1.5'>
                  Add tags to your notes, so you can search them easily later.
                </Paragraph>
              </Card>
            </Grid>
          </Row>
        </Container>
      </LandingBottomContainer>
    </>
  );
};

export default LandingPage;
