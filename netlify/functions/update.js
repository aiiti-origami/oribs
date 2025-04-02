const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // 送られてきたデータを取得
        const newThreads = JSON.parse(event.body);

        // JSONファイルのパスを取得
        const filePath = path.join(__dirname, "../../threads.json");

        // JSONファイルを上書き保存
        fs.writeFileSync(filePath, JSON.stringify(newThreads, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "更新完了" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
