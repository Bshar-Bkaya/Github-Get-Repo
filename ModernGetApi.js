/**
 * ///  Modern Way To Get API  ///
 * async function getAPI(){
 * const repos = await fetch(`https://api.github.com/users/${input.value}/repos`);
 * const data = await repos.json();
 * }
 */

// Main variables
let input = document.querySelector(".input input");
let btnGetRepo = document.querySelector(".input .btn-repo");
let showData = document.querySelector(".show-data");

// Work
btnGetRepo.onclick = function () {
  getRepo();
};

function getRepo() {
  if (input.value == "") {
    showData.innerHTML = "input can't be empty";
  } else {
    getAPI();
  }
}

///  Modern Way To Get API  ///
async function getAPI() {
  const repos = await fetch(
    `https://api.github.com/users/${input.value}/repos`
  );
  if (!repos.ok) {
    showData.innerHTML = "Username Not Found :(";
  } else {
    const data = await repos.json();
    // Empty the show data
    showData.innerHTML = "";

    // Loop On The Repositories
    data.map((repo) => {
      // Creat Main Div
      let mainDiv = document.createElement("div");

      //Creat The Text Node and set repo name to it
      let text = document.createTextNode(repo.name);

      // Append The Text To Main Div
      mainDiv.appendChild(text);

      //Creat Repo URL
      let theUrl = document.createElement("a");

      //Creat The Text To URL
      let theUrlText = document.createTextNode("Show This");

      //Append The URL Text To Element a
      theUrl.appendChild(theUrlText);

      //Set URL To Variable theUrl
      theUrl.href = `https://github.com/${input.value}/${repo.name}`;

      //Set Atterput Blank
      theUrl.setAttribute("target", "_blank");

      // Append theURL To Main Div
      mainDiv.appendChild(theUrl);

      //Creat The Span
      let spanStars = document.createElement("span");

      //creat The Stars Count Text
      let contStars = document.createTextNode(`Stars ${repo.stargazers_count}`);

      //Add Stars Count Text To Span
      spanStars.appendChild(contStars);

      //Append Span Stars To Main Div
      mainDiv.appendChild(spanStars);

      //Add Class "repo-box" To Main Div
      mainDiv.classList.add("repo-box");

      //Append The Main Div To Container
      showData.append(mainDiv);
    });
  }
}
