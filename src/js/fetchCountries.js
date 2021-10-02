export default async function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Exception();
    }
    return await response.json();
  } catch (error) {
    const countryError = error({
      text: er,
    });
  }
}
