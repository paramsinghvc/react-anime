<!-- PROJECT SHIELDS -->

[![Build Status][build-shield]]()
[![MIT License][license-shield]][license-url]
[![Contributors][contributors-shield]]()
<img src="https://img.badgesize.io/paramsinghvc/redux-hooks/master/dist/index.js?compression=gzip&label=gzip+size&max=3000&softmax=2000">
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/paramsinghvc/redux-hooks">
    <img src="https://user-images.githubusercontent.com/4329912/57970576-72d80a00-79a0-11e9-81c3-57465a997044.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">useRedux React Hook</h3>

  <p align="center">
    Making redux easy to use with React Hooks Api
    <br />
    <a href="https://www.npmjs.com/package/@mollycule/redux-hook"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://codesandbox.io/s/typescript-redux-3bb54?fontsize=14">View Demo</a>
    ·
    <a href="https://github.com/paramsinghvc/redux-hooks/issues">Report Bug</a>
    ·
    <a href="https://github.com/paramsinghvc/redux-hooks/issues">Request Feature</a>
    .
    <a href="https://www.npmjs.com/package/@mollycule/redux-hook">NPM Link</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

[React Hooks Api](https://reactjs.org/docs/hooks-intro.html) has introduced a cleaner and easy way of writing React Components ever. But using Redux in hooks way is not there. Hence, useRedux is a way of using Redux in the hooks way. It's a sort of connect function using hooks api.

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Following Peer Dependencies are required for using redux-hooks package:

- react: "^16.8.6",
- redux: "^4.0.1"

### Installation

```sh
npm i @mollycule/redux-hook -S
```

<!-- USAGE EXAMPLES -->

## Usage

1. Wrap the root app component with `redux-hook` provider by calling `createStoreContext<IRootState>` while specifying the shape of Redux App RootState into Generic Parameter.

```tsx
import { createStoreContext } from "@mollycule/redux-hook";

const { Provider } = createStoreContext<IRootState>();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent />
      </Provider>
    );
  }
}

export default App;
```

2. Now, we can simply use the `useRedux` hook anywhere in our app functional components as

```tsx
import useRedux from "@mollycule/redux-hook";
import { incrementCount, decrementCount, setIsLoading } from "./actions";

const MyComponent = props => {
  const mapStateToProps = state => ({
    count: state.count,
    isLoading: state.isLoading
  });
  const mapDispatchToProps = {
    incrementCount,
    decrementCount,
    setIsLoading
  };
  const mappedProps = useRedux(mapStateToProps, mapDispatchToProps);
  const { count, incrementCounter, setIsLoading } = mappedProps;
  return (
    <p onClick={incrementCount} onMouseOver={() => setIsLoading(true)}>
      {count}
    </p>
  );
};
```

**Note**: For `mapDispatchToProps`, we can pass a normal function as well that accepts dispatch and returns an object of dispatch bound actions from it as

```ts
const mapDispatchToProps = dispatch => ({
  authenticateUser: () => {
    dispatch({
      type: "AUTHENTICATE_USER"
    });
  },
  setIsLoading: (status: boolean) => {
    dispatch(setIsLoading(status));
  }
});
```

Passing simply an object of actions, automatically bind them to dispatch using redux [`bindActionCreators`](https://redux.js.org/api/bindactioncreators). Also, you can even skip the second paramter of useRedux hook if you just want to access the props from the store.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Param Singh - [@paramsinghvc](https://github.com/paramsinghvc) - paramsinghvc@gmail.com

Project Link: [https://github.com/paramsinghvc/redux-hooks](https://github.com/paramsinghvc/redux-hooks)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->

[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat&logo=linkedin&colorB=0077B5
[linkedin-url]: https://www.linkedin.com/in/paramsinghvc
[product-screenshot]: https://user-images.githubusercontent.com/4329912/57970750-b895d200-79a2-11e9-9fdf-fcf80c8fce28.png
