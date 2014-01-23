var itemHeight = 800;
var _didScroll = true;

var i, len, cur, curLoc, p;
var global;
var item, piece;
var items = [];
var windowTop = 0;
var realWindowTop = 0;
var myScroll;
var windowHeight;
var contentHeight;
var frameRate = 20;
var fileToLoad = 0;
var fileLoaded = 0;
var smoothing = true;
var directLink = false;
var tDirectLink = null;
var noHashChange = false;
var urlShareFB, urlShareTT;
var sharePourcent = 0;
var shareBlack = true;
var menuEnabled = true;
	
var ext = (isMobileLow || isMobileVeryLow) ? "jpg" : "gif";
var imgPath = (isMobileLow || isMobileVeryLow) ? "low/" : "gif/";

var labels = {
	"soleilnoir": "Soleil Noir",
	"iOS": "iOS",
	"ideas": "your ideas",
	"thefuture": "the Future",
	"isnotmylover": "Michael",
	"typo": "Typography"
};

$(document).ready(function(){
	
	global = {
		window: $(window),
		body: $('body'),
		loader: $('#loader'),
		turnYourPhone: $('#turnYourPhone'),
		main: $('#main'),
		container: $('#container'),
		ul: $('ul.bg'),
		navArrow: $('#nav #arrow'),
		navDots: $('#nav #dots ul'),
		nav: $('#nav'),
		share: $('#share'),
		shareBlack: $('#share .black'),
		shareFB: $('#share .fb'),
		shareTT: $('#share .tt')
	};
	
	menuEnabled = !(isMobile || isMobileLow || isMobileVeryLow);
	
	/////// LOADER

	global.loader.show();
	global.loader.css('opacity', 0);
	global.loader.animate({ opacity: 1 }, { duration: 600 });
	
	/////// SHARE
	
	urlShareFB = global.shareFB.attr('href').replace(baseUrl, '');
	urlShareTT = global.shareTT.attr('href').replace(baseUrl, '');
	
	cur = curLoc = 0;
	windowHeight = global.window.height();
	
	var list = $('ul.bg li');
	len = list.length;
	
	for(var i = 0; i < len; i++)
	{
		item = {};
		item.elt = $( list[ i ] );
		item.noCache = item.elt.hasClass('noCache');
		item.isBlack = item.elt.hasClass('black');
		item.color = item.elt.css('background-color');
		item.id = item.elt.attr('id');
		item.startOrEnd = (i == 0 || i == len - 1);
		
		item.imgFile = new Image();
		item.imgFile.className = "gif";
		item.imgFile.src = 'img/' + imgPath + item.id + '.' + ext;
		item.imgFile.onload = onImageLoad;
		$(item.imgFile).error(onImageError);
		fileToLoad++;
		
		if(!item.startOrEnd)
		{
			item.txtFile = new Image();
			item.txtFile.className = "txt";
			item.txtFile.src = 'img/txt/' + item.id + '.png';
			item.txtFile.onload = onImageLoad;
			$(item.txtFile).error(onImageError);
			fileToLoad++;
			
			item.logoFile = new Image();
			item.logoFile.className = "logo";
			item.logoFile.src = 'img/logos/' + item.id + '.png';
			item.logoFile.onload = onImageLoad;
			$(item.logoFile).error(onImageError);
			fileToLoad++;
		}
		
		if(isMobile)
		{
			item.elt.css('position', 'absolute');
			item.elt.css('height', windowHeight);
		}
		else if(isMobileVeryLow)
		{
			item.elt.css('position', 'relative');
			item.elt.css('height', windowHeight);
		}
		else
		{
			item.elt.css('position', 'fixed');
		}
		
		items[ i ] = item;
	}
	
	if(!menuEnabled)
	{
		global.nav.hide();
	}
	
	global.share.hide();
	
	if(isMobile)
	{
		global.share.css('position', 'absolute');
	}
	
	if(!isMobile || isMobileVeryLow)
	{
		$("#scrollContainer").remove();
	}
	
	$('ul.bg').width( global.window.width() );
});

//// PRELOAD

function onImageError()
{
	var tmp = this.src.split('/');
	id = tmp[ tmp.length - 1 ];
	tmp = id.split('.');
	id = tmp[ 0 ];
	var toRemove = [];
	for(var i = 0; i < items.length; i++){
		if(items[ i ].id == id)
			toRemove.push(i);
	}
	for(var j = 0; j < toRemove.length; j++)
		items.splice( toRemove[j], 1 );
	len = items.length;
	$('ul.bg li#' + id).remove();
	fileToLoad--;
	
	if(fileLoaded == fileToLoad)
		init();
}

