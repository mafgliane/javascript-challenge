// from data.js
var tableData = data;

// select the filter category
var filterCat= d3.select("#filter-cat");

// Select the button
var button = d3.select("#filter-btn");

// Get a reference to the table body
var tbody = d3.select("tbody");

//Initialize the table to contain all data
updateTable(tableData);
var newData = tableData;

//manage selection of category from dropdown
filterCat.on("change", function() {
    var filterValue = filterCat.property("value");
    d3.select("#filterCat").node().value = '';
    // Setting placeholder values for input text
    switch (filterValue) {
        case "datetime":
            placeHolder = "enter a date";
            break;
        case "city":
            placeHolder = "enter a city";
            break;
        case "state":
            placeHolder = "enter a state";
            break;
        case "country":
            placeHolder = "enter a country";
            break;
        case "shape":
            placeHolder = "enter a shape";
            break;
        default:
            placeHolder = "";
    }
    d3.select("input").attr("placeholder", placeHolder);
});


//get filter criteria on button_click
button.on("click", function() {
    //  Select the input element and get the raw HTML node
    var inputElement = d3.select("#filter-cat");
    var inputValue=inputElement.property("value");
    var filterElement = d3.select("#filterCat");
    var filterValue=filterElement.property("value");

    if(inputValue==="datetime" && filterValue != ""){
        filterValue=checkDateFormat(filterValue);
    }

    if(filterValue===""){
        //ask to enter a filter value
        alert(`Please enter a ${inputValue}.`)
        // updateTable(tableData);
    } else{
        //show only data that matches the filter
        fetchData(inputValue, filterValue);
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
function fetchData(inputValue, filterValue){
    var filteredData = newData.filter(data => data[inputValue] === filterValue);
    //save filtered data
    newData=filteredData;
     if(filteredData.length>0){
        updateTable(filteredData);
    } else {
        alert(`There are no UFO sightings data for ${inputValue} = ${filterValue}.`);
        // tbody.html(`<tr><h3>There are no UFO sightings data on ${inputValue}.</h3></tbody>`);
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

function clearFilters(){
    newData = tableData;
}