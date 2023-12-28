let cl = console.log;
const baseurl = "https://api.themoviedb.org/3";
const apiKey = '1ab0b6ee06ec01c77561b6ad6e0c1901';


const makeApiCall = async (apiUrl, methodName, msgBody = null) => {
    let res = await fetch(apiUrl, {
        body: msgBody,
        method: methodName
    })

    return res.json()
}