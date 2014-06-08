// ==UserScript==
// @name         π-rat
// @version      1.0.0.6
// @namespace    http://vnhub.net/
// @include      /^(.*?)\/browse.*$/
// @include      /^(.*?)\/search/.*$/
// @include      /^(.*?)\/recent.*$/
// @include      /^(.*?)\/tv.*$/
// @include      /^(.*?)\/music.*$/
// @include      /^(.*?)\/top.*$/
// @include      /^(.*?)\/torrent.*$/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @downloadURL  https://raw.githubusercontent.com/zoltansabjan/pirat/master/pirat.js
// @updateURL    https://raw.githubusercontent.com/zoltansabjan/pirat/master/pirat.js
// @source       https://github.com/zoltansabjan/pirat
// @icon         http://vnhub.net/pirat/images/icon_pirat.png
// @description  filters, sorts, styles, ad-removes of PirateBay, working with proxies too
// @author       Zoltan Sabjan <zoltan.sabjan@gmail.com> http://vnhub.net/
// @copyright    2013+, Zoltan Sabjan
// @run-at document-end
// ==/UserScript==
$(document).ready(modules);

function modules() {
    if(checker() == false) {
        console.log("couldn't find elements");
        return;
    }
    check_iframe();
    common_content();
    header();
    table();
    remove_ads();
    menu();
    send_stats();
}

function checker(){
    if($('input[value="Pirate Search"]').length == 0) { return false; }
    return true;
}

function check_iframe(){ // checks if Pirate Bay is loaded into an iframe
    if (window.top != window.self){
     	window.top.location.href = window.self.location.href;
    }
}

function common_content(){
    var body = $('body');
    var current_location = $('h2');
    var links = $('a');

    body.css({
		'background': 'url(http://vnhub.net/pirat/images/background_full_2.jpg) no-repeat center center fixed', 
  		'-webkit-background-size': 'cover',
  		'-moz-background-size': 'cover',
  		'-o-background-size': 'cover',
  		'background-size': 'cover',
        'color': 'rgba(255, 255, 210, 0.7)',
        'font-family': 'Verdana, Arial, Helvetica, sans-serif',
		'font-size': '12px'
    });

    current_location.prependTo($('#main-content'));
    current_location.prependTo($('#browseContainer'));
    current_location.prepend('<div class="logo_pirat"></div>');
    $('#browseContainer').css({
    	'width': '700px',
		'margin': 'auto'
    });
    var logo_pirat = $('.logo_pirat');
    current_location.css({
        'background-color': 'rgba(250, 255, 187, 0.1)',
        'border': 'none',
        'border-radius': '2px',
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
        'color': 'inherit',
        'font-family': 'inherit',
		'font-size': 'inherit',
        'font-weight': 'inherit'
    });
}

function menu(){
  	var logo_pirat = $('.logo_pirat');
    
    logo_pirat.hover(
  		function() {
    		$(this).prepend('<div class="menu menu_1"></div>');
  		}, function() {
    		//$(this).find('div').remove();
  		}
	);
    var menu_1 = $('.menu_1');
    
    menu_1.css({
        'position': 'relative'
    });
}

function header(){
    css_inject('textarea:focus, input:focus { outline: 0; }');
    
    var container = $('#header');
    var form = $('form');
    form.before('<div id="wrapper_logo" style="background: url(http://vnhub.net/pirat/images/tpb.png)"></div>');
    var logo = container.find('#wrapper_logo');
    var inputbox = container.find('.inputbox');

    logo.css({
  		'-webkit-background-size': 'cover',
  		'-moz-background-size': 'cover',
  		'-o-background-size': 'cover',
  		'background-size': 'cover',
        'width': '95px',
        'height': '95px',
        'margin': '0px 10px 0px 0px',
        'opacity': '0.7',
        'display': 'inline-block',
        'position': 'relative',
		'top': '2px'
    });
    
    container.find('img, .img').remove();
    
    container.css({
        'margin': '10px 0px 20px 0px',
        'text-align': 'center'
    });
    
    form.css({
        'display': 'inline-block',
        'box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.9) 0px 0px 1px 0px inset, rgba(0, 0, 0, 0.07) 0px 0px 0px 1000px inset',
		'padding': '10px',
        'width': '640px',
        'border-radius': '3px'
    });
    inputbox.css({
        'background-color': 'transparent',
		'border': 'none',
        'box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.9) 0px 0px 1px 0px inset, rgba(0, 0, 0, 0.1) 0px 0px 0px 10px inset',
		'border-radius': '3px',
        'color': 'rgba(255, 255, 210, 0.7)',
		'text-shadow': 'rgba(0, 0, 0, 0.15) -1px -1px 0px',
        'vertical-align': 'middle'
    });
}