function onImageLoad()
{
	fileLoaded++;
	
	if(fileLoaded == fileToLoad){
		setTimeout(onLoadComplete, 0);
	}
}

function onLoadComplete()
{
	if(global.loader.css('opacity') == 0){
		init();
		return;
	}
	
	global.loader.stop();
	global.loader.animate({ opacity: 0 }, { duration: 600, complete: init });
}

function init()
{
	global.main.show();
	
	$('#go')
	.css('display', 'block')
	.css('opacity', 0);
	
	$('#restart')
	.css('display', 'block')
	.css('opacity', 0);
	
	$('#go').html('<img src="img/nav/scroll.'+ ext +'"/>');
	$('#restart').html('<img src="img/nav/restart.gif"/>');
	
	if(isMobileVeryLow){
		initVeryLow();
		return;
	}
	
	var dotColor;
	piece = 1 / (len-1);
	for(var i = 0; i < len; i++)
	{
		item = items[ i ];
		item.pMin = piece * (i - 1);
		item.pMax = item.pMin + piece;
		
		global.navDots.append('<li id="'+item.id+'"><a href="javascript:;"></a></li>');
		
		if(i == 0 || i == len - 1 )
			dotColor = '#e4dacc';
		else if(item.id == "soleilnoir")
			dotColor = '#fdd7b9';
		else
			dotColor = item.color;
		
		item.dot = global.navDots.find('li#' + item.id);
		item.dot.css('background-color', dotColor);
		
		item.img = $(item.imgFile);
		item.imgAppend = false;
		
		item.txt = $(item.txtFile);
		item.elt.append( item.txt );
		
		item.logo = $(item.logoFile);
		item.elt.append( item.logo );
		item.logo.css({
			'margin-top' : - item.logo.height(),
			'margin-bottom' : - item.logo.height(),
			'top' : '50%',
			'bottom' : '50%'
		});
		
		items[ i ] = item;
	}
	
	$('#restart').bind("click", onRestart);
	
	if(menuEnabled)
	{
		global.navDotsLi = $('#nav #dots ul li');
		global.navDotsLi.bind("click", onDotClick);
		global.navDots.find('li#start').addClass('cur');
		
		global.nav.css("margin-right", -60);
		global.nav.animate({ "margin-right": 0 }, { duration: 400 });
	}
	
	global.share.show();
	global.share.css("margin-right", -60);
	global.share.animate({ "margin-right": 0 }, { duration: 400 });
	
	global.shareFB
	.bind("click", onShareFB)
	.bind("mouseover", onShareOver)
	.bind("mouseout", onShareOut);
	
	global.shareTT
	.bind("click", onShareTT)
	.bind("mouseover", onShareOver)
	.bind("mouseout", onShareOut);
	
	if(isMobile)
	{
		$('#restart').hide();
		$('#scroller').height( (len-1) * itemHeight );
		
		//////////////////////////
		//// iScroll
		
		myScroll = new iScroll('scroller', { bounce: false, desktopCompatibility: true });
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', onOrientationChange, false);
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}
	else
	{
		global.container.height( (len-1) * itemHeight );
	}
	
	setContainerHeight();
	
	onResize();
	global.window
		.scroll(function(e){ _didScroll = true; })
		.resize(onResize)
		.bind('hashchange', onHashChange);
	
	setTimeout(onEnterFrame, frameRate);
	
	/** DIRECT LINK **/
	
	if(getHash() != '')
	{
		directLink = true;
		tDirectLink = setTimeout(function(){
			onHashChange();
			directLink = false;
		}, (isMobile) ? 1000 : 4000);
	}
	
	/**/
	
	onChangePage();
}

function initVeryLow()
{
	$('#go').css('opacity', 1);
	
	for(var i = 0; i < len; i++)
	{
		item = items[ i ];
		item.pMin = piece * (i - 1);
		item.pMax = item.pMin + piece;
		
		item.img = $(item.imgFile);
		item.elt.append( item.img );
		item.imgAppend = false;
		
		item.txt = $(item.txtFile);
		item.elt.append( item.txt );
		
		item.logo = $(item.logoFile);
		item.elt.append( item.logo );
		
		item.elt.css('position', 'relative');
		item.elt.css('height', global.window.height());
		
		items[ i ] = item;
	}
	
	$('#restart').attr('href', '#start');
}

