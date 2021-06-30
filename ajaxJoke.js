/*
 * add upvote and downvote button
 *    add event listener to each button reorganizing page
 * add counter associated with each joke
 * 
 *  
 */

const jokeList = [0,0,0,0,0,0,0,0,0,0];

fetchJokes();


async function fetchJokes() {
    let $container = $(".container");

    for (let i = 0; i < 10; i++) {
        let joke = await axios.get("https://icanhazdadjoke.com/", { headers: { "Accept": "text/plain" } });
        let $upVote = $(`<button>vote-up</button>`)
        let $downVote = $(`<button>vote-down</button>`)
        let $jokeLine = $(`<li id=${i}>${joke.data}</li>`)
        let $scoreCount = $(`<span> Score Count: 0 </span>`)

        $upVote.on("click", increaseVote);
        $downVote.on("click", decreaseVote);
              
        $jokeLine.append($upVote);
        $jokeLine.append($downVote);
        $jokeLine.append($scoreCount);
        
        $container.append($jokeLine);
    }
}

function increaseVote(evt) {
  evt.preventDefault();
  let i = evt.target.parentElement.id
  jokeList[i] += 1;
  let $scoreCount = $(evt.target.parentElement).find("span")
  $scoreCount.text(`Score Count: ${jokeList[i]}`)
  let $item = $(evt.target.parentElement);
  reorderList($item);
}

function decreaseVote(evt) {
  evt.preventDefault();
  let i = evt.target.parentElement.id
  jokeList[i] -= 1;
  let $scoreCount = $(evt.target.parentElement).find("span")
  $scoreCount.text(`Score Count: ${jokeList[i]}`)
  let $item = $(evt.target.parentElement);
  reorderList($item);
}

function reorderList($item) {
  let score = jokeList[$item.attr("id")];
  for (let i = 0; i < 10; i++) {
    let $prev = $item.prev();
    let $next = $item.next();
    if (score > jokeList[$prev.attr("id")]) {
      $item.insertBefore($prev);
    }
    else if (score < jokeList[$next.attr("id")]) {
      $item.insertAfter($next);
    }
  }
}