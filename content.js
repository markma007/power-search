(function (){

  const $inject_top_mode = `
<div id="power-search-section">
  <div class="power-search">
    <span id="search-icon" style="height:24px;line-height:24px;width:24px">
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path stroke="gray" fill="gray" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
        </path>
      </svg>
    </span>
    <input type="search">
    <button id="search-google" class="ui button small">Google</button>
    <button id="search-duck" class="ui button small">Duck</button>
    <button id="search-sof" class="ui button small">Stack Overflow</button>
    <button id="search-wiki" class="ui button small">Wikipedia</button>
    <!--button id="search-bing" class="ui button small">Bing</button-->
  </div>
</div>
`;

const $inject_block_mode = `
<div id="power-search-section2" class="hide">
  <div class="wrapper">
  <h2>Power Search</h2>
    <div>
      <div class="power-search">
        <span id="search-icon" style="height:24px;line-height:24px;width:24px">
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path stroke="gray" fill="gray" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
            </path>
          </svg>
        </span>
        <input type="search">
      </div>
      <div class="clear">
         <span><a>clear</a></span>
      </div>
      <div class="power-search">
        <button id="search-google" class="ui button small">Google</button>
        <button id="search-duck" class="ui button small">Duck</button>
        <button id="search-sof" class="ui button small">Stack Overflow</button>
        <button id="search-wiki" class="ui button small">Wikipedia</button>
      </div>
    </div>
  </div>
</div>
<div id="power-search-block">
  Search
</div>
`;

const searchInputSelector = ".power-search input[type=search]"
const searchBlockSelector = "#power-search-block"

const SearchConfig = {
  "google": {
    "btnSelector": "#search-google",
    "icon": "",
    "searchUrl": (q)=>`https://www.google.com/search?q=${q}`
  },
  "ddg": {
    "btnSelector": "#search-duck",
    "icon": "",
    "searchUrl": (q)=>`https://duckduckgo.com/?va=q&t=ha&q=${q}&ia=web`
  },
  "stack-overflow": {
    "btnSelector": "#search-sof",
    "icon": "",
    "searchUrl": (q)=>`https://stackoverflow.com/search?q=${q}`
  },
  "wiki": {
    "btnSelector": "#search-wiki",
    "icon": "",
    "searchUrl": (q)=>`https://en.wikipedia.org/w/index.php?search=${q}`
  },
  "bing": {
    "btnSelector": "#search-bing",
    "icon": "",
    "searchUrl": (q)=>`https://www.bing.com/search?q=${q}`
  },
}

function search(engine) {
  let q = $(searchInputSelector).val()
  q = q.trim() // remove leading or trailing spaces
  //
  if (q==="") return
  q = q.replace(" ", "+")
  // open search page per search engine
  window.open(SearchConfig[engine]["searchUrl"](q), "_blank");
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



$(document).ready(()=>{

  chrome.storage.local.get(['searchLocation']).then((result)=>{
    if (!result.hasOwnProperty('searchLocation') || result.searchLocation==0) {
      $("body").prepend($inject_top_mode);
    } else {
      $("body").prepend($inject_block_mode);
    }
  }).then(()=>{

      //// Search buttons on click event
      Object.keys(SearchConfig).forEach((key)=>{
        $(SearchConfig[key].btnSelector).on('click', ()=>{ search(key) });
      })

      //// On Enter Key of Input
      $(searchInputSelector).on("keypress", (event)=>{
        if (event.key==="Enter") { search('google') }
      });

      $("#power-search-section2 .clear a").click(()=>{
        $(searchInputSelector).val("")
      });

      $(searchInputSelector).on("mouseenter", (event)=>{
        $(event.target).focus();
      });

      $(searchInputSelector).on("mouseleave", (event)=>{
        $(event.target).blur();
      });

      $(searchBlockSelector).on("mouseenter", ()=>{
        $("#power-search-section2").removeClass("hide");
        $("#power-search-section2").addClass("show");
        $("#power-search-section2").css('z-index', 20000)
        $(searchInputSelector).focus();
      });

      $("#power-search-section2").on("click", ()=>{
        $("#power-search-section2").removeClass("show");
        $("#power-search-section2").addClass("hide");
        $(searchInputSelector).blur();
      });

      $(".wrapper").on("click", (event)=>{
        event.stopPropagation();
      })

  })

}) // $.ready  

})()