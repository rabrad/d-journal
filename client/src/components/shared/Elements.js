import styled from 'styled-components';

export const Divider = styled.div`
  background: ${(props) => {
    if (props.dark) {
      return `#343a40;`;
    } else if (props.gray) {
      return `#6c757d33;`;
    } else if (props.info) {
      return `#17a2b8;`;
    } else if (props.primary) {
      return `#2D9CDB;`;
    } else {
      return '#BDBDBD';
    }
  }};
  width: 100%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 1px;
  border-radius: 10px;
`;

export const Button = styled.button`
  ${({ darkGray, red, gray, joustBlue }) => {
    if (darkGray) {
      return `background-color:rgba(0,0,0,.75);;
           color:white;`;
    } else if (red) {
      return `background-color:#e84118;
            color:white;`;
    } else if (gray) {
      return `background-color:gray;
            color:white;`;
    } else if (joustBlue) {
      return `
            background-color:#54a0ff;
            color:black;
            `;
    } else {
      return `background-color:#2D9CDB;
         color:white;`;
    }
  }};

  ${({ active }) => active && ' background: rgba(0, 0, 0, 0.3);'};
  border: none;
  border-radius: 20px;
  padding: 10px;
  margin: ${({ margin }) => (margin ? margin : '0.5rem 0.25rem ')};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  outline: none;

  width: ${({ small, medium }) => {
    if (small) {
      return '145px';
    } else if (medium) {
      return '200px';
    } else {
      return '100%';
    }
  }};

  overflow: hidden;

  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize};
  position: relative;
  z-index: 1;

  float: ${({ right }) => right && 'right'};

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: -1;
    transition: 300ms ease-in;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: right;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  display: ${({ display }) => (display ? display : 'inline-block')};
  margin: ${({ margin }) => margin};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  position: relative;
  padding: 1.2rem;
  width: 100%;
  background: ${({ background }) => background};
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.19), 0 0px 7px rgba(0, 0, 0, 0.23);
  text-align: ${({ textAlign }) => textAlign};
  height: ${({ height }) => height};
  color: ${({ color }) => color};
  overflow-y: ${({ scroll }) => scroll && 'scroll'};
`;

export const Title = styled.p`
  text-align: ${({ center }) => center && 'center'};
  margin: 0.5rem;
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  font-size: ${({ medium, large }) => {
    if (medium) {
      return '1.5rem';
    } else if (large) {
      return '2.5rem';
    }
  }};
  color: ${({ color }) => color};
`;

export const Image = styled.img`
  width: 100%;
  height: ${({ height }) => height};
  border-radius: ${({ rounded }) => rounded && '50%'};
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${(props) => props.height};
  margin: 1rem 0 1rem 0;
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  justify-content: ${({ justifyContent }) => justifyContent};
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ background }) => background};
  padding: ${({ padding }) => (padding ? padding : '1rem')};
  align-items: ${({ alignItems }) => alignItems};

  @media (max-width: 576px) {
    width: 100%;
    height: ${({ height_sm }) => height_sm};
    margin-top: ${({ mt_xs }) => mt_xs};
  }

  @media (min-width: 576px) {
    margin-top: ${({ mt_sm }) => mt_sm};
    margin-bottom: ${({ mb_sm }) => mb_sm};
  }
  @media (min-width: 768px) {
    margin-top: ${({ mt_md }) => mt_md};
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }

  @media (max-width: 768px) {
    padding: ${({ p_md }) => p_md};
  }
`;

export const Icon = styled.i`
  font-size: ${({ size }) => size};
  cursor: pointer;
  float: ${({ float }) => float};
  color: ${({ color }) => color};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
`;

export const Paragraph = styled.p`
  margin: 0 0.3rem;
  text-align: left;
  color: ${({ color }) => color};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  line-height: ${({ lh }) => lh};
`;

export const TagContent = styled.div`
  margin-right: 10px;
  border: 1px solid #004c7f;
  padding: 5px;
  border-radius: 6px;
  font-size: 15px;
`;

export const CloseIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: -4px;
  font-size: 23px;
`;
