const berryList = document.getElementById("berry-list");
const searchInput = document.getElementById("search");

let berries = []; // Store fetched berries

// ---------------------------
// Fetch berries from API
// ---------------------------
async function loadBerries() {
  try {
    const response = await fetch("/api/berries");
    if (!response.ok) throw new Error("Failed to fetch berries");

    berries = await response.json();
    displayBerries(berries);
  } catch (err) {
    berryList.textContent = `Error loading berries: ${err.message}`;
  }
}

// ---------------------------
// Display berries as collapsible cards
// ---------------------------
function displayBerries(list) {
  berryList.innerHTML = "";

  if (list.length === 0) {
    berryList.textContent = "No berries found.";
    return;
  }

  list.forEach(berry => {
    const card = document.createElement("div");
    card.className = "berry-card";

    // Create card content
    card.innerHTML = `
      <h2 class="berry-name">${berry.name}</h2>
      <div class="berry-details" style="display: none;">
        <!-- Future image placeholder -->
        <img class="berry-image" src="${berry.image_url ?? ""}" alt="${berry.name}" style="display:none; width: 100px; margin-bottom: 10px;" />
        <p><span class="label">Sweetness:</span> ${berry.sweetness ?? "N/A"}</p>
        <p><span class="label">Tartness:</span> ${berry.tartness ?? "N/A"}</p>
        <p><span class="label">Origin:</span> ${berry.origin ?? "Unknown"}</p>
        <p><span class="label">Bio:</span> ${berry.bio ?? "No description"}</p>
        <p><span class="label">Fun Fact:</span> ${berry.fun_fact ?? "None"}</p>
      </div>
    `;

    // Toggle details on click
    card.querySelector(".berry-name").addEventListener("click", () => {
      const details = card.querySelector(".berry-details");
      if (details.style.display === "none") {
        details.style.display = "block";

        // Show image if provided
        const img = details.querySelector(".berry-image");
        if (img.src) img.style.display = "block";
      } else {
        details.style.display = "none";
      }
    });

    berryList.appendChild(card);
  });
}

// ---------------------------
// Filter berries as user types
// ---------------------------
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = berries.filter(berry => berry.name.toLowerCase().includes(query));
  displayBerries(filtered);
});

// ---------------------------
// Load berries when page loads
// ---------------------------
loadBerries();