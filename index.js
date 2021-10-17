let searchEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById('spinner');
let searchResultsEl = document.getElementById('searchResults');


function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;

    let searchContainerEl = document.createElement('div');
    searchResultsEl.appendChild(searchContainerEl);
    searchContainerEl.classList.add('result-item');

    let titleEl = document.createElement('a');
    searchContainerEl.appendChild(titleEl);
    titleEl.classList.add('result-title');
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = '_blank';

    let lineBreakEl1 = document.createElement('br');
    searchContainerEl.appendChild(lineBreakEl1);

    let linkEl = document.createElement('a');
    searchContainerEl.appendChild(linkEl);
    linkEl.href = link;
    linkEl.textContent = link;
    linkEl.classList.add('result-url');

    let lineBreakEl2 = document.createElement('br');
    searchContainerEl.appendChild(lineBreakEl2);

    let linkDescriptionEl = document.createElement('p');
    searchContainerEl.appendChild(linkDescriptionEl);
    linkDescriptionEl.classList.add('link-description');
    linkDescriptionEl.textContent = description;

}

function getSearchResults(jsonData) {
    spinnerEl.classList.toggle('d-none');
    let {
        search_results
    } = jsonData;
    for (let result of search_results) {
        createAndAppendSearchResults(result);
    }
}

function searchItem(event) {
    if (event.key === 'Enter') {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle('d-none');

        let searchInput = searchEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                getSearchResults(jsonData);
            });
    }
}

searchEl.addEventListener('keydown', searchItem);
