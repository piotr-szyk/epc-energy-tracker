const searchHandler = async (event) => {
  event.preventDefault();
  const postcode = document.querySelector('#postcode-input').value.trim();
  const resultsContainer = document.querySelector('#search-results-container');

  if (postcode) {
    resultsContainer.innerHTML = '<p class="muted">Searching Government Database and fetching recommendations...</p>';
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ postcode }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        renderResults(data);
      } else {
        resultsContainer.innerHTML = '<p class="text-danger">No data found for that postcode.</p>';
      }
    } catch (err) {
      resultsContainer.innerHTML = '<p class="text-danger">Connection error.</p>';
    }
  }
};

const saveFavoriteHandler = async (event) => {
  const btn = event.target;
  const propertyData = {
    address: btn.getAttribute('data-address'),
    postcode: btn.getAttribute('data-postcode'),
    current_rating: btn.getAttribute('data-rating'),
    current_score: btn.getAttribute('data-score'),
    potential_rating: btn.getAttribute('data-pot-rating'),
    potential_score: btn.getAttribute('data-pot-score'),
    lmk_key: btn.getAttribute('data-lmk')
  };

  try {
    const response = await fetch('/api/search/save', {
      method: 'POST',
      body: JSON.stringify(propertyData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      btn.innerText = 'Saved! ✅';
      btn.classList.replace('btn--primary', 'btn--success');
      btn.disabled = true;
      setTimeout(() => location.reload(), 1000);
    }
  } catch (err) {
    console.error('Save error:', err);
  }
};

const deleteFavoriteHandler = async (event) => {
  const btn = event.target.closest('.btn--danger');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  if (!id) return;
  try {
    const response = await fetch(`/api/search/${id}`, { method: 'DELETE' });
    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to remove property.');
    }
  } catch (err) {
    console.error('Delete error:', err);
  }
};

const renderResults = (properties) => {
  const container = document.querySelector('#search-results-container');
  if (!properties || properties.length === 0) {
    container.innerHTML = '<p>No results found for this area.</p>';
    return;
  }

  let html = `
    <section class="card">
      <div class="card__header">
        <h3 class="card__title">Search Results</h3>
        <span class="badge">${properties.length} properties found</span>
      </div>
      <div class="list">`;

  properties.forEach(prop => {
    const curRating = (prop['current-energy-rating'] || 'N/A').toUpperCase();
    const potRating = (prop['potential-energy-rating'] || 'N/A').toUpperCase();
    const curScore = prop['current-energy-efficiency'] || '??';
    const potScore = prop['potential-energy-efficiency'] || '??';
    
    html += `
      <div class="list__row" style="flex-direction: column; align-items: flex-start; padding: 20px; border-bottom: 1px solid var(--border);">
        <div style="display: flex; width: 100%; gap: 30px; margin-bottom: 20px; flex-wrap: wrap;">
          <div class="epc-container">
            <div class="epc-header-row">
              <div style="text-align: left; font-size: 9px; color: var(--muted);">ENERGY RATING</div>
              <div style="text-align: center; font-size: 9px; color: var(--muted);">CURRENT</div>
              <div style="text-align: center; font-size: 9px; color: var(--muted);">POTENTIAL</div>
            </div>
            ${['A','B','C','D','E','F','G'].map(letter => `
              <div class="epc-row-wrapper">
                <div class="epc-bar bar-${letter}">${letter}</div>
                <div class="score-box ${curRating === letter ? 'label-' + letter : ''}">
                  ${curRating === letter ? curScore : ''}
                </div>
                <div class="score-box ${potRating === letter ? 'label-' + letter : ''}">
                  ${potRating === letter ? potScore : ''}
                </div>
              </div>`).join('')}
          </div>
          <div style="flex: 1; min-width: 250px;">
            <div class="list__title" style="font-size: 1.2rem; margin-bottom: 5px;"><strong>${prop['address']}</strong></div>
            <div class="list__meta" style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Type:</strong> ${prop['property-type'] || 'Domestic'} (${prop['built-form'] || ''})</p>
              <p style="margin: 5px 0 0 0;"><strong>Postcode:</strong> ${prop['postcode']}</p>
            </div>
            <button class="btn btn--primary btn--sm save-btn" 
              data-address="${prop['address']}" 
              data-postcode="${prop['postcode']}"
              data-rating="${curRating}"
              data-score="${curScore}"
              data-pot-rating="${potRating}"
              data-pot-score="${potScore}"
              data-lmk="${prop['lmk-key']}">
              Save Property
            </button>
          </div>
        </div>
        <div class="recommendations-box">
          <h4 style="margin-top: 0; font-size: 0.9rem; color: var(--text);">Recommended Improvements</h4>
          <table class="rec-table">
            <thead>
              <tr>
                <th>Improvement</th>
                <th style="text-align: right;">Indicative Cost</th>
              </tr>
            </thead>
            <tbody>
              ${prop.recommendations && prop.recommendations.length > 0 
                ? prop.recommendations.map(rec => `
                  <tr>
                    <td>${rec['improvement-descr-text'] || rec['improvement-id-text'] || 'Improvement details unavailable'}</td>
                    <td style="text-align: right;">${rec['indicative-cost'] || 'N/A'}</td>
                  </tr>`).join('')
                : '<tr><td colspan="2" class="muted">No specific recommendations found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>`;
  });

  html += `</div></section>`;
  container.innerHTML = html;

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', saveFavoriteHandler);
  });
};

document.querySelector('.search-form').addEventListener('submit', searchHandler);

const favList = document.querySelector('#favorites-list');
if (favList) {
  favList.addEventListener('click', deleteFavoriteHandler);
}

// Logic to expand/collapse saved property details
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('toggle-details')) {
    const row = event.target.closest('.list__row');
    const details = row.querySelector('.fav-details');
    const isHidden = details.style.display === 'none';
    
    // Toggle visibility
    details.style.display = isHidden ? 'block' : 'none';
    
    // Update button text
    event.target.innerText = isHidden ? 'Hide Details' : 'View Details';
    
    // Optional: Add a subtle background color when expanded
    row.style.background = isHidden ? 'rgba(255, 255, 255, 0.02)' : 'transparent';
  }
});
