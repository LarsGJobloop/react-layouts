import "./App.css";
import Layout from "./layout/LayoutWithSideNavigation/LayoutWithSideNavigation";

function App() {
  return (
    <div className="App">
      <header className="Navbar glass-frosted">
        <div>
          <h1>Layout Component</h1>
          <h2>Example of a Layout Component with a navigation sidebar</h2>
        </div>
      </header>

      <main className="Main">
        <Layout.Root>
          <Layout.Navigation />

          <Layout.Content>
            <Layout.Section heading="Introduction" className="section">
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
                quasi atque ex eveniet illo nostrum maxime delectus quaerat
                perspiciatis quibusdam deserunt, harum fugiat beatae facilis
                quae adipisci quia totam?
              </p>
            </Layout.Section>

            <Layout.Section heading="Problem" className="section">
              <h2>Problem</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
                quasi atque ex eveniet illo nostrum maxime delectus quaerat
                perspiciatis quibusdam deserunt, harum fugiat beatae facilis
                quae adipisci quia totam?
              </p>
            </Layout.Section>

            <Layout.Section heading="Proposed Solution" className="section">
              <h2>Proposed Solution</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
                quasi atque ex eveniet illo nostrum maxime delectus quaerat
                perspiciatis quibusdam deserunt, harum fugiat beatae facilis
                quae adipisci quia totam?
              </p>
            </Layout.Section>

            <Layout.Section heading="Caveats" className="section">
              <h2>Caveats</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem
                quasi atque ex eveniet illo nostrum maxime delectus quaerat
                perspiciatis quibusdam deserunt, harum fugiat beatae facilis
                quae adipisci quia totam?
              </p>
            </Layout.Section>
          </Layout.Content>
        </Layout.Root>
      </main>

      <footer className="Footer">
        <h2>&copy; Lars Gunnar</h2>
      </footer>
    </div>
  );
}

export default App;