function table() {
	var container = $('table').closest('div#main-content');
    var table = container.find('table');
    var header = container.find('.header');
    var body = container.find('tbody');
    var rows = body.find('.detName').closest('tr');
    var cells = body.find('td');
	var cell_type = body.find('.vertTh');
    var cell_title = body.find('.detName').closest('td');
    var cell_seeders = cell_title.next('td');
    var cell_leechers = cell_seeders.next('td');
    var description = container.find('.detDesc');
    var pages = body.find('td:last').closest('tr');

    container.attr('style', 'margin: auto !important');
    container.css({
        'box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.9) 0px 0px 1px 0px inset, rgba(0, 0, 0, 0.07) 0px 0px 0px 1000px inset',
        'padding': '4px',
        'overflow': 'visible',
        'border-radius': '2px',
        'text-align': 'center',
        'min-width': '700px',
        'max-width': '1200px',
        'display': 'table'
    });

    table.css({
    	'border-collapse': 'initial',
        'border-spacing': '0px',
        'position': 'relative',
        'top': '-33px',
        'margin-bottom': '-33px'
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
        'background-color': 'rgba(105, 99, 67, 0.3)',
        'border-radius': '2px',
        'height': '40px'
    });
    rows.after('<tr class="separator" style="height: 5px;"></tr>');
    cells.css({
        'border': 'none',
        'height': '40px',
        'paadding': '0px'
    });
    cell_type.css({
        'border-radius': '2px 0px 0px 2px',
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
        'border-radius': '0px 2px 2px 0px',
        'text-align': 'center',
        'box-shadow': 'rgba(0, 0, 0, 0.3) 1px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 0px 0px, rgba(0, 0, 0, 0.3) 0px -1px 0px 0px, rgba(255, 255, 255, 0.07) -1px 0px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.07) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.01) 0px 20px 10px 0px inset'
    });
    description.css({
        'color': 'rgba(148, 142, 127, 1)',
		'text-shadow': 'rgba(0, 0, 0, 0.1) -1px -1px 0px'
    });
    pages.css({
        'background-color': 'rgba(117, 140, 179, 0.1)',
        'border-radius': '2px'
    });
}

function remove_ads(){
    $('.ad').remove();
    $('.ads').remove();
    $('iframe').remove();
    $('#sky-right').remove();
    html_cleanup();
}

function html_cleanup() {
window.alert = function() {};
}

function send_stats(){
    data = "dsfgdg";
    $.ajax({
    	type: "GET",
    	url: "test2.php",
    	data: data
    }).done(function( msg ) {
    	alert( "Data Saved: " + msg );
    });
}

function css_inject() { // unlimited css-objects as arguments, "css_inject('elem { styles; }', 'elem2 { styles; }'" --> ie.: "css_inject('.disable-hover { pointer-events: none; border: none; }')"
    var link = window.document.createElement('link');
	var argument_vault_array = [];
    for (var i = 0; i < arguments.length; i++) {
    	argument_vault_array.push(arguments[i]);
  	}
    var argument_vault = argument_vault_array.join('');
    link.rel = 'stylesheet';
	link.type = 'text/css';
    link.href = 'data:text/css,' + argument_vault + ' !important';
    document.getElementsByTagName("HEAD")[0].appendChild(link);
}
