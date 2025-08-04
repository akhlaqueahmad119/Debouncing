import React from 'react';
import { debounce } from '../utils/debounce';
import './Search.css'; // CSS import

function Search() {
  const [search, setSearch] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function searchFunction() {
    setError('');
    setLoading(true);
    try {
      const url = `https://jsonplaceholder.typicode.com/users?name_like=${search}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json();
      setSearchData(data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching users.');
    } finally {
      setLoading(false);
    }
  }

  const getData = React.useCallback(debounce(() => {
    searchFunction();
  }, 500), [search]);


  React.useEffect(() => {
    getData();
  }, [search, getData]);
  {
  }
  return (
    <div className="search-container">
      <h1 className="title">🔍 Akhlaque's User Search</h1>

      <input
        className="search-input"
        placeholder="Type user name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
        ) :
          !loading && !error && searchData.length === 0 ? (
        <h3>No Data Available</h3>
      ) : null}

      {
        !loading && searchData.length > 0 && (<table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Name</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {searchData.length > 0 &&
              searchData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.username}</td>
                  <td>{item.website}</td>
                </tr>
              ))}
          </tbody>
        </table>)
      }
    </div>
  );
}
export default React.memo(Search)