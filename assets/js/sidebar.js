/**
 * Created by Benzo
 * https://benzo.io
 * User: oreuveni
 * Date: 30/12/2017
 * Time: 10:09
 **/
import $ from 'jquery'

$(document).ready(() => {
    //Open sidebar
    $('#toggle-sidebar').on('click', () => {
        $('#sidebar').addClass('open')
    })

    //Close sidebar
    $('#sidebar .close').on('click', () => {
        $('#sidebar').removeClass('open')
    })


    //Click on history Item
    $('.history-list').on('click', 'li', function () {
        var query = $(this).attr('data-query')
        $('#search-form input').val(query)
        $('#search-form').submit()
        $('#sidebar').removeClass('open')
    })

    //Clear history
    $('#clear-history').on('click', () => {
        var ul = document.getElementById('history-list')
        ul.innerHTML = ""
    })

})


export function addToHistory(query, resultsNo) {
    var time = getDate(new Date())
    var li = document.createElement('li')
    li.className = 'history-item'
    li.setAttribute('data-query', query)
    li.innerHTML = `<span class="time-span">${time}</span><div class="query-div"><span>${query}</span><span>${resultsNo}</span></div>`
    var ul = document.getElementById('history-list')
    ul.prepend(li)
}

function getDate(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    return `${hours}:${minutes}`
}