import { css } from "styled-components";

export const sizes = {
  mobile: "600px",
};

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${sizes.mobile}) {
      ${css(...args)}
    }
  `,
};
