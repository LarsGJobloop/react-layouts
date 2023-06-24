import "./App.css";
import * as Layout from "./layouts/LayoutWithSideNavigation/LayoutWithSideNavigation";

import htmlPerspectives from "./assets/html-perspectives.png";

function App() {
  return (
    <div className="App">
      <header className="Navbar glass-frosted">
        <a href="/">
          <div>
            <h1>Layout Component</h1>
            <h2>Example of a Layout Component with a navigation sidebar</h2>
          </div>
        </a>
      </header>

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
