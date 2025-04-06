import { css } from "styled-components";

export const sizes = {
  mobile: "600px",
  tablet: "768px",
};

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${sizes.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${sizes.tablet}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (max-width: ${sizes.desktop}) {
      ${css(...args)}
    }
  `,
};
