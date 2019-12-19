//var validUrl = require('valid-url')
const handleSubmit = function(event) {
    event.preventDefault()

    // check what text was put into the form field
    //Client.checkForName(formText)
    //var input_url = document.querySelectorAll('input[name=test-url]');

    console.log("::: Form Submitted :::");
    //fetch('http://localhost:8081/save')
    //.then(res => res.json())
    //.then(function(res) {
        //document.getElementById('results').innerHTML = res.message
    //})
    let formText = document.getElementById('name').value;
    /*if (validUrl.isUri(formText)){*/
      getAylien('http://localhost:8081/article', formText); /*
    } else {
      document.getElementById('error-message').innerHTML = "Sorry, this is not a valid URL."
    } */
}

const getAylien = async (url, input_url)=> {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({text: input_url})
        });
      try { 
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
        console.log("error", error);
        }
    };
      

export { handleSubmit }
