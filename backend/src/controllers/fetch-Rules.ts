import fetch from "node-fetch"
import * as fs from "fs"

interface GitHubFileResponse {
    content: string;
    [key: string]: any;
  }

export const fetchAndSaveFile = async (url: string) => {
    try {
        const response = await fetch("https://api.github.com/repos/thewca/wca-regulations/contents/" + url);
        const data = await response.json() as GitHubFileResponse;
        const content = Buffer.from(data.content, 'base64').toString('utf8');
        const localFilePath = "././src/rules/" + url;
        fs.writeFileSync(localFilePath, content, 'utf8');
    }
    catch (error) {
        console.log(error);
    }
}