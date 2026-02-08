module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // This helper will return a CSS class name based on the energy rating
  get_rating_color: (rating) => {
    const r = rating.toUpperCase();
    if (['A', 'B'].includes(r)) return 'text-success'; // Green
    if (['C', 'D'].includes(r)) return 'text-warning'; // Yellow/Orange
    return 'text-danger'; // Red for E, F, G
  }
};