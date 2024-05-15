document.addEventListener('DOMContentLoaded', () => {
  fetchProvinces();
  document.getElementById('provinceSelect').addEventListener('change', fetchCities);
});

function fetchProvinces() {
  const apiUrl = 'https://api.goapi.io/regional/provinsi?api_key=12e1dc61-266f-572e-d170-aba84586';

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const provinceSelect = document.getElementById('provinceSelect');
      data.data.forEach((province) => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.name;
        provinceSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function fetchCities() {
  const provinceId = document.getElementById('provinceSelect').value;
  if (!provinceId) return;

  const apiUrl = `https://api.goapi.io/regional/kota?api_key=12e1dc61-266f-572e-d170-aba84586&provinsi_id=${provinceId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const cityList = document.getElementById('cityList');
      cityList.innerHTML = ''; // Clear previous content

      data.data.forEach((city) => {
        const cityCard = document.createElement('div');
        cityCard.classList.add('city-card');
        cityCard.innerHTML = `
                      <h2>${city.name}</h2>
                      <p>ID: ${city.id}</p>
                  `;
        cityList.appendChild(cityCard);
      });
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      document.getElementById('cityList').innerHTML = '<p>Error fetching data</p>';
    });
}
