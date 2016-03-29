/**
      chroma.palette-gen.js - a palette generator for data scientists
	  based on Chroma.js HCL color space
      Copyright (C) 2012  Mathieu Jacomy
  
  	The JavaScript code in this page is free software: you can
      redistribute it and/or modify it under the terms of the GNU
      General Public License (GNU GPL) as published by the Free Software
      Foundation, either version 3 of the License, or (at your option)
      any later version.  The code is distributed WITHOUT ANY WARRANTY;
      without even the implied warranty of MERCHANTABILITY or FITNESS
      FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
  
      As additional permission under GNU GPL version 3 section 7, you
      may distribute non-source (e.g., minimized or compacted) forms of
      that code without the copy of the GNU GPL normally required by
      section 4, provided you include this license notice and a URL
      through which recipients can access the Corresponding Source.  
  */
 
// v0.1
 
var paletteGenerator = {
	generate: function(colorsCount, checkColor, forceMode, quality, ultra_precision){
		// Default
		if(colorsCount === undefined)
			colorsCount = 8;
		if(checkColor === undefined)
			checkColor = function(x){return true;};
		if(forceMode === undefined)
			forceMode = false;
		if(quality === undefined)
			quality = 50;
		ultra_precision = ultra_precision || false

		if(forceMode){
			// Force Vector Mode
			
			var colors = [];
			
			// It will be necessary to check if a Lab color exists in the rgb space.
			function checkLab(lab){
				var color = chroma.lab(lab[0], lab[1], lab[2]);
				return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && checkColor(color);
			}
			
			// Init
			var vectors = {};
			for(i=0; i<colorsCount; i++){
				// Find a valid Lab color
				var color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
				while(!checkLab(color)){
					color = [Math.random(),2*Math.random()-1,2*Math.random()-1];
				}
				colors.push(color);
			}
			
			// Force vector: repulsion
			var repulsion = 0.3;
			var speed = 0.05;
			var steps = quality * 20;
			while(steps-- > 0){
				// Init
				for(i=0; i<colors.length; i++){
					vectors[i] = {dl:0, da:0, db:0};
				}
				// Compute Force
				for(i=0; i<colors.length; i++){
					var colorA = colors[i];
					for(j=0; j<i; j++){
						var colorB = colors[j];
						
						// repulsion force
						var dl = colorA[0]-colorB[0];
						var da = colorA[1]-colorB[1];
						var db = colorA[2]-colorB[2];
						var d = Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2));
						if(d>0){
							var force = repulsion/Math.pow(d,2);
							
							vectors[i].dl += dl * force / d;
							vectors[i].da += da * force / d;
							vectors[i].db += db * force / d;
							
							vectors[j].dl -= dl * force / d;
							vectors[j].da -= da * force / d;
							vectors[j].db -= db * force / d;
						} else {
							// Jitter
							vectors[j].dl += 0.02 - 0.04 * Math.random();
							vectors[j].da += 0.02 - 0.04 * Math.random();
							vectors[j].db += 0.02 - 0.04 * Math.random();
						}
					}
				}
				// Apply Force
				for(i=0; i<colors.length; i++){
					var color = colors[i];
					var displacement = speed * Math.sqrt(Math.pow(vectors[i].dl, 2)+Math.pow(vectors[i].da, 2)+Math.pow(vectors[i].db, 2));
					if(displacement>0){
						var ratio = speed * Math.min(0.1, displacement)/displacement;
						candidateLab = [color[0] + vectors[i].dl*ratio, color[1] + vectors[i].da*ratio, color[2] + vectors[i].db*ratio];
						if(checkLab(candidateLab)){
							colors[i] = candidateLab;
						}
					}
				}
			}
			return colors.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);});
			
		} else {
			
			// K-Means Mode
			function checkColor2(color){
				// Check that a color is valid: it must verify our checkColor condition, but also be in the color space
				var lab = color.lab();
				var hcl = color.hcl();
				return !isNaN(color.rgb[0]) && color.rgb[0]>=0 && color.rgb[1]>=0 && color.rgb[2]>=0 && color.rgb[0]<256 && color.rgb[1]<256 && color.rgb[2]<256 && checkColor(color);
			}
			
			var kMeans = [];
			for(i=0; i<colorsCount; i++){
				var lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
				while(!checkColor2(chroma.lab(lab))){
					lab = [Math.random(),2*Math.random()-1,2*Math.random()-1];
				}
				kMeans.push(lab);
			}
			
			var colorSamples = [];
			var samplesClosest = [];
			if(ultra_precision){
				for(l=0; l<=1; l+=0.01){
					for(a=-1; a<=1; a+=0.05){
						for(b=-1; b<=1; b+=0.05){
							if(checkColor2(chroma.lab(l, a, b))){
								colorSamples.push([l, a, b]);
								samplesClosest.push(null);
							}
						}
					}
				}
			} else {
				for(l=0; l<=1; l+=0.05){
					for(a=-1; a<=1; a+=0.1){
						for(b=-1; b<=1; b+=0.1){
							if(checkColor2(chroma.lab(l, a, b))){
								colorSamples.push([l, a, b]);
								samplesClosest.push(null);
							}
						}
					}
				}
			}
			
			
			// Steps
			var steps = quality;
			while(steps-- > 0){
				// kMeans -> Samples Closest
				for(i=0; i<colorSamples.length; i++){
					var lab = colorSamples[i];
					var minDistance = 1000000;
					for(j=0; j<kMeans.length; j++){
						var kMean = kMeans[j];
						var distance = Math.sqrt(Math.pow(lab[0]-kMean[0], 2) + Math.pow(lab[1]-kMean[1], 2) + Math.pow(lab[2]-kMean[2], 2));
						if(distance < minDistance){
							minDistance = distance;
							samplesClosest[i] = j;
						}
					}
				}
				
				// Samples -> kMeans
				var freeColorSamples = colorSamples.slice(0);
				for(j=0; j<kMeans.length; j++){
					var count = 0;
					var candidateKMean = [0, 0, 0];
					for(i=0; i<colorSamples.length; i++){
						if(samplesClosest[i] == j){
							count++;
							candidateKMean[0] += colorSamples[i][0];
							candidateKMean[1] += colorSamples[i][1];
							candidateKMean[2] += colorSamples[i][2];
						}
					}
					if(count!=0){
						candidateKMean[0] /= count;
						candidateKMean[1] /= count;
						candidateKMean[2] /= count;
					}
					
					if(count!=0 && checkColor2(chroma.lab(candidateKMean[0], candidateKMean[1], candidateKMean[2])) && candidateKMean){
						kMeans[j] = candidateKMean;
					} else {
						// The candidate kMean is out of the boundaries of the color space, or unfound.
						if(freeColorSamples.length>0){
							// We just search for the closest FREE color of the candidate kMean
							var minDistance = 10000000000;
							var closest = -1;
							for(i=0; i<freeColorSamples.length; i++){
								var distance = Math.sqrt(Math.pow(freeColorSamples[i][0]-candidateKMean[0], 2) + Math.pow(freeColorSamples[i][1]-candidateKMean[1], 2) + Math.pow(freeColorSamples[i][2]-candidateKMean[2], 2));
								if(distance < minDistance){
									minDistance = distance;
									closest = i;
								}
							}
							kMeans[j] = colorSamples[closest];

						} else {
							// Then we just search for the closest color of the candidate kMean
							var minDistance = 10000000000;
							var closest = -1;
							for(i=0; i<colorSamples.length; i++){
								var distance = Math.sqrt(Math.pow(colorSamples[i][0]-candidateKMean[0], 2) + Math.pow(colorSamples[i][1]-candidateKMean[1], 2) + Math.pow(colorSamples[i][2]-candidateKMean[2], 2));
								if(distance < minDistance){
									minDistance = distance;
									closest = i;
								}
							}
							kMeans[j] = colorSamples[closest];
						}
					}
					freeColorSamples = freeColorSamples.filter(function(color){
						return color[0] != kMeans[j][0]
							|| color[1] != kMeans[j][1]
							|| color[2] != kMeans[j][2];
					});
				}
			}
			return kMeans.map(function(lab){return chroma.lab(lab[0], lab[1], lab[2]);});
		}
	},

	diffSort: function(colorsToSort){
		// Sort
		var diffColors = [colorsToSort.shift()];
		while(colorsToSort.length>0){
			var index = -1;
			var maxDistance = -1;
			for(candidate_index=0; candidate_index<colorsToSort.length; candidate_index++){
				var d = 1000000000;
				for(i=0; i<diffColors.length; i++){
					var colorA = colorsToSort[candidate_index].lab();
					var colorB = diffColors[i].lab();
					var dl = colorA[0]-colorB[0];
					var da = colorA[1]-colorB[1];
					var db = colorA[2]-colorB[2];
					d = Math.min(d, Math.sqrt(Math.pow(dl, 2)+Math.pow(da, 2)+Math.pow(db, 2)));
				}
				if(d > maxDistance){
					maxDistance = d;
					index = candidate_index;
				}
			}
			var color = colorsToSort[index];
			diffColors.push(color);
			colorsToSort = colorsToSort.filter(function(c,i){return i!=index;});
		}
		return diffColors;
	}
}