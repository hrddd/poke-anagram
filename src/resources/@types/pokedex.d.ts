type PokeData = {
  id: number,
  name: {
    english: string,
    japanese: string,
    chinese: string,
    french: string
  },
  type: string[],
  base: {
    HP: number,
    Attack: number,
    Defense: number,
    'Sp. Attack': number,
    'Sp. Defense': number,
    Speed: number
  }
}
type PokeDex = PokeData[];