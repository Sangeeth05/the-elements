import { PeriodicTable } from './components/PeriodicTable';
import { Toolbar } from './components/Toolbar';
import { DetailPanel } from './components/DetailPanel';
import './App.css';

export default function App() {
  return (
    <main className="app">
      <header className="app-head">
        <h1>
          The <span>Elements</span>
        </h1>
        <p>Hover an element to see its atom. Click or tap for the full story.</p>
      </header>
      <Toolbar />
      <PeriodicTable />
      <DetailPanel />
      <footer className="app-foot">
        Element data:{' '}
        <a href="https://github.com/Bowserinator/Periodic-Table-JSON" target="_blank" rel="noreferrer">
          Periodic-Table-JSON
        </a>{' '}
        (sourced from Wikipedia)
      </footer>
    </main>
  );
}
