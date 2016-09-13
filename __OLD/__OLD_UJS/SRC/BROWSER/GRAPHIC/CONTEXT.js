/**
 * Context for canvas wrapper class
 */
global.CONTEXT = CLASS({

	init : function(inner, self, canvas) {
		'use strict';
		//REQUIRED: canvas

		var
		// native context
		nativeContext = canvas.getEl().getContext('2d'),

		// draw img.
		drawImg,

		// get image data.
		getImageData,

		// create image data.
		createImageData,

		// put image data.
		putImageData,

		// set scale.
		setScale,

		// rotate.
		rotate,

		// save.
		save,

		// restore.
		restore,

		// clear.
		clear,
		
		// begin path.
		beginPath,
		
		// close path.
		closePath,
		
		// move to.
		moveTo,
		
		// line to.
		lineTo,
		
		// strock.
		strock,
		
		// set strock style.
		setStrokeStyle,
		
		// fill.
		fill,
		
		// set fill style.
		setFillStyle;

		self.drawImg = drawImg = function(params) {
			//REQUIRED: params
			//REQUIRED: params.img
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.clipX
			//OPTIONAL: params.clipY
			//OPTIONAL: params.clipWidth
			//OPTIONAL: params.clipHeight
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// img
			img = params.img,

			// x
			x = params.x === undefined ? 0 : params.x,

			// y
			y = params.y === undefined ? 0 : params.y,

			// clip x
			clipX = params.clipX !== undefined ? params.clipX : 0,

			// clip y
			clipY = params.clipY !== undefined ? params.clipY : 0,

			// clip width
			clipWidth = params.clipWidth,

			// clip height
			clipHeight = params.clipHeight,

			// width
			width = params.width,

			// height
			height = params.height,

			// scale
			scale = img.checkIsX2() === true ? 2 : 1;

			if (clipWidth === undefined && clipHeight === undefined) {
				if (width > 0 && height > 0) {
					nativeContext.drawImage(img.getEl(), x, y, width, height);
				} else {
					nativeContext.drawImage(img.getEl(), x, y);
				}
			} else {

				if (clipWidth === undefined) {
					clipWidth = img.getWidth();
				}
				if (clipHeight === undefined) {
					clipHeight = img.getHeight();
				}

				nativeContext.drawImage(img.getEl(), clipX * scale, clipY * scale, clipWidth * scale, clipHeight * scale, x, y, width, height);
			}
		};

		self.getImageData = getImageData = function(params) {
			//OPTIONAL: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.width
			//OPTIONAL: params.height

			var
			// x
			x = params === undefined || params.x === undefined ? 0 : params.x,

			// y
			y = params === undefined || params.y === undefined ? 0 : params.y,

			// width
			width = params === undefined || params.width === undefined ? canvas.getWidth() : params.width,

			// height
			height = params === undefined || params.height === undefined ? canvas.getHeight() : params.height;

			return nativeContext.getImageData(x, y, width, height);
		};

		self.createImageData = createImageData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.width
			//REQUIRED: params.height

			var
			// width
			width = params.width,

			// height
			height = params.height;

			return nativeContext.createImageData(width, height);
		};

		self.putImageData = putImageData = function(params) {
			//REQUIRED: params
			//REQUIRED: params.data
			//OPTIONAL: params.x
			//OPTIONAL: params.y

			var
			// data
			data = params.data,

			// x
			x = params.x === undefined ? 0 : params.x,

			// y
			y = params.y === undefined ? 0 : params.y;

			nativeContext.putImageData(data, x, y);
		};

		self.setScale = setScale = function(scaleSize) {
			//REQUIRED: scaleSize
			//OPTIONAL: scaleSize.scaleWidth
			//OPTIONAL: scaleSize.scaleHeight

			var
			// scale width
			scaleWidth = scaleSize.scaleWidth,

			// scale height
			scaleHeight = scaleSize.scaleHeight;

			nativeContext.scale(scaleWidth, scaleHeight);
		};

		self.rotate = rotate = function(params) {
			//REQUIRED: params
			//REQUIRED: params.centerX
			//REQUIRED: params.centerY
			//REQUIRED: params.degree

			var
			// center x
			centerX = params.centerX,

			// center y
			centerY = params.centerY,

			// degree
			degree = params.degree;

			// Move registration point to the center of the canvas
			nativeContext.translate(centerX, centerY);

			// Rotate degree
			nativeContext.rotate(degree * Math.PI / 180);

			// Move registration point back to the y x corner of canvas
			nativeContext.translate(-centerX, -centerY);
		};

		self.save = save = function() {
			nativeContext.save();
		};

		self.restore = restore = function() {
			nativeContext.restore();
		};

		self.clear = clear = function() {
			nativeContext.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
		};
		
		self.beginPath = beginPath = function() {
			nativeContext.beginPath();
		};
		
		self.closePath = closePath = function() {
			nativeContext.closePath();
		};
		
		self.moveTo = moveTo = function(params) {
			//REQUIRED: params
			//REQUIRED: params.x
			//REQUIRED: params.y
			
			var
			// x
			x = params.x,
			
			// y
			y = params.y;
			
			nativeContext.moveTo(x, y);
		};
		
		self.lineTo = lineTo = function(params) {
			//REQUIRED: params
			//REQUIRED: params.x
			//REQUIRED: params.y
			
			var
			// x
			x = params.x,
			
			// y
			y = params.y;
			
			nativeContext.lineTo(x, y);
		};
		
		self.strock = strock = function(params) {
			nativeContext.strock();
		};
		
		self.setStrokeStyle = setStrokeStyle = function(strokeStyle) {
			nativeContext.strokeStyle = strokeStyle;
		};
		
		self.fill = fill = function() {
			nativeContext.fill();
		};
		
		self.setFillStyle = setFillStyle = function(fillStyle) {
			nativeContext.fillStyle = fillStyle;
		};
	}
});
