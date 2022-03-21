let input_uer = document.getElementById("searchInput");
let container = document.getElementById("searchResults");
let loader = document.getElementById("spinner");

function add(search_results) {
    let head = document.createElement("p");
    head.textContent = "Popular Books";
    container.appendChild(head);
    let row_container_1 = document.createElement("div");
    row_container_1.classList.add("container");
    container.appendChild(row_container_1);
    let row_container = document.createElement("div");
    row_container.classList.add("row");
    row_container_1.appendChild(row_container);
    console.log(row_container_1);
    for (let u of search_results) {
        let sub_container = document.createElement("div");
        sub_container.classList.add("col-6");
        row_container.appendChild(sub_container);
        let image = document.createElement('img');
        image.src = u.imageLink;
        sub_container.appendChild(image);
        let para = document.createElement('p');
        para.textContent = u.author;
        sub_container.appendChild(para);
        //console.log(sub_container);
    }
}

function fetchdata(event) {
    if (event.key === 'Enter') {
        let option = {
            method: "GET"
        };
        loader.classList.remove("d-none");
        let url = "https://apis.ccbp.in/book-store?title=" + input_uer.value;
        fetch(url, option).then(function(response) {

            return response.json();
        }).then(function(r) {
            let {
                search_results,
                total
            } = r;
            //console.log(r);
            loader.classList.add("d-none");
            if (total === 0) {
                let p = document.createElement("p");
                p.textContent = 'No results found';
                p.style.color = '#323f4b';
                p.setAttribute("class", "text-center");
                container.appendChild(p);
            } else {
                add(search_results);
            }
        });
    }
}

input_uer.addEventListener('keydown', fetchdata);