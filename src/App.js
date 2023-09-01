import './App.css';
import { Routes, Route } from 'react-router-dom'
import SearchPage
 from './SearchPage';
import SearchResults from './SearchResults';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SearchPage />}>
          <Route index element={<p>Enter a search to begin</p>} />
          <Route
            path='/search/:queryText'
            element={<SearchResults />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
