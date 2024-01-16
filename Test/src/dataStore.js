let receivedData = [];

module.exports = {
  getReceivedData: () => receivedData,
  setReceivedData: (data) => {
    const newData = JSON.parse(data);
    
    // Ajouter de nouvelles données à receivedData
    receivedData.push(...newData);

    console.log('Données GPS stockées :', receivedData);
  }
};
