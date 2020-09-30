const searchBox=document.getElementById("search-box");
const searchBtn=document.getElementById("search-btn");
const result=document.getElementById("result");
const more=document.getElementById("more");
const outputView=document.getElementById("output");
const apiUrl='https://api.lyrics.ovh';

async function getMoreSongs(url) {
  const res=await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data=await res.json();
  showData(data);
}

searchBtn.addEventListener('click',function(){
  
  const searchData=searchBox.value.trim();
  if(!searchData){
    alert("Please input something")
      }
  else{
    searchSong(searchData);
  }
});



async function searchSong(Data) {
    const res=await fetch(`${apiUrl}/suggest/${Data}`);
    const data=await res.json();
    showData(data);
}


function showData(data) {
    result.innerHTML=`
    ${data.data.map(song =>`
      <div class="single-result row align-items-center my-3 p-3">
      <div class="col-md-9">
          <h3 class="lyrics-name">${song.title}</h3>
          <p class="author lead"><h5>Album : <span>${song.album.title}</h5></span></p>
          <p class="author name">Artist Name : <span>${song.artist.name}</span></p>
      </div>
      <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </div>
      </div>
    ` )
    .join('')}
    `;
if(data.prev || data.next){
  more.innerHTML=`
  ${data.prev ? `<button class="new" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
  ${data.next ? `<button class="new" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
  `
}
else{
  more.innerHTML='';
}
}


async function getLyrics(artist,songTitle) {
  const res=await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
  const data=await res.json();
  

const lyrics=data.lyrics;
const output=document.getElementById("myOutput");
output.style.display="block";
window.onclick=function (event) {
  if (event.target == output) {
    output.style.display = "none";
  }
}
outputView.innerHTML=`
                  <h2>
                  <strong>
                      ${artist}
                  </strong> - ${songTitle}
                  </h2> <br/>
                  <pre class="lyrics-text">${lyrics}</p>
                  </div>`

  more.innerHTML='';
}



result.addEventListener('click', e =>{
  
  const clickedEl=e.target;
  if(clickedEl.tagName === 'BUTTON'){
    let artist=clickedEl.getAttribute('data-artist');
    let songTitle=clickedEl.getAttribute('data-songtitle');
    getLyrics(artist,songTitle);
  }
  
})

