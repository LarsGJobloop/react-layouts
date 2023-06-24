import "./App.css";
import * as Layout from "./layouts/LayoutWithSideNavigation/LayoutWithSideNavigation";
import * as Navbar from "./layouts/NavbarBasic/NavbarBasic";

import htmlPerspectives from "./assets/html-perspectives.png";
import { Logo } from "./components/Logo/Logo";

function App() {
  return (
    <div className="App">
      <Navbar.Root className="Navbar glass-frosted">
        <Navbar.Logo linkHome>
          <Logo />
        </Navbar.Logo>
        <h1>Layout Component</h1>
      </Navbar.Root>

      <Layout.Root asMain className="Main">
        <Layout.Navigation className="navigation-internal" />

        <Layout.Content>
          <Layout.Section heading="Introduction" className="section">
            <h2>Introduction</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
              quasi atque ex eveniet illo nostrum maxime delectus quaerat
              perspiciatis quibusdam deserunt, harum fugiat beatae facilis quae
              adipisci quia totam?
            </p>
            <img src={htmlPerspectives} alt="" />
          </Layout.Section>

          <Layout.Section heading="Problem" className="section">
            <h2>Problem</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
              quasi atque ex eveniet illo nostrum maxime delectus quaerat
              perspiciatis quibusdam deserunt, harum fugiat beatae facilis quae
              adipisci quia totam?
            </p>
          </Layout.Section>

          <Layout.Section heading="Solution" className="section">
            <h2>Proposed Solution</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
              quasi atque ex eveniet illo nostrum maxime delectus quaerat
              perspiciatis quibusdam deserunt, harum fugiat beatae facilis quae
              adipisci quia totam?
            </p>
          </Layout.Section>

          <Layout.Section heading="Caveats" className="section">
            <h2>Caveats</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
              quasi atque ex eveniet illo nostrum maxime delectus quaerat
              perspiciatis quibusdam deserunt, harum fugiat beatae facilis quae
              adipisci quia totam?
            </p>
          </Layout.Section>
        </Layout.Content>
      </Layout.Root>

      <footer className="Footer">
        <h2>&copy; Lars Gunnar</h2>
      </footer>
    </div>
  );
}

export default App;
