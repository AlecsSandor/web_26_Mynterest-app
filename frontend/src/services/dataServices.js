
const fetchQuery = async (query) => {
    
  try {
    const items = await fetch(`http://localhost:8080?q=${query}`)
    const result = await items.json()
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const createPin = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/create', {
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      result = response
      return response.json(); // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}

export const savePin = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/save', {
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      result = response
      return response.json(); // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}

export const getSaved = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/getsaved', {
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        //console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     result = response.json()
     return result
      //console.log(result.json())
      //return response // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      //console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}

export const getSavedImages = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/getMyImages', {
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        //console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     result = response.json()
     return result
      //console.log(result.json())
      //return response // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      //console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}

export const getCreatedPins = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/getCreatedPins', {
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        //console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     result = response.json()
     return result
      //console.log(result.json())
      //return response // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      //console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}

export const deleteSavedPin = async (messagePayload) => {
  let result
  await fetch('http://localhost:8080/deletePin', { 
    method: 'POST',
    body: messagePayload
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      result = response
      return response.json() // Assuming the response is in JSON format
    })
    .then(data => {
      // Handle the successful response data here
      console.log('Response:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
    return result
}
