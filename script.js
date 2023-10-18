document.addEventListener("DOMContentLoaded",

  async () => {

    const searchInput = document.getElementById('searchInput')
    const list = document.getElementById('list')
    try {
      const responce = await fetch('https://api.openbrewerydb.org/breweries');

      const data = await responce.json();
      console.log(data)
      const displayresult = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBreweries = data.filter((brewery) => {

          return (
            brewery.name.toLowerCase().includes(searchTerm) ||
            brewery.brewery_type.toLowerCase().includes(searchTerm)
          );
        });
list.innerHTML='';

        if (filteredBreweries.length === 0) {
          list.textContent = "No matching found.";
        } else {
          filteredBreweries.forEach((brew) => {
            const listview = document.createElement("ls");
            listview.innerHTML = `
            <h2>NAME:${brew.name}</h2><br>
            <h3>TYPE:${brew.brewery_type}</h3><br>
            <p>ADDRESS: ${brew.address_1}</p><br>
            <p>WEBSITE: ${brew.website_url}<br>
            <p> PHONE:${brew.phone}</p><br>

            `;
            list.appendChild(listview);

          })
        }
      }

      searchInput.addEventListener("input", displayresult);
      displayresult();

    } catch (error) {
      console.error("feacthing data error")
    }

  }
);