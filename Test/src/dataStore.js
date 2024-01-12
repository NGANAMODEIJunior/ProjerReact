
let receivedData = {};

module.exports = {
  getReceivedData: () => receivedData,
  setReceivedData: (data) => {
    receivedData = JSON.parse(data);
    console.log('Données GPS stockées :', receivedData);
  }
};