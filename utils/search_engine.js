export const content_contains = (object, target) => {
  if (!object || typeof object !== 'object') return false;
  if (!target) return true;
  
  const target_as_str = ( typeof target !== 'string'
                          ? target.toString()
                          : target )
                        .toLowerCase()
                        .replaceAll(/\s/g, ' ');

  for (const [k, v] of Object.entries(object)) {
    if (v
        && v.toString()
            .toLowerCase()
            .replaceAll(/\s/g, ' ')
            .includes(target_as_str)) {
      return true;
    }
  }

  return false;
}
