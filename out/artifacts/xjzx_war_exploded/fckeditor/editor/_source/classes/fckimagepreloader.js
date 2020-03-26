﻿/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2008 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Preload a list of img, firing an event when complete.
 */

var FCKimgPreloader = function()
{
	this._img = new Array() ;
}

FCKimgPreloader.prototype =
{
	Addimg : function( img )
	{
		if ( typeof( img ) == 'string' )
			img = img.split( ';' ) ;

		this._img = this._img.concat( img ) ;
	},

	Start : function()
	{
		var aimg = this._img ;
		this._PreloadCount = aimg.length ;

		for ( var i = 0 ; i < aimg.length ; i++ )
		{
			var eImg = document.createElement( 'img' ) ;
			FCKTools.AddEventListenerEx( eImg, 'load', _FCKimgPreloader_Onimg, this ) ;
			FCKTools.AddEventListenerEx( eImg, 'error', _FCKimgPreloader_Onimg, this ) ;
			eImg.src = aimg[i] ;

			_FCKimgPreloader_imgCache.push( eImg ) ;
		}
	}
};

// All preloaded img must be placed in a global array, otherwise the preload
// magic will not happen.
var _FCKimgPreloader_imgCache = new Array() ;

function _FCKimgPreloader_Onimg( ev, imgPreloader )
{
	if ( (--imgPreloader._PreloadCount) == 0 && imgPreloader.OnComplete )
		imgPreloader.OnComplete() ;
}
