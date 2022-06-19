import { Spin } from "antd";
import styled from "styled-components";

const LoadingPage = ({ visible }) => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};

const Container = styled.div`
  //text-align: center;
  //line-height: 844px;
  /* position: absolute;
  top: 48%;
  left: 48%; */
  display: none;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  color: #fff;
  font-size: 3rem;
  text-align: center;
  line-height: 80vh;

  background-color: rgba(255, 255, 255, 1);
`;

export default LoadingPage;
