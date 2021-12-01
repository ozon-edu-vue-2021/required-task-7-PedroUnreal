export async function getJson(){
    let json = await fetch("./data.json");
    json = await json.json()
    return json;
}