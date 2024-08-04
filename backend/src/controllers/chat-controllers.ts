import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {Document, VectorStoreIndex, SimpleDirectoryReader} from "llamaindex";
import * as llamaIndex from "llamaindex"
import "dotenv/config"


const documents = await new SimpleDirectoryReader().loadData({directoryPath: "/Users/yash/Documents/Mini_Projects/Full Stack Chatbot/backend/src/rules"});
const splitter = new llamaIndex.SentenceSplitter({chunkSize: 1024, chunkOverlap: 0});
const nodes = splitter.getNodesFromDocuments(documents);
const index = await VectorStoreIndex.fromDocuments(nodes);

let customLLM = new llamaIndex.OpenAI({model: "gpt-3.5-turbo"});
let customEmbedding = new llamaIndex.OpenAIEmbedding({model: "text-embedding-ada-002"});
let customServiceContext = llamaIndex.serviceContextFromDefaults({
    llm: customLLM,
    embedModel: customEmbedding
});

let customQaPrompt = function({context = "", query = ""}) {
    return `Context information is below.
        ---------------------
        ${context}
        ---------------------
        Given the context information, answer the query.
        Only reference the WCA guidelines and regulations. 
        If the prompt isn't related to the rules and regulations, ask the user to ask a related question. 
        Try to be as concise as possible.

        Query: ${query}
        Answer:`
};

let customResponseBuilder = new llamaIndex.SimpleResponseBuilder(
    customServiceContext,
    customQaPrompt
);
 
let customSynthesizer = new llamaIndex.ResponseSynthesizer({
    responseBuilder: customResponseBuilder,
    serviceContext: customServiceContext
});

let customRetriever = new llamaIndex.VectorIndexRetriever({
    index: index
});

let customQueryEngine = new llamaIndex.RetrieverQueryEngine(
    customRetriever,
    customSynthesizer
);



export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({message:"User not registered OR Token Malfunctioned"});
        }
        const chats = user.chats.map(({role,content}) => ({role,content})) as ChatCompletionMessageParam[];
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"});

        const response = await customQueryEngine.query({
            query: message
        });

        user.chats.push({role: 'assistant', content: response.toString()});

        await user.save();
        return res.status(200).json({chats: user.chats});
    }
    catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
};
    

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({message: "OK", chats: user.chats});
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
};

export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK"});
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
};