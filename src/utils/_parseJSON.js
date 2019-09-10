export function _parseJSON(response) {
    return response.text()
        .then( text => {
            return text ? JSON.parse(text) : {}
    })
}