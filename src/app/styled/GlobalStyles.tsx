import { createGlobalStyle, css } from 'styled-components/macro'

type TMode = 'light' | 'dark'

const common = css`
  --color-purple: #4e63d2;
  --color-blue: #4099f7;
  --color-red: #dc524c;
  --color-green: #7bb86f;
  --color-yellow: #f8cd76;
  --color-emerald: #52a899;
  --color-white: #fff;
`

const dark = css`
  --color-bg-1: #000000;
  --color-bg-2: #1c1c1e;
  --color-bg-3: rgba(255, 255, 255, 0.09);
  --color-bg-4: #706f76;

  --color-text-1: #ffffff;
  --color-text-2: #eeeeee;
  --color-text-3: #99989f;

  --color-purple-light: #7285e9;

  --color-border-1: rgba(255, 255, 255, 0.07);

  --color-modal: rgba(28, 28, 30, 0.94);
  --color-modal-outline: rgba(255, 255, 255, 0.1);
`

const light = css`
  --color-bg-1: #ecebf7;
  --color-bg-2: #f3f2fe;
  --color-bg-3: #bbbbc4;
  --color-bg-4: #a9a2f9;
  --color-bg-5: #514e78;

  --color-text-1: #000000;
  --color-text-2: #333333;
  --color-text-3: #4e4d52;
  --color-text-4: #eeeeee;
  --color-text-5: #99989f;

  --color-purple-light: #4e63d2;

  --color-border-1: rgba(0, 0, 0, 0.07);

  --color-modal: rgba(247, 245, 246, 0.94);
  --color-modal-outline: rgba(0, 0, 0, 0.1);
`

export const modalBackground = css`
  background: var(--color-modal);
  backdrop-filter: blur(50px) saturate(5);
`
export const modalShadow = css`
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%), 0 0 0 1px var(--color-modal-outline);
`

const scrollbars = css`
  /* firefox */

  scrollbar-width: thin;
  scrollbar-color: var(--color-bg-4) var(--color-bg-2);

  /* width */

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: var(--color-bg-3);
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: var(--color-bg-3);
    border-radius: 5px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(112, 111, 118, 0.7);
  }
`

const GlobalStyles = createGlobalStyle<{ mode: TMode }>`
  ${scrollbars}
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", Inter;

    /* font-family: Inter, Open-Sans, Helvetica, Sans-Serif; */
    -webkit-font-smoothing: antialiased;
    /* min-width: 1024px; */
    background-color: var(--color-bg-1);

    ${common}
    ${(props) => (props.mode === 'dark' ? dark : light)}

  }

  #root {
    height: 100%;
    overflow-y: hidden;

  }

  .ant-upload-wrapper {
    flex: auto !important
  }
`

export default GlobalStyles