function onResize()
{
	_didScroll = true;
	windowHeight = global.window.height();
	contentHeight = (isMobile) ? $('#scroller').height() : global.container.height();
	
	sharePourcent = global.share.height() / windowHeight;
	if(menuEnabled)
	{
		var posTop = (windowHeight - global.navDots.height()) / 2;
		if(windowHeight - global.share.height() < posTop + global.navDots.height())
			posTop = (windowHeight - global.share.height() - global.navDots.height()) / 2;
		global.navDots.css('margin-top', posTop);
		global.nav.css('height', windowHeight - global.share.height());
	}
}

function onOrientationChange()
{
	onResize();
	setContainerHeight();
	onEnterFrame();
	
	if(isMobile && !isIpad && window.orientation == 90)
	{
		global.turnYourPhone.show();
		global.share.hide();
		global.main.hide();
	}
	else
	{
		global.turnYourPhone.hide();
		global.main.show();
		global.share.show();
	}
}

function setContainerHeight() 
{
	var h = (isMobile) ? windowHeight : (len-1) * itemHeight;
	global.container.height( h );
}

//// UI

function onShareOver(e)
{
	e.preventDefault();
	$(this).css('opacity', 0.5);
}

function onShareOut(e)
{
	e.preventDefault();
	$(this).css('opacity', 1);
}

function onShareFB(e)
{
	var _id = items[ curLoc ].id;
	_id = ( curLoc == 0 || curLoc == len - 1 ) ? "" : _id;
	$(this).attr('href', urlShareFB + baseUrl + _id);
}

function onShareTT(e)
{
	var _id = items[ curLoc ].id;
	var label = ( labels[_id] != undefined ) ? labels[_id] : _id.ucfirst();
	label = ( curLoc == 0 || curLoc == len - 1 ) ? "" : " in " + label;
	var msg = "If you don't believe"+ label +" you won't make it in 2012! - Happy New year from @SN_Studio";
	_id = ( curLoc == 0 || curLoc == len - 1 ) ? "" : _id;
	$(this).attr('href', urlShareTT + encodeURI(msg + " " + baseUrl + _id) );
}

function onRestart(e)
{
	e.preventDefault();
	scrollToItem(0);
}

function onDotClick(e)
{
	e.preventDefault();
	var id = $(this).attr('id');
	var o = getItemById(id);
	scrollToItem(o.i);
}

///// URL REWRITING

function getHash()
{
	var hash = window.location.hash.replace('#/', '');
	var item = getItemById(hash);
	if(item != null)
		return item;
	return '';
}

function getItemById(id)
{
	for(var i = 0; i < len; i++)
	{
		if(items[ i ].id == id && i != curLoc)
		{
			return { i: i, item: items[ i ] };
		}
	}
	return null;
}

function onHashChange()
{
	var o = getHash();
	if(o == '') return;
	
	scrollToItem(o.i);
}

function onChangePage()
{
	setHash();
	setCurNavDot();
	
	if(curLoc == 0)
	{
		displayButtonIn('#go', (isMobileLow || isMobileVeryLow) ? 0 : 3);
	}
	else if(curLoc == len - 1)
	{
		displayButtonIn('#restart', 1);
	}
}

function displayButtonIn(id, time)
{
	$(id).stop();
	$(id).css('opacity', 0);
	setTimeout(function(){
		$(id).animate({ opacity: 1 }, { duration: 600 });
	}, time * 1000);
}

function setHash()
{
	if(directLink) return;
	var id = items[ curLoc ].id;
	window.location.hash = "/" + id;
}

function setCurNavDot()
{
	if(directLink || !menuEnabled) return;
	global.navDotsLi.each(function()
	{
		$(this).removeClass('cur');
		if( items[ curLoc ].id ==  $(this).attr('id') )
			$(this).addClass('cur');
	});
}

//// SCROLL

function scrollToItem(i, time)
{
	var coef = Math.abs( cur - i ) + 1;
	time = (time == undefined) ? coef * 200 : time;
	if( items[ i ] == undefined ) return;
	onEnterFrame();
	var pos = items[ i ].pMax * (contentHeight - windowHeight) + 4;
	if( pos < 0 ) return;
	if( isMobile )
		myScroll.scrollTo( 0, -pos, time +'ms' );
	else
		$.scrollTo( pos, time );
}

function appendFile(item)
{
	if(item.imgAppend) return;
	item.elt.prepend( item.img );
	var rand = (item.noCache) ? '?' + Math.floor(Math.random()*100) : '';
	item.img.attr('src', item.img.attr('src') + rand );
}

