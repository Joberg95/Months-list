import { useEffect, useState } from "react";

function App() {
  const { search, months } = useMonthSearch();

  return (
    <div className="App">
      <main>
        <h1>Month List</h1>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => search(e.target.value)}
        />

        <ul>
          {months.map((month) => (
            <Month key={month.id} {...month} />
          ))}

          {months.length === 0 && "No months found"}
        </ul>
      </main>
    </div>
  );
}

function Month({ type }) {
  return (
    <li>
      <h3>{type}</h3>
    </li>
  );
}

function useMonthSearch() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setMonths(data);

    localStorage.setItem("lastQuery", q);
  };

  return { search, months };
}

export default App;
