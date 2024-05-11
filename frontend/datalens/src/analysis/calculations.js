
const getDataItemByFilter = (filter, apiDataList) => {
  let filteredDict = {};
  switch (filter) {
    case "sector":
      filteredDict = getDataItemsBySector(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    // return getAverage(filteredList);
    case "country":
      filteredDict = getDataItemsByCountry(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    case "topic":
      filteredDict = getDataItemsByTopic(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    case "region":
      filteredDict = getDataItemsByRegion(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    case "startYear":
      filteredDict = getDataItemsByStartYear(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    case "endYear":
      filteredDict = getDataItemsByEndYear(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    case "pestle":
      filteredDict = getDataItemsByPestle(apiDataList);
      filteredDict = getAverage(filteredDict);
      return getCleanData(filteredDict);
    default:
      return null; // Handle other filters or return null for invalid filters
  }
};

const getDataItemsBySector = (apiDataList) => {
  let dataItemsBySector = {};

  apiDataList.forEach((dataItem) => {
    // Convert sector to lowercase for case-insensitive comparison
    let sector = dataItem.sector.toLowerCase();

    // Check if sector already exists in the result object
    if (dataItemsBySector[sector]) {
      // If exists, merge data items
      dataItemsBySector[sector].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsBySector[sector] = [dataItem];
    }
  });

  return dataItemsBySector;
};

const getDataItemsByCountry = (apiDataList) => {
  let dataItemsByCountry = {};

  apiDataList.forEach((dataItem) => {
    // Convert country to lowercase for case-insensitive comparison
    let country = dataItem.country.toLowerCase();

    // Check if country already exists in the result object
    if (dataItemsByCountry[country]) {
      // If exists, merge data items
      dataItemsByCountry[country].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByCountry[country] = [dataItem];
    }
  });

  return dataItemsByCountry;
};

const getDataItemsByTopic = (apiDataList) => {
  let dataItemsByTopic = {};

  apiDataList.forEach((dataItem) => {
    // Convert topic to lowercase for case-insensitive comparison
    let topic = dataItem.topic.toLowerCase();

    // Check if topic already exists in the result object
    if (dataItemsByTopic[topic]) {
      // If exists, merge data items
      dataItemsByTopic[topic].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByTopic[topic] = [dataItem];
    }
  });

  return dataItemsByTopic;
};

const getDataItemsByRegion = (apiDataList) => {
  let dataItemsByRegion = {};

  apiDataList.forEach((dataItem) => {
    // Convert region to lowercase for case-insensitive comparison
    let region = dataItem.region.toLowerCase();

    // Check if region already exists in the result object
    if (dataItemsByRegion[region]) {
      // If exists, merge data items
      dataItemsByRegion[region].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByRegion[region] = [dataItem];
    }
  });

  return dataItemsByRegion;
};

const getDataItemsByStartYear = (apiDataList) => {
  let dataItemsByStartYear = {};

  apiDataList.forEach((dataItem) => {
    // Convert region to lowercase for case-insensitive comparison
    let startYear = dataItem.start_year;

    // Check if region already exists in the result object
    if (dataItemsByStartYear[startYear]) {
      // If exists, merge data items
      dataItemsByStartYear[startYear].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByStartYear[startYear] = [dataItem];
    }
  });
  delete dataItemsByStartYear[""];

  return dataItemsByStartYear;
};

const getDataItemsByEndYear = (apiDataList) => {
  let dataItemsByEndYear = {};

  apiDataList.forEach((dataItem) => {
    // Convert region to lowercase for case-insensitive comparison
    let endYear = dataItem.end_year;

    // Check if region already exists in the result object
    if (dataItemsByEndYear[endYear]) {
      // If exists, merge data items
      dataItemsByEndYear[endYear].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByEndYear[endYear] = [dataItem];
    }
  });
  delete dataItemsByEndYear[""];
  delete dataItemsByEndYear["2200"];
  delete dataItemsByEndYear["2126"];
  delete dataItemsByEndYear["2060"];
  delete dataItemsByEndYear["2055"];


  return dataItemsByEndYear;
};
const getDataItemsByPestle = (apiDataList) => {
  let dataItemsByPestle = {};

  apiDataList.forEach((dataItem) => {
    // Convert pestle to lowercase for case-insensitive comparison
    let pestle = dataItem.pestle.toLowerCase();

    // Check if pestle already exists in the result object
    if (dataItemsByPestle[pestle]) {
      // If exists, merge data items
      dataItemsByPestle[pestle].push(dataItem);
    } else {
      // If doesn't exist, create a new entry
      dataItemsByPestle[pestle] = [dataItem];
    }
  });

  return dataItemsByPestle;
};

const calculateAverage = (dataItems) => {
  let strengths = 0;
  let weaknesses = 0;
  let opportunities = 0;
  let threats = 0;
  let totalIntensity = 0;
  let totalLikelihood = 0;
  let totalRelevance = 0;
  let avglen = 0;

  dataItems.forEach((item) => {
    totalIntensity += item.intensity ? item.intensity : 0;
    totalLikelihood += item.likelihood ? item.likelihood : 0;
    totalRelevance += item.relevance ? item.relevance : 0;
    avglen += 1;
  });

  const averageIntensity = totalIntensity / avglen;
  const averageLikelihood = totalLikelihood / avglen;
  const averageRelevance = totalRelevance / avglen;
  const averageImpact = Math.round(
    (averageIntensity + averageLikelihood + averageRelevance) / 3
  );
  if (averageImpact > 5) {
    strengths++;
  } else if (averageImpact > 3) {
    opportunities++;
  } else if (averageImpact > 1) {
    weaknesses++;
  } else {
    threats++;
  }

  return {
    intensity: Math.round(averageIntensity),
    likelihood: Math.round(averageLikelihood),
    relevance: Math.round(averageRelevance),
    impact: averageImpact,
    strengths: strengths,
    opportunities: opportunities,
    weaknesses: weaknesses,
    threats: threats,
  };
};

const getAverage = (filteredDict) => {
  let filterAverageDict = {};
  for (let key in filteredDict) {
    let average = calculateAverage(filteredDict[key]);
    const filter = key?key:'other';
    filterAverageDict[filter] = average;
  }
  return filterAverageDict;
};

const getCleanData = (filterAverageDict) => {
  let cleanDataList = [];
  let id = 1;
  for (let key in filterAverageDict) {
    const category = key;
    const intensity = filterAverageDict[key].intensity;
    const impact = filterAverageDict[key].impact;
    const relevance = filterAverageDict[key].relevance;
    const likelihood = filterAverageDict[key].likelihood;
    const strengths = filterAverageDict[key].strengths;
    const weaknesses = filterAverageDict[key].weaknesses;
    const threats = filterAverageDict[key].threats;
    const opportunities = filterAverageDict[key].opportunities;

    cleanDataList.push({
      id:id,
      category: category,
      intensity: intensity,
      impact: impact,
      relevance: relevance,
      likelihood: likelihood,
      strengths: strengths,
      weaknesses: weaknesses,
      threats: threats,
      opportunities: opportunities,
    });
    id+=1;
  }
  return cleanDataList;
};

const generateColors = (length) => {
  const generatedColors = [];
  const letters = '0123456789ABCDEF';

  for (let i = 0; i < length; i++) {
    let color = '#';
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    generatedColors.push(color);
  }

  return generatedColors;
};




















function getSwot(apiDataList, weightsData) {
  // Initialize the dataset object to store topics for each country
  const dataset = {};

  // Populate the dataset with topics for each country
  apiDataList.forEach(dataItem => {
      const { country, topic, intensity = 0, likelihood = 0, relevance = 0 } = dataItem;
      if (country && topic !== '') {
          const impact = intensity + relevance + likelihood;
          const topicWeight = weightsData[topic] || 0;
          const swotScore = Math.round(topicWeight * impact * 100);
          if (topicWeight !== 0) {
              dataset[country] = dataset[country] || [];
              dataset[country].push({ topic, weight: topicWeight, impact, swotScore });
          }
      }
  });

  // Calculate strengths, weaknesses, opportunities, and threats for each country
  const resultDataset = {};
  for (const country in dataset) {
      if (dataset.hasOwnProperty(country)) {
          const countryDataList = dataset[country];
          let threats = 0, strengths = 0, opportunities = 0, weaknesses = 0, totalWeight = 0;
          countryDataList.forEach(data => {
              totalWeight += data.weight;
              const swotScore = data.swotScore;
              if (swotScore >= 3 && swotScore <= 25) {
                  threats++;
              } else if (swotScore >= 25 && swotScore <= 40) {
                  weaknesses++;
              } else if (swotScore >= 41 && swotScore <= 68) {
                  opportunities++;
              } else if (swotScore >= 68 && swotScore <= 217) {
                  strengths++;
              } else if (swotScore > 217) {
                  strengths++;
                  opportunities++;
              }
          });
          const topicLen = countryDataList.length;
          const factor = (totalWeight * 10) / topicLen;
          resultDataset[country] = {
              strengths: Math.round(strengths * factor * 10) / 10,
              opportunities: Math.round(opportunities * factor * 10) / 10,
              weaknesses: Math.round(weaknesses * factor * 10) / 10,
              threats: Math.round(threats * factor * 10) / 10
          };
      }
  }

  return resultDataset;
}

export { getDataItemByFilter, generateColors,getSwot};
