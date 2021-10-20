 const calculateStats = (linkObject) => {
    let arrayLinks = [];
    linkObject.forEach(e =>arrayLinks.push(e.href));
    const totalLinks = arrayLinks.length;
    const uniqueLinks = new Set(arrayLinks);
    const unique = [...uniqueLinks].length;
    let brokenLinks = 0;
    linkObject.map((e)=> {
     if (e.statusText === 'FAIL')
     brokenLinks++
    })
    return {
    totalLinks,
    brokenLinks,
    unique,
    }
}

  module.exports = calculateStats