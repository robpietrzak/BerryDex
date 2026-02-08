const berryList = document.getElementById("berry-list");

fetch("/api/berries")
  .then(res => res.json())
  .then(berries => {
    berryList.innerHTML = "";
    berries.forEach(b => {
      const div = document.createElement("div");
      div.className = "berry";
      div.innerHTML = `
        <h3>${b.name}</h3>
        <p>Sweetness: ${b.sweetness}/5</p>
        <p>Tartness: ${b.tartness}/5</p>
        <p>Origin: ${b.origin}</p>
        <p>${b.bio}</p>
        <p><strong>Fun fact:</strong> ${b.fun_fact}</p>
      `;
      berryList.appendChild(div);
    });
  });