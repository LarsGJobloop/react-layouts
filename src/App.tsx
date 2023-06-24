import "./App.css";
import * as LayoutWithSideNavigation from "./layout/LayoutWithSideNavigation/LayoutWithSideNavigation";

function App() {
  return (
    <div className="App">
      <header className="Navbar">
        <div>
          <h1>Layout Component</h1>
          <h2>Example of a Layout Component with a navigation sidebar</h2>
        </div>
      </header>

      <main className="Main">
        <LayoutWithSideNavigation.Root>
          <LayoutWithSideNavigation.Navigation />

          <LayoutWithSideNavigation.Content>
            <LayoutWithSideNavigation.Section title="Introduction"></LayoutWithSideNavigation.Section>

            <LayoutWithSideNavigation.Section title="Problem"></LayoutWithSideNavigation.Section>

            <LayoutWithSideNavigation.Section title="Proposed Solution"></LayoutWithSideNavigation.Section>

            <LayoutWithSideNavigation.Section title="Caveats"></LayoutWithSideNavigation.Section>
          </LayoutWithSideNavigation.Content>
        </LayoutWithSideNavigation.Root>
      </main>

      <footer className="Footer">
        <h2>&copy; Lars Gunnar</h2>
      </footer>
    </div>
  );
}

export default App;
