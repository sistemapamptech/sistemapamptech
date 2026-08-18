exports.handler = async function (event, context) {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    try {
        let url = GOOGLE_SCRIPT_URL;
        
        // Repassa query strings (ex: ?aba=Produtos)
        if (event.rawQuery) {
            url += `?${event.rawQuery}`;
        }

        const options = {
            method: event.httpMethod,
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            }
        };

        if (event.body) {
            options.body = event.body;
        }

        const response = await fetch(url, options);
        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "erro", message: error.message })
        };
    }
};