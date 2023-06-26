
export function getReadableDate(dateAsStr){
    const date = new Date(dateAsStr);
    return date.toLocaleDateString("en-GB", {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace("/", "-");
}