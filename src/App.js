import { useCallback, useState } from "react";
import "./App.css";
import InfiniteScrollView from "./Component/InfiniteScrollView";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <div className="App">
      <input type="text" onChange={handleInputChange} value={searchText} />
      <InfiniteScrollView searchText={searchText} />
    </div>
  );
}

export default App;
