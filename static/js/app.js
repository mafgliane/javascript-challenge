// from data.js
var tableData = data;

//console.log(data)

// YOUR CODE HERE!
// Select the button
var button = d3.select("#filter-btn");

// Get a reference to the table body
var tbody = d3.select("tbody");

//Initialize the table to contain all data
updateTable(tableData);

//get filter criteria on button_click
button.on("click", function() {
    //  Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    // inputValue=checkDateFormat(inputElement.property("value"))
    inputValue=inputElement.property("value");
    console.log(inputValue)
    if(inputValue===""){
        //clear filter to show all data
        updateTable(tableData);
    } else{
        //show only data that matches the filter
        checkDateFormat(inputValue);
        fetchData(inputValue);
    }
});

//Remove leading zero from mm-dd 
function checkDateFormat(givenStr){
    var tokens = givenStr.split("/");
    var mm = tokens[0];
    var dd = tokens[1];
    var yyyy = tokens[2];

    if (mm.charAt(0) === "0"){
        tokens[0] = mm.replace("0", "");
    };
    if (dd.charAt(0) === "0") {
        tokens[1] = dd.replace("0", "");
    };
    return(tokens[0] + "/" + tokens[1] + "/" + tokens[2]);
}

//Select data that matches the filter
function fetchData(inputValue){
    var filteredData = tableData.filter(data => data.datetime === inputValue);
    if(filteredData.length>0){
        updateTable(filteredData);
    } else {
        // alert(`There are no UFO sightings data on ${inputValue}.`);
        tbody.html(`<tr><h3>There are no UFO sightings data on ${inputValue}.</h3></tbody>`);

    }
}

//Output filtered result to the table
function updateTable(selectedData){
    tbody.html("");
    selectedData.forEach((ufoSightings)=>{
        var row = tbody.append("tr");
        Object.entries(ufoSightings).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

