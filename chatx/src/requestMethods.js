import axios from "axios"
const BASE_URL = "http://localhost:5000/api"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNlNzEwYzYwMWIwMDk1YmRiODU1NDAiLCJ1c2VyTmFtZSI6InNhbGlsdGhlZ3JlYXQiLCJpYXQiOjE2OTEzMDE3NjQsImV4cCI6MTY5MTczMzc2NH0.5sbyTKFoWq-hXvGQVk6JWxlhBopnAFygQwS0lUQM3tQ"

export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{
        Authorization:`Bearer ${token}`
    }
})