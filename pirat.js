filters, sorts, styles, ad-removes of PirateBay, working with proxies too// ==UserScript==
// @name         πrat
// @version      1.0.0.4
// @namespace    http://vnhub.net/
// @include      /^(.*?)\/browse.*$/
// @include      /^(.*?)\/search/.*$/
// @include      /^(.*?)\/recent.*$/
// @include      /^(.*?)\/tv.*$/
// @include      /^(.*?)\/music.*$/
// @include      /^(.*?)\/top.*$/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @downloadURL  https://raw.githubusercontent.com/zoltansabjan/pirat/master/pirat.js
// @updateURL    https://raw.githubusercontent.com/zoltansabjan/pirat/master/pirat.js
// @source       https://github.com/zoltansabjan/pirat
// @icon         http://vnhub.net/pirat/images/icon_pirat.png
// @description  filters, sorts, styles, ad-removes of PirateBay, working with proxies too
// @author       Zoltan Sabjan <zoltan.sabjan@gmail.com> http://vnhub.net/
// @copyright    2013+, Zoltan Sabjan
// @run-at document-start
// ==/UserScript==
$(document).ready(modules);

function modules() {
    if(checker() == false) {
        console.log("couldn't find elements");
        return;
    }
    common_content();
    header();
    table_categories();
    table_search();
    remove_ads();
}

function checker(){
    if($('input[value="Pirate Search"]').length == 0) { return false; }
    return true;
}

function common_content(){
    var body = $('body');
    var current_location = $('h2');
    var links = $('a');

    body.css({
		'background': 'url(http://vnhub.net/pirat/images/background_full.jpg) no-repeat center center fixed', 
  		'-webkit-background-size': 'cover',
  		'-moz-background-size': 'cover',
  		'-o-background-size': 'cover',
  		'background-size': 'cover',
        'color': 'rgba(255, 255, 210, 0.7)'
    });

    current_location.prependTo($('#main-content'));
    current_location.prependTo($('#browseContainer'));
    current_location.prepend('<div class="logo_pirat"></div>');
    var logo_pirat = $('.logo_pirat');
    current_location.css({
        'background-color': 'rgba(117, 140, 179, 0.1)',
        'border': 'none',
        'color': 'rgb(209, 209, 209)',
        'text-shadow': 'rgba(0, 0, 0, 0.3) 1px 1px 0px',
		'height': '18px',
        'margin': 'auto'
    });
    logo_pirat.css({
       	'float': 'right',
		'background': 'url(http://vnhub.net/pirat/images/icon_pirat.png)',
  		'-webkit-background-size': 'cover',
  		'-moz-background-size': 'cover',
  		'-o-background-size': 'cover',
  		'background-size': 'cover',
		'height': '75px',
		'width': '52px',
		'position': 'relative',
        'top': '-30px',
        'left': '37px',
        'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 6px 4px -4px'
    });
    
    links.css({
        'color': 'rgba(255, 255, 255, 0.7)'
    });    
}

function header(){
    var container = $('#header');
    var form = container.find('form');
    container.find('img').wrap('<div id="wrapper_logo" style="background: url(http://vnhub.net/pirat/images/tpb.png)"></div>');
    var logo = container.find('#wrapper_logo');

    logo.css({
  		'-webkit-background-size': 'cover',
  		'-moz-background-size': 'cover',
  		'-o-background-size': 'cover',
  		'background-size': 'cover',
        'float': 'left',
        'width': '100px',
        'height': ' 100px',
        'margin': '0px 10px 0px 0px',
        'opacity': '0.5'
    });
    
    container.find('img').remove();
    
    container.css({
        'margin': '10px 0px 20px 0px'
    });
    
    form.css({
        'display': 'inline-block',
        'box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 1px 1px, rgba(0, 0, 0, 0.15) 1px 0px 2px 2px inset, rgba(0, 0, 0, 0.1) 0px 0px 0px 1000px inset',
		'padding': '10px'
    });
    
}

function table_search() {
	var container = $('#main-content');
    var table = container.find('#searchResult');
    var header = container.find('.header');
    var body = container.find('tbody');
    var rows = body.find('.detName').closest('tr');
    var cells = body.find('td');
	var cell_type = body.find('.vertTh');
    var cell_title = body.find('.detName').closest('td');
    var cell_seeders = cell_title.next('td');
    var cell_leechers = cell_seeders.next('td');
    var pages = body.find('td:last').closest('tr');

    container.css({
    	'box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 1px 1px, rgba(0, 0, 0, 0.15) 1px 0px 2px 2px inset, rgba(0, 0, 0, 0.1) 0px 0px 0px 1000px inset',
        'padding': '4px',
        'overflow': 'visible'
    });

    table.css({
    	'border-collapse': 'initial',
        'border-spacing': '0px',
        'position': 'relative',
        'top': '-33px'
    });

    header.css({
        'background-color': 'transparent',
        'height': '33px'
    });
    header.children('th').css({
        'background-color': 'transparent',
        'border': 'none',
        'text-align': 'center'
    });
    rows.css({
        'background-color': 'rgba(53, 63, 82, 0.5)',
        'border-radius': '3px'
    });
    rows.after('<tr class="separator" style="height: 5px;"></tr>');
    cells.css({
        'border': 'none'
    });
    cell_type.css({
        'border-radius': '3px 0px 0px 3px',
        'box-shadow': 'rgba(0, 0, 0, 0.3) -1px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 0px 0px, rgba(0, 0, 0, 0.3) 0px -1px 0px 0px, rgba(255, 255, 255, 0.07) 1px 0px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.01) 0px 20px 10px 0px inset'
    });
    cell_title.css({
        'box-shadow': 'rgba(0, 0, 0, 0.3) 0px -1px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 0px 0px, rgba(255, 255, 255, 0.07) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.01) 0px 20px 10px 0px inset'
    });
    cell_title.find('img[title="VIP"]').closest('tr').addClass('VIP');
    cell_title.find('img[title="Trusted"]').closest('tr').addClass('Trusted');
    body.find('.detName').closest('tr:not(.VIP, .Trusted)').addClass('Untrusted');
    body.find('.Untrusted').next('tr').remove();
    body.find('.Untrusted').remove();  
    cell_title.find('img[title="This torrent has a cover image"]').remove();
    
    cell_seeders.css({
        'box-shadow': 'rgba(0, 0, 0, 0.3) 0px -1px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 0px 0px, rgba(255, 255, 255, 0.07) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.01) 0px 20px 10px 0px inset',
        'text-align': 'center'
    });
    cell_leechers.css({
        'border-radius': '0px 3px 3px 0px',
        'text-align': 'center',
        'box-shadow': 'rgba(0, 0, 0, 0.3) 1px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 0px 0px, rgba(0, 0, 0, 0.3) 0px -1px 0px 0px, rgba(255, 255, 255, 0.07) -1px 0px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.01) 0px 20px 10px 0px inset'
    });
    pages.css({
        'background-color': 'rgba(117, 140, 179, 0.1)',
        'border-radius': '3px'
    });
}

function table_categories(){
	var container = $('#browseContainer');
    var table = container.find('#categoriesTable');
    var body = container.find('tbody');
    
    container.css({
        'text-align': 'center',
        'display': 'inline-block'
    });
}

function remove_ads(){
    $('.ad').remove();
    $('.ads').remove();
    $('iframe').remove();
    $('#sky-right').remove();
}
