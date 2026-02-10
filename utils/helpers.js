module.exports = {
  format_date: (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  },

  get_rating_color: (rating) => {
    if (!rating) return 'text-muted';
    const r = rating.toString().toUpperCase();
    if (['A', 'B'].includes(r)) return 'text-success'; 
    if (['C', 'D'].includes(r)) return 'text-warning'; 
    return 'text-danger';
  },

  // ADD THESE TWO HELPERS BELOW:

  // Turns the string "A,B,C,D,E,F,G" into an array so we can loop over it
  split: (str) => {
    if (!str) return [];
    return str.split(',');
  },

  // Checks if the current letter in the loop matches the property's rating
 eq: (a, b) => {
    if (a === undefined || a === null || b === undefined || b === null) return false;
    // Force both to strings, trim spaces, and make uppercase for a perfect match
    return a.toString().trim().toUpperCase() === b.toString().trim().toUpperCase();
}
};