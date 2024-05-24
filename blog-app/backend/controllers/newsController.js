const initialData = require('../data/initialData')
const { request, response } = require('express')
const newsModel = require('../models/newsModel')

const getNews = async(request, response) =>
{
    try{
        const news = await newsModel.find()
        if(news.length === 0)
        {
            const initialNews = await newsModel.insertMany(initialData)
        }
        return response.status(200).json(news)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const addNews = async(request, response) => {
    const newstoBeAdded = request.body

    try
    {
        const existingNews = await newsModel.findOne({Id : newstoBeAdded.Id})
        if(existingNews)
        {
            return response.status(409).send({message: `A news with Id ${newstoBeAdded.Id} already exists`})
        }
        const insertedNews = await newsModel.create(newstoBeAdded)
        response.status(201).json(insertedNews)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const updateNews = async(request, response) => {
    const newstoBeUpdated = request.body

    try
    {
        const updatedNews = await newsModel.updateMany({Id : newstoBeUpdated.Id}, newstoBeUpdated)
        response.status(200).json(updateNews)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

const deleteNews = async(request, response) => {
    const newstoBeDeleted = request.body

    try
    {
        const deletedNews = await newsModel.deleteOne({Id : newstoBeDeleted.Id})
        response.status(200).json(deletedNews)
    }
    catch(error)
    {
        response.status(500).send({message : error.message})
    }
}

module.exports = {getNews, addNews, updateNews, deleteNews}