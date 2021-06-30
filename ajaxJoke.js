
async function fetchJokes() {
    let container = $(".container");

    for (let i = 0; i < 10; i++) {
        let joke = await axios.get("https://icanhazdadjoke.com/", { headers: { "Accept": "text/plain" } });
        container.append(`<p>${joke.data}</p>`);
    }
}

fetchJokes();