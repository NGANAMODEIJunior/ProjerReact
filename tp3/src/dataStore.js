// dataStore.js
let receivedData = '';

module.exports = {
  getReceivedData: () => receivedData,
  setReceivedData: (data) => {
    receivedData = data;
    console.log('Données GPS stockées :', receivedData);
  }
};