function switchBlackWhite(_black)
{
	_black = (_black == undefined) ? false : _black;
	var _h = parseInt( global.shareBlack.css('height') );
	if( shareBlack == _black || (_h != 0 && _black) || (_h == 0 && !_black) ) return;
	
	shareBlack = _black;
	global.shareBlack.stop();
	global.shareBlack.animate({ 'height': (_black) ? 101 : 0 }, { duration: 500 });
}

//// ENTERFRAME

function onEnterFrame()
{
	if(isMobile)
		setContainerHeight();
	
	realWindowTop = (isMobile) ? Math.abs( $('#scroller').position().top ) : global.window.scrollTop();
	
	if(smoothing)
		windowTop += (realWindowTop - windowTop) / 4;
	else
		windowTop = realWindowTop;
	
	if(_didScroll)
	{
		if(tDirectLink != null && curLoc != 0)
		{
			clearTimeout(tDirectLink);
			tDirectLink = null;
			directLink = false;
			onChangePage();
		}
		
		var h, top, i, shareP;
		p = windowTop / (contentHeight - windowHeight);
		
		if(menuEnabled)
		{
			var arrowPos = parseInt(global.navDots.css('margin-top')) - 1490;
			arrowPos += ((len-1) * 24) * p;
			global.navArrow.css('background-position', '0px ' + arrowPos + 'px' );
		}
		
		for(i = 0; i < len; i++)
		{
			item = items[ i ];
			
			if(cur != i && p >= item.pMin && p < item.pMax)
			{
				cur = i;
			}
			
			if(p >= item.pMin + piece / 2 && p < item.pMax + piece / 2)
			{
				if(curLoc != i)
				{
					curLoc = i;
					onChangePage();
				}
			}
			
			if(p >= item.pMin + sharePourcent * piece && p <= item.pMax + sharePourcent  * piece)
			{
				switchBlackWhite( item.isBlack );
			}
		}
		
		if(cur == undefined && cur != len - 1)
			cur = len - 1;
		
		for(i = 0; i < len; i++)
		{
			item = items[ i ];
			
			if(i == cur || i == cur - 1)
			{
				item.elt
				.css('display', 'block');
				appendFile(item);
				item.imgAppend = true;
			}
			else
			{
				item.elt
				.height(0)
				.css('display', 'none');
				item.img.remove();
				item.imgAppend = false;
			}
			
			var pItem = (p - item.pMin) / piece;
			if(pItem > 1) 			pItem = 1;
			else if(pItem <= 0.01)	pItem = 0;
			
			h = Math.ceil( pItem * windowHeight );
			top = Math.floor( windowHeight - pItem * windowHeight );
			
			if(p >= item.pMin && item.elt.height() != h && (i == cur || i == cur - 1))
			{	
				item.elt
				.height( Math.ceil( h ) )
				.css('top', Math.floor( windowHeight - pItem * windowHeight ) );
				
				var imgPos = Math.floor( - item.imgFile.height / 2 - ((1 - pItem) * windowHeight/1) );
				item.img
				.css ({'margin-top' : imgPos, 'margin-bottom' : imgPos});
				
				if(item.txtFile != undefined)
				{
					var txtPos = Math.floor( - item.txtFile.height / 2 - ((1 - pItem) * windowHeight/2) );
					item.txt
					.css ({'margin-top' : txtPos, 'margin-bottom' : txtPos});
					
					var logoPos = Math.floor( - item.logoFile.height / 2 - ((1 - pItem) * windowHeight/2) + windowHeight / 2 - 50);
					item.logo
					.css ({'margin-top' : logoPos, 'margin-bottom' : logoPos});
				}
			}
		}
	}
	
	if( Math.abs(windowTop - realWindowTop) < 0.1 ){
		windowTop = realWindowTop;
	}
	
	_didScroll = (windowTop == 0 || windowTop != realWindowTop);
	
	setTimeout(onEnterFrame, frameRate);
}

////// UTILS

String.prototype.ucfirst = function () {
    var x = this.split(/\s+/g);
    for (var i = 0; i < x.length; i++) {
        var parts = x[i].match(/(\w)(\w*)/);
        x[i] = parts[1].toUpperCase() + parts[2].toLowerCase();
    }
    return x.join(' ');
};

//// VIEWPORT PATCH for Iphone & Ipad

if (navigator.userAgent.match(/iPhone/i)) 
{
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta != null) {
		viewportmeta.content = 'width=device-width, user-scalable=0, minimum-scale=0.5, maximum-scale=0.5';
		document.body.addEventListener('gesturestart', function () {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}
else if (navigator.userAgent.match(/iPad/i)) 
{
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta != null) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
		document.body.addEventListener('gesturestart', function () {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}