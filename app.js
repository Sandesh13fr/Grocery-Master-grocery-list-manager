let groceryList = [];

for(let i =0 ;i<=groceryList.length-1;i++){
  document.getElementById("items").innerHTML+=  `<div class="item">
  <p>${groceryList[i]}</p>
  <button class="remove-btn">Remove</button>
</div>`;
}

document.getElementById("userInput").addEventListener("keypress",(e)=>{
  if(e.key === "Enter"){
    e.preventDefault();
    value = String(e.target.value)
    groceryList.push(value);
    e.target.value = "";
    console.log(groceryList);
    console.log(value.trim());
    document.getElementById("items").innerHTML+=  `<div class="item">
   <p>${value}</p>
  <button class="remove-btn">Remove</button>
</div>`
  }
})

document.getElementById("items").addEventListener("click",(e)=>{
  if(e.target.classList.contains("remove-btn")){
    e.target.parentElement.remove();
  }
})

document.getElementById("Share").addEventListener("click", async () => {
  const captureDiv = document.getElementById('items');
      const button = this;
      // document.getElementById("remove-btn").style.display = "none";
      try {        // Use html2canvas to capture the div and create a PNG image
        const canvas = await html2canvas(captureDiv);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        // Check if Web Share API is supported
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'div-screenshot.png', { type: 'image/png' })] })) {
          // Share the PNG file
          await navigator.share({
            files: [new File([blob], 'div-screenshot.png', { type: 'image/png' })],
            title: 'My PNG Screenshot',
            text: 'Check out this screenshot I created!',
          });
        } else {
          alert('Your browser does not support sharing files.');
        }
      } catch (error) {
        console.error('Error sharing the image:', error);
        button.textContent = 'Error Sharing';
      }
})

document.getElementById("Download").addEventListener("click",()=>{
  html2canvas(document.getElementById('items')).then(canvas => {
    var link = document.createElement('a');
    link.download = 'grocery-list.png';
    link.href = canvas.toDataURL()
    link.download = 'grocery-list.png';
    link.click();
  });
})

document.getElementById("quit").addEventListener("click",()=>{
  let req = new XMLHttpRequest();
  req.open("GET"," https://api.thecatapi.com/v1/images/search");
  req.onreadystatechange = () => {
    if(req.readyState === 4){
      let response = JSON.parse(req.response);
      console.log(response);
      let URL = response[0].url;
      console.log(URL);
      window.location.href = URL;
    }
  };
  req.send();
});
