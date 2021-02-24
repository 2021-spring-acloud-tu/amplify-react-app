import 
  React
  , {
    useState
    , useEffect
  } 
from 'react';

import { API } from 'aws-amplify';

import logo from './logo.svg';
import './App.css';

const App = () => {
  
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);
  //let coins = [];

  // Define function to all API
  const fetchCoins = async () => {

    updateLoading(true);

    const { limit, start } = input;

    const data = await API.get('apif65452a3', `/coins?limit=${limit}&start=${start}`);

    updateCoins(data.coins);
    //coins = data.coins;
    console.log(coins);

    updateLoading(false);
    
  };

  // Call fetchCoins function when component loads
  useEffect(
    () => {
      fetchCoins();
    }
    , []
  );

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a new function to allow users to update the input values
  const updateInputValues = (type, value) => {
    updateInput({ 
      ...input
      , [type]: value 
    });
  };

  const [loading, updateLoading] = useState(true);

  return (
    <div className="App">

      <input
        placeholder="Enter a starting index"
        onChange={e => updateInputValues('start', e.target.value)}
      />
      
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="Enter a limit"
      />

      <button 
        onClick={fetchCoins}
      >
        Fetch Coins
      </button>


      {loading && <h2>Loading...</h2>}

      {
        !loading &&
        coins.map(
          (coin, index) => (
            <div 
              key={index}
            >
              <h2>
                {coin.name} - {coin.symbol}
              </h2>
              <h5>
                ${coin.price_usd}
              </h5>
            </div>
          )
        )
      }
    </div>
  );
}

export default App;
