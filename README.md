<!-- PROJECT SHIELDS -->

[![Build Status][build-shield]]()
[![MIT License][license-shield]][license-url]
[![Contributors][contributors-shield]]()
<img src="https://img.badgesize.io/paramsinghvc/react-anime/master/dist/index.js?compression=gzip&label=gzip+size&max=3000&softmax=2000&style=for-the-badge">
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/paramsinghvc/react-anime">
    <img src="https://user-images.githubusercontent.com/4329912/69420951-d115e900-0d45-11ea-955e-476fdd43a44f.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">React wrapper component &lt;Anime /&gt; for animejs</h3>

  <p align="center">
    Usher life to your React Apps easily
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@mollycule/react-anime"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://codesandbox.io/s/react-anime-demo-mppmx?fontsize=14">View Demo</a>
    ·
    <a href="https://github.com/paramsinghvc/react-anime/issues">Report Bug</a>
    ·
    <a href="https://github.com/paramsinghvc/react-anime/issues">Request Feature</a>
    .
    <a href="https://www.npmjs.com/package/@mollycule/react-anime">NPM Link</a>
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

[AnimeJS](https://animejs.com) has a lot to offer when to comes to do performant and literally any kind of animations possible with svg and Javascript. It supports everything from simple graphic transformations like translations, rotation, scaling to complex things like SVG morphing in a very concise api. 

React Anime library is a way of incorporating these benefits of animejs in a react environment easily by simply using &lt;Anime /&gt; element passing in the transformation configs as props to various React Transition hooks.

React Anime leverages the [React Transition Group](http://reactcommunity.org/react-transition-group/transition) API to run animations during various phases of React component like mounting and unmounting, which otherwise wouldn't have been possible.

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [React Transition Group](http://reactcommunity.org/react-transition-group/transition)
- [AnimeJS](https://animejs.com)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Following Peer Dependencies are required for using redux-hooks package:

- react: ^16.8.0,
- react-transition-group: ^4.3.0,
- animejs: ^3.1.0

### Installation

```sh
# Install the Peer Dependencies
npm i react react-transition-group animejs -S

# Install the typings if using a TS environment
npm i @types/react-transition-group @types/animejs -S

npm i @mollycule/react-anime -S
```

or 


```sh
yarn add react react-transition-group animejs
yarn add @types/react-transition-group @types/animejs
yarn add @mollycule/react-anime -S
```

<!-- USAGE EXAMPLES -->

## Usage

### 1. Single Element Animation

```tsx
import Anime from "@mollycule/react-anime";

class App extends Component {
  render() {
    return (
      <main>
        <Anime
          open
          appear
          duration={1000}
          onEntering={{ translateY: [-20, 0], opacity: [0, 1] }}
          onExiting={{ translateY: -20, opacity: 0 }}
          easing="easeOutCubic"
        >
          <section>
            <p> Hola Mundo </p>
          </section>
        </Anime>
      </main>
    );
  }
}

export default App;
```

Below is the explanation of all the props being passed.

1. **`open`**: It's used to tell animejs when to start the animation. You can pass a reactive prop to it to run it on a state prop change. 
2. **`mountOnEnter`**: By default component will be mounted only when animation starts or when open becomes true. It can controlled through this prop.
3. **`unmountOnExit`**: By default component will be unmounted when animation exits or when open becomes false. It can controlled through this prop.
4. **`appear`**: Normally the child inside &lt;Anime&gt; doesn't animate when it's mounted along with &lt;Anime&gt; as open set as true. Setting **`appear`** to true is important to view the child element transition or animate while mounting along with &lt;Anime&gt;. Read more [here](http://reactcommunity.org/react-transition-group/transition)
5. **`onEntering`**, **`onEntered`**, **`onExiting`**, **`onExited`**: All these props take [anime props](https://animejs.com/documentation/) config object in them that are executed on various phases of React Transition.
6. Any anime props that can be passed into each of these props above can be given at the root level as well. For eg: `duration` can be specified at &lt;Amime duration={2000} &gt; level than at each `on*` prop level, if its same.

### Imperatively controlling animation by Anime helper methods.

Anime supports various helper methods for controlling the animation instance like play/pause/reset on some event. One can grab the reference of the current animation instance by passing React ref in **`animeRef`** prop as

```tsx
import React, { FC, useEffect, useRef } from "react";
import Anime from "shared/components/Anime";
import animejs, { AnimeInstance } from "animejs";

const MyComp: FC = () => {

  const animeRef = useRef<AnimeInstance>();

  useEffect(() => {
    setTimeout(() => {
      if (animeRef.current) {
        animeRef.current.pause();
        // or
        animeRef.current.reset();
      }
    }, 1000);
  }, []);

  return (
    <section>
      <Anime
        open
        appear
        duration={2000}
        onEntering={{ translateX: [300, 0], opacity: [0.5, 1], easing: "linear" }}
        animeRef={animeRef}
      >
        <span></span>
      </Anime>
    </section>
  )
}
```


### 2. Group or List Animation

```tsx
<Transactions>
  <Anime
    open
    duration={300}
    appear
    onEntering={{
      translateY: [100, 0],
      opacity: [0, 1],
      delay: animejs.stagger(60),
      easing: "linear"
    }}
  >
    {transactions.map(transaction => (
      <TransactionItem key={transaction.timestamp}>
        <Heading>
          Exchanged from {transaction.from.currency.code} to {transaction.to.currency.code}
        </Heading>
        <Timestamp>{new Date(transaction.timestamp).toLocaleString()} </Timestamp>
      </TransactionItem>
    ))}
  </Anime>
</Transactions>
```

Simply, the &lt;Anime&gt; can be supplied a set of children and an Anime `delay` property can be used to simulate the stagger effect.

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

Project Link: [https://github.com/paramsinghvc/react-anime](https://github.com/paramsinghvc/react-anime)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->

[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=for-the-badge
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0077B5
[linkedin-url]: https://www.linkedin.com/in/paramsinghvc
[product-screenshot]: https://user-images.githubusercontent.com/4329912/69421370-d7589500-0d46-11ea-8ec1-ee98ade7bbda.png
