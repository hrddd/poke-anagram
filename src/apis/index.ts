const getJSON = <T>(config: {
  url: string,
  headers?: { [key: string]: string },
}): Promise<T> => {
  const fetchConfig = ({
    method: 'GET',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  });
  return fetch(config.url, fetchConfig)
    .then<T>(response => response.json());
}

export const getErrorMessage = (e: any) => {
  if (e instanceof Error) {
    return e.message
  } else {
    return 'Undefined Error...'
  }
}

export const loadPokeDex = async () => {
  // mock
  await new Promise((resolve) => {
    setTimeout(() => { resolve() }, 1000)
  })
  return getJSON<PokeDex>({ url: '/pokedex.json' })
};