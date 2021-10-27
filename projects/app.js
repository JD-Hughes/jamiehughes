function openArticle(articleNumber){
  var el = document.getElementById(`article-${articleNumber}`);
    el.classList.add("is-active");
}
//關閉
function closeArticle(articleNumber){
  var el = document.getElementById(`article-${articleNumber}`);
    el.classList.remove("is-active");
}

function openLink(linkID){
  switch (linkID) {
    case 1:
      window.open("https://www.chatchaos.tv/",'_blank');
      break;
    case 2:
      window.open("https://www.jamiehughes.info/photography",'_blank');
      break;
  
    default:
      alert("Link not found!")
      break;
  }
}
