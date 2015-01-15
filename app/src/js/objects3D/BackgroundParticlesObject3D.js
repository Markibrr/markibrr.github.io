'use strict';

var jQuery = require('jquery');
var THREE = require('three');
var TweenLite = require('tweenlite');
var loop = require('../utils/loopUtil');

var random = require('../utils/randomUtil');

/**
 * Background floating particles
 *
 * @class BackgroundParticles
 * @constructor
 * @param {Object} [options]
 * @param {Number} [options.count=1000] Number of particles
 * @param {Number} [options.particleSize=0.5] Size of a particle
 * @param {Array} [options.rangeY=[-100, 100]] Y range for the random
 * @requires jQuery, THREE, random
 */
function BackgroundParticles (options) {
  var parameters = jQuery.extend({
    count: 1000,
    particleSize: 0.5,
    rangeY: [-100, 100]
  }, options);

  var material = new THREE.PointCloudMaterial({
    size: parameters.particleSize
  });

  var geometry = new THREE.Geometry();

  for (var i = 0; i < parameters.count; i++) {
    var particle = new THREE.Vector3(
      random(-50, 50),
      random(parameters.rangeY[0], parameters.rangeY[1]),
      random(-50, 100)
    );

    geometry.vertices.push(particle);
  }

  var group = new THREE.Object3D();

  group.add(new THREE.PointCloud(geometry, material));
  
  // strips
  var stripsGeometry = new THREE.Geometry();

  var stripGeometry = new THREE.PlaneGeometry(5, 2);
  var stripMaterial = new THREE.MeshLambertMaterial({ color: '#666666' });

  for (var i = 0; i < 20; i++) {
    var stripMesh = new THREE.Mesh(stripGeometry, stripMaterial);
    stripMesh.position.set(
      random(-50, 50),
      random(parameters.rangeY[0], parameters.rangeY[1]),
      random(-50, 0)
    );

    stripMesh.scale.set(
      random(0.5, 1),
      random(0.1, 1),
      1
    );

    stripMesh.updateMatrix();
    stripsGeometry.merge(stripMesh.geometry, stripMesh.matrix);
  }

  var totalMesh = new THREE.Mesh(stripsGeometry, stripMaterial);
  
  group.add(totalMesh);

  this.el = group;
}

module.exports = BackgroundParticles;

// 'use strict';

// var jQuery = require('jquery');
// var THREE = require('three');

// var random = require('../utils/randomUtil');

// /**
//  * Background floating particles
//  *
//  * @class BackgroundParticles
//  * @constructor
//  * @param {Object} [options]
//  * @param {Number} [options.count=1000] Number of particles
//  * @param {Number} [options.particleSize=0.5] Size of a particle
//  * @param {Array} [options.rangeY=[-100, 100]] Y range for the random
//  * @requires jQuery, THREE, random
//  */
// function BackgroundParticles (options) {
//   this.parameters = jQuery.extend({
//     count: 1000,
//     particleSize: 0.5,
//     rangeY: [-100, 100]
//   }, options);

//   var material = new THREE.PointCloudMaterial({
//     size: this.parameters.particleSize
//   });

//   var geometry = new THREE.Geometry();

//   for (var i = 0; i < this.parameters.count; i++) {
//     var particle = new THREE.Vector3(
//       random(-50, 50),
//       random(this.parameters.rangeY[0], this.parameters.rangeY[1]),
//       random(-50, 100)
//     );

//     geometry.vertices.push(particle);
//   }

//   this.el = new THREE.PointCloud(geometry, material);
// }

// module.exports = BackgroundParticles;