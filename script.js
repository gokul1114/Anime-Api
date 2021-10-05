const intialBody = `<div class="container">
<div class = "search">
 <input class = "searchFeild" type="text" placeholder = "search for your favourite anime">
 <input type="submit" class="button col-2" value = "search" onclick = "searchAnime()">
 </div>
 </div>`;

 // SEARCH FUNCTION TO RETRIEVE THE ANIME LIST BASED ON SEARCH VALUE
async function searchAnime() {
  console.log("inside search function");
  try {
    var inputText = document.querySelector(".searchFeild").value;
    //console.log(inputText);
    if (inputText !== "") {
      let result = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${inputText}&page=1`
      );
      let resultJson = await result.json();
      console.log(resultJson);
      if (resultJson.status > 300 || resultJson.status < 200) {
        displayException(resultJson, inputText);
      } else {
        displayResult(resultJson, inputText);
      }
    } else {
      alert("Enter any Value");
    }
  } catch (Exception) {
    alert(Exception);
  }
}

//WHEN 300 < RESPONSE STATUS < 200 
function displayException(resultJson, inputText) {
  document.body.innerHTML =
    intialBody +
    `<div class="searchedText"> Search Input : ${inputText}</div>` +
    `<div class = "exception-msg">${resultJson.message}</div>`;
}

//ON SUCCESSFUL RESPONSE
function displayResult(resultJson, inputText) {
  let displayItems = resultJson.results;
  //var displayDiv =  document.createElement("div");
  document.body.innerHTML =
    intialBody +
    `<div class="searchedText"> Search Input : ${inputText}</div>` +
    '<div class = "container"><div class = "row" id = "animeRows"></div></div>';
  var animeRows = document.getElementById("animeRows");
  for (x of displayItems) {
    let startDate = "";
    let endDate = "";
    if (x.start_date !== null && x.end_date !== null) {
      startDate = x.start_date.toString().split("T")[0];
      endDate = x.end_date.toString().split("T")[0];
    } else {
      startDate = "";
      endDate = "";
    }
    let div = document.createElement("div");
    div.setAttribute("class", "col-lg-4 col-md-4 col-sm-4");
    div.innerHTML = `<div class = "card">
     <img class="card-img-top" src="${x.image_url}" alt="Card image cap">
     <div class="card-body">
     <h6 class="card-title">${x.title}</h6>
     <p class="card-text type">Type : ${x.type}</p>
     <p class="card-text">IMDB Rating : ${x.score}</p>
     <p class="card-text">Start Date : ${startDate}</p>
     <p class="card-text">End Date : ${endDate}</p>
     <a href="${x.url}" class="btn btn-primary" target = "_blank">Take me here</a>
     </div>`;

    animeRows.appendChild(div);
  }
}

//INITIAL BODY
document.body.innerHTML = intialBody;

//CODE FOLLOWS FOLLOWING RULES

// DRY - DONT REPEAT YOUR CODE
// KEEP IT SIMPLE
// USE ASYNC AND AWAIT
// HANDLE EXCEPTIONS AND ALL POSSIBLE STATUS CODES
// STYLED USING BOOTSTRAP AND STYLE.CSS FILE