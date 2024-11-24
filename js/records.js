
    let options = {
      method: "GET"
      };
    let url = "http://wd.etsisi.upm.es:10000/records"

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        populateTable(data);
    })
    .catch(error => console.error("Error:", error));

function populateTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 
    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.username}</td>
                <td>${item.punctuation}</td>
                <td>${item.ufos}</td>
                <td>${item.disposedTime}</td>
                <td>${formatTimestamp(item.recordDate)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}



  