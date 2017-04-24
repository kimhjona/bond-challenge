function domManip(mData, tData, choice) {
  if (choice === 'arclight') tData = tData[0];
  else if (choice === 'pacific') tData = tData[1];
  else tData = tData[2];
  const id = mData.map((elem) => elem.id);
  const newLength = Object.keys(tData.showtimes);
  // console.log(newLength)
  // console.log('tdata',tData.showtimes)
  // console.log('mdata', mData)
  // console.log('id', id)
  let html = '';

  for (let i = 0; i < mData.length; i++) {
    const id = mData.map((elem) => elem.id);
    let timeArr = tData.showtimes[id[i]]
    // console.log(timeArr)
    // timeArr = (timeArr) ? timeArr.join(' ') : "Not at the " + choice + "!"
    // console.log('id', id);
    // console.log('timeArr', timeArr)
    if (timeArr) {
      timeArr = timeArr.join(' ')
      html += "<ul id='realBox'><div class='movieItem'><h3><p><img src='" + mData[i].poster + "'><span class='miniBox'>";
      html += mData[i].title + " <span class='small'>(" + mData[i].rating + ")</span>";
      html += "<span class=tiny>" + timeArr + "</span>"
      html += "</span></h3></p></div></ul>"
    }
  }
  return html;
}

let theatre = 'arclight';
let movieData;
let theatreData;
$(document).ready(() => {
  $.getJSON('data/movieData.json').success(mData => {
    $.getJSON('data/theatreData.json').success(tData => {
      theatreData = tData;
      movieData = mData;
      const html = domManip(movieData, theatreData, theatre);
      $('#movieBox').html(html);
    });
  });
});

function findMatches(matchingWord, movieData) {
  movieData = movieData.filter(elem => {
    const title = elem.title.toLowerCase();
    return title.includes(matchingWord.toLowerCase())
  })
  return movieData;
}

$("input").keyup(() => {
  const text = $("#textBox").val();
  const matches = findMatches(text, movieData);
  const html = domManip(matches, theatreData, theatre);
  $('#movieBox').html(html);
});

function selectTheatre(theatreInput) {
  theatre = theatreInput;
  
  const html = domManip(movieData, theatreData, theatre);
  $('#movieBox').html(html);
}