export function createMarkupCard([{ capital, population, languages, flags, name }]) {
    return `
    <div class="country">
    
    <div class ="country-head">
    <img class = "country-head__flag" src="${flags.svg}" alt="${name.official}" width = 50/>
    <h2 class = "country-head__title"> ${name.official}</h2>
    </div>
      
      <p class = "country__text">Capital: ${capital}</p>
      <p class="country__text">Population: ${population}</p>
      <p class="country__text">Languages: ${Object.values(languages)}</p>
    </div>`
}

export function createMarkupList ({ flags, name }){
    return `
    <li class = "country-item">
    <img class = "country-item__flags" src="${flags.svg}" alt="${name.official}" width=50/>
    <h2 class = "country-item__name">${name.official}</h2>
    </li>
    `
}