require('dotenv').config()
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import './utils/connection'
import multer from 'multer'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'

import Upload from './models/upload'

import apiViews from './views/api'
import siteViews from './views/site'

import admin, { adminBro } from './admin'

const { API_KEY, API_SECRET, CLOUD_NAME } = process.env

cloudinary.config({
  api_key: API_KEY,
  api_secret: API_SECRET,
  cloud_name: CLOUD_NAME,
})

const upload = multer({
  storage: multer.memoryStorage(),
})

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(adminBro.options.rootPath, admin)

app.use('/', siteViews)
app.use('/api', apiViews)

app.use('/upload', upload.single('image'), async (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result)
        } else {
          error.code = 'E_INVALID_ARG'
          console.error(error)
          reject(error)
        }
      })

      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }

  async function upload(req) {
    try {
      let result = await streamUpload(req)
      return result
    } catch (e) {
      console.error(`[${e.code}]: ${e.message}`)
    }
  }

  const resp = await upload(req)

  const doc = new Upload({
    title: req.body.title,
    description: req.body.description,
    url: resp.url,
    secure_url: resp.secure_url,
  })

  doc.save()

  res.json(doc)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
