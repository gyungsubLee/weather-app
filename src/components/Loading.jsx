import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Preloader>
      <CloudSvg viewBox="0 0 10 10" width="80" height="80">
        <path
          fill="none"
          d="M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z"
        />
      </CloudSvg>

      <Rain>
        {[...Array(10)].map((_, i) => (
          <Drop key={i} index={i + 1} />
        ))}
      </Rain>

      <Text>Loading ...</Text>
    </Preloader>
  );
};

const Preloader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -55px;
  margin-top: -70px;
  width: 110px;
  height: 110px;
  opacity: 1;
`;

const CloudSvg = styled.svg`
  width: 100px;
  height: 100px;
  z-index: 2;

  path {
    stroke: #9ea1a4;
    stroke-width: 0.25;
    fill: #ffffff;
  }
`;

const rainAnimation = keyframes`
  50% {
    height: 45px;
    opacity: 0;
  }
  51% {
    opacity: 0;
  }
  100% {
    height: 1px;
    opacity: 0;
  }
`;

const Rain = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  margin-top: -30px;
  margin-left: 12px;
`;

const Drop = styled.span`
  display: block;
  float: left;
  width: 3px;
  height: 10px;
  margin-left: 4px;
  border-radius: 0 0 6px 6px;
  background: #fff;
  opacity: 1;

  animation: ${rainAnimation} 350ms infinite;
  animation-delay: ${({ index }) => `-${130 + (index - 1) * 110}ms`};
`;

const Text = styled.div`
  font-family: Helvetica, "Helvetica Neue", sans-serif;
  letter-spacing: 1px;
  text-align: center;
  margin-left: -43px;
  font-weight: bold;
  margin-top: 20px;
  font-size: 11px;
  color: var(--font-color-light);
  width: 200px;
`;

export default Loading;
