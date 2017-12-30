/**
 * Created by Benzo
 * https://benzo.io
 * User: oreuveni
 * Date: 28/12/2017
 * Time: 20:37
 **/
import $ from 'jquery'
import axios from 'axios'
import * as constants from './constants'
import {addToHistory} from "./sidebar"

$(document).ready(() => {
    var page = 0

    //Function fires when form submits
    $('#search-form').on('submit', e => {
        e.preventDefault()
        page = 1
        searchPhotos(page)
    })

    //Pagination
    $('#next-page').on('click', () => {
        page = page + 1
        searchPhotos(page, false)
    })

    $('#prev-page').on('click', () => {
        page = page - 1
        if(page = 0) {
            page = 1
        }
        searchPhotos(page, false)
    })

    //Clear results
    $('#clear-results').on('click', e => {
        e.preventDefault()

        //Clear input value
        $('#search-form input').val("")

        //Clear current results from page
        var imagesDiv = document.getElementById('images-div')
        imagesDiv.innerHTML = ""

        //Show no-results message
        $('.no-results-div').show()

        //Hide navigation
        $('.navigation-div').removeClass('shown')

        //Hide clear button
        $('#clear-results').fadeOut()

    })

})

//Function that searches photos and prints them on the page
function searchPhotos(page, writeHistory = true) {
    var query = $('#search-form input').val()
    if(query === "") return

    //Hide message
    $('.message-div').hide()
    //Show Spinner
    $('#spinner').show()

    //Clear current results from page
    var imagesDiv = document.getElementById('images-div')
    imagesDiv.innerHTML = ""

    //Get photos from Flickr

    getPhotos(query, page).then(response => {
        var images = response.photos.photo

        //Create an HTML list of all the images
        var ul = document.createElement('ul')
        ul.className = "images-list"

        for (var image of images) {
            var li = renderImage(image)
            ul.appendChild(li)
        }

        //Hide Spinner
        $('#spinner').hide()

        //Add images to page
        imagesDiv.appendChild(ul)

        //Show clear button
        $('#clear-results').fadeIn()

        //Show navigation div
        $('.navigation-div').addClass('shown')

        //Add query to history
        if(writeHistory) {
            addToHistory(query, response.photos.total)
        }

    }).catch(error => {
        console.log(error)
        //Show error message
        $('.error-div').show()
    })
}

//Creates an HTML list item from image data
function renderImage(image) {
    var src = imageToSrc(image)
    var img = document.createElement('img')
    img.src = src

    var li = document.createElement('li')
    li.appendChild(img)
    return li
}

//Creates a source URL from image data
function imageToSrc(image) {
    let src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
    return src
}

//Fetches images from Flickr
function getPhotos(query, page) {
    return new Promise((resolve, reject) => {
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${constants.FLICKR_API_KEY}&nojsoncallback=1&text=${query}&format=json&safe_search=3&content_type=1&page=${page}`
        axios.get(url).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}