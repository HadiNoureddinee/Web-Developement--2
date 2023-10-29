fetch('https://api.coincap.io/v2/assets')
  .then(response => {
    
    //if it cannot connect or the url is wrong it will give an error
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    // Parse the response as JSON
    return response.json()
  })
  .then(coinData => {
    //   ^^ The data from the response it automatically put into the data variable
    //we can then extract the data array into coins
    //if you console log the value you will see an array of coins with values

    const coins = coinData.data
    
    //used to call in html
    const selectCoin = document.getElementById('selectCoin')

            //here we are setting the display for the drop down
            coins.forEach(coin => {
              const option = document.createElement('option')
              option.value = coin.id
              option.text = coin.name
              selectCoin.appendChild(option)
              
           
              
            })
            
            //here we have to wait for a selection and then we can get that specific coins information
            selectCoin.addEventListener('change', function() {
              const selectedCoinId = this.value

              //find the selected coin among the array we made
              const selectedCoin = coins.find(coin => coin.id === selectedCoinId)

           
            
              //here we are displaying the information for the selected coin
              //one thing to notice is that inner html allows us to add the <div> and other stuff
              //we could use innerText which would be like a text box i guess
              
              document.getElementById('coinInfo').innerHTML = `

              <div style="text-align: center">
                <h2>${selectedCoin.name}</h2>
                <hr>
              </div>
              
                Symbol: ${selectedCoin.symbol} <br>
                Supply: ${parseFloat(selectedCoin.supply).toFixed()} <br>
                Price (USD): ${parseFloat(selectedCoin.priceUsd).toFixed(2)} <br>
                Change Percent: ${parseFloat(selectedCoin.changePercent24Hr).toFixed(2)} <br>
                
              `
              
            })
          // the  get element by ID needs to be called in the html to display from the  js
          //go to html to follow comments

  })
  .catch(error => {
    
    console.error('There was a problem fetching: ', error)
  })

