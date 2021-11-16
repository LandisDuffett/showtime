module.exports = (temp, show) => {
  let output = temp.replace(/{%SHOW_NAME%}/g, show.Title);
  output = output.replace(/{%DIRECTOR%}/g, show.Director);
  output = output.replace(/{%ID%}/g, show.Id);
  output = output.replace(/{%YEAR%}/g, show.Year);
  output = output.replace(/{%PLOT%}/g, show.Plot);
  output = output.replace(/{%RATED%}/g, show.Rated);
  output = output.replace(/{%ACTORS%}/g, show.Actors);
  output = output.replace(/{%COUNTRY%}/g, show.Country);
  output = output.replace(/{%POSTER%}/g, show.Poster);
  output = output.replace(/{%IMAGE%}/g, show.Images[0]);
  return output;
}