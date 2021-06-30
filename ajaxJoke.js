/**
 * Randomly fetch 10 dad jokes from icanhazdadjoke.com and display as an ordered list
 * Jokes can be up-voted and down-voted, with a running score tally displayed
 * List is continously reordered with updated score counts
 *  
 */

/* score tracker for each joke */
const jokeList = [0,0,0,0,0,0,0,0,0,0];

fetchAndDisplayJokes();

/* Fetches 10 jokes and appends them to the joke container */
async function fetchAndDisplayJokes() {
  let $container = $(".container");

  for (let i = 0; i < 10; i++) {
    let joke = await axios.get("https://icanhazdadjoke.com/", { headers: { "Accept": "text/plain" } });
    let $jokeLine = $(`<li id=${i}>${joke.data}</li>`)
    let $scoreCount = $(`<span> Score Count: 0 </span>`)

    $jokeLine.append(createUpVoteButton());
    $jokeLine.append(createDownVoteButton());
    $jokeLine.append($scoreCount);

    $container.append($jokeLine);
  }
}

/* Creates an up-vote button */
function createUpVoteButton() {
  let $upVote = $(`<button>vote-up</button>`)
  $upVote.on("click", increaseVote);
  return $upVote;
}

/* Creates a down-vote button */
function createDownVoteButton() {
  let $downVote = $(`<button>vote-down</button>`)
  $downVote.on("click", decreaseVote);
  return $downVote;
}

/* Increases vote count and updates Score Count display */
function increaseVote(evt) {
  evt.preventDefault();
  let i = evt.target.parentElement.id
  jokeList[i] += 1;
  let $scoreCount = $(evt.target.parentElement).find("span")
  $scoreCount.text(`Score Count: ${jokeList[i]}`)
  let $jokeLine = $(evt.target.parentElement);
  reorderList($jokeLine);
}

/* Decreases vote count and updates Score Count display */
function decreaseVote(evt) {
  evt.preventDefault();
  let i = evt.target.parentElement.id
  jokeList[i] -= 1;
  let $scoreCount = $(evt.target.parentElement).find("span")
  $scoreCount.text(`Score Count: ${jokeList[i]}`)
  let $jokeLine = $(evt.target.parentElement);
  reorderList($jokeLine);
}

/* Reorders list after every vote based on score count */
function reorderList($jokeLine) {
  let score = jokeList[$jokeLine.attr("id")];
  for (let i = 0; i < 10; i++) {
    let $prevJoke = $jokeLine.prev();
    let $nextJoke = $jokeLine.next();
    if (score > jokeList[$prevJoke.attr("id")]) {
      $jokeLine.insertBefore($prevJoke);
    }
    else if (score < jokeList[$nextJoke.attr("id")]) {
      $jokeLine.insertAfter($nextJoke);
    }
  }
}
