import music_list from '../public/music_list.json'

const generate_available_alphabets = () => {
  let flags = {};
  return music_list
    .map(x => x.initial)
    .filter(y => y.length === 1 && !flags[y] && (flags[y] = 1))
    .sort() // sorted by default
};

export const song_list = music_list
export const available_alphabets = generate_available_alphabets()
