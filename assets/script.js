async function lookupBSB() {
    let bsbNumber = document.getElementById("bsbNumberInput").value;

    // Remove non-numeric characters
    const formattedBsbNumber = bsbNumber.replace(/\D/g, '');

    // Format to "000-000" if not already in that format
    bsbNumber = formattedBsbNumber.replace(/(\d{3})(\d{3})/, "$1-$2");

    // Assuming your CSV file is in the same directory as your HTML file
    const csvUrl = '/assets/data.csv';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();

        // Parse CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');

        let dataTable = {};
        rows.slice(1).forEach(row => {
            const rowData = row.split(',');
            const currentBsbNumber = rowData[0].trim();

            if (currentBsbNumber === bsbNumber) {
                rowData.forEach((value, index) => {
                    dataTable[headers[index].trim()] = value.trim();
                });
            }
        });

        // Display the data in div elements
        const bsbDataDiv = document.getElementById("bsbData");
        bsbDataDiv.innerHTML = "";

        for (const key in dataTable) {
            const divItem = document.createElement("div");
            divItem.classList.add("dataItem");
            divItem.innerHTML = `<strong>${key}:</strong> ${dataTable[key]}`;
            bsbDataDiv.appendChild(divItem);
        }

        // Display Google Maps (Assuming you have latitude and longitude data)
        const googleMapsHtml = `<iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps?q=${dataTable["Address"]}, ${dataTable["City"]}, ${dataTable["State"]} ${dataTable["Postcode"]}&output=embed"></iframe>`;
        document.getElementById("googleMaps").innerHTML = googleMapsHtml;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}