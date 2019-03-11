import * as React from 'react';
import Graph from './Graph';

const useFetch = async (urls: Array<string>) => {
  console.log(JSON.stringify(urls));
  const data = await fetch('http://localhost:3000/api', {
    method: 'post',
    body: JSON.stringify(urls),
    headers: {
      'content-type': 'application/json',
    },
  });

  const dataArray = await data.json();
  return dataArray;
};

interface IProps {}

const App = (props: IProps) => {
  const [error, setError] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const generateCharts = async (urls: Array<string>) => {
    try {
      setLoading(true);
      const res = await useFetch(urls);
      let d = res.filter((x: any) => x !== null);
      if (d.length === 0) {
        throw new Error('Error!');
      } else {
        setLoading(false);
        setData(d);
      }
    } catch (error) {
      setLoading(false);
      setError(
        'Failed to fetch data. Please retype the links or try another link.',
      );
    }
  };

  const processURLs = (e: React.FormEvent) => {
    e.preventDefault();

    let urlArray = url.replace(/(\n)/gi, '').split(',');
    generateCharts(urlArray);
  };

  let title = url.replace(/(\n)/gi, '').split(',');

  return (
    <div className="App">
      <div className="container">
        <div className="App__Wrapper">
          {error.length > 0 && (
            <div className="App__Error-Wrapper">
              <p>{error}</p>
              <button
                onClick={() => {
                  setError('');
                  setLoading(false);
                }}
              >
                Reload
              </button>
            </div>
          )}

          <div className="App__Header-Wrapper">
            <h1>Zipf's Law Visualization</h1>
            <p>
              According to Zipf's Law - if you rank words by their frequency in
              a sufficiently large collection of texts and then plot the
              frequency against the rank, you get a logarithmic curve.
            </p>
            <p
              style={{
                color: '#666',
                textAlign: 'center',
                fontSize: '0.88rem',
                margin: '2rem 0 0 0',
              }}
            >
              * Works best with .htm links for books from the Gutenberg Project.
            </p>
            <p
              style={{
                color: '#666',
                textAlign: 'center',
                fontSize: '0.88rem',
                margin: 0,
              }}
            >
              ex: http://www.gutenberg.org/files/59036/59036-h/59036-h.htm,
              http://www.gutenberg.org/files/59044/59044-h/59044-h.htm
            </p>
          </div>

          {loading && (
            <div className="App__Loading-Wrapper">
              <h1>Loading...</h1>
            </div>
          )}
          <div className="App__Form-Wrapper">
            <form className="App__Form" onSubmit={processURLs}>
              <div className="form-group">
                <label htmlFor="urls">URLs</label>
                <textarea
                  name="urls"
                  id="urls"
                  value={url}
                  cols={30}
                  rows={3}
                  onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                    setUrl(e.currentTarget.value)
                  }
                />
              </div>
              <div className="form-group">
                <button type="submit">Generate Charts</button>
              </div>
            </form>
          </div>

          {!loading &&
            data.length > 0 &&
            data.map((item, index) => (
              <Graph item={item} key={index} title={title[index]} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
